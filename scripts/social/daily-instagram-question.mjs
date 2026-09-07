#!/usr/bin/env node
// Backwards-compatible command. All Instagram publication now uses the three-slot runner.
import { main } from './instagram-series-publisher.mjs';
main().catch(error => { console.error(error.message); process.exitCode = 1; });
