/*=============== MOSTRAR/OCULTAR MENÚ MÓVIL ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MOSTRAR MENÚ =====*/
// Validar si la constante existe
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== OCULTAR MENÚ =====*/
// Validar si la constante existe
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== CERRAR MENÚ AL HACER CLIC EN UN ENLACE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // Cuando hacemos clic en cada nav__link, removemos la clase show-menu
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/*=============== CAMBIAR FONDO DEL HEADER CON SCROLL ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // Cuando el scroll es mayor a 50 de la altura del viewport, añade la clase header-scrolled
    if (this.scrollY >= 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}
window.addEventListener('scroll', scrollHeader);


/*=============== ANIMACIONES AL HACER SCROLL ===============*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Si el elemento es visible
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            // Opcional: remover la clase si el elemento ya no es visible
            // entry.target.classList.remove('is-visible');
        }
    });
}, {
    threshold: 0.1 // El callback se ejecutará cuando el 10% del elemento sea visible
});

// Seleccionar todos los elementos que quieres animar
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
// Observar cada uno de ellos
elementsToAnimate.forEach((element) => observer.observe(element));


