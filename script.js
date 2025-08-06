/*=============== MOSTRAR/OCULTAR MENÚ MÓVIL ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MOSTRAR MENÚ =====*/
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== OCULTAR MENÚ =====*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== CERRAR MENÚ AL HACER CLIC EN UN ENLACE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*=============== CERRAR MENÚ AL HACER CLIC FUERA DE ÉL ===============*/
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        navMenu.classList.remove('show-menu');
    }
});

/*=============== CAMBIAR FONDO DEL HEADER CON SCROLL ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}
window.addEventListener('scroll', scrollHeader);

/*=============== ANIMACIONES AL HACER SCROLL ===============*/
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Seleccionar y observar elementos para animar
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
elementsToAnimate.forEach((element) => observer.observe(element));

/*=============== SMOOTH SCROLL MEJORADO ===============*/
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Aplicar smooth scroll a los enlaces de navegación
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScroll(href);
        }
    });
});

/*=============== ACTIVE LINK HIGHLIGHTING ===============*/
function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

/*=============== OPTIMIZACIÓN PARA DISPOSITIVOS TÁCTILES ===============*/
function handleTouchDevices() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
        
        // Mejorar hover effects en dispositivos táctiles
        const hoverElements = document.querySelectorAll('.tech__card, .project__card');
        
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touched');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touched');
                }, 300);
            });
        });
    }
}

/*=============== REDIMENSIÓN DE VENTANA ===============*/
function handleResize() {
    const windowWidth = window.innerWidth;
    const navMenu = document.getElementById('nav-menu');
    
    // Cerrar menú móvil si se cambia a desktop
    if (windowWidth >= 768) {
        navMenu.classList.remove('show-menu');
    }
    
    // Reajustar animaciones si es necesario
    const animatedElements = document.querySelectorAll('.is-visible');
    animatedElements.forEach(element => {
        element.style.transition = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.transition = '';
    });
}

window.addEventListener('resize', debounce(handleResize, 250));

/*=============== FUNCIÓN DEBOUNCE ===============*/
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/*=============== LAZY LOADING PARA IMÁGENES ===============*/
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/*=============== MEJORAR PERFORMANCE ===============*/
function optimizePerformance() {
    // Preload critical resources
    const criticalImages = [
        'Avatar.jpg',
        'Proyecto1.jpg',
        'Proyecto2.jpg',
        'Proyecto3.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

/*=============== INICIALIZACIÓN ===============*/
document.addEventListener('DOMContentLoaded', function() {
    handleTouchDevices();
    lazyLoadImages();
    optimizePerformance();
    highlightActiveLink();
    
    // Mostrar contenido gradualmente
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

/*=============== MANEJO DE ERRORES PARA IMÁGENES ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Error loading image: ${this.src}`);
        });
    });
});

/*=============== MEJORAR ACCESIBILIDAD ===============*/
function improveAccessibility() {
    // Navegación con teclado
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    // Mejorar focus visible
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                this.classList.add('keyboard-focus');
            }
        });
        
        element.addEventListener('mousedown', function() {
            this.classList.remove('keyboard-focus');
        });
    });
    
    // ESC para cerrar menú móvil
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.remove('show-menu');
        }
    });
}

document.addEventListener('DOMContentLoaded', improveAccessibility);

/*=============== DETECCIÓN DE REDUCCIÓN DE MOVIMIENTO ===============*/
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
        
        // Deshabilitar animaciones automáticas
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
}

handleReducedMotion();

