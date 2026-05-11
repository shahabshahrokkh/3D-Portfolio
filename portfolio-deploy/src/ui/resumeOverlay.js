import gsap from 'gsap';
import { disableControls, enableControls } from '../utils/controlsManager.js';

let isOpen = false;

function buildOverlay() {
  if (document.getElementById('resume-overlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'resume-overlay';
  overlay.innerHTML = `
    <div class="ro-backdrop" id="ro-backdrop"></div>
    <div class="ro-container">
      <div class="ro-card" id="ro-card">
        <div class="ro-icon">📄</div>
        
        <div class="ro-preview">
          <iframe 
            src="/SH.SH-Resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
            class="ro-pdf-preview"
            title="Resume Preview"
          ></iframe>
        </div>

        <div class="ro-actions">
          <a href="/SH.SH-Resume.pdf" target="_blank" class="ro-action-btn view">
            <div class="ro-btn-icon">👁️</div>
            <span>View</span>
          </a>
          <a href="/SH.SH-Resume.pdf" download="SH.SH-Resume.pdf" class="ro-action-btn download">
            <div class="ro-btn-icon">⬇️</div>
            <span>Download</span>
          </a>
        </div>

        <div class="ro-dialer">
          <button class="ro-close-btn" id="ro-close-btn">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    #resume-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
    }

    .ro-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 10, 15, 0.7);
      backdrop-filter: blur(8px);
    }

    .ro-container {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 500px;
      padding: 0 20px;
    }

    .ro-card {
      background: rgba(30, 30, 40, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 36px;
      padding: 24px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
    }

    .ro-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 32px;
      animation: float 3s ease-in-out infinite;
      z-index: 10;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    .ro-preview {
      width: 100%;
      height: 550px;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom: 24px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .ro-pdf-preview {
      width: 100%;
      height: 100%;
      border: none;
      background: white;
    }

    .ro-actions {
      display: flex;
      gap: 20px;
      margin-bottom: 24px;
      width: 100%;
      justify-content: center;
    }

    .ro-action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: #fff;
      text-decoration: none;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      opacity: 0.8;
      transition: all 0.2s;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      position: relative;
      z-index: 10;
    }

    .ro-action-btn:hover,
    .ro-action-btn:active {
      opacity: 1;
      transform: translateY(-2px);
    }

    .ro-btn-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background: rgba(255, 255, 255, 0.1);
    }

    .ro-action-btn.view .ro-btn-icon {
      background: rgba(52, 152, 219, 0.2);
      color: #3498db;
    }

    .ro-action-btn.download .ro-btn-icon {
      background: rgba(52, 199, 89, 0.2);
      color: #34c759;
    }

    .ro-dialer {
      display: flex;
      justify-content: center;
      margin-top: auto;
    }

    .ro-close-btn {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, filter 0.2s;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      position: relative;
      z-index: 10;
      touch-action: manipulation;
      background: #ff3b30;
      box-shadow: 0 8px 24px rgba(255, 59, 48, 0.4);
    }

    .ro-close-btn:hover,
    .ro-close-btn:active {
      transform: scale(1.05);
      filter: brightness(1.1);
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .ro-container {
        max-width: 90%;
        padding: 0 15px;
      }

      .ro-card {
        padding: 20px;
        border-radius: 28px;
      }

      .ro-icon {
        font-size: 28px;
        top: 16px;
        right: 16px;
      }

      .ro-preview {
        height: 450px;
      }

      .ro-actions {
        gap: 24px; /* Increased gap for easier tapping */
        margin-bottom: 24px;
      }

      .ro-action-btn {
        font-size: 12px;
        /* Larger touch target */
        padding: 8px;
      }

      .ro-btn-icon {
        width: 56px; /* Larger for easier tapping */
        height: 56px;
        font-size: 22px;
      }

      .ro-close-btn {
        width: 72px; /* Larger for easier tapping */
        height: 72px;
      }
    }

    @media (max-width: 480px) {
      .ro-card {
        padding: 16px;
        border-radius: 24px;
      }

      .ro-icon {
        font-size: 24px;
        top: 12px;
        right: 12px;
      }

      .ro-preview {
        height: 380px;
      }

      .ro-actions {
        gap: 20px;
      }

      .ro-btn-icon {
        width: 52px;
        height: 52px;
        font-size: 20px;
      }

      .ro-close-btn {
        width: 64px;
        height: 64px;
      }
    }
  `;
  document.head.appendChild(style);

  // Event listeners
  document.getElementById('ro-backdrop').addEventListener('click', () => {
    toggleResumeUI(false);
  });

  document.getElementById('ro-close-btn').addEventListener('click', () => {
    toggleResumeUI(false);
  });

  // Close after clicking view or download (with delay)
  const actionBtns = document.querySelectorAll('.ro-action-btn');
  actionBtns.forEach(btn => {
    const handleInteraction = () => {
      setTimeout(() => toggleResumeUI(false), 500);
    };

    btn.addEventListener('click', handleInteraction);

    // Add touch support for mobile
    if ('ontouchstart' in window) {
      btn.addEventListener('touchend', (e) => {
        // Let the link work naturally
      }, { passive: true });
    }
  });
}

export function toggleResumeUI(show) {
  if (show === isOpen) return;

  if (show) {
    buildOverlay();
    isOpen = true;

    // Disable 3D scene interactions
    disableControls();

    const overlay = document.getElementById('resume-overlay');
    overlay.style.display = 'flex';

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo('#ro-card', { y: 100, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' });
  } else {
    const overlay = document.getElementById('resume-overlay');
    if (!overlay) return;

    gsap.to('#ro-card', { y: 50, scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(overlay, {
      opacity: 0, duration: 0.3, onComplete: () => {
        overlay.style.display = 'none';
        isOpen = false;

        // Re-enable 3D scene interactions
        enableControls();

        // Reveal the Resume label above the brochure
        window.dispatchEvent(new CustomEvent('reveal-spatial-label', { detail: { modelName: 'resume' } }));
      }
    });
  }
}
