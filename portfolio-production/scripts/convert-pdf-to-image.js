/**
 * Script to convert PDF to image for use as texture
 * 
 * To use this script:
 * 1. Install dependencies: npm install pdf-poppler
 * 2. Run: node convert-pdf-to-image.js
 * 
 * This will create a PNG image from the first page of the PDF
 */

import { convert } from 'pdf-poppler';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfPath = join(__dirname, 'public', 'SH.SH-Resume.pdf');
const outputDir = join(__dirname, 'public', 'assets', 'textures');

const options = {
    format: 'png',
    out_dir: outputDir,
    out_prefix: 'resume',
    page: 1, // First page only
    scale: 2048 // High resolution for texture
};

console.log('Converting PDF to image...');
console.log('PDF path:', pdfPath);
console.log('Output directory:', outputDir);

convert(pdfPath, options)
    .then(() => {
        console.log('✅ PDF converted successfully!');
        console.log('Image saved to:', join(outputDir, 'resume-1.png'));
    })
    .catch((error) => {
        console.error('❌ Error converting PDF:', error);
    });
