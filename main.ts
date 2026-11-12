// coolest-art-01 entry — Node 22, standard library only.
//
// The art is the entry.png sitting next to this file: a cyber-samurai in a
// rain-soaked neon alley, made for this entry. All this program does is place
// that image at /output/entry.png, exactly as it is — the gate takes a whole
// PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels, and the judge sees
// precisely the bytes written here. Nothing is drawn or altered at run time.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

// Read the art and sanity-check it before writing: it must be a JPEG
// (starts FF D8 FF) and fit the gate's 1 MiB cap.
const bytes = readFileSync(source);
if (bytes.length < 3 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
  throw new Error('entry.png is not a JPEG (expected FF D8 FF magic bytes)');
}
if (bytes.length > 1048576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB gate limit`);
}
if (bytes[bytes.length - 2] !== 0xff || bytes[bytes.length - 1] !== 0xd9) {
  throw new Error('entry.png is truncated (missing FF D9 end marker)');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);
console.log(`entry.png written: ${bytes.length} bytes -> ${target}`);
