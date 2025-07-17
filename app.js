// ==== Contact Form Submit Logic ====
const contactForm = document.getElementById('contactForm');
const msgElement = document.getElementById('msg');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          msgElement.textContent = 'Submitted successfully!';
          msgElement.style.color = '#61b752';
          this.reset();

          setTimeout(() => {
            document.querySelector('#header').scrollIntoView({
              behavior: 'smooth'
            });
            setTimeout(() => {
              msgElement.textContent = '';
            }, 3000);
          }, 2000);
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        msgElement.textContent = 'Submission failed. Please try again.';
        msgElement.style.color = '#ff400f';
        console.error('Error:', error);
      });
  });
}

// ==== Typewriter Effect ====
const typewriterRoles = [
  { text: 'Web Developer', color: '#61b752' },
  { text: 'Data Scientist', color: '#4dabf7' },
  { text: 'UI/UX Designer', color: '#ff922b' },
  { text: 'Python Developer', color: '#f06595' }
];

function initializeTypewriter() {
  const element = document.getElementById('element');
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.visibility = 'hidden';
  container.style.whiteSpace = 'nowrap';
  container.style.fontSize = '2rem';
  container.style.fontWeight = '600';
  document.body.appendChild(container);

  let maxWidth = 0;
  typewriterRoles.forEach(role => {
    container.textContent = role.text;
    maxWidth = Math.max(maxWidth, container.offsetWidth);
  });

  document.body.removeChild(container);
  element.style.width = `${maxWidth + 5}px`;
  element.style.height = '60px';
  element.style.display = 'inline-block';
  element.style.overflow = 'hidden';
}

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typewriterSpeed = 100;

function runTypewriter() {
  const currentRole = typewriterRoles[currentRoleIndex];
  const element = document.getElementById('element');

  if (isDeleting) {
    element.innerHTML = `<p style="color: ${currentRole.color}; margin: 0; padding: 0;">${currentRole.text.substring(0, currentCharIndex - 1)}</p>`;
    currentCharIndex--;
    typewriterSpeed = 50;
  } else {
    element.innerHTML = `<p style="color: ${currentRole.color}; margin: 0; padding: 0;">${currentRole.text.substring(0, currentCharIndex + 1)}</p>`;
    currentCharIndex++;
    typewriterSpeed = 100;
  }

  if (!isDeleting && currentCharIndex === currentRole.text.length) {
    isDeleting = true;
    typewriterSpeed = 1500;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentRoleIndex = (currentRoleIndex + 1) % typewriterRoles.length;
    typewriterSpeed = 500;
  }

  setTimeout(runTypewriter, typewriterSpeed);
}

// ==== Stars & Shooting Stars ====
function createStars() {
  if (window.innerWidth > 768) {
    const starsContainer = document.querySelector('.stars');
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty('--duration', `${Math.random() * 5 + 3}s`);
      starsContainer.appendChild(star);
    }
  }
}

function createShootingStars() {
  if (window.innerWidth > 768) {
    const shootingStarsContainer = document.querySelector('.shooting-stars');
    const shootingStarCount = 6;
    for (let i = 0; i < shootingStarCount; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 100}%`;
      shootingStar.style.setProperty('--duration', `${Math.random() * 3 + 3}s`);
      shootingStar.style.animationDelay = `${Math.random() * 10}s`;
      shootingStar.style.transform = 'rotate(225deg)';
      shootingStarsContainer.appendChild(shootingStar);
    }
  }
}

// ==== Scroll Smoothness ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// ==== Tabs ====
function opentab(tabname) {
  const tablinks = document.getElementsByClassName('tab-links');
  const tabcontents = document.getElementsByClassName('tab-contents');

  for (let tablink of tablinks) tablink.classList.remove('active-link');
  for (let tabcontent of tabcontents) tabcontent.classList.remove('active-tab');

  event.currentTarget.classList.add('active-link');
  document.getElementById(tabname).classList.add('active-tab');
}

// ==== Mobile Menu Toggle ====
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.getElementById('links');

  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
}

// ==== Clickable Contact ====
document.querySelectorAll('.clickable-contact').forEach(item => {
  item.addEventListener('click', function () {
    const contactMethod = this.getAttribute('data-contact');
    if (contactMethod.startsWith('tel:') || contactMethod.startsWith('mailto:')) {
      window.location.href = contactMethod;
    }
  });
});

// ==== Navbar Scroll Effect ====
window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ==== On Load Initialization ====
document.addEventListener('DOMContentLoaded', function () {
  initializeTypewriter();
  setTimeout(runTypewriter, 1000);
  createStars();
  createShootingStars();

  document.querySelector('.hamburger').addEventListener('click', toggleMenu);
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) toggleMenu();
    });
  });
});
