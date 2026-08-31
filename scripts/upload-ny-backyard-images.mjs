/**
 * Uploads the NY division backyard hero/before/after renders from Higgsfield CDN to Cloudinary.
 * Source: Higgsfield CDN (direct URL upload — no local files needed).
 * Run: node scripts/upload-ny-backyard-images.mjs
 * Dry run: node scripts/upload-ny-backyard-images.mjs --dry-run
 */

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
config({ path: resolve(root, '.env') });

const DRY_RUN = process.argv.includes('--dry-run');
const BASE = 'https://d8j0ntlcm91z4.cloudfront.net/user_3Fq7fiLykr4LYcAIq8e0CZilos0/';

// public_id → Higgsfield CDN filename (nano_banana_pro, confirmed against Congruence Checklist)
const IMAGES = {
  'ny/aspirational/hero-backyard-evening': 'hf_20260827_054302_688edc91-4f0f-44b7-9a85-4e8268e8b6b8.png',
  'ny/aspirational/before-backyard-patio': 'hf_20260827_054302_4621e9d8-0291-4f30-b2f1-760dd3f69595.png',
  'ny/aspirational/after-backyard-patio':  'hf_20260827_054302_82605920-083c-4689-88b5-fa8ff7cba4a4.png',
};

cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

const cloud = process.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
if (!cloud || cloud === 'jerryandco') {
  console.error('ABORT: cloud_name is missing or is the forbidden "jerryandco" cloud.');
  process.exit(1);
}

console.log(`Cloud: ${cloud}`);
console.log(`Images to upload: ${Object.keys(IMAGES).length}`);
if (DRY_RUN) console.log('[DRY RUN] No uploads will be performed.');
console.log('');

let ok = 0, fail = 0;

for (const [publicId, file] of Object.entries(IMAGES)) {
  const url = BASE + file;
  if (DRY_RUN) {
    console.log(`[DRY] ${publicId}`);
    continue;
  }
  try {
    const result = await cloudinary.uploader.upload(url, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    });
    console.log(`✓ ${publicId}  (${result.width}×${result.height})`);
    ok++;
  } catch (err) {
    console.error(`✗ ${publicId}  ${err.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} uploaded, ${fail} failed.`);
if (fail > 0) process.exit(1);
