/**
 * Header Section Controller
 * Handles mobile drawer, expandable mobile search, sticky header shadows, and accessibility.
 */
document.addEventListener('DOMContentLoaded', () => {
  const headerWrapper = document.querySelector('.site-header-wrapper');
  if (!headerWrapper) return;

  const menuToggle = headerWrapper.querySelector('[data-mobile-menu-toggle]');
  const drawer = headerWrapper.querySelector('[data-mobile-drawer]');
  const drawerBackdrop = headerWrapper.querySelector('[data-drawer-backdrop]');
  const drawerClose = headerWrapper.querySelector('[data-drawer-close]');

  const searchToggle = headerWrapper.querySelector('[data-mobile-search-toggle]');
  const searchContainer = headerWrapper.querySelector('[data-header-search]');
  const searchInput = headerWrapper.querySelector('.site-header__search-input');
  const searchClose = headerWrapper.querySelector('[data-mobile-search-close]');

  // --- Sticky Header Scroll Shadow ---
  const handleScroll = () => {
    if (window.scrollY > 10) {
      headerWrapper.classList.add('is-scrolled');
    } else {
      headerWrapper.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile Drawer Controls ---
  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('is-active');
    if (drawerBackdrop) drawerBackdrop.classList.add('is-active');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (drawerClose) drawerClose.focus();
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('is-active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('is-active');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', openDrawer);
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // --- Mobile Search Toggle ---
  const openSearch = () => {
    if (!searchContainer) return;
    searchContainer.classList.add('is-open');
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'true');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  };

  const closeSearch = () => {
    if (!searchContainer) return;
    searchContainer.classList.remove('is-open');
    if (searchToggle) {
      searchToggle.setAttribute('aria-expanded', 'false');
      searchToggle.focus();
    }
  };

  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      const isOpen = searchContainer.classList.contains('is-open');
      if (isOpen) {
        closeSearch();
      } else {
        openSearch();
      }
    });
  }

  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }

  // --- Keyboard (ESC) & Click Outside Handlers ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (drawer && drawer.classList.contains('is-active')) {
        closeDrawer();
      }
      if (searchContainer && searchContainer.classList.contains('is-open')) {
        closeSearch();
      }
      // Close any open desktop details dropdowns
      headerWrapper.querySelectorAll('details[open]').forEach((detail) => {
        detail.removeAttribute('open');
      });
    }
  });

  // Close desktop details dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!headerWrapper.contains(e.target)) {
      headerWrapper.querySelectorAll('details[open]').forEach((detail) => {
        detail.removeAttribute('open');
      });
    }
  });
});

