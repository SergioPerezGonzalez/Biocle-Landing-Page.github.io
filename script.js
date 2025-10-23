// Script personalizado para Biocle - Funcionalidad básica y modular

// Función para inicializar la página al cargar
function inicializarPagina() {
    console.log('Página de Biocle inicializada correctamente.');
    agregarEventosNavegacion();
    agregarValidacionFormulario();
    agregarAnimacionesEntrada();
    // Mostrar sección inicial por defecto
    mostrarSeccion('inicio');
}

// Función para manejar la navegación entre secciones (mostrar/ocultar)
function mostrarSeccion(idSeccion) {
    // Ocultar todas las secciones
    const todasLasSecciones = document.querySelectorAll('section');
    todasLasSecciones.forEach(seccion => {
        seccion.classList.remove('seccion-activa');
        seccion.classList.add('seccion-oculta');
    });

    // Mostrar la sección seleccionada
    const seccionSeleccionada = document.getElementById(idSeccion);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.remove('seccion-oculta');
        seccionSeleccionada.classList.add('seccion-activa');
    }

    // Actualizar estado activo en navegación
    actualizarNavegacionActiva(idSeccion);
}

// Función para actualizar el enlace activo en la navegación (desktop y móvil)
function actualizarNavegacionActiva(idSeccion) {
    // Actualizar navegación desktop
    const enlacesDesktop = document.querySelectorAll('.navbar-nav .nav-link');
    enlacesDesktop.forEach(enlace => {
        enlace.classList.remove('active');
        if (enlace.getAttribute('href') === `#${idSeccion}`) {
            enlace.classList.add('active');
        }
    });

    // Actualizar navegación móvil
    const enlacesMovil = document.querySelectorAll('.nav-link-mobile');
    enlacesMovil.forEach(enlace => {
        enlace.classList.remove('active');
        if (enlace.getAttribute('data-section') === idSeccion) {
            enlace.classList.add('active');
        }
    });
}

// Función para agregar eventos a los enlaces de navegación (desktop y móvil)
function agregarEventosNavegacion() {
    // Eventos para navegación desktop
    const enlacesDesktop = document.querySelectorAll('.navbar-nav .nav-link');
    enlacesDesktop.forEach(enlace => {
        enlace.addEventListener('click', function(evento) {
            evento.preventDefault();
            const idSeccion = this.getAttribute('href').substring(1);
            mostrarSeccion(idSeccion);
        });
    });

    // Eventos para navegación móvil
    const enlacesMovil = document.querySelectorAll('.nav-link-mobile');
    enlacesMovil.forEach(enlace => {
        enlace.addEventListener('click', function(evento) {
            evento.preventDefault();
            const idSeccion = this.getAttribute('data-section');
            mostrarSeccion(idSeccion);
        });
    });
}

// Función para validar y manejar el envío del formulario de contacto
function agregarValidacionFormulario() {
    const formularioContacto = document.getElementById('contactForm');
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(evento) {
            evento.preventDefault();
            if (validarFormulario()) {
                // Simular envío (en producción, aquí iría la lógica real de envío)
                mostrarMensajeExito('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
                formularioContacto.reset();
            }
        });
    }
}

// Función auxiliar para validar los campos del formulario
function validarFormulario() {
    const nombre = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const mensaje = document.getElementById('contactMessage').value.trim();

    if (!nombre) {
        mostrarMensajeError('Por favor, ingresa tu nombre.');
        return false;
    }

    if (!email || !esEmailValido(email)) {
        mostrarMensajeError('Por favor, ingresa un correo electrónico válido.');
        return false;
    }

    if (!mensaje) {
        mostrarMensajeError('Por favor, ingresa un mensaje.');
        return false;
    }

    return true;
}

// Función auxiliar para verificar si el email es válido
function esEmailValido(email) {
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patronEmail.test(email);
}

// Función para mostrar mensajes de error
function mostrarMensajeError(mensaje) {
    mostrarMensaje(mensaje, 'danger');
}

// Función para mostrar mensajes de éxito
function mostrarMensajeExito(mensaje) {
    mostrarMensaje(mensaje, 'success');
}

// Función auxiliar para mostrar mensajes usando Bootstrap alerts
function mostrarMensaje(mensaje, tipo) {
    const contenedorMensaje = document.createElement('div');
    contenedorMensaje.className = `alert alert-${tipo} alert-dismissible fade show mt-3`;
    contenedorMensaje.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const formulario = document.getElementById('contactForm');
    formulario.appendChild(contenedorMensaje);

    // Auto-remover el mensaje después de 5 segundos
    setTimeout(() => {
        if (contenedorMensaje.parentNode) {
            contenedorMensaje.remove();
        }
    }, 5000);
}

// Función para agregar animaciones de entrada a las secciones
function agregarAnimacionesEntrada() {
    const secciones = document.querySelectorAll('section');
    const opcionesObservador = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('fade-in');
            }
        });
    }, opcionesObservador);

    secciones.forEach(seccion => {
        observador.observe(seccion);
    });
}

// Función para manejar el cambio de tamaño de ventana (responsividad adicional)
function manejarCambioTamanoVentana() {
    window.addEventListener('resize', function() {
        console.log('Ventana redimensionada. Ancho actual:', window.innerWidth);
        ajustarComportamientoMovil();
    });
}

// Función para ajustar comportamiento específico de móviles
function ajustarComportamientoMovil() {
    const esMovil = window.innerWidth <= 991;
    const body = document.body;
    const contenedor = document.getElementById('contenedor-secciones');

    if (esMovil) {
        // Deshabilitar scroll del body en móviles
        body.style.overflow = 'hidden';
        body.style.height = '100vh';

        // Ajustar contenedor para navbar superior
        if (contenedor) {
            contenedor.style.height = 'calc(100vh - 56px)';
            contenedor.style.overflow = 'hidden';
            contenedor.style.marginTop = '56px';
        }

        // Asegurar que las secciones permitan scroll interno pero bloqueen navegación externa
        const secciones = document.querySelectorAll('section');
        secciones.forEach(seccion => {
            seccion.style.overflowY = 'auto';
            seccion.style.maxHeight = 'calc(100vh - 56px)';
            seccion.style.paddingTop = '6rem';
            seccion.style.paddingBottom = '2rem';
        });
    } else {
        // Restaurar comportamiento normal en desktop
        body.style.overflow = '';
        body.style.height = '';

        if (contenedor) {
            contenedor.style.height = '';
            contenedor.style.overflow = '';
            contenedor.style.marginTop = '';
        }

        const secciones = document.querySelectorAll('section');
        secciones.forEach(seccion => {
            seccion.style.overflowY = '';
            seccion.style.maxHeight = '';
            seccion.style.paddingTop = '';
            seccion.style.paddingBottom = '';
        });
    }
}

// Ejecutar inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarPagina();
    manejarCambioTamanoVentana();
    ajustarComportamientoMovil(); // Aplicar ajustes iniciales para móviles
});

// Función de utilidad para depuración (puede eliminarse en producción)
function registrarEvento(evento, descripcion) {
    console.log(`Evento registrado: ${evento} - ${descripcion}`);
}