// ====================================
// REVATHI S - 3D Portfolio JavaScript
// Interactive Animations & 3D Effects
// ====================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initThreeJS();
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initTitleRotation();
    initStatsCounter();
    initSkillBars();
    initContactForm();
    initParallax();
});

// ====================================
// PRELOADER
// ====================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Trigger entrance animations
            animateHeroEntrance();
        }, 1500);
    });
}

function animateHeroEntrance() {
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-titles, .hero-description, .hero-cta, .hero-stats');
    
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

// ====================================
// THREE.JS 3D BACKGROUND
// ====================================
function initThreeJS() {
    const canvas = document.getElementById('bg-canvas');
    
    if (!canvas || typeof THREE === 'undefined') {
        console.warn('Three.js not loaded or canvas not found');
        return;
    }
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create floating geometric shapes
    const shapes = [];
    
    // Torus
    const torusGeometry = new THREE.TorusGeometry(0.3, 0.1, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x06b6d4, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(2, 1, -2);
    scene.add(torus);
    shapes.push({ mesh: torus, rotationSpeed: { x: 0.01, y: 0.02 } });
    
    // Icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(0.4, 0);
    const icoMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xa855f7, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const ico = new THREE.Mesh(icoGeometry, icoMaterial);
    ico.position.set(-2, -1, -3);
    scene.add(ico);
    shapes.push({ mesh: ico, rotationSpeed: { x: 0.015, y: 0.01 } });
    
    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.35, 0);
    const octaMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xf472b6, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const octa = new THREE.Mesh(octaGeometry, octaMaterial);
    octa.position.set(1.5, -1.5, -2.5);
    scene.add(octa);
    shapes.push({ mesh: octa, rotationSpeed: { x: 0.02, y: 0.015 } });
    
    // Box
    const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const boxMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x6366f1, 
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(-1.5, 1.5, -2);
    scene.add(box);
    shapes.push({ mesh: box, rotationSpeed: { x: 0.01, y: 0.02 } });
    
    camera.position.z = 3;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        particlesMesh.rotation.x += targetY * 0.01;
        particlesMesh.rotation.y += targetX * 0.01;
        
        // Animate shapes
        shapes.forEach(shape => {
            shape.mesh.rotation.x += shape.rotationSpeed.x;
            shape.mesh.rotation.y += shape.rotationSpeed.y;
            
            // Floating animation
            shape.mesh.position.y += Math.sin(Date.now() * 0.001 + shapes.indexOf(shape)) * 0.001;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ====================================
// CUSTOM CURSOR
// ====================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (!cursor || !cursorDot) return;
    
    // Check if touch device
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
        return;
    }
    
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });
    
    function animateCursor() {
        dotX += (cursorX - dotX) * 0.5;
        dotY += (cursorY - dotY) * 0.5;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .timeline-content');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ====================================
// NAVIGATION
// ====================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-links a');
    
    // Scroll behavior
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ====================================
// SCROLL ANIMATIONS
// ====================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ====================================
// TITLE ROTATION
// ====================================
function initTitleRotation() {
    const titles = document.querySelectorAll('.title-item');
    let currentIndex = 0;
    
    if (titles.length === 0) return;
    
    setInterval(() => {
        titles[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % titles.length;
        titles[currentIndex].classList.add('active');
    }, 3000);
}

// ====================================
// STATS COUNTER
// ====================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ====================================
// SKILL BARS
// ====================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ====================================
// CONTACT FORM
// ====================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    const EMAILJS_PUBLIC_KEY  = 'RGPAwV1llmsdjpp6q';
    const EMAILJS_SERVICE_ID  = 'service_eekakan';
    const EMAILJS_TEMPLATE_ID = 'f834ijw';

    emailjs.init(EMAILJS_PUBLIC_KEY);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = '<span>Sending…</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        const templateParams = {
            from_name:  form.name.value.trim(),
            from_email: form.email.value.trim(),
            subject:    form.subject.value.trim(),
            message:    form.message.value.trim(),
            reply_to:   form.email.value.trim()
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
                btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                btn.innerHTML = '<span>Failed – Try Again</span> <i class="fas fa-times"></i>';
                btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            });
    });
}

// ====================================
// PARALLAX EFFECTS
// ====================================
function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// ====================================
// TYPED EFFECT FOR NAME (Optional Enhancement)
// ====================================
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ====================================
// MAGNETIC BUTTON EFFECT
// ====================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ====================================
// SMOOTH REVEAL FOR SECTIONS
// ====================================
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

// Initialize sections with hidden state
document.querySelectorAll('section:not(.hero)').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// ====================================
// PARTICLES FOR HERO (Fallback if Three.js fails)
// ====================================
function createFallbackParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        `;
        container.appendChild(particle);
    }
}

// Check if Three.js loaded, otherwise use fallback
setTimeout(() => {
    if (typeof THREE === 'undefined') {
        createFallbackParticles();
    }
}, 2000);

// ====================================
// LETTER HOVER EFFECTS
// ====================================
document.querySelectorAll('.name-letter').forEach(letter => {
    letter.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'translateY(-10px) scale(1.1)';
    });
    
    letter.addEventListener('mouseleave', function() {
        this.style.transform = '';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

// ====================================
// TILT EFFECT FOR PROJECT CARDS
// ====================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ====================================
// CONSOLE EASTER EGG
// ====================================
console.log('%c Welcome to Revathi S Portfolio! ', 'background: linear-gradient(135deg, #6366f1, #a855f7); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Built with passion using HTML, CSS, Three.js ', 'color: #06b6d4; font-size: 12px;');
