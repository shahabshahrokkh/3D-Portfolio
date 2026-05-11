import * as THREE from 'three';
import { createObjectWithPlaceholder } from '../utils/helpers_v2.js';
import { loadImageAsTexture } from '../utils/pdfTextureLoader.js';

export async function initResume(scene) {
    console.log('🔍 [DEBUG] Initializing resume model...');
    const result = await createObjectWithPlaceholder('resume', scene);
    console.log('✅ [DEBUG] Resume model loaded:', result);

    // Apply resume image texture to the model
    if (result) {
        try {
            const texture = await loadImageAsTexture('/assets/textures/resume-preview.webp');

            // The trifold brochure has 3 panels, we need to apply texture to all visible surfaces
            result.traverse((child) => {
                if (child.isMesh) {
                    console.log('📄 [DEBUG] Applying texture to mesh:', child.name);

                    // Create a new material with the resume texture
                    child.material = new THREE.MeshStandardMaterial({
                        map: texture,
                        side: THREE.DoubleSide, // Show texture on both sides
                        metalness: 0.0,
                        roughness: 0.9, // Paper-like surface
                        // Add slight ambient occlusion for depth
                        aoMapIntensity: 0.5,
                    });

                    child.material.needsUpdate = true;

                    // Ensure UV mapping is correct for trifold
                    if (child.geometry && child.geometry.attributes.uv) {
                        console.log('✅ [DEBUG] UV mapping found for', child.name);
                    }
                }
            });

            // Add a spotlight to highlight the resume on the bed
            const resumeLight = new THREE.SpotLight(0xffffff, 2.5, 3, Math.PI / 6, 0.5, 1);
            resumeLight.position.set(-5.8, 2.5, 0.3); // Above the resume
            resumeLight.target.position.set(-5.8, 0.50, 0.3); // Point at resume
            resumeLight.castShadow = true;
            resumeLight.shadow.mapSize.width = 512;
            resumeLight.shadow.mapSize.height = 512;
            scene.add(resumeLight);
            scene.add(resumeLight.target);

            // Add a subtle point light for ambient glow
            const glowLight = new THREE.PointLight(0xffffcc, 1.2, 1.5);
            glowLight.position.set(-5.8, 0.55, 0.3); // Just above the resume
            scene.add(glowLight);

            // Optional: Add a helper to visualize the light (remove in production)
            // const lightHelper = new THREE.SpotLightHelper(resumeLight);
            // scene.add(lightHelper);

            console.log('✅ [DEBUG] Resume texture and lighting applied');
        } catch (error) {
            console.error('❌ [DEBUG] Error applying texture:', error);
        }
    }

    return result;
}
