import * as THREE from 'three';
import { ModelRegistry } from '../utils/registry.js';

export function setupDragControls(camera, controls) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  // A mathematical plane at Y=0 (floor) to intersect with
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  
  let isDragging = false;
  let dragObject = null; // This will be the root group (finalObject/wrapper)
  let dragOffset = new THREE.Vector3();
  let dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  
  // For smoothing (inertia)
  let targetPosition = new THREE.Vector3();
  let isHoveringDraggable = false;

  function findDragRoot(mesh) {
    // Walk up to find the root draggable group via parentGroup
    if (mesh.userData.parentGroup && mesh.userData.parentGroup.userData.draggable) {
      return mesh.userData.parentGroup;
    }
    // Fallback: walk up the tree
    let current = mesh;
    while (current.parent && current.parent.type !== 'Scene') {
      current = current.parent;
      if (current.userData && current.userData.draggable) {
        return current;
      }
    }
    // If nothing found, return the mesh itself
    return mesh;
  }

  const onMouseDown = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const draggables = ModelRegistry.getDraggables();
    if (draggables.length === 0) return;

    const intersects = raycaster.intersectObjects(draggables, true);
    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const rootGroup = findDragRoot(hitMesh);

      isDragging = true;
      dragObject = rootGroup;
      controls.enabled = false; // Disable camera orbit
      
      // Update the drag plane to match the object's current Y position
      dragPlane.constant = -dragObject.position.y;

      // Calculate offset between click point on the plane and object position
      const planeHit = new THREE.Vector3();
      const didHit = raycaster.ray.intersectPlane(dragPlane, planeHit);
      if (didHit) {
        dragOffset.copy(dragObject.position).sub(planeHit);
        targetPosition.copy(dragObject.position);
        document.body.style.cursor = 'grabbing';
      } else {
        isDragging = false;
        dragObject = null;
        controls.enabled = true;
      }
      
      // Prevent the event from propagating to orbit controls
      event.stopPropagation();
    }
  };

  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    
    if (isDragging && dragObject) {
      const intersectionPoint = new THREE.Vector3();
      const hit = raycaster.ray.intersectPlane(dragPlane, intersectionPoint);
      
      if (hit) {
        targetPosition.x = intersectionPoint.x + dragOffset.x;
        targetPosition.z = intersectionPoint.z + dragOffset.z;
        targetPosition.y = dragObject.position.y; // Keep Y constant
        
        // Physical constraints based on object
        if (dragObject.name === 'chair') {
          // Chair must stay inside the room boundaries [-7.0, 3.5]
          targetPosition.x = Math.max(-7.0, Math.min(3.5, targetPosition.x));
          targetPosition.z = Math.max(-7.0, Math.min(3.5, targetPosition.z));
        } else if (dragObject.name === 'astronaut') {
          // Astronaut must stay outside the room (walls are at X=-7.5, Z=-7.5)
          // Let's prevent it from entering X > -8.0 && Z > -8.0
          if (targetPosition.x > -8.0 && targetPosition.z > -8.0) {
            // Push it to the closest valid region
            if (targetPosition.x - (-8.0) < targetPosition.z - (-8.0)) {
              targetPosition.x = -8.0;
            } else {
              targetPosition.z = -8.0;
            }
          }
          // Also, keep it above the floor (Y >= 0 is default since it's floating at Y=3, but let's constrain horizontally)
          // Prevent it from drifting infinitely away
          targetPosition.x = Math.max(-20, Math.min(20, targetPosition.x));
          targetPosition.z = Math.max(-20, Math.min(20, targetPosition.z));
        }
      }
    } else {
      // Hover detection for cursor feedback
      const draggables = ModelRegistry.getDraggables();
      if (draggables.length > 0) {
        const intersects = raycaster.intersectObjects(draggables, true);
        if (intersects.length > 0) {
          if (!isHoveringDraggable) {
            isHoveringDraggable = true;
            document.body.style.cursor = 'grab';
          }
        } else {
          if (isHoveringDraggable) {
            isHoveringDraggable = false;
            // Don't reset cursor here - let raycaster handle it
          }
        }
      }
    }
  };

  const onMouseUp = () => {
    if (isDragging) {
      isDragging = false;
      dragObject = null;
      controls.enabled = true;
      document.body.style.cursor = isHoveringDraggable ? 'grab' : 'default';
    }
  };

  // Use capture phase so drag events fire BEFORE orbit controls
  window.addEventListener('mousedown', onMouseDown, true);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('mouseup', onMouseUp, false);

  return {
    update: () => {
      // Smooth lerp for inertia/rolling effect
      if (isDragging && dragObject) {
        dragObject.position.lerp(targetPosition, 0.12);
      }
    },
    cleanup: () => {
      window.removeEventListener('mousedown', onMouseDown, true);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  };
}
