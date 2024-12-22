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


const express = require('express');
const fs = require('fs');
const axios = require('axios');

const app = express(); // Initialize Express

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`[DEBUG] Request received: ${req.method} ${req.url}`);
    next();
});

// Main route to log visitor data
app.get('/', async (req, res) => {
    console.log('[DEBUG] Serving index.html');

    // Get visitor IP
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || '127.0.0.1';
    console.log(`[DEBUG] Detected IP: ${ip}`);

    let visitorData = {
        ip: ip,
        timestamp: new Date().toISOString(),
    };

    try {
        // Fetch geolocation data
        const geoResponse = await axios.get(`http://ip-api.com/json/${ip}`);
        const geoData = geoResponse.data;

        // Add geolocation data if available
        if (geoData.status === 'success') {
            visitorData = {
                ...visitorData,
                city: geoData.city,
                region: geoData.regionName,
                country: geoData.country,
                latitude: geoData.lat,
                longitude: geoData.lon,
            };
        } else {
            console.log('[DEBUG] IP geolocation failed.');
        }
    } catch (error) {
        console.error('[ERROR] Failed to fetch geolocation data:', error.message);
    }

    // Log visitor data
    fs.appendFileSync('visitors.log', JSON.stringify(visitorData) + '\n');
    console.log('[DEBUG] Visitor Data Saved:', visitorData);

    // Send response
    res.send('Server is working');
});

// Start the server
const PORT = 3000; // You can change this port if needed
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
