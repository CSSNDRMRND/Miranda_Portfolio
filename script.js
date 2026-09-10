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

// ----- Gallery filtering (Posters / Thumbnails / AI Generated Images / AI Generated Videos / All) -----
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

// ----- Nav background on scroll -----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ----- Scroll progress bar -----
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// ----- Scroll-reveal animations -----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ----- Cursor-reactive glow in hero -----
const hero = document.getElementById('top');
const heroGlow = document.getElementById('heroGlow');
if (hero && heroGlow && window.matchMedia('(hover: hover)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroGlow.style.setProperty('--mx', x + '%');
    heroGlow.style.setProperty('--my', y + '%');
  });
}

// ----- Magnetic button -----
const magneticBtn = document.getElementById('magneticBtn');
if (magneticBtn && window.matchMedia('(hover: hover)').matches) {
  magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    magneticBtn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });
  magneticBtn.addEventListener('mouseleave', () => {
    magneticBtn.style.transform = 'translate(0, 0)';
  });
}

// ----- Card tilt on hover (desktop only) -----
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.card__frame').forEach(frame => {
    frame.addEventListener('mousemove', (e) => {
      const rect = frame.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (py * -8).toFixed(2);
      const rotateY = (px * 8).toFixed(2);
      frame.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    frame.addEventListener('mouseleave', () => {
      frame.style.transform = '';
    });
  });
}

// ----- Back to top button -----
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
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
      }
    });
  });
});

// ----- Custom cursor (desktop only) -----
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
  document.body.classList.add('has-custom-cursor');
  let ringX = 0, ringY = 0, targetX = 0, targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursorDot.style.left = targetX + 'px';
    cursorDot.style.top = targetY + 'px';
    cursorDot.classList.add('is-active');
    cursorRing.classList.add('is-active');
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-hovering'));
  });
}

// ----- Hero letter-by-letter reveal -----
document.querySelectorAll('[data-split]').forEach(el => {
  const text = el.textContent;
  el.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.style.transitionDelay = (i * 0.035) + 's';
    span.textContent = char === ' ' ? '\u00A0' : char;
    el.appendChild(span);
  });
});
// trigger letter reveal shortly after load (hero is above the fold)
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.letter').forEach(l => l.classList.add('is-visible'));
  }, 150);
});

// ----- Nav scrollspy sliding indicator -----
const navIndicator = document.getElementById('navIndicator');
const navLinksEl = document.getElementById('navLinks');
const spyLinks = document.querySelectorAll('.nav__links a[data-nav]');
const spySections = ['work', 'services', 'about', 'tools']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function moveIndicatorTo(link) {
  if (!navIndicator || !navLinksEl || !link) return;
  const linkRect = link.getBoundingClientRect();
  const navRect = navLinksEl.getBoundingClientRect();
  navIndicator.style.left = (linkRect.left - navRect.left) + 'px';
  navIndicator.style.width = linkRect.width + 'px';
  navIndicator.classList.add('is-active');
}

if (navIndicator && spySections.length) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const match = document.querySelector(`.nav__links a[data-nav="${entry.target.id}"]`);
        if (match) moveIndicatorTo(match);
      }
    });
  }, { threshold: 0.3, rootMargin: '-90px 0px -60% 0px' });

  spySections.forEach(section => spyObserver.observe(section));
}

// ----- Section head underline: reuse reveal observer pattern -----
const sectionHeadEls = document.querySelectorAll('.section-head');
if ('IntersectionObserver' in window) {
  const headObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        headObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sectionHeadEls.forEach(el => headObserver.observe(el));
}
