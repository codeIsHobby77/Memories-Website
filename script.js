// Debounce utility for performance
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Gallery Load More functionality
const galleryContainer = document.getElementById('galleryContainer');
const photoCards = galleryContainer.querySelectorAll('.photo-card');
const IMAGES_PER_PAGE = 12;
let currentIndex = IMAGES_PER_PAGE;
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Initialize gallery by hiding images beyond the first 12
function initializeGallery() {
  photoCards.forEach((card, index) => {
    if (index >= IMAGES_PER_PAGE) {
      card.classList.add('hidden');
    }
  });
  
  // Hide the button if there are 12 or fewer images
  if (photoCards.length <= IMAGES_PER_PAGE) {
    loadMoreBtn.classList.add('hidden');
  }
}

// Load more images with batch rendering
loadMoreBtn.addEventListener('click', () => {
  // Use requestAnimationFrame for smoother rendering
  requestAnimationFrame(() => {
    let countShown = 0;
    photoCards.forEach((card, index) => {
      if (countShown < IMAGES_PER_PAGE && index >= currentIndex) {
        card.classList.remove('hidden');
        countShown++;
      }
    });
    
    currentIndex += IMAGES_PER_PAGE;
    
    // Hide the button if all images are now visible
    if (currentIndex >= photoCards.length) {
      loadMoreBtn.classList.add('hidden');
    }
  });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeGallery);

// Hamburger menu functionality with optimized event handling
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
}

function closeMenu() {
  // Only close menu if hamburger is visible (mobile)
  if (window.getComputedStyle(hamburger).display !== "none") {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
}

hamburger.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Optimized click outside handler with event delegation
document.addEventListener('click', (e) => {
  if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
    closeMenu();
  }
});
