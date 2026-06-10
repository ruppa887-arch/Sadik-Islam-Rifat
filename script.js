// js/script.js

// Loading screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loadingScreen');
  if(loader) {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
  }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
if(hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

// Animated counters
const statNumbers = document.querySelectorAll('.stat-number');
const animateCounter = (el) => {
  const target = +el.getAttribute('data-count');
  let count = 0;
  const speed = 30;
  const increment = target / speed;
  const update = () => {
    count += increment;
    if(count < target) {
      el.textContent = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  };
  update();
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      statNumbers.forEach(num => animateCounter(num));
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
if(statNumbers.length) counterObserver.observe(statNumbers[0]);

// Particle background (simple canvas)
const canvas = document.getElementById('particleCanvas');
if(canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = 'rgba(175, 210, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fill();
    }
  }

  const initParticles = () => {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 12000);
    for(let i=0; i<count; i++) particles.push(new Particle());
  };
  initParticles();
  window.addEventListener('resize', initParticles);

  function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// Typing effect (simple)
const typingEl = document.querySelector('.typing-effect');
if(typingEl) {
  const text = typingEl.getAttribute('data-text') || 'Sadik Work Center';
  typingEl.textContent = '';
  let i = 0;
  const type = () => {
    if(i < text.length) {
      typingEl.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  };
  type();
}