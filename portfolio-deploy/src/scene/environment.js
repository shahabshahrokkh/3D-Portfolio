import * as THREE from 'three';
import { ShaderGlitchManager } from './shaderGlitch.js';

export const glitchMeshes = [];

export function createEnvironment(scene) {
  // Floor (Reduced from 15x15 to 11.5x11.5)
  const floorGeometry = new THREE.PlaneGeometry(11.5, 11.5);
  
  const floorGlitch = new ShaderGlitchManager(1024, 1024);
  
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x1a1a24,
    roughness: 0.8,
    metalness: 0.2,
    transparent: false,
    emissive: new THREE.Color(0x000000),
  });
  
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(-1.75, 0, -1.75);
  floor.receiveShadow = true;
  floor.userData.isGlitchSurface = true;
  floor.userData.glitchManager = floorGlitch;
  scene.add(floor);
  glitchMeshes.push(floor);

  // 1. Premium Frosted Glass Material
  // MeshStandardMaterial is used instead of MeshPhysicalMaterial with transmission
  // because transmission + bloom causes severe ghosting artifacts.
  // This frosted approach gives the glass feel without the ghost doubling.
  const glassWallMaterial = new THREE.MeshStandardMaterial({
    color: 0x8ab4d4,       // Slight blue-gray tint (feels like glass)
    metalness: 0.05,
    roughness: 0.6,        // Frosted / matte — eliminates sharp reflections
    transparent: true,
    opacity: 0.18,         // Very subtle presence, mostly see-through
    depthWrite: false,     // Prevents z-fighting with objects behind glass
    side: THREE.FrontSide,
  });

  // Wall 1 (Back) — no glitch (saves GPU shader passes)
  const backWallGeometry = new THREE.BoxGeometry(11.5, 5, 0.1);
  const backWall = new THREE.Mesh(backWallGeometry, glassWallMaterial.clone());
  backWall.position.set(-1.75, 2.5, -7.5);
  backWall.receiveShadow = false;
  scene.add(backWall);

  // Wall 2 (Left) — no glitch
  const sideWallGeometry = new THREE.BoxGeometry(0.1, 5, 11.5);
  const sideWall = new THREE.Mesh(sideWallGeometry, glassWallMaterial.clone());
  sideWall.position.set(-7.5, 2.5, -1.75);
  sideWall.receiveShadow = false;
  scene.add(sideWall);

  // Keep a very soft fill light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  // Add Dust Particles — returns updater to be called from main render loop
  return createDustParticles(scene);
}

// Exported so main.js can call it inside the existing render loop
export function updateDustParticles(time) {
  if (_dustParticles) {
    const pos = _dustParticles.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] -= 0.0015;
      if (pos[i + 1] < 0) pos[i + 1] = 8;
      pos[i] += Math.sin(time + i) * 0.0008;
    }
    _dustParticles.geometry.attributes.position.needsUpdate = true;
  }
}

let _dustParticles = null;

function createDustParticles(scene) {
  const COUNT = 600; // reduced from 1500
  const vertices = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    vertices[i * 3]     = Math.random() * 18 - 9;
    vertices[i * 3 + 1] = Math.random() * 8;
    vertices[i * 3 + 2] = Math.random() * 18 - 9;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false, // Prevents z-sort issues with transparent objects
  });

  _dustParticles = new THREE.Points(geometry, material);
  scene.add(_dustParticles);
  // No separate requestAnimationFrame — updated from main render loop
}
