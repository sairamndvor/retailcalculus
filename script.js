document.addEventListener('DOMContentLoaded', function () {
  // --- NAVIGATION & UI ---
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Navbar Scroll Effect
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  if (mobileLinks) {
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // Smooth Scrolling for Hash Links (e.g., "Schedule Demo" jumping to footer)
  document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Only prevent default if it's a pure hash link on the current page
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight = navbar.offsetHeight;
          const targetPosition = targetElement.offsetTop - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });


  // --- TESTIMONIAL CAROUSEL AUTO-PLAY ---
  const slides = document.querySelectorAll('.testimonial-slide');
  // Only run if slides exist on the page
  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000; // Switch every 5 seconds

    function nextSlide() {
      // Remove active class from current
      slides[currentSlide].classList.remove('active');
      // Calculate next slide index
      currentSlide = (currentSlide + 1) % slides.length;
      // Add active class to next
      slides[currentSlide].classList.add('active');

      // Optional: If you have multiple videos, you would switch the video source here too.
      // For this demo, we keep one looping video side-by-side.
    }

    // Start the auto-switcher
    setInterval(nextSlide, slideInterval);
  }


  // --- EXISTING MODAL & FORM LOGIC (Kept for compatibility if needed) ---
  // Modal Logic
  window.openModal = function (modalId) { // Made global for inline onclick
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  window.closeModal = function (modalId) { // Made global
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
      event.target.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});