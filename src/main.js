import * as THREE from 'three';
import { setupScene } from './scene/setup.js';
import { createEnvironment, glitchMeshes } from './scene/environment.js';
import { initCosmicEnvironment, updateCosmicEnvironment } from './scene/cosmic.js';
import { setupRaycaster } from './interactions/raycaster.js';
import { setupAnimations, updateAnimations } from './animations/idle.js';
import { setupCameraTransitions } from './interactions/cameraTransitions.js';
import { setupDragControls } from './interactions/dragControls.js';
import { setupArcadeInteraction } from './interactions/arcadeInteraction.js';

import { initLaptop } from './objects/laptop.js';
import { initBed } from './objects/bed.js';
import { initDesk } from './objects/desk.js';
import { initChair } from './objects/chair.js';
import { initCat } from './objects/cat.js';
import { initWhiteboard } from './objects/whiteboard.js';
import { initMemos } from './objects/memos.js';
import { initArcade, updateArcade } from './objects/arcade.js';
import { initIphone } from './objects/iphone.js';
import { initShelves } from './objects/shelves.js';
import { initCarpet } from './objects/carpet.js';
import { initMonitor } from './objects/monitor.js';
import { initMouseKeyboard } from './objects/mouseKeyboard.js';
import { initWindows } from './objects/window.js';
import { setHotspotScene } from './interactions/hotspots.js';
import { initAstronaut, updateAstronaut } from './objects/astronaut.js';
import { setupEarth, updateEarth } from './scene/earth.js';

// UI Styles
import './ui/controls.css';

function init() {
  const { scene, camera, renderer, controls } = setupScene();

  // Load environment
  createEnvironment(scene);

  // Enable camera to see Layer 1 (Earth layer) in addition to Layer 0
  camera.layers.enable(1);

  // Setup Cosmic Environment (Stars & Meteors)
  initCosmicEnvironment(scene);

  // Setup Earth Background
  setupEarth(scene);

  // Load objects asynchronously (they handle their own placeholders)
  initDesk(scene);
  initChair(scene);
  initBed(scene);
  initLaptop(scene);
  initIphone(scene);
  initCat(scene);
  initWhiteboard(scene);
  initMemos(scene);
  initArcade(scene, camera, renderer);
  initShelves(scene);
  initCarpet(scene);
  initMonitor(scene);
  initMouseKeyboard(scene);
  initWindows(scene);
  initAstronaut(scene);

  // Pass scene to hotspots so whiteboard animation can add canvas plane
  setHotspotScene(scene);

  // Setup Interaction, Animation, and Camera Transitions
  setupRaycaster(camera, scene);
  const dragControls = setupDragControls(camera, controls);
  setupAnimations(scene);
  setupCameraTransitions(camera, controls);
  setupArcadeInteraction(camera);
  
  // UI Controls
  const resetBtn = document.getElementById('reset-view-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      controls.reset();
    });
  }

  // Setup Glitch Raycaster
  const glitchRaycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    glitchRaycaster.setFromCamera(mouse, camera);
    const intersects = glitchRaycaster.intersectObjects(glitchMeshes);
    if (intersects.length > 0) {
      const hit = intersects[0];
      if (hit.uv && hit.object.userData.glitchManager) {
        hit.object.userData.glitchManager.setHover(hit.uv.x, hit.uv.y);
      }
    }
  });

  // Animation clock
  const clock = new THREE.Clock();

  // Render loop
  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    controls.update(); // required if damping enabled
    dragControls.update();
    updateAnimations();
    updateArcade(time);
    updateCosmicEnvironment(time);
    updateEarth(time);
    updateAstronaut(time);
    glitchMeshes.forEach(mesh => {
      if (mesh.userData.glitchManager) mesh.userData.glitchManager.update(renderer, time);
    });
    
    renderer.render(scene, camera);
  }

  animate();
}

// Start application
init();

// Force full reload on HMR to prevent scene duplication/cache issues
if (import.meta.hot) {
  import.meta.hot.on('vite:beforeUpdate', () => {
    window.location.reload();
  });
}
