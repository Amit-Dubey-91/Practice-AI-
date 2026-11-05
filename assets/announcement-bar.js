/**
 * Announcement Bar Component Behavior
 * Handles dismissal and Shopify Theme Editor events safely.
 */
(() => {
  const STORAGE_KEY = 'shop_co_announcement_dismissed';

  function initAnnouncementBar(section) {
    if (!section) return;

    const closeBtn = section.querySelector('[data-announcement-close]');
    if (!closeBtn) return;

    // Check if dismissed in this session (ignore inside Shopify theme editor)
    const isEditor = window.Shopify && window.Shopify.designMode;
    if (!isEditor && sessionStorage.getItem(STORAGE_KEY) === 'true') {
      section.classList.add('is-dismissed');
      return;
    }

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      section.classList.add('is-dismissed');
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch (err) {
        // Handle storage quota or private browsing exceptions safely
      }
    });
  }

  function setup() {
    document.querySelectorAll('.announcement-bar-section').forEach(initAnnouncementBar);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  // Shopify Theme Editor lifecycle re-init
  document.addEventListener('shopify:section:load', (e) => {
    const section = e.target.querySelector('.announcement-bar-section') || (e.target.classList.contains('announcement-bar-section') ? e.target : null);
    if (section) {
      section.classList.remove('is-dismissed');
      initAnnouncementBar(section);
    }
  });

  document.addEventListener('shopify:section:select', (e) => {
    const section = e.target.querySelector('.announcement-bar-section') || (e.target.classList.contains('announcement-bar-section') ? e.target : null);
    if (section) {
      section.classList.remove('is-dismissed');
    }
  });
})();
