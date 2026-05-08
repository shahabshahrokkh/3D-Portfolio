import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function setupScene() {
  const container = document.getElementById('app');

  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;

  // Scene setup
  const scene = new THREE.Scene();
  // We leave scene.background as null so it is transparent to show the Spline background


  // Camera setup - Adjust FOV for mobile
  const camera = new THREE.PerspectiveCamera(
    isMobile ? 60 : 45, // Wider FOV on mobile for better view
    window.innerWidth / window.innerHeight,
    0.1,
    1000 // Increased far plane to see the massive Earth in the background
  );
  // Position camera to look at the center of the room - Further back on mobile
  camera.position.set(isMobile ? 5 : 4, isMobile ? 4 : 3, isMobile ? 8 : 6);
  camera.lookAt(0, 0, 0);

  // Renderer setup - Optimize for mobile
  const renderer = new THREE.WebGLRenderer({
    antialias: !isMobile, // Disable antialiasing on mobile for performance
    alpha: true,
    powerPreference: isMobile ? 'low-power' : 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Limit pixel ratio on mobile to improve performance
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.shadowMap.enabled = !isMobile; // Disable shadows on mobile
  if (!isMobile) {
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
  }
  container.appendChild(renderer.domElement);

  // OrbitControls - Adjust for mobile
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = isMobile ? 0.1 : 0.05; // Faster damping on mobile
  controls.maxPolarAngle = Math.PI / 2 - 0.05; // Prevent camera from going under the floor
  controls.minDistance = isMobile ? 3 : 2;
  controls.maxDistance = isMobile ? 15 : 12;

  // Touch-specific settings
  if (isMobile) {
    controls.rotateSpeed = 0.5; // Slower rotation on touch
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 0.5;
    controls.enablePan = true; // Enable two-finger pan on mobile
  }

  // Lighting - Optimize for mobile
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444455, 0.4);
  hemisphereLight.position.set(0, 10, 0);
  scene.add(hemisphereLight);

  const directionalLight = new THREE.DirectionalLight(0xffeedd, 1.2);
  directionalLight.position.set(8, 12, 4);
  directionalLight.castShadow = !isMobile; // Disable shadows on mobile

  if (!isMobile) {
    // Optimize shadow map for desktop only
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.bias = -0.0005; // Less acne
    directionalLight.shadow.mapSize.width = 2048; // Higher res shadow
    directionalLight.shadow.mapSize.height = 2048;
  }
  scene.add(directionalLight);

  // Handle window resize with debouncing for performance
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newIsMobile = window.innerWidth < 768;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Update pixel ratio on resize
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, newIsMobile ? 1.5 : 2));
    }, 100);
  });


  return { scene, camera, renderer, controls, isMobile };
}
