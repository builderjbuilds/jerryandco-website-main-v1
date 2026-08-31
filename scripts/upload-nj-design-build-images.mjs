/**
 * Uploads the NJ Design-Build funnel's P0 Nano Banana Pro renders from the
 * Higgsfield CDN to Cloudinary, at the path convention fixed by
 * JerryCo_NJDesignBuild_Image_and_Higgsfield_GenerationSpec.md Section 0
 * ("v1/nj-design-build/{filename}.jpg" — Cloudinary auto-versions, so the
 * public_id itself is just "nj-design-build/{key}").
 *
 * Run: node scripts/upload-nj-design-build-images.mjs
 * Dry run: node scripts/upload-nj-design-build-images.mjs --dry-run
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

// public_id → Higgsfield CDN filename (nano_banana_pro, P0 batch — see manifest
// Section 1 for the full 16-image list; P1/P2 filenames get appended here once
// generated in a later pass).
const IMAGES = {
  'nj-design-build/hero-backyard-addition': 'hf_20260831_180538_d307f689-7757-4e92-b885-b350ac714f33.png',
  'nj-design-build/card-season-room': 'hf_20260831_180647_33b03127-8d06-4970-9ca4-a6819765382c.png',
  'nj-design-build/card-elevated-deck': 'hf_20260831_180538_875d950a-6037-46c9-ad76-c793e90d9c4b.png',
  'nj-design-build/card-patio-enclosure': 'hf_20260831_180646_9d6a2c69-cc1a-4fd5-bf95-0a51e86fb0f4.png',
  'nj-design-build/carousel-real-sunroom': 'hf_20260831_180538_800e064b-caeb-47cb-b644-7eae1bff5ea5.png',
  'nj-design-build/section-final-cta': 'hf_20260831_180930_afa70862-6f18-495f-a909-f7ac184c84e7.png',
  'nj-design-build/intake-hero-proof': 'hf_20260831_180537_f8290aac-72fd-4aeb-9933-db68afed9e5c.png',
};

cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
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
