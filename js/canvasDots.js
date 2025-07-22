// Original Credit to Ben Scott, original file on his Github titled heroCanvas.js 
// Ben's Github : https://github.com/bscottnz/portfolio-site/tree/main/src
// Modified by Aidan Ramen 22 July 2025

const canvasDots = function () {
  const canvas = document.getElementById('about-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const colorMain = 'rgba(14, 18, 22, 1)';
  const colorAlt = 'rgba(14, 18, 22, 1)';
  const dotColors = [colorMain, colorMain, colorMain, colorMain, colorAlt];

  let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 120
  };

  const dots = [];
  const dotCount = 120;
  const connectionDistance = 100;

  class Dot {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
      this.color = dotColors[Math.floor(Math.random() * dotColors.length)];
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      this.x += this.vx;
      this.y += this.vy;

      this.draw();
    }
  }

  function connectDots() {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance;
          ctx.strokeStyle = `rgba(14, 18, 22, 1, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function connectToMouse() {
    for (let i = 0; i < dots.length; i++) {
      const dx = dots[i].x - mouse.x;
      const dy = dots[i].y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        const opacity = 1 - distance / mouse.radius;
        ctx.strokeStyle = `rgba(14, 18, 22, 1, ${opacity})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < dots.length; i++) {
      dots[i].update();
    }
    connectDots();
    connectToMouse();
    requestAnimationFrame(animate);
  }

  function init() {
    for (let i = 0; i < dotCount; i++) {
      dots.push(new Dot());
    }
    animate();
  }

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });

  init();
};

export default canvasDots;

