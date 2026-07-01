/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
        backTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        backTop.classList.remove('show');
    }
});

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- Mobile nav ---- */
const mobileNav = document.getElementById('mobile-nav');
const hamburger = document.getElementById('hamburger');
const mobileClose = document.getElementById('mobile-close');

hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
});

mobileClose.addEventListener('click', closeMobileNav);

function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
}

/* ---- Typed animation ---- */
const roles = [
    'Web Developer , PHP / Laravel Developer',
    'HTML / CSS / JS Enthusiast',
    'Problem Solver , UI Craftsman',
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-role');

function typeLoop() {
    const current = roles[roleIdx];
    if (isDeleting) {
        typedEl.textContent = current.slice(0, --charIdx);
    } else {
        typedEl.textContent = current.slice(0, ++charIdx);
    }

    let delay = isDeleting ? 60 : 100;
    if (!isDeleting && charIdx === current.length) { delay = 1000; isDeleting = true; }
    else if (isDeleting && charIdx === 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; delay = 400; }

    setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 600);

/* ---- Scroll reveal ---- */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---- Particle canvas background ---- */
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particles = [];
let W, H;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.5 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.alpha = Math.random() * 0.5 + 0.1;
        const hue = Math.random() > 0.5 ? 250 : 190;
        this.color = `hsla(${hue}, 80%, 70%, ${this.alpha})`;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
}
animate();
