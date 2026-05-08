import * as THREE from 'three';
import { ShaderGlitchManager } from './shaderGlitch.js';

export const glitchMeshes = [];

export function createEnvironment(scene) {
  // Floor (Reduced from 15x15 to 11.5x11.5)
  // Left and back edges remain at -7.5, right and front edges become +4.0
  // Center is now at (-7.5 + 4.0) / 2 = -1.75
  const floorGeometry = new THREE.PlaneGeometry(11.5, 11.5);
  
  // Floor is square (11.5 x 11.5)
  const floorGlitch = new ShaderGlitchManager(1024, 1024);
  
  const floorMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x333344,
    roughness: 0.1,
    metalness: 0.5,
    transparent: true,
    opacity: 0.3,
    transmission: 0.8,
    clearcoat: 1.0,
    emissive: new THREE.Color(0xffffff), // Let the shader drive the color
    emissiveIntensity: 0.5, 
    emissiveMap: floorGlitch.texture,
    bumpMap: floorGlitch.texture, 
    bumpScale: 0.1, 
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(-1.75, 0, -1.75);
  floor.receiveShadow = true;
  floor.userData.isGlitchSurface = true;
  floor.userData.glitchManager = floorGlitch;
  scene.add(floor);
  glitchMeshes.push(floor);

  // Wall 1 (Back)
  // Back wall is 11.5 x 5 (ratio ~2.3:1)
  const backWallGlitch = new ShaderGlitchManager(1024, 512);
  
  const backWallMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x444455,
    roughness: 0.1,
    metalness: 0.5,
    transparent: true,
    opacity: 0.3,
    transmission: 0.8,
    clearcoat: 1.0,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.5,
    emissiveMap: backWallGlitch.texture,
    bumpMap: backWallGlitch.texture,
    bumpScale: 0.1,
  });
  
  const backWallGeometry = new THREE.BoxGeometry(11.5, 5, 0.5);
  const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
  backWall.position.set(-1.75, 2.5, -7.5);
  backWall.receiveShadow = true;
  backWall.userData.isGlitchSurface = true;
  backWall.userData.glitchManager = backWallGlitch;
  scene.add(backWall);
  glitchMeshes.push(backWall);

  // Wall 2 (Left)
  // Side wall is 11.5 x 5 (ratio ~2.3:1)
  const sideWallGlitch = new ShaderGlitchManager(1024, 512);
  
  const sideWallMaterial = new THREE.MeshPhysicalMaterial({ 
    color: 0x444455,
    roughness: 0.1,
    metalness: 0.5,
    transparent: true,
    opacity: 0.3,
    transmission: 0.8,
    clearcoat: 1.0,
    emissive: new THREE.Color(0xffffff),
    emissiveIntensity: 0.5,
    emissiveMap: sideWallGlitch.texture,
    bumpMap: sideWallGlitch.texture,
    bumpScale: 0.1,
  });

  const sideWallGeometry = new THREE.BoxGeometry(0.5, 5, 11.5);
  const sideWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
  sideWall.position.set(-7.5, 2.5, -1.75);
  sideWall.receiveShadow = true;
  sideWall.userData.isGlitchSurface = true;
  sideWall.userData.glitchManager = sideWallGlitch;
  scene.add(sideWall);
  glitchMeshes.push(sideWall);
}
