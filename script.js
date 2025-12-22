document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.9)';
      navbar.style.boxShadow = 'none';
    }
  });

  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.mission-card, .product-card, .team-card, .quote-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .nav-links.active {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      padding: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      gap: 16px;
    }
    
    .nav-links.active .nav-cta {
      text-align: center;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
          button.disabled = false;
          contactForm.reset();
        }, 2000);
      }, 1000);
    });
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  const animateStats = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const text = target.textContent;
        const num = parseInt(text);
        
        if (!isNaN(num) && !target.classList.contains('animated')) {
          target.classList.add('animated');
          let current = 0;
          const increment = num / 30;
          const suffix = text.replace(/[0-9]/g, '');
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              target.textContent = num + suffix;
              clearInterval(timer);
            } else {
              target.textContent = Math.floor(current) + suffix;
            }
          }, 50);
        }
      }
    });
  };

  const statsObserver = new IntersectionObserver(animateStats, { threshold: 0.5 });
  statNumbers.forEach(stat => statsObserver.observe(stat));
});
