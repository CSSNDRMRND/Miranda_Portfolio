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


// ----- Gallery filtering (Posters / Thumbnails / AI Generated / Videos / All) -----
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.gallery .card');
const galleryEmpty = document.getElementById('galleryEmpty');
const gallery = document.getElementById('gallery');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    // Remove active state from all buttons
    filterButtons.forEach(b => b.classList.remove('is-active'));

    // Add active state to clicked button
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    cards.forEach(card => {
      const cats = card.dataset.cat.split(' ');
      const match = filter === 'all' || cats.includes(filter);

      card.style.display = match ? '' : 'none';

      if (match) {
        visibleCount++;
      }
    });

    // Change gallery layout when viewing videos
    if (gallery) {
      gallery.classList.toggle(
        'gallery--video-view',
        filter === 'video'
      );
    }

    // Show empty message if there are no results
    if (galleryEmpty) {
      galleryEmpty.hidden = visibleCount > 0;
    }
  });
});


// ----- Nav background on scroll -----
const nav = document.getElementById('nav');

if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
}


// ----- Scroll progress bar -----
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const pct =
    docHeight > 0
      ? (scrollTop / docHeight) * 100
      : 0;

  scrollProgress.style.width = pct + '%';
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();


// ----- Scroll-reveal animations -----
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          revealObserver.unobserve(entry.target);
        }

      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(el => {
    revealObserver.observe(el);
  });

} else {

  // Fallback for older browsers
  revealEls.forEach(el => {
    el.classList.add('is-visible');
  });

}


// ----- Cursor-reactive glow in hero -----
const hero = document.getElementById('top');
const heroGlow = document.getElementById('heroGlow');

if (
  hero &&
  heroGlow &&
  window.matchMedia('(hover: hover)').matches
) {

  hero.addEventListener('mousemove', (e) => {

    const rect = hero.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    heroGlow.style.setProperty('--mx', x + '%');
    heroGlow.style.setProperty('--my', y + '%');
  });

}


// ----- Magnetic button -----
const magneticBtn = document.getElementById('magneticBtn');

if (
  magneticBtn &&
  window.matchMedia('(hover: hover)').matches
) {

  magneticBtn.addEventListener('mousemove', (e) => {

    const rect = magneticBtn.getBoundingClientRect();

    const x =
      e.clientX -
      rect.left -
      rect.width / 2;

    const y =
      e.clientY -
      rect.top -
      rect.height / 2;

    magneticBtn.style.transform =
      `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  magneticBtn.addEventListener('mouseleave', () => {

    magneticBtn.style.transform =
      'translate(0, 0)';
  });

}


// ----- Card tilt on hover (desktop only) -----
if (window.matchMedia('(hover: hover)').matches) {

  document
    .querySelectorAll('.card__frame')
    .forEach(frame => {

      frame.addEventListener('mousemove', (e) => {

        const rect =
          frame.getBoundingClientRect();

        const px =
          (e.clientX - rect.left) /
          rect.width -
          0.5;

        const py =
          (e.clientY - rect.top) /
          rect.height -
          0.5;

        const rotateX =
          (py * -8).toFixed(2);

        const rotateY =
          (px * 8).toFixed(2);

        frame.style.transform =
          `perspective(600px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-6px)`;
      });

      frame.addEventListener('mouseleave', () => {

        frame.style.transform = '';
      });

    });

}


// ----- Back to top button -----
const backToTop =
  document.getElementById('backToTop');

if (backToTop) {

  window.addEventListener('scroll', () => {

    if (window.scrollY > 500) {

      backToTop.classList.add('is-visible');

    } else {

      backToTop.classList.remove('is-visible');

    }

  });

  backToTop.addEventListener('click', () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });

}


// =====================================================
// ----- Gallery Videos -------------------------------
// ----- Only one plays at a time
// ----- Previous video returns to its poster/cover
// =====================================================

const galleryVideos =
  document.querySelectorAll('.gallery video');

galleryVideos.forEach(video => {

  video.addEventListener('play', () => {

    galleryVideos.forEach(other => {

      // Don't affect the video that is currently playing
      if (other !== video) {

        // Pause the previous video
        other.pause();

        // Reset it to the beginning
        try {
          other.currentTime = 0;
        } catch (error) {
          console.warn(
            'Could not reset video:',
            error
          );
        }

        // Reload the video so its poster appears again
        other.load();

      }

    });

  });

});
