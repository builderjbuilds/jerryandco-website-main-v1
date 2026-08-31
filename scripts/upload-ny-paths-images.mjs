/**
 * Uploads the NY division "three ways we build it" card renders from Higgsfield CDN to Cloudinary.
 * Source: Higgsfield CDN (direct URL upload — no local files needed).
 * Run: node scripts/upload-ny-paths-images.mjs
 * Dry run: node scripts/upload-ny-paths-images.mjs --dry-run
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

// public_id → Higgsfield CDN filename (nano_banana_pro)
const IMAGES = {
  'ny/aspirational/fencing-patio':        'hf_20260827_055850_ee7e2cc3-82f2-4e4f-ac35-f4a2f8fe705a.png',
  'ny/aspirational/landlord-multifamily': 'hf_20260827_055850_7f3c0b75-60f4-4388-a76f-67ac7a8fc2b3.png',
  'ny/aspirational/deck-addition':        'hf_20260827_055850_c315ad7e-3820-4a82-8bec-5d3849eae6a8.png',
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
