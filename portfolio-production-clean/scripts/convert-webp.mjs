import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const assetsDir = './public/assets';

async function convertToWebP(inputPath, outputPath) {
  const stats = statSync(inputPath);
  await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);
  const newStats = statSync(outputPath);
  const saved = ((1 - newStats.size / stats.size) * 100).toFixed(1);
  console.log(`✓ ${basename(inputPath)} → ${basename(outputPath)}  (${(stats.size/1024).toFixed(0)}KB → ${(newStats.size/1024).toFixed(0)}KB, -${saved}%)`);
}

async function main() {
  const files = readdirSync(assetsDir);
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const input = join(assetsDir, file);
      const output = join(assetsDir, basename(file, ext) + '.webp');
      await convertToWebP(input, output);
    }
  }
}

main().catch(console.error);
