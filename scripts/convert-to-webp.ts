import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const WEBP_DIR = path.join(process.cwd(), 'public-webp');

async function ensureDirectoryExists(dirPath: string) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function convertToWebP(filePath: string) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    // Only process image files
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return;
    }

    // Create the same directory structure in public-webp
    const relativePath = path.relative(PUBLIC_DIR, path.dirname(filePath));
    const webpDir = path.join(WEBP_DIR, relativePath);
    await ensureDirectoryExists(webpDir);

    const fileName = path.basename(filePath, ext);
    const outputPath = path.join(webpDir, `${fileName}.webp`);

    await sharp(filePath)
      .webp({ quality: 80 }) // Adjust quality as needed (0-100)
      .toFile(outputPath);

    console.log(
      `✅ Converted: ${path.relative(PUBLIC_DIR, filePath)} -> ${path.relative(
        WEBP_DIR,
        outputPath
      )}`
    );
  } catch (error) {
    console.error(`❌ Error converting ${filePath}:`, error);
  }
}

async function processDirectory(dirPath: string) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      await convertToWebP(fullPath);
    }
  }
}

async function main() {
  console.log('🔄 Starting image conversion to WebP...');
  // Create the root public-webp directory
  await ensureDirectoryExists(WEBP_DIR);
  await processDirectory(PUBLIC_DIR);
  console.log(
    '✨ Conversion process completed! All WebP images are in the public-webp folder.'
  );
}

main().catch(console.error);
