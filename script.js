document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Navbar cambio de color al scroll
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });
    
    // Botón "Volver arriba"
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Animaciones para barras de progreso en habilidades
    function animateSkills() {
        const skillsSection = document.getElementById('skills');
        
        if (!skillsSection) return;
        
        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Opciones para el IntersectionObserver
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        // Callback para cuando el elemento es visible
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animar todas las barras de progreso
                    skillBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                    
                    // Dejar de observar después de la animación
                    observer.unobserve(entry.target);
                }
            });
        };
        
        // Crear el observador
        const observer = new IntersectionObserver(callback, options);
        
        // Comenzar a observar la sección de habilidades
        observer.observe(skillsSection);
    }
    
    animateSkills();
    
    // Efecto de escritura para la sección hero
    function typeEffect() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (!heroSubtitle) return;
        
        const text = heroSubtitle.innerHTML;
        const highlightText = heroSubtitle.querySelector('.hero-highlight');
        const highlightContent = highlightText ? highlightText.textContent : '';
        
        const plainText = text.replace(`<span class="hero-highlight">${highlightContent}</span>`, highlightContent);
        
        // Dividir el texto para aplicar el efecto solo al texto destacado
        const beforeHighlight = plainText.split(highlightContent)[0];
        heroSubtitle.innerHTML = beforeHighlight;
        
        let i = 0;
        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'hero-highlight';
        heroSubtitle.appendChild(highlightSpan);
        
        // Agregar después del texto destacado
        const afterHighlight = plainText.split(highlightContent)[1];
        if (afterHighlight) {
            const afterSpan = document.createElement('span');
            afterSpan.textContent = afterHighlight;
            heroSubtitle.appendChild(afterSpan);
        }
        
        function typeWriter() {
            if (i < highlightContent.length) {
                highlightSpan.textContent += highlightContent.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar el efecto de escritura después de un breve retraso
        setTimeout(typeWriter, 1000);
    }
    
    // Comentado por ahora para no interferir con AOS
    // typeEffect();
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se podría integrar un servicio real para enviar emails
            // Por ahora, simulamos una respuesta exitosa
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                submitBtn.classList.add('btn-success');
                
                // Limpiar el formulario
                contactForm.reset();
                
                // Restaurar el botón después de un tiempo
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.classList.remove('btn-success');
                }, 3000);
            }, 1500);
        });
    }
    
    // Efecto parallax suave en la sección hero
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.05;
                shape.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    });
    
    // Activación del scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Inicializar indicador de scroll en hero section
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, duration = 3000) {
        // Crear el elemento de notificación si no existe
        let notification = document.querySelector('.notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Establecer el mensaje y mostrar la notificación
        notification.textContent = message;
        notification.classList.add('show');
        
        // Ocultar la notificación después del tiempo especificado
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    }
    
    // Manejar el envío del formulario de suscripción
    const subscriptionForms = document.querySelectorAll('#subscription-form');
    
    if (subscriptionForms.length > 0) {
        subscriptionForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obtener el valor del email
                const emailInput = this.querySelector('input[type="email"]');
                const email = emailInput.value;
                
                // Aquí podrías agregar código para enviar el email a tu sistema
                // Por ejemplo, usando fetch para enviar a un backend
                
                // Mostrar notificación de éxito
                showNotification('¡Gracias por suscribirte! Recibirás nuestras actualizaciones.', 4000);
                
                // Limpiar el formulario
                emailInput.value = '';
            });
        });
    }
});