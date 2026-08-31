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

// public_id → Higgsfield CDN filename (nano_banana_pro). Full 16-image
// manifest per the image spec doc. card-elevated-deck was swapped a second
// time on 2026-08-31 for a cleaner regeneration of the same prompt.
const IMAGES = {
  // P0
  'nj-design-build/hero-backyard-addition': 'hf_20260831_180538_d307f689-7757-4e92-b885-b350ac714f33.png',
  'nj-design-build/card-season-room': 'hf_20260831_180647_33b03127-8d06-4970-9ca4-a6819765382c.png',
  'nj-design-build/card-elevated-deck': 'hf_20260831_191901_3d84ead6-2931-496b-b68d-250abdc99995.png',
  'nj-design-build/card-patio-enclosure': 'hf_20260831_180646_9d6a2c69-cc1a-4fd5-bf95-0a51e86fb0f4.png',
  'nj-design-build/carousel-real-sunroom': 'hf_20260831_180538_800e064b-caeb-47cb-b644-7eae1bff5ea5.png',
  'nj-design-build/section-final-cta': 'hf_20260831_180930_afa70862-6f18-495f-a909-f7ac184c84e7.png',
  'nj-design-build/intake-hero-proof': 'hf_20260831_180537_f8290aac-72fd-4aeb-9933-db68afed9e5c.png',
  // P1
  'nj-design-build/card-hardscape-patio': 'hf_20260831_193043_696093c4-1446-4493-880e-141651201f7f.png',
  'nj-design-build/card-outdoor-kitchen': 'hf_20260831_193043_66b4030d-269e-49dd-bc17-361399f8814a.png',
  'nj-design-build/carousel-deck': 'hf_20260831_193453_55850245-75f6-4f52-93e2-55adb991aba5.png',
  'nj-design-build/carousel-enclosure': 'hf_20260831_193043_cd52181c-1e18-4a5a-85dd-a85c5dac245f.png',
  'nj-design-build/section-service-area': 'hf_20260831_193042_47eb175f-a1b5-4d20-8f7f-3d7cf99e91ff.png',
  'nj-design-build/scheduler-left-panel': 'hf_20260831_193618_e54b8ccd-6574-493a-b57b-46ee492e60be.png',
  // P2
  'nj-design-build/card-plans-ready': 'hf_20260831_193043_1b36018c-94ea-4439-aec2-bd1cb9dd3cd5.png',
  'nj-design-build/carousel-hardscape': 'hf_20260831_193042_44846721-184a-4548-a3c3-32b7bfd650e1.png',
  'nj-design-build/carousel-outdoor-kitchen': 'hf_20260831_193042_0b212df4-8ff6-43e0-a2a3-3e5a34548840.png',
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
      invalidate: true,
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
