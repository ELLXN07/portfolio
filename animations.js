// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 900,
  easing: 'ease-out-cubic',
  once: true,
  offset: 40
});

// GSAP entrance for timeline cards and quirky message
window.addEventListener('DOMContentLoaded', () => {
  gsap.from('.timeline-card', {
    opacity: 0,
    y: 60,
    duration: 1.1,
    stagger: 0.22,
    ease: 'power3.out',
    delay: 0.2
  });
  gsap.from('.timeline-end-quirk', {
    opacity: 0,
    y: 40,
    duration: 1.2,
    ease: 'power2.out',
    delay: 1.1
  });
  // Floating animation for theme switcher
  gsap.to('.theme-switcher', {
    y: -8,
    repeat: -1,
    yoyo: true,
    duration: 2.2,
    ease: 'sine.inOut'
  });
  // Animate main intro content
  gsap.from('.intro', {
    opacity: 0,
    y: 40,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.1
  });
  gsap.from('.buttons', {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: 'power3.out',
    delay: 0.35
  });
  gsap.from('.socials', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.55
  });
  gsap.from('.down-arrow', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.7
  });
  gsap.from('.about-content', {
    opacity: 0,
    y: 40,
    duration: 1.1,
    ease: 'power3.out',
    delay: 0.7
  });
});

// About section fade-in (if not already handled by AOS)
// Removed redundant IntersectionObserver fade-in logic for .about-section 

// Add AOS fade-up to tool cards if on tools.html
if (document.querySelector('.tool-card')) {
  document.querySelectorAll('.tool-card').forEach(card => {
    card.setAttribute('data-aos', 'fade-up');
  });
} 