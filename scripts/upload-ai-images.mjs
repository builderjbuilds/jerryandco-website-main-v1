/**
 * Uploads AI-generated placeholder images from Higgsfield CDN to Cloudinary.
 * Source: Higgsfield CDN (direct URL upload — no local files needed).
 * Run: node scripts/upload-ai-images.mjs
 * Dry run: node scripts/upload-ai-images.mjs --dry-run
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

// public_id → Higgsfield CDN filename (null = generation still in-flight, skip for now)
const IMAGES = {
  // Hero carousel
  'hero/hero-after-kitchen-white':       'hf_20260702_044232_9851c5ae-a1c5-400e-ad47-e48e824932ab.png',
  'hero/hero-before-after-split':        'hf_20260702_044308_a239c688-eb7c-4e4e-9375-d591d5000378.png',
  'hero/hero-bathroom-refresh':          'hf_20260702_044243_fff66c77-3dc5-469b-9ba3-375247c0f795.png',
  'hero/hero-hallway-install':           'hf_20260702_065028_a2075ffc-a27d-4f37-8f84-bd2ae0549514.png',

  // Condo trust section (index.astro)
  'condo/hoa-documentation':             'hf_20260702_065009_bace62f1-f0b7-4756-9fcc-28e0b659fb7f.png',
  'condo/neighbor-safe-process':         'hf_20260702_154234_1dba432c-57ad-48da-8d68-5f13170b9e2a.png',
  'condo/building-logistics':            'hf_20260702_064945_666a7b26-6271-4130-b401-3ac27941af13.png',

  // Services grid (index.astro)
  'services/cabinet-refinishing':        'hf_20260702_081053_5e5f80a4-27b8-4ace-b4d6-d3b00441655a.png',
  'services/bathroom-refresh':           'hf_20260702_044847_29d39c9a-5ad2-451f-adf6-0607df7b9729.png',
  'services/interior-painting':          'hf_20260702_044857_9861dbad-ef29-4c3e-b44b-47270ff7ad1f.png',
  'services/full-bathroom-reno':         'hf_20260702_064907_348f5817-a02d-4ada-b0a7-14a453516223.png',
  'services/multi-unit':                 'hf_20260702_044917_5bf97b33-a85c-4fdb-8960-9b8860dc570e.png',

  // Process steps (index.astro)
  'process/step-01-video-walkthrough':   'hf_20260702_064849_f47a045f-85f3-4b92-9c49-bc898bc4f42e.png',
  'process/step-02-prep-containment':    'hf_20260702_143213_22ffb4a2-2808-458d-aa0a-35de3463192b.png',
  'process/step-03-hand-sand':           'hf_20260702_045045_0596582b-5273-428e-890c-dd0b7848dd6c.png',
  'process/step-04-spray-finish':        'hf_20260702_045054_67675212-cd10-447b-aea6-54f75ed6a1c5.png',
  'process/step-05-cure-walkthrough':    'hf_20260702_081059_fffb266c-ad39-45c3-bf59-a45eaeecdd00.png',

  // Featured projects (index.astro)
  'featured/somerville-cabinet':         'hf_20260702_045207_825fa8c2-ff11-49b3-a26d-efd0d12ad585.png',
  'featured/cambridge-bathroom':         'hf_20260702_045215_02257bf7-200a-4f00-b015-2f9e89cc771d.png',
  'featured/arlington-painting':         'hf_20260702_071821_d632ec93-a074-40e1-8391-4cf64becd8c4.png',
  'featured/medford-cabinet':            'hf_20260702_045335_066a1201-d6b5-4fd2-a4b5-83afd818d2d8.png',
  'featured/malden-multi':               'hf_20260702_045343_48e525d3-f0f8-4113-8ef9-3acf7b27e971.png',
  'featured/everett-bathroom':           'hf_20260702_045350_4bd298f9-ec9a-4de1-a171-4de4842bee83.png',
  'featured/woburn-painting':            'hf_20260702_045359_83b89645-dc10-4ed5-8889-a97bcec2edda.png',
  'featured/winchester-kitchen':         'hf_20260702_045507_9cb3a795-465d-40a0-a83d-dc2443e767ac.png',

  // CTA section (index.astro)
  'cta/finished-kitchen-wide':           'hf_20260702_081102_6e7ee6a2-8892-4202-ae1c-950750de3657.png',

  // About page
  'about/finished-cabinet-detail':       'hf_20260702_045526_f25cb88a-10d0-455a-9a2f-bd9735b63bfc.png',
  'about/client-handoff':                'hf_20260702_064723_c6297003-5c56-4159-80e1-5ccf518b06fc.png',
  'about/craft-spray-setup':             'hf_20260702_152626_1623e00e-b651-458e-9649-27deb548f255.png',
  'about/jeremiah-spraying':             'hf_20260702_191615_9d992ae2-5192-438b-9393-9913f31ef28c.png',

  // Financing page
  'pages/financing-approval-concept':    'hf_20260702_152631_0f4c3f89-caa6-4789-80fa-491f143d18d9.png',

  // Guarantee page
  'guarantee/finished-result':           'hf_20260702_064819_802f7344-14fb-4af0-823d-8cf70b5bbd25.png',
  'guarantee/touchup-kit':               'hf_20260702_045851_c26f7fb4-7036-4258-bc16-60c43c45c470.png',

  // Vs-replacement page
  'vs-replacement/before':               'hf_20260702_045858_57e7e94e-c1c1-42a7-97a7-fc623a90ae40.png',
  'vs-replacement/after':                'hf_20260702_060433_e9253a44-53e2-4480-994d-f0adadfd8bcc.png',

  // Cost comparison page
  'cost/refinish-kitchen':               'hf_20260702_045903_8a36c803-82a3-4d01-b728-95043f3592d8.png',
  'cost/replace-kitchen':                'hf_20260702_064659_2b866706-d8b5-42c8-9bf6-de7ddda1d707.png',

  // Financing page
  'financing/aspirational-kitchen':      'hf_20260702_050438_0cfc44ae-e3c9-4aa0-92ed-40720849245c.png',
  'financing/small-kitchen':             'hf_20260702_050440_cbba7116-34f6-4474-b2fe-ccc830741912.png',
  'financing/full-kitchen':              'hf_20260702_050441_b624c5c5-2881-4132-8c16-e3212f3b3306.png',
  'financing/large-kitchen':             'hf_20260702_050535_7c8d0b8b-b588-4d98-bce5-82cdff167464.png',

  // Colors page swatches
  'colors/swatch-deep-forest':           'hf_20260702_051150_d8640705-6c07-472b-a515-2fda64ade893.png',
  'colors/swatch-bone-white':            'hf_20260702_050551_1033a497-b654-4fe6-a56d-1faaa37ba15d.png',
  'colors/swatch-soft-sage':             'hf_20260702_060438_e88c75bd-2104-4c8b-8903-bd01ad435682.png',
  'colors/swatch-charcoal-matte':        'hf_20260702_060442_0c3cd729-21d0-4715-9dc1-d9ba2b809447.png',
  'colors/swatch-navy-shaker':           'hf_20260702_060444_2b5a5f78-cb82-4948-aaaa-d28373df8357.png',
  'colors/swatch-warm-taupe':            'hf_20260702_061419_b651b6ef-f1c5-467d-9710-82ba4f525819.png',
  'colors/swatch-matte-black':           'hf_20260702_061422_eb198b70-cc9d-4e4e-a060-5e3420c78391.png',
  'colors/swatch-champagne':             'hf_20260702_061426_50a400ee-9217-48f0-8a7e-989be33735ce.png',

  // Area section background (index.astro)
  'areas/boston-aerial':                 'hf_20260702_191407_a70c7240-1188-47b7-907c-fed88a89936a.png',

  // Town hero images (cabinet-refinishing-[town].astro)
  'areas/medford-hero':                  'hf_20260702_061431_39a8ac17-143d-48a7-b7d6-f4405c513f49.png',
  'areas/malden-hero':                   'hf_20260702_061548_0e1edcde-4477-45fc-be47-7f3cde95fc73.png',
  'areas/everett-hero':                  'hf_20260702_061552_d0a0e492-a2ec-4d4e-962f-3e8ae1aa45dc.png',
  'areas/arlington-hero':                'hf_20260702_061558_d010e14e-1cf9-45e3-8e78-f80a5a37b8a5.png',
  'areas/somerville-hero':               'hf_20260702_061559_be7e0a97-8b51-46fa-a47e-efab8caf1ed4.png',
  'areas/cambridge-hero':                'hf_20260702_061722_5c6ec78e-44e7-4bbc-b63d-32661ccd0368.png',
  'areas/woburn-hero':                   'hf_20260702_061726_381817cf-07a0-4cf3-b0b0-c6e3216ae27a.png',
  'areas/winchester-hero':               'hf_20260702_061732_47fdf93e-f9d0-45ac-9499-629659a837d3.png',

  // Gallery before/after pairs (gallery.astro)
  'projects/medford-cabinet-01-before':      'hf_20260702_061734_16adf4c2-6e6c-4355-a1ba-db965231df4e.png',
  'projects/medford-cabinet-01-after':       'hf_20260702_063835_49f494b0-c0ac-4728-b827-6c5b414018b5.png',
  'projects/malden-cabinet-01-before':       'hf_20260702_062041_9b4520cd-3543-4f5a-8471-4a3bffeef8cb.png',
  'projects/malden-cabinet-01-after':        'hf_20260702_063838_1f912e01-512a-4c48-b8bc-488cbf5c0f48.png',
  'projects/everett-bathroom-01-before':     'hf_20260702_153151_2e8cb319-d2dd-45f1-9327-7c0f6c6bad2a.png',
  'projects/everett-bathroom-01-after':      'hf_20260702_153153_27cee3ff-80fa-4e97-9cae-6f41b7d61e61.png',
  'projects/arlington-painting-01-before':   'hf_20260702_152157_515ca78f-4c27-4cad-ad7c-00b446df6bc4.png',
  'projects/arlington-painting-01-after':    'hf_20260702_152159_0b0d7081-cdac-49f0-8b2d-2dffcdf5d5e1.png',
  'projects/somerville-cabinet-01-before':   'hf_20260702_061950_fbfe60b9-e3f0-472e-8db5-066d1a16a38b.png',
  'projects/somerville-cabinet-01-after':    'hf_20260702_065548_877dc0d9-9ff7-4ea3-ba61-df6c1ee3568e.png',
  'projects/cambridge-bathroom-01-before':   'hf_20260702_152808_1e1bfc30-3759-4edb-b006-4b90c01267b6.png',
  'projects/cambridge-bathroom-01-after':    'hf_20260702_152809_f2c64219-428f-4188-837f-76b060141a6d.png',
  'projects/cambridge-cabinet-01-after':     'hf_20260702_072759_dbf1f1bc-9f2e-4807-b2a0-64c49bfe3764.png',
  'projects/woburn-painting-01-before':      'hf_20260702_062200_891c20e9-d03c-4fc3-bb83-67da4f21bbf9.png',
  'projects/woburn-painting-01-after':       'hf_20260702_065552_613f17d0-fed8-475b-b185-63daa0b6006d.png',
  'projects/winchester-kitchen-01-before':   'hf_20260702_062202_1d96c175-5b31-4b95-8029-ff95971696f1.png',
  'projects/winchester-kitchen-01-after':    'hf_20260702_065554_ddfbb5c4-ee69-458b-bb52-33b3d9bec41e.png',
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

const entries = Object.entries(IMAGES).filter(([, file]) => file !== null);
const skipped = Object.entries(IMAGES).filter(([, file]) => file === null);

console.log(`Cloud: ${cloud}`);
console.log(`Images to upload: ${entries.length} | Skipped (in-flight): ${skipped.length}`);
if (skipped.length) console.log('  Skipped:', skipped.map(([id]) => id).join(', '));
if (DRY_RUN) { console.log('[DRY RUN] No uploads will be performed.'); }
console.log('');

let ok = 0, fail = 0;

for (const [publicId, file] of entries) {
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

console.log(`\nDone: ${ok} uploaded, ${fail} failed, ${skipped.length} skipped.`);
if (fail > 0) process.exit(1);
