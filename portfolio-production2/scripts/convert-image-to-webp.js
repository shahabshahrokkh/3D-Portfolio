/**
 * Convert PNG to WebP for better performance
 * Run: node convert-image-to-webp.js
 */

import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, 'public', 'Black and White Minimalist Corporate Resume.png');
const outputDir = join(__dirname, 'public', 'assets', 'textures');
const outputPath = join(outputDir, 'resume-preview.webp');

// Create directory if it doesn't exist
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

console.log('Converting PNG to WebP...');
console.log('Input:', inputPath);
console.log('Output:', outputPath);

sharp(inputPath)
    .webp({ quality: 85 }) // High quality WebP
    .toFile(outputPath)
    .then(info => {
        console.log('✅ Conversion successful!');
        console.log('Original size:', (451883 / 1024).toFixed(2), 'KB');
        console.log('WebP size:', (info.size / 1024).toFixed(2), 'KB');
        console.log('Saved:', ((1 - info.size / 451883) * 100).toFixed(1), '%');
    })
    .catch(err => {
        console.error('❌ Error:', err);
    });
