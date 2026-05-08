import * as THREE from 'three';
import gsap from 'gsap';
import { ModelRegistry } from '../utils/registry.js';
import { HotspotActions } from './hotspots.js';
import { CONFIG } from '../utils/config.js';
import { focusOnObject } from './cameraTransitions.js';

export function setupRaycaster(camera, scene) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredObject = null;
  const originalMaterials = new Map(); // Store original materials to restore them

  const onMouseMove = (event) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Intersect against only interactable objects
    const interactables = ModelRegistry.getInteractables();
    const intersects = raycaster.intersectObjects(interactables, false);

    // Filter out invisible meshes or meshes without an explicit action
    const validIntersects = intersects.filter(hit => 
      hit.object.visible && 
      hit.object.userData && 
      hit.object.userData.action
    );

    if (validIntersects.length > 0) {
      const object = validIntersects[0].object;
      
      if (hoveredObject !== object) {
        // Reset previous hovered
        if (hoveredObject) resetHover(hoveredObject);
        
        // Apply hover effect to new object
        hoveredObject = object;
        applyHover(hoveredObject);
        document.body.style.cursor = 'pointer';
      }
    } else {
      if (hoveredObject) {
        resetHover(hoveredObject);
        hoveredObject = null;
        document.body.style.cursor = 'default';
      }
    }
  };

  const onMouseClick = (event) => {
    if (hoveredObject && hoveredObject.userData && hoveredObject.userData.action) {
      const actionName = hoveredObject.userData.action;
      
      // Get the root interactive group
      const targetGroup = hoveredObject.userData.parentGroup || hoveredObject;
      
      // Focus Camera
      if (!hoveredObject.userData.isPlaceholder) {
        focusOnObject(targetGroup);
      }

      if (HotspotActions[actionName]) {
        HotspotActions[actionName](targetGroup);
      } else {
        console.warn(`Action ${actionName} not found`);
      }
    }
  };

  function applyHover(object) {
    if (!object.material) return;
    
    // Smooth Scale Hover Effect (Targeting the parent group to scale everything)
    const targetGroup = object.userData.parentGroup || object;
    if (!targetGroup.userData.isPlaceholder) {
      if (!targetGroup.userData.baseScaleVal) targetGroup.userData.baseScaleVal = targetGroup.scale.x;
      const hoverScale = targetGroup.userData.baseScaleVal * 1.05;
      gsap.to(targetGroup.scale, { x: hoverScale, y: hoverScale, z: hoverScale, duration: 0.3, ease: 'power2.out' });
    }
    
    // Store original material if not stored
    if (!originalMaterials.has(object.uuid)) {
      originalMaterials.set(object.uuid, object.material.clone());
    }
    
    // Apply highlight (emissive)
    if (object.material.emissive) {
      object.material.emissive.setHex(CONFIG.colors.hoverEmissive);
    } else if (object.material.color) {
      // Fallback for basic materials
      object.material.color.addScalar(0.2); 
    }
  }

  function resetHover(object) {
    if (!object.material) return;
    
    // Reset Smooth Scale
    const targetGroup = object.userData.parentGroup || object;
    if (!targetGroup.userData.isPlaceholder && targetGroup.userData.baseScaleVal) {
      const baseScale = targetGroup.userData.baseScaleVal;
      gsap.to(targetGroup.scale, { x: baseScale, y: baseScale, z: baseScale, duration: 0.3, ease: 'power2.out' });
    }
    
    if (originalMaterials.has(object.uuid)) {
      const orig = originalMaterials.get(object.uuid);
      if (object.material.emissive && orig.emissive) {
        object.material.emissive.copy(orig.emissive);
      } else if (object.material.color && orig.color) {
        object.material.color.copy(orig.color);
      }
    }
  }

  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('click', onMouseClick, false);

  return {
    cleanup: () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseClick);
    }
  };
}
