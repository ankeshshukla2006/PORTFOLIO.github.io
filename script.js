// Loader removal
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
    }, 800);
  }, 1800);
});

// Navigation highlighting
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

// Scroll to section
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// Scroll indicator function
function scrollToNextSection() {
  const currentSection = document.elementFromPoint(window.innerWidth/2, window.innerHeight/2).closest('section');
  const nextSection = currentSection.nextElementSibling;
  
  if (nextSection && nextSection.tagName === 'SECTION') {
    nextSection.scrollIntoView({ behavior: 'smooth' });
    
    // Update active nav link based on section
    const sectionId = nextSection.getAttribute('id');
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${sectionId}`) {
        l.classList.add('active');
      }
    });
  }
}

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - sectionHeight/3)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add parallax effect to background elements
document.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.section-bg');
  
  parallaxElements.forEach(el => {
    const speed = 0.5;
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// Add hover effects to skill items
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const icon = item.querySelector('.skill-icon i');
    icon.style.transform = 'scale(1.3)';
    icon.style.transition = 'transform 0.3s ease';
    icon.style.color = '#00ffcc';
  });
  
  item.addEventListener('mouseleave', () => {
    const icon = item.querySelector('.skill-icon i');
    icon.style.transform = 'scale(1)';
    icon.style.color = '#00f6ff';
  });
});

// Animate skill items on scroll
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInDown 0.8s ease-out forwards';
      entry.target.style.opacity = '1';
    }
  });
}, observerOptions);

// Observe skill items
skillItems.forEach(item => {
  item.style.opacity = '0';
  observer.observe(item);
});
