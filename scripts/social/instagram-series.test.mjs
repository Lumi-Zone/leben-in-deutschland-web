import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs/promises';
import { emptySeriesState, currentSlot, planPost, contentFor, ACCOUNT_ID } from './instagram-series-core.mjs';
import { publishPlanned } from './instagram-series-publisher.mjs';
const questions=JSON.parse(await fs.readFile(new URL('../../src/data/questions.json',import.meta.url),'utf8'));
const morning=new Date('2026-09-08T06:00:00Z');
const afternoon=new Date('2026-09-08T14:00:00Z');
const evening=new Date('2026-09-08T16:00:00Z');
function post(state,plan){state.cycle=plan.cycle;state.posts.push({date:plan.date,slot:plan.slot,questionId:plan.question.id,cycle:plan.cycle,key:`${ACCOUNT_ID}/${plan.date}/${plan.slot}`});}
test('Berlin slots follow DST and refuse early runs',()=>{
 assert.equal(currentSlot(new Date('2026-09-08T05:59:59Z')),null);
 assert.equal(currentSlot(morning).id,'question');
 assert.equal(currentSlot(afternoon).id,'answer');
 assert.equal(currentSlot(evening).id,'lesson');
 assert.equal(currentSlot(new Date('2026-12-08T07:00:00Z')).id,'question');
 assert.equal(currentSlot(new Date('2026-12-08T15:00:00Z')).id,'answer');
 assert.equal(currentSlot(new Date('2026-12-08T17:00:00Z')).id,'lesson');
});
test('three slots use the same question exactly once; next day advances',()=>{
 const state=emptySeriesState();
 for(const [now,slot] of [[morning,'question'],[afternoon,'answer'],[evening,'lesson']]){
  const plan=planPost({questions,state,now});assert.equal(plan.slot,slot);assert.equal(plan.question.id,1);post(state,plan);
  assert.match(planPost({questions,state,now}).skip,/already published/);
 }
 assert.equal(planPost({questions,state,now:new Date('2026-09-09T06:00:00Z')}).question.id,2);
});
test('missing morning or afternoon does not publish orphan follow-ups',()=>{
 const state=emptySeriesState();
 assert.match(planPost({questions,state,now:afternoon}).skip,/Morning/);
 post(state,planPost({questions,state,now:morning}));
 assert.match(planPost({questions,state,now:evening}).skip,/Answer/);
});
test('start date, account guard and unresolved intent block publication',()=>{
 const state=emptySeriesState();
 assert.match(planPost({questions,state,now:morning,startDate:'2026-09-09'}).skip,/Scheduled start/);
 assert.throws(()=>planPost({questions,state:{...state,accountId:'wrong'},now:morning}),/mismatch/);
 assert.throws(()=>planPost({questions,state:{...state,inFlight:{}},now:morning}),/unresolved/);
});
test('question pool cycles only after all 300 morning questions',()=>{
 const state=emptySeriesState();state.posts=questions.filter(q=>q.type==='General').map(q=>({slot:'question',date:'2026-01-01',questionId:q.id,cycle:1}));
 const plan=planPost({questions,state,now:morning});assert.equal(plan.question.id,1);assert.equal(plan.cycle,2);
});
test('all 900 captions and alt texts fit; no old branding or next-day promises',()=>{
 for(const q of questions.filter(q=>q.type==='General')) for(const slot of ['question','answer','lesson']){
  const c=contentFor(q,slot);assert.ok(c.caption.length<=2200);assert.ok(c.altText.length<=1000);
  assert.doesNotMatch(c.caption,/@300Fragen|#300Fragen|morgen in den Kommentaren/);
  if(slot==='question')assert.match(c.caption,/16:00/);
 }
});
function fixture(failure){
 const state=emptySeriesState();const plan=planPost({questions,state,now:morning});const writes=[];const calls=[];
 const save=async s=>writes.push(structuredClone(s));
 const request=async(endpoint,options={})=>{
  calls.push([endpoint,options.method||'GET']);
  if(endpoint.endsWith('/media')){assert.equal(writes.at(-1).inFlight.stage,'creating');return {id:'container'};}
  if(endpoint.startsWith('container?'))return {status_code:'FINISHED'};
  if(endpoint.endsWith('/media_publish')){assert.equal(writes.at(-1).inFlight.stage,'publishing');if(failure==='publish')throw new Error('timeout');return {id:'media'};}
  if(failure==='permalink')throw new Error('permalink unavailable');return {id:'media',permalink:'https://www.instagram.com/p/example/'};
 };
 return {state,plan,writes,calls,save,request,imageUrl:'https://example.com/card.jpg',caption:'Test',altText:'Test'};
}
test('publishing saves intent before mutations and success before permalink request',async()=>{
 const f=fixture('permalink');await publishPlanned(f);assert.equal(f.state.posts.length,1);assert.equal(f.state.inFlight,null);
 assert.equal(f.writes.at(-1).posts[0].mediaId,'media');assert.equal(f.calls.filter(([e])=>e.endsWith('/media_publish')).length,1);
 assert.match(planPost({questions,state:f.state,now:morning}).skip,/already published/);
});
test('uncertain publish response blocks subsequent calls instead of duplicating',async()=>{
 const f=fixture('publish');await assert.rejects(publishPlanned(f),/timeout/);
 assert.equal(f.state.inFlight.stage,'publishing');assert.equal(f.state.posts.length,0);
 await assert.rejects(publishPlanned(f),/Unresolved/);
 assert.equal(f.calls.filter(([e])=>e.endsWith('/media_publish')).length,1);
});
