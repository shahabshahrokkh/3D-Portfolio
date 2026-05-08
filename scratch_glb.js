import fs from 'fs';

const buffer = fs.readFileSync('c:\\Users\\shaha\\Desktop\\easy\\public\\assets\\models\\arcade_machine.glb');
const str = buffer.toString('utf8', 0, Math.min(buffer.length, 50000));
const jsonStart = str.indexOf('JSON{');
if (jsonStart !== -1) {
    let braceCount = 0;
    let inString = false;
    let escapeNext = false;
    for (let i = jsonStart + 4; i < str.length; i++) {
        const c = str[i];
        if (escapeNext) {
            escapeNext = false;
            continue;
        }
        if (c === '\\') {
            escapeNext = true;
            continue;
        }
        if (c === '"') {
            inString = !inString;
            continue;
        }
        if (!inString) {
            if (c === '{') braceCount++;
            if (c === '}') {
                braceCount--;
                if (braceCount === 0) {
                    const jsonStr = str.substring(jsonStart + 4, i + 1);
                    const data = JSON.parse(jsonStr);
                    console.log("Meshes:");
                    data.meshes.forEach((m, i) => console.log(i, m.name));
                    console.log("Materials:");
                    data.materials.forEach((m, i) => console.log(i, m.name));
                    console.log("Nodes:");
                    data.nodes.forEach((n, i) => console.log(i, n.name, "mesh:", n.mesh));
                    process.exit(0);
                }
            }
        }
    }
}

