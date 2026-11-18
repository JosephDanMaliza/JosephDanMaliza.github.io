
/*  Auto-Hiding Scrollbar Controller */
let scrollTimeout;
window.addEventListener('scroll', () => {
  const rootElement = document.documentElement;
  rootElement.classList.add('is-scrolling');
  
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    rootElement.classList.remove('is-scrolling');
  }, 800); // Fades out 800ms after scrolling stops
}, { passive: true });