# Instrucciones para configurar EmailJS en el Formulario de Contacto

Este documento explica cómo configurar el servicio EmailJS para que el formulario de contacto envíe mensajes a tu dirección de correo electrónico (jardielvega7@gmail.com).

## Paso 1: Crear una cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/) y regístrate para una cuenta gratuita
2. El plan gratuito permite enviar hasta 200 correos electrónicos por mes, lo cual debería ser suficiente para un portafolio personal

## Paso 2: Configurar un servicio de email

1. Una vez dentro de tu cuenta, ve a la sección "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta de correo electrónico
5. Nombra tu servicio (por ejemplo, "contact_service")
6. Guarda el ID del servicio (lo necesitarás para configurar el script)

## Paso 3: Crear una plantilla de email

1. Ve a la sección "Email Templates"
2. Haz clic en "Create New Template"
3. Diseña tu plantilla con un formato similar a este:

```
Asunto: {{subject}}

Nombre: {{name}}
Email: {{email}}

Mensaje:
{{message}}
```

4. Guarda la plantilla y anota el ID de la plantilla

## Paso 4: Obtener tu clave pública

1. Ve a la sección "Account" > "API Keys"
2. Copia tu clave pública (Public Key)

## Estado de la configuración: ✅ COMPLETADO

El archivo `contact-form.js` ya ha sido configurado con los siguientes datos:

```javascript
emailjs.init('e5PxbCnfkahqy1AdT');
...
emailjs.send('service_iarj6wc', 'template_s1ixice', formData)
```

> **Nota:** Esta configuración ya está lista para funcionar con tu cuenta de EmailJS y enviará correos a jardielvega7@gmail.com.

## Paso 6: Probar el formulario

1. Sube los archivos actualizados a tu servidor web
2. Completa el formulario de contacto en tu sitio web y envíalo
3. Verifica que recibas el correo electrónico en tu cuenta (jardielvega7@gmail.com)

## Notas importantes

- El plan gratuito de EmailJS tiene un límite mensual, así que monitorea su uso
- Por seguridad, nunca compartas tu clave privada (Private Key) de EmailJS
- Si necesitas más funcionalidades o un mayor volumen de correos, considera actualizar a un plan de pago