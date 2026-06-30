/**
 * Uploads all local assets/img files to Cloudinary.
 * Filename convention: v1_{section}_{name}.ext → public_id: v1/{section}/{name}
 * Run: node scripts/upload-images.mjs
 * Dry run: node scripts/upload-images.mjs --dry-run
 */

import { v2 as cloudinary } from 'cloudinary';
import { readdir, mkdtemp, rm } from 'fs/promises';
import { resolve, extname, basename, join } from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { tmpdir } from 'os';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

config({ path: resolve(root, '.env') });

const DRY_RUN = process.argv.includes('--dry-run');

cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Convert local filename → Cloudinary public_id (NO v1/ prefix — conflicts with Cloudinary versioning)
// v1_projects_somerville-cabinet-01-after.png → projects/somerville-cabinet-01-after
// v1_colors_swatch-bone-white.png           → colors/swatch-bone-white
// logo-horizontal-dark.png (brand folder)   → brand/logo-horizontal-dark
function toPublicId(filename, relativePath) {
  const name = basename(filename, extname(filename));
  const parts = name.split('_');
  // Brand logos don't have the v1_ prefix — derive folder from their directory
  if (relativePath.includes('/brand/')) return `brand/${name}`;
  // Strip the leading v1_ segment: v1_section_name → section/name
  if (parts.length >= 3 && parts[0] === 'v1') {
    return `${parts[1]}/${parts.slice(2).join('_')}`;
  }
  return name;
}

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = resolve(dir, e.name);
    if (e.isDirectory()) files.push(...await getFiles(full));
    else if (/\.(png|jpg|jpeg|webp|svg|gif)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function compress(filePath, tmpDir) {
  const out = join(tmpDir, basename(filePath, extname(filePath)) + '.jpg');
  await sharp(filePath)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 85, progressive: true })
    .toFile(out);
  return out;
}

async function upload(filePath, publicId, tmpDir) {
  const compressed = await compress(filePath, tmpDir);
  console.log(`  Uploading → ${publicId}`);
  if (DRY_RUN) return { public_id: publicId, skipped: true };
  return cloudinary.uploader.upload(compressed, {
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
    use_filename: false,
  });
}

async function main() {
  const imgDir = resolve(root, 'assets', 'img');
  const files = await getFiles(imgDir);
  const tmpDir = await mkdtemp(join(tmpdir(), 'cld-upload-'));

  console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Uploading ${files.length} images to Cloudinary (${process.env.PUBLIC_CLOUDINARY_CLOUD_NAME})\n`);

  let ok = 0, fail = 0;
  for (const file of files) {
    const publicId = toPublicId(basename(file), file);
    try {
      await upload(file, publicId, tmpDir);
      ok++;
    } catch (err) {
      console.error(`  FAILED ${basename(file)}: ${err.message}`);
      fail++;
    }
  }

  await rm(tmpDir, { recursive: true });
  console.log(`\nDone: ${ok} uploaded, ${fail} failed.\n`);
}

main();
