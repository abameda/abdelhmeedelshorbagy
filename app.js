// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Simple Fade-in Effect on Scroll
  const revealElements = document.querySelectorAll("section");
  const options = {
    threshold: 0.1
  };
  
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  revealElements.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    revealOnScroll.observe(section);
  });
  
  // Back-to-Top Button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerText = "⬆ Back to Top";
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: none;
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease, transform 0.3s ease;
  `;
  document.body.appendChild(backToTopButton);
  
  // Show Button on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  // Scroll to Top on Click
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
// Image Hover Effect
const images = document.querySelectorAll('.images img');
images.forEach(img => {
  img.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease";
  img.addEventListener('mouseenter', () => {
    img.style.transform = "scale(1.05)";
    img.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    img.style.filter = "brightness(1) contrast(1.1)";
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = "scale(1)";
    img.style.boxShadow = "none";
    img.style.filter = "brightness(1) contrast(1)";
  });
});
  