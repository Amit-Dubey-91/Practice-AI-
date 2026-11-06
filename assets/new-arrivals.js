/**
 * Product Grid Custom Web Component
 * <product-grid>
 */
if (!customElements.get('product-grid')) {
  class ProductGrid extends HTMLElement {
    constructor() {
      super();
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    connectedCallback() {
      this.init();
    }

    disconnectedCallback() {
      this.removeEventListener('keydown', this.handleKeyDown);
    }

    init() {
      // Accessibility attributes
      this.setAttribute('role', 'region');
      if (!this.getAttribute('aria-label')) {
        this.setAttribute('aria-label', 'Product Grid');
      }

      // Keyboard navigation for horizontal scroll on mobile
      this.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
      if (window.innerWidth > 767) return;

      if (event.key === 'ArrowRight') {
        this.scrollBy({ left: 200, behavior: 'smooth' });
      } else if (event.key === 'ArrowLeft') {
        this.scrollBy({ left: -200, behavior: 'smooth' });
      }
    }
  }

  customElements.define('product-grid', ProductGrid);
}

// Support Theme Editor live reloads
document.addEventListener('shopify:section:load', (event) => {
  if (event.target && event.target.querySelector('product-grid')) {
    const grids = event.target.querySelectorAll('product-grid');
    grids.forEach((grid) => {
      if (typeof grid.init === 'function') {
        grid.init();
      }
    });
  }
});
