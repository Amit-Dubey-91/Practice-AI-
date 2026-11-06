/**
 * Testimonials Slider Component
 * <testimonials-slider>
 */
if (!customElements.get('testimonials-slider')) {
  class TestimonialsSlider extends HTMLElement {
    constructor() {
      super();
      this.handlePrev = this.handlePrev.bind(this);
      this.handleNext = this.handleNext.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    connectedCallback() {
      this.init();
    }

    disconnectedCallback() {
      if (this.prevBtn) this.prevBtn.removeEventListener('click', this.handlePrev);
      if (this.nextBtn) this.nextBtn.removeEventListener('click', this.handleNext);
      if (this.track) {
        this.track.removeEventListener('scroll', this.handleScroll);
        this.track.removeEventListener('keydown', this.handleKeyDown);
      }
    }

    init() {
      this.section = this.closest('.testimonials');
      this.track = this.querySelector('[data-track]');
      if (!this.track) return;

      if (this.section) {
        this.prevBtn = this.section.querySelector('[data-direction="prev"]');
        this.nextBtn = this.section.querySelector('[data-direction="next"]');
      }

      if (this.prevBtn) this.prevBtn.addEventListener('click', this.handlePrev);
      if (this.nextBtn) this.nextBtn.addEventListener('click', this.handleNext);

      this.track.addEventListener('scroll', this.debounce(this.handleScroll, 50));
      this.track.addEventListener('keydown', this.handleKeyDown);

      this.updateButtonStates();
    }

    getCardScrollDistance() {
      const firstCard = this.track.querySelector('.testimonials__card');
      if (!firstCard) return 300;
      const style = window.getComputedStyle(this.track);
      const gap = parseFloat(style.columnGap || style.gap || 20);
      return firstCard.offsetWidth + gap;
    }

    handlePrev() {
      const distance = this.getCardScrollDistance();
      this.track.scrollBy({ left: -distance, behavior: 'smooth' });
    }

    handleNext() {
      const distance = this.getCardScrollDistance();
      this.track.scrollBy({ left: distance, behavior: 'smooth' });
    }

    handleScroll() {
      this.updateButtonStates();
    }

    handleKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        this.handlePrev();
      } else if (event.key === 'ArrowRight') {
        this.handleNext();
      }
    }

    updateButtonStates() {
      if (!this.track || !this.prevBtn || !this.nextBtn) return;
      const maxScroll = this.track.scrollWidth - this.track.clientWidth;
      const atStart = this.track.scrollLeft <= 4;
      const atEnd = this.track.scrollLeft >= maxScroll - 4;

      this.prevBtn.disabled = atStart;
      this.nextBtn.disabled = atEnd;
    }

    debounce(fn, wait) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
      };
    }
  }

  customElements.define('testimonials-slider', TestimonialsSlider);
}

// Re-init on Shopify theme editor reloads
document.addEventListener('shopify:section:load', (event) => {
  if (event.target && event.target.querySelector('testimonials-slider')) {
    const sliders = event.target.querySelectorAll('testimonials-slider');
    sliders.forEach((slider) => {
      if (typeof slider.init === 'function') {
        slider.init();
      }
    });
  }
});

