import { openProjects } from '../ui/projectsOverlay.js';
import { triggerWhiteboardAnimation } from '../animations/whiteboardAnim.js';
import { toggleContactUI } from '../ui/contactOverlay.js';
import { ModelRegistry } from '../utils/registry.js';
import { focusOnObject } from './cameraTransitions.js';
import { startPhoneRinging } from '../objects/iphone.js';

// Scene ref — set by main.js after init
let _scene = null;
export function setHotspotScene(scene) { _scene = scene; }

export const HotspotActions = {
  openProjects: () => {
    openProjects();
  },
  openAbout: () => {
    showUI('About Me - Coming Soon!');
  },
  openSkills: () => {
    showUI('Skills - Coming Soon!');
  },
  playCatAnimation: () => {
    showUI('Meow! 🐱');
    window.dispatchEvent(new CustomEvent('triggerCatAction'));
  },
  openWhiteboard: () => {
    triggerWhiteboardAnimation(_scene);
    // Reveal the About Me label above the whiteboard
    window.dispatchEvent(new CustomEvent('reveal-spatial-label', { detail: { modelName: 'whiteboard' } }));
  },
  playArcade: () => {
    showUI('🕹️ Arcade - Click the screen to play!');
    window.dispatchEvent(new CustomEvent('activateArcade'));
  },
  openLink: (object) => {
    if (object && object.userData && object.userData.url) {
      window.open(object.userData.url, '_blank');
    }
  },
  toggleWindow: (object) => {
    showUI('Window action (future interactive logic)');
    // Debug removed for production
  },
  callIphone: (object) => {
    const userData = object?.userData;
    if (!userData || !userData.isActive) return;
    const iphoneModel = ModelRegistry.getModel('iphone');
    if (iphoneModel) {
      // Start ringing effect
      startPhoneRinging();
      // Focus the iPhone
      focusOnObject(iphoneModel);
      setTimeout(() => {
        // After focusing iPhone, open the Contact UI
        toggleContactUI(true);
      }, 1200); // Wait for camera transition duration
    }
  },
  openContact: () => {
    toggleContactUI(true);
  },
  focusBookshelf: () => {
    showUI('📚 Programming Languages');
    // Reveal the Skills label above the bookshelf
    window.dispatchEvent(new CustomEvent('reveal-spatial-label', { detail: { modelName: 'bookshelf' } }));
  },
  focusShelves: (object) => {
    showUI('🖼️ My Photo Frame');
    focusOnObject(object);
  }
};

function showUI(text) {
  const ui = document.getElementById('action-ui');
  if (ui) {
    ui.innerText = text;
    ui.style.display = 'block';
    if (ui.timeoutId) clearTimeout(ui.timeoutId);
    ui.timeoutId = setTimeout(() => {
      ui.style.display = 'none';
    }, 3000);
  }
  // Debug removed for production
}
