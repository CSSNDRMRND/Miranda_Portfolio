// ----- Footer year -----
document.getElementById('year').textContent = new Date().getFullYear();

// ----- Mobile menu toggle -----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', isOpen);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ----- Gallery filtering (Posters / Thumbnails / All) -----
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.gallery .card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// ----- Nav background on scroll (adds slight extra opacity/shadow) -----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
