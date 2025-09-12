// Script para manejo de múltiples idiomas
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const languageToggle = document.getElementById('language-toggle');
    const spanElements = languageToggle.querySelectorAll('span');
    
    // Idioma predeterminado
    let currentLang = 'es';
    
    // Intentar recuperar el idioma guardado
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        updateActiveLanguage(currentLang);
    }
    
    // Inicializar los textos con el idioma actual
    updateTexts(currentLang);
    
    // Evento para cambiar el idioma
    languageToggle.addEventListener('click', function() {
        // Alternar entre idiomas
        currentLang = currentLang === 'es' ? 'en' : 'es';
        
        // Guardar preferencia en localStorage
        localStorage.setItem('preferredLanguage', currentLang);
        
        // Actualizar UI
        updateActiveLanguage(currentLang);
        
        // Actualizar textos
        updateTexts(currentLang);
    });
    
    // Función para actualizar la UI del selector de idioma
    function updateActiveLanguage(lang) {
        spanElements.forEach(span => {
            if ((span.textContent.trim() === 'ES' && lang === 'es') ||
                (span.textContent.trim() === 'EN' && lang === 'en')) {
                span.classList.add('active');
            } else {
                span.classList.remove('active');
            }
        });
    }
    
    // Función para actualizar todos los textos del sitio
    function updateTexts(lang) {
        // Actualizar cada elemento que tenga el atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    // Para el logo, siempre usamos innerHTML para asegurar que los símbolos se rendericen correctamente
                    if (key === 'logo-text' || translations[lang][key].includes('<')) {
                        element.innerHTML = translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }
                }
            }
        });
        
        // Actualizar los placeholders con el atributo data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            
            if (translations[lang] && translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
    }
});