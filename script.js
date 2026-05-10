// Typing animation
// Typing animation
const typingText = document.getElementById('typingText');
const phrases = [
    'Data Engineer.',
    'Pipeline Architect.',
    'Big Data Orchestrator.',
    'Distributed Systems Geek.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    let typeSpeed = isDeleting ? 100 : 150;
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}
typeWriter();

// Theme toggle functionality
function toggleTheme() {
    const root = document.documentElement;
    const themeIcon = document.querySelector('.theme-toggle i');
    const isLight = root.style.getPropertyValue('--bg-dark') === '#ffffff';
    if (isLight) {
        // Switch to dark theme
        root.style.setProperty('--bg-dark', '#0a0a0a');
        root.style.setProperty('--bg-card', '#111111');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#a3a3a3');
        root.style.setProperty('--glass', 'rgba(255, 255, 255, 0.05)');
        root.style.setProperty('--border', 'rgba(255, 255, 255, 0.1)');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.color = '#fff';
        }
    } else {
        // Switch to light theme
        root.style.setProperty('--bg-dark', '#ffffff');
        root.style.setProperty('--bg-card', '#f8f9fa');
        root.style.setProperty('--text-primary', '#000000');
        root.style.setProperty('--text-secondary', '#666666');
        root.style.setProperty('--glass', 'rgba(0, 0, 0, 0.05)');
        root.style.setProperty('--border', 'rgba(0, 0, 0, 0.1)');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.color = '#FFA500'; // orange/yellow for sun
        }
    }
}

// Resume download function
function downloadResume() {
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume PDF URL
    link.download = 'Garvpreet_Singh_Resume.pdf';
    alert('Resume download would start here! Please replace with actual PDF link.');
    // Uncomment below lines when you have actual resume PDF
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Contact form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    alert(`Thank you ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
    event.target.reset();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu on click
        if (window.innerWidth < 900) {
            document.querySelector('.nav-links').classList.remove('mobile-menu-open');
        }
    });
});

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-menu-open');
}

// Section reveal on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add different animations based on section or card
            if (entry.target.classList.contains('project-card')) {
                entry.target.classList.add('zoom-in');
            } else if (entry.target.classList.contains('skills-grid')) {
                entry.target.classList.add('slide-in-right');
            } else if (entry.target.classList.contains('about-content')) {
                entry.target.classList.add('slide-in-left');
            } else {
                entry.target.classList.add('fade-in');
            }
        }
    });
}, observerOptions);
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
    // Animate main content blocks inside sections
    section.querySelectorAll('.about-content, .skills-grid, .projects-grid, .education-timeline, .experience-timeline, .certifications').forEach(el => {
        observer.observe(el);
    });
});
document.querySelectorAll('.project-card').forEach(card => observer.observe(card));

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    // Parallax hero background
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    const speed = scrolled * 0.5;
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
    // Add scroll effect to navigation
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Animated hero background particles
function createParticles() {
    const heroBackground = document.querySelector('.hero-bg');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(0, 212, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        heroBackground.appendChild(particle);
    }
}
createParticles();

// Enhanced scroll animations
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg');
    const speed = scrolled * 0.5;
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Neon loading overlay and fade-up main content
window.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const mainContent = document.getElementById('mainContent');
    // Wait for the loading animation (about 2s)
    setTimeout(() => {
        loadingOverlay.classList.add('hide');
        mainContent.classList.add('fade-up');
    }, 2000);
});

console.log('🚀 Garvpreet Singh Portfolio - Loaded & Ready!');
console.log('💡 Tip: Check out the source code and feel free to reach out for collaborations!');

// Glowing custom cursor
(function() {
    const cursor = document.createElement('div');
    cursor.id = 'customCursor';
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Elements that should trigger glow
    const hoverSelectors = [
        'a', 'button', '.btn', '.project-card', '.skill-item', '.contact-item', '.highlight-item', '.cert-item'
    ];
    hoverSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                el.classList.add('cursor-glow');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                el.classList.remove('cursor-glow');
            });
        });
    });

    // For dynamically added elements (e.g. after loading)
    document.body.addEventListener('mouseover', e => {
        if (hoverSelectors.some(sel => e.target.matches(sel))) {
            cursor.classList.add('cursor-hover');
            e.target.classList.add('cursor-glow');
        }
    });
    document.body.addEventListener('mouseout', e => {
        if (hoverSelectors.some(sel => e.target.matches(sel))) {
            cursor.classList.remove('cursor-hover');
            e.target.classList.remove('cursor-glow');
        }
    });
})();

function showProjectsTab(tab) {
    const liveTab = document.getElementById('liveTab');
    const progressTab = document.getElementById('progressTab');
    const liveProjects = document.getElementById('live-projects');
    const progressProjects = document.getElementById('progress-projects');
    if (tab === 'live') {
        liveTab.classList.add('active');
        progressTab.classList.remove('active');
        liveProjects.style.display = 'grid';
        progressProjects.style.display = 'none';
    } else {
        liveTab.classList.remove('active');
        progressTab.classList.add('active');
        liveProjects.style.display = 'none';
        progressProjects.style.display = 'grid';
    }
} 
