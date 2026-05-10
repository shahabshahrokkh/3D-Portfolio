import gsap from 'gsap';
import * as THREE from 'three';

let globalCamera, globalControls;

export function setupCameraTransitions(camera, controls) {
  globalCamera = camera;
  globalControls = controls;
}

export function focusOnObject(object) {
  if (!globalCamera || !globalControls) return;

  // Calculate target position based on object bounding box
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  box.getCenter(center);
  const size = new THREE.Vector3();
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z);
  
  // Target position for controls (look at center of object)
  const targetControl = center.clone();
  
  // Target position for camera (offset based on size to frame it nicely)
  // We'll move the camera slightly up and back from the object's front
  const offset = new THREE.Vector3(0, maxDim * 0.8, maxDim * 2.0);
  
  // Optionally, we could calculate the offset based on current camera direction to maintain angle,
  // but a fixed offset or an offset rotated by the object's rotation is usually cleaner.
  const targetCamera = center.clone().add(offset);

  // Tween controls target
  gsap.to(globalControls.target, {
    x: targetControl.x,
    y: targetControl.y,
    z: targetControl.z,
    duration: 1.2,
    ease: 'power3.inOut'
  });

  // Tween camera position
  gsap.to(globalCamera.position, {
    x: targetCamera.x,
    y: targetCamera.y,
    z: targetCamera.z,
    duration: 1.2,
    ease: 'power3.inOut'
  });
}
