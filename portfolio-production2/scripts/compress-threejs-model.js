/**
 * Compress Three.js model with Draco compression
 * Run: node compress-threejs-model.js
 */

import { execSync } from 'child_process';
import { existsSync, statSync, renameSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, 'public', 'assets', 'models', 'three-js.glb');
const outputPath = join(__dirname, 'public', 'assets', 'models', 'three-js-compressed.glb');
const backupPath = join(__dirname, 'public', 'assets', 'models', 'three-js-original.glb');

console.log('🔍 Checking gltf-pipeline installation...');

try {
    execSync('npx gltf-pipeline --version', { stdio: 'ignore' });
    console.log('✅ gltf-pipeline is available');
} catch (error) {
    console.log('📦 Installing gltf-pipeline...');
    execSync('npm install -g gltf-pipeline', { stdio: 'inherit' });
}

if (!existsSync(inputPath)) {
    console.error('❌ Input file not found:', inputPath);
    process.exit(1);
}

const originalSize = statSync(inputPath).size;
console.log('📊 Original size:', (originalSize / 1024 / 1024).toFixed(2), 'MB');

console.log('🗜️ Compressing with Draco...');

try {
    // Compress with Draco
    execSync(`npx gltf-pipeline -i "${inputPath}" -o "${outputPath}" -d`, {
        stdio: 'inherit'
    });

    const compressedSize = statSync(outputPath).size;
    const savings = ((1 - compressedSize / originalSize) * 100).toFixed(1);

    console.log('✅ Compression successful!');
    console.log('📊 Compressed size:', (compressedSize / 1024 / 1024).toFixed(2), 'MB');
    console.log('💾 Saved:', savings, '%');

    // Backup original and replace
    console.log('📦 Creating backup...');
    renameSync(inputPath, backupPath);
    renameSync(outputPath, inputPath);

    console.log('✅ Done!');
    console.log('Original backed up to:', backupPath);
    console.log('Compressed file is now:', inputPath);

} catch (error) {
    console.error('❌ Compression failed:', error.message);
    process.exit(1);
}
