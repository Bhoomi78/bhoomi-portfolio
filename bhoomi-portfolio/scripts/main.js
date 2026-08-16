/**
 * Bhoomi Srivastava Portfolio - Main Application Controller
 * Data Analyst | Business Analyst | AI & Data Enthusiast
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Theme Management (Dark / Light with LocalStorage Persistence)
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  function getStoredTheme() {
    return localStorage.getItem('bhoomi_portfolio_theme') || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('bhoomi_portfolio_theme', theme);
  }

  // Set initial theme
  applyTheme(getStoredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme} theme`, '🌓');
    });
  }

  // ==========================================================================
  // 2. Navigation & Mobile Drawer
  // ==========================================================================
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section spy
  function updateActiveNavLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // ==========================================================================
  // 3. Toast Notifications & Clipboard Copy
  // ==========================================================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = '📋') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

  window.showToast = showToast;

  // Copy trigger handlers
  const copyTriggers = document.querySelectorAll('.copy-trigger');
  copyTriggers.forEach(el => {
    el.addEventListener('click', async () => {
      const textToCopy = el.getAttribute('data-copy');
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast(`Copied to clipboard: ${textToCopy}`, '✅');
        } catch (err) {
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied to clipboard: ${textToCopy}`, '✅');
        }
      }
    });
  });

  // ==========================================================================
  // 4. Resume Modal & Print Functions
  // ==========================================================================
  const resumeModal = document.getElementById('resume-modal');
  const resumeTriggers = document.querySelectorAll('.open-resume-trigger');
  const closeResumeBtn = document.getElementById('close-resume-modal');
  const printResumeBtn = document.getElementById('print-resume-btn');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', openResume);
  });

  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      closeResume();
    }
  });

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================================================
  // 5. Contact Form Validation & State
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const msgInput = document.getElementById('contact-message');
  const nameVal = document.getElementById('name-validation');
  const emailVal = document.getElementById('email-validation');
  const msgVal = document.getElementById('msg-validation');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate name
      if (!nameInput.value.trim()) {
        nameVal.classList.add('visible');
        isValid = false;
      } else {
        nameVal.classList.remove('visible');
      }

      // Validate email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailVal.classList.add('visible');
        isValid = false;
      } else {
        emailVal.classList.remove('visible');
      }

      // Validate message
      if (!msgInput.value.trim()) {
        msgVal.classList.add('visible');
        isValid = false;
      } else {
        msgVal.classList.remove('visible');
      }

      if (isValid) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
          showToast(`Thank you, ${nameInput.value.trim()}! Your message has been prepared.`, '✉️');
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span>Send Message</span>
            <svg class="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          `;
        }, 600);
      }
    });
  }

  console.log("%c📊 Bhoomi Srivastava Portfolio Initialized (Data Analyst & AI Enthusiast)", "color: #38bdf8; font-weight: bold; font-size: 13px;");
})();
