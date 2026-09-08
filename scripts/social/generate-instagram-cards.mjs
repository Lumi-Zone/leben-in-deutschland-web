#!/usr/bin/env node
import './generate-instagram-series.mjs';
import { generateGrowthAssets } from './generate-instagram-growth.mjs';

await generateGrowthAssets();
