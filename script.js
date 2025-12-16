// --------------------
// LOADER HANDLING
// --------------------
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    const main = document.getElementById('main-content');

    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 800);
    }

    if (main) {
      main.style.display = 'block';
    }
  }, 1800);
});


// --------------------
// NAVIGATION LOGIC
// --------------------
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

if (navLinks.length && sections.length) {
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });

        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}


// --------------------
// SCROLL INDICATOR
// --------------------
function scrollToNextSection() {
  const el = document.elementFromPoint(
    window.innerWidth / 2,
    window.innerHeight / 2
  );

  if (!el) return;

  const currentSection = el.closest('section');
  if (!currentSection) return;

  const nextSection = currentSection.nextElementSibling;
  if (nextSection && nextSection.tagName === 'SECTION') {
    nextSection.scrollIntoView({ behavior: 'smooth' });

    const id = nextSection.getAttribute('id');
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }
}


// --------------------
// ACTIVE NAV ON SCROLL
// --------------------
window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.clientHeight;
    if (scrollY >= top - height / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
});


// --------------------
// PARALLAX BACKGROUND
// --------------------
document.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.section-bg').forEach(el => {
    el.style.transform = `translateY(${-(scrolled * 0.5)}px)`;
  });
});


// --------------------
// SKILL HOVER EFFECTS
// --------------------
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  const icon = item.querySelector('.skill-icon i');
  if (!icon) return;

  item.addEventListener('mouseenter', () => {
    icon.style.transform = 'scale(1.3)';
    icon.style.color = '#00ffcc';
  });

  item.addEventListener('mouseleave', () => {
    icon.style.transform = 'scale(1)';
    icon.style.color = '#00f6ff';
  });
});


// --------------------
// SCROLL ANIMATION (SAFE)
// --------------------
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation =
          'fadeInDown 0.8s ease-out forwards';
        entry.target.style.opacity = '1';
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  skillItems.forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
  });
}
