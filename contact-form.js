// Configuración de EmailJS para el formulario de contacto
(function() {
    // Inicializar EmailJS con tu clave pública
    // Clave pública de EmailJS proporcionada
    emailjs.init('e5PxbCnfkahqy1AdT');
    
    // Obtener el formulario y añadir evento de envío
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Mostrar estado de carga
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
        
        // Obtener los valores del formulario
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Enviar el email usando EmailJS
        // Service ID y Template ID proporcionados
        emailjs.send('service_iarj6wc', 'template_s1ixice', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Mostrar mensaje de éxito
                const formContainer = document.querySelector('.contact-form');
                formContainer.innerHTML = `
                    <div class="alert alert-success text-center" role="alert">
                        <i class="fas fa-check-circle fa-3x mb-3"></i>
                        <h4>¡Mensaje enviado con éxito!</h4>
                        <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                    </div>
                `;
            }, function(error) {
                console.log('FAILED...', error);
                
                // Restaurar el botón y mostrar error
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                
                // Mostrar mensaje de error
                if (!document.querySelector('.form-error-message')) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'alert alert-danger form-error-message mt-3';
                    errorDiv.textContent = 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contáctame directamente por email.';
                    document.getElementById('contact-form').appendChild(errorDiv);
                }
            });
    });
})();