import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function setupScene() {
  const container = document.getElementById('app');

  // Scene setup
  const scene = new THREE.Scene();
  // We leave scene.background as null so it is transparent to show the Spline background


  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000 // Increased far plane to see the massive Earth in the background
  );
  // Position camera to look at the center of the room
  camera.position.set(4, 3, 6);
  camera.lookAt(0, 0, 0);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
  container.appendChild(renderer.domElement);

  // OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera from going under the floor
  controls.minDistance = 2;
  controls.maxDistance = 12;

  // Lighting
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444455, 0.4);
  hemisphereLight.position.set(0, 10, 0);
  scene.add(hemisphereLight);

  const directionalLight = new THREE.DirectionalLight(0xffeedd, 1.2);
  directionalLight.position.set(8, 12, 4);
  directionalLight.castShadow = true;
  
  // Optimize shadow map
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.bias = -0.0005; // Less acne
  directionalLight.shadow.mapSize.width = 2048; // Higher res shadow
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });


  return { scene, camera, renderer, controls };
}
