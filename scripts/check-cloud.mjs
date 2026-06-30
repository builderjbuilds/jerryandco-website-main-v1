#!/usr/bin/env node
/**
 * Single-cloud assertion — runs automatically after `npm run build` (postbuild hook).
 *
 * Scans dist/ for any reference to the banned Cloudinary cloud "jerryandco".
 * The working cloud for this project is "dxuuydoee".
 *
 * Exit 0 = clean.  Exit 1 = banned cloud found; build is rejected.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const BANNED = 'cloudinary.com/jerryandco/';
const SCAN_EXTS = new Set(['.html', '.js', '.mjs', '.css']);

if (!existsSync(DIST)) {
  console.warn('⚠  dist/ not found — skipping cloud assertion (run `npm run build` first)');
  process.exit(0);
}

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (SCAN_EXTS.has(extname(entry.name))) files.push(full);
  }
  return files;
}

const hits = [];
for (const file of walk(DIST)) {
  const content = readFileSync(file, 'utf8');
  if (!content.includes(BANNED)) continue;
  const rel = relative(ROOT, file);
  content.split('\n').forEach((line, i) => {
    if (line.includes(BANNED)) {
      hits.push(`  ${rel}:${i + 1}  →  ${line.trim().slice(0, 120)}`);
    }
  });
}

if (hits.length) {
  console.error('\n\x1b[31m✗ Single-cloud assertion FAILED\x1b[0m');
  console.error(`  Found ${hits.length} reference(s) to banned cloud "jerryandco":`);
  hits.forEach(h => console.error(h));
  console.error('\n  All Cloudinary URLs must use cloud "dxuuydoee".');
  console.error('  Fix the source file(s) above and rebuild.\n');
  process.exit(1);
}

console.log('\x1b[32m✓ Single-cloud assertion passed\x1b[0m — all Cloudinary URLs use dxuuydoee');
