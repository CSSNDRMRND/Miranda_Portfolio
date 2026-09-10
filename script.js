// ----- Footer year -----
document.getElementById('year').textContent = new Date().getFullYear();

// ----- Mobile menu toggle -----
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
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
}

// ----- Gallery filtering -----
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.gallery .card');
const galleryEmpty = document.getElementById('galleryEmpty');
const gallery = document.getElementById('gallery');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    cards.forEach(card => {
      const cats = card.dataset.cat.split(' ');
      const match = filter === 'all' || cats.includes(filter);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    if (gallery) {
      gallery.classList.toggle('gallery--video-view', filter === 'video');
    }

    if (galleryEmpty) {
      galleryEmpty.hidden = visibleCount > 0;
    }
  });
});

// ----- Wall cards "bloom" in on scroll -----
if ('IntersectionObserver' in window) {
  const bloomObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-bloomed');
          bloomObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  cards.forEach(card => bloomObserver.observe(card));
} else {
  cards.forEach(card => card.classList.add('is-bloomed'));
}

// ----- Back to top -----
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ----- Gallery videos: only one plays at a time -----
const galleryVideos = document.querySelectorAll('.gallery video');

galleryVideos.forEach(video => {
  video.addEventListener('play', () => {
    galleryVideos.forEach(other => {
      if (other !== video) {
        other.pause();
        try { other.currentTime = 0; } catch (error) { /* ignore */ }
        other.load();
      }
    });
  });
});
