/**
 * Image Carousel JavaScript
 * Provides functionality for image carousels across the site
 */

function currentSlide(n, carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.nav-dot');
  
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to the selected slide and dot
  if (slides[n-1]) slides[n-1].classList.add('active');
  if (dots[n-1]) dots[n-1].classList.add('active');
}

// Initialize carousels when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Add click event listeners to navigation dots
  const navDots = document.querySelectorAll('.nav-dot');
  navDots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideNumber = this.getAttribute('data-slide');
      const carouselId = this.getAttribute('data-carousel');
      currentSlide(parseInt(slideNumber), carouselId);
    });
  });

  // Auto-rotate carousels every 5 seconds (optional)
  const carousels = document.querySelectorAll('.vendor-carousel');
  
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    if (slides.length > 1) {
      let currentIndex = 0;
      setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        currentSlide(currentIndex + 1, carousel.id);
      }, 5000);
    }
  });
});
