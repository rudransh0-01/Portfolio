// ===== 1. Mobile menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', function () {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close the menu after clicking a link, or pressing Escape
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', closeMenu);
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeMenu();
});

// ===== 2. Active nav link while scrolling =====
const sections = document.querySelectorAll('main section[id]');
const menuLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = 'home';
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  // "Currently Learning" has no nav link, so highlight Skills/Projects neighbours only when they match
  menuLinks.forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

// ===== 3. Back-to-top button =====
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', function () {
  updateActiveLink();
  backToTop.classList.toggle('show', window.scrollY > 500);
});
updateActiveLink();

// ===== 4. Profile photo fallback (shows "RR" if image is missing) =====
const profileImg = document.getElementById('profileImg');
const photoFrame = profileImg.parentElement;

function showFallback() {
  photoFrame.classList.add('no-image');
}
profileImg.addEventListener('error', showFallback);
if (profileImg.complete && profileImg.naturalWidth === 0) showFallback();

// ===== 5. Fade-in on scroll =====
const revealItems = document.querySelectorAll('.section-title, .card');
revealItems.forEach(function (el) { el.classList.add('reveal'); });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (el) { observer.observe(el); });
} else {
  // Old browsers: just show everything
  revealItems.forEach(function (el) { el.classList.add('visible'); });
}

// ===== 6. Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
