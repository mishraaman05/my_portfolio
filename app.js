// Tab functionality
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

function openTab(tabName, event) {
  tabLinks.forEach(tab => tab.classList.remove("active-link"));
  tabContents.forEach(tab => tab.classList.remove("active-tab"));
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

tabLinks.forEach(tab => {
  tab.addEventListener("click", (e) => openTab(tab.getAttribute("onclick").match(/'([^']+)'/)[1], e));
});

// Typed.js initialization
const typed = new Typed('#element', {
  strings: ['UI/UX Designer', 'Web Developer', 'Data Analyst', 'Data Scientist'],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1500,
  loop: true,
  showCursor: true,
  cursorChar: '|',
  smartBackspace: true
});

// Enhanced Mobile Menu Functionality
const mobileMenuBtn = document.createElement("button");
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuBtn.classList.add("mobile-menu-btn");
mobileMenuBtn.setAttribute("aria-label", "Toggle menu");
mobileMenuBtn.setAttribute("aria-expanded", "false");

// Create overlay element
const overlay = document.createElement("div");
overlay.classList.add("overlay");

// Add both to the DOM
document.body.appendChild(overlay);
document.querySelector("nav").appendChild(mobileMenuBtn);

// Toggle menu function
function toggleMenu() {
  const navUl = document.querySelector("nav ul");
  navUl.classList.toggle("active");
  overlay.classList.toggle("active");
  
  // Toggle aria-expanded attribute
  const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  
  // Change icon when menu is open
  if (navUl.classList.contains("active")) {
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = "hidden";
  } else {
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "";
  }
}

// Event listeners for menu toggle
mobileMenuBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// Close menu when a link is clicked
document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Mobile contact links functionality
function setupMobileContactLinks() {
  const clickableContacts = document.querySelectorAll('.clickable-contact');
  
  if (window.innerWidth <= 768) {
    clickableContacts.forEach(contact => {
      contact.style.cursor = 'pointer';
      contact.addEventListener('click', () => {
        const contactType = contact.getAttribute('data-contact');
        window.location.href = contactType;
      });
    });
  } else {
    clickableContacts.forEach(contact => {
      contact.style.cursor = 'default';
      contact.removeEventListener('click', () => {});
    });
  }
}

// Call on load and resize
window.addEventListener('load', setupMobileContactLinks);
window.addEventListener('resize', setupMobileContactLinks);

// Form submission handling
const contactForm = document.getElementById('contactForm');
const msgElement = document.getElementById('msg');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch(this.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Show success message
        msgElement.textContent = 'Submitted successfully!';
        msgElement.style.color = '#61b752';
        
        // Reset the form
        this.reset();
        
        // Scroll to home section after 2 seconds
        setTimeout(() => {
          document.querySelector('#header').scrollIntoView({
            behavior: 'smooth'
          });
          
          // Clear message after scroll
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

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    document.querySelector("nav ul").classList.remove("active");
    overlay.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
});