// coolest-art-01 entry (Node 22, standard library only): the art is the entry.png
// beside this file — a cyber-samurai in a rain-soaked neon alley, generated for
// this entry — and the program copies it to /output/entry.png. The gate takes a
// whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels; the judge sees
// exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const out = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(new URL('./entry.png', import.meta.url), out);
console.log(`entry.png written: ${statSync(out).size} bytes`);
