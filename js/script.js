/* =========================================
   Sua Casa - JavaScript
   ========================================= */

// ==========================================
// Navigation
// ==========================================
const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

// Sticky header on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  updateActiveNavLink();
  updateBackToTop();
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  // Animate hamburger icon
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (link) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ==========================================
// Search Box Tabs
// ==========================================
const searchTabs = document.querySelectorAll('.search-box__tab');

searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ==========================================
// Property Search Function
// ==========================================
function searchProperties() {
  const location = document.getElementById('searchLocation').value.toLowerCase().trim();
  const type = document.getElementById('searchType').value;
  const priceRange = document.getElementById('searchPrice').value;

  // Scroll to properties section
  const propertiesSection = document.getElementById('imoveis');
  if (propertiesSection) {
    propertiesSection.scrollIntoView({ behavior: 'smooth' });
  }

  // Filter properties
  setTimeout(() => {
    const cards = document.querySelectorAll('.property-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cardType = card.getAttribute('data-type');
      const cardLocation = card.querySelector('.property-card__location').textContent.toLowerCase();
      const cardPriceText = card.querySelector('.property-card__price').textContent;
      const cardPrice = parseFloat(cardPriceText.replace(/[^0-9.]/g, '').replace(/\./g, '')) || 0;

      let show = true;

      // Filter by type
      if (type && cardType !== type) {
        show = false;
      }

      // Filter by location
      if (location && !cardLocation.includes(location)) {
        show = false;
      }

      // Filter by price range (simplified)
      if (priceRange && show) {
        const [min, max] = priceRange.split('-').map(p => parseFloat(p) * 1000 || Infinity);
        if (cardPrice < min || (max !== Infinity && cardPrice > max)) {
          show = false;
        }
      }

      if (show) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (type) {
      const matchingFilter = document.querySelector(`.filter-btn[data-filter="${type}"]`);
      if (matchingFilter) matchingFilter.classList.add('active');
    } else {
      document.querySelector('.filter-btn[data-filter="todos"]').classList.add('active');
    }
  }, 400);
}

// ==========================================
// Property Filter Buttons
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    const cards = document.querySelectorAll('.property-card');

    cards.forEach(card => {
      const cardType = card.getAttribute('data-type');

      if (filter === 'todos' || cardType === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ==========================================
// Favorite Button Toggle
// ==========================================
const favoriteButtons = document.querySelectorAll('.property-card__favorite');

favoriteButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isFavorite = btn.classList.toggle('active');
    btn.textContent = isFavorite ? '♥' : '♡';
    btn.style.color = isFavorite ? '#e53e3e' : '';
  });
});

// ==========================================
// Contact Form Validation & Submission
// ==========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  let valid = true;

  // Clear previous errors
  clearError('name');
  clearError('email');
  clearError('phone');
  clearError('message');

  // Validate name
  if (!name.value.trim() || name.value.trim().length < 3) {
    showError('name', 'Por favor, informe seu nome completo (mínimo 3 caracteres).');
    valid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    showError('email', 'Por favor, informe um e-mail válido.');
    valid = false;
  }

  // Validate phone
  const phoneClean = phone.value.replace(/\D/g, '');
  if (!phoneClean || phoneClean.length < 10) {
    showError('phone', 'Por favor, informe um telefone válido com DDD.');
    valid = false;
  }

  // Validate message
  if (!message.value.trim() || message.value.trim().length < 10) {
    showError('message', 'Por favor, escreva uma mensagem (mínimo 10 caracteres).');
    valid = false;
  }

  if (valid) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Enviando...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
      openModal();
    }, 1500);
  }
});

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (field) field.classList.add('error');
  if (error) error.textContent = message;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (field) field.classList.remove('error');
  if (error) error.textContent = '';
}

// Phone input mask
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', () => {
    let value = phoneInput.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    phoneInput.value = value;
  });
}

// ==========================================
// Modal
// ==========================================
function openModal() {
  const modal = document.getElementById('successModal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('successModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ==========================================
// Back to Top Button
// ==========================================
const backToTopBtn = document.getElementById('backToTop');

function updateBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// Scroll Animations (Intersection Observer)
// ==========================================
const fadeElements = document.querySelectorAll(
  '.property-card, .service-card, .testimonial-card, .about__content, .about__visual, .contact__form, .contact__info, .hero__stat'
);

fadeElements.forEach(el => {
  el.classList.add('fade-in');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

fadeElements.forEach(el => observer.observe(el));

// ==========================================
// Smooth scroll for anchor links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ==========================================
// Initialize
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNavLink();
  updateBackToTop();
});
