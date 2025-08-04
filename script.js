// ========== GUARDAR INFORMACIÓN DEL USUARIO ==========
function guardarInfoUsuarioDesdeFormulario() {
  const userData = {
    nombre: document.getElementById('nombreCompleto').value,
    tipoDocumento: document.getElementById('document-type').value,
    numeroDocumento: document.getElementById('numeroDocumento').value,
    habitacion: document.getElementById('habitacion').value,
    servicio: document.getElementById('hospital-services').value,
    recordar: document.getElementById('recordarDatos').checked,
    fechaRegistro: new Date().toISOString()
  };
  sessionStorage.setItem('userData', JSON.stringify(userData));
  if (userData.recordar) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}

// Usar en el submit del formulario de registro (index.html):
if(document.getElementById('userRegistrationForm')) {
  document.getElementById('userRegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    guardarInfoUsuarioDesdeFormulario();
    window.location.href = 'bienvenida.html';
  });
}

// ========== MOSTRAR INICIALES Y DATOS EN BIENVENIDA ==========
function mostrarBienvenidaUsuario() {
  const userData = JSON.parse(sessionStorage.getItem('userData') || localStorage.getItem('userData') || '{}');
  if (userData && userData.nombre) {
    // Nombre completo
    if(document.getElementById('nombreUsuario'))
      document.getElementById('nombreUsuario').textContent = userData.nombre;

    // Iniciales
    let iniciales = '';
    const nombres = userData.nombre.trim().split(' ').filter(Boolean);
    if (nombres.length >= 2) {
      iniciales = nombres[0][0] + nombres[1][0];
    } else if (nombres.length === 1 && nombres[0].length > 1) {
      iniciales = nombres[0].slice(0,2);
    } else {
      iniciales = 'U';
    }
    iniciales = iniciales.toUpperCase();

    if(document.getElementById('inicialesUsuario'))
      document.getElementById('inicialesUsuario').textContent = iniciales;
  }
}

// Ejecutar solo en bienvenida.html
if(document.getElementById('nombreUsuario') && document.getElementById('inicialesUsuario')) {
  document.addEventListener('DOMContentLoaded', mostrarBienvenidaUsuario);
}

/// Utilidad para obtener iniciales
function obtenerIniciales(nombre) {
  if (!nombre) return 'U';
  const partes = nombre.trim().split(' ').filter(Boolean);
  if (partes.length >= 2) return (partes[0][0] + partes[1][0]).toUpperCase();
  if (partes.length === 1 && partes[0].length > 1) return partes[0].slice(0,2).toUpperCase();
  return 'U';
}

// Mostrar iniciales y nombre en cada parte de la app
function mostrarDatosUsuarioEnPaginas() {
  const userData = JSON.parse(sessionStorage.getItem('userData') || localStorage.getItem('userData') || '{}');
  if (!userData || !userData.nombre) return;
  const iniciales = obtenerIniciales(userData.nombre);

  // HEADER (esquina arriba derecha)
  if (document.getElementById('inicialesHeader')) {
    document.getElementById('inicialesHeader').textContent = iniciales;
  }
  // MINI MENÚ
  if (document.getElementById('inicialesMenu')) {
    document.getElementById('inicialesMenu').textContent = iniciales;
  }
  if (document.getElementById('nombreUsuarioMenu')) {
    document.getElementById('nombreUsuarioMenu').textContent = "Nombre: " + userData.nombre;
  }
  if (document.getElementById('documentoInfo')) {
    document.getElementById('documentoInfo').textContent = "# de documento: " + (userData.tipoDocumento || "") + " " + (userData.numeroDocumento || "");
  }
  if (document.getElementById('habitacionInfo')) {
    document.getElementById('habitacionInfo').textContent = "Habitación: " + (userData.habitacion || "");
  }
  if (document.getElementById('servicioInfo')) {
    document.getElementById('servicioInfo').textContent = "Servicio: " + (userData.servicio || "");
  }
  // BIENVENIDA
  if (document.getElementById('inicialesUsuario')) {
    document.getElementById('inicialesUsuario').textContent = iniciales;
  }
  if (document.getElementById('nombreUsuario')) {
    document.getElementById('nombreUsuario').textContent = userData.nombre;
  }
}

// Llama esto en cada página donde quieras actualizar las iniciales (dashboard, bienvenida, etc)
document.addEventListener('DOMContentLoaded', mostrarDatosUsuarioEnPaginas);

// ========== CHATBOT (NO MODIFICADO) ==========
function toggleChatWidget() {
  const widget = document.getElementById('chatbot-widget');
  widget.classList.toggle('active');
}

const chat = document.getElementById('chat');
const input = document.getElementById('message');
const sendBtn = document.getElementById('send');

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'typing bot';
  typing.id = 'typing-indicator';
  typing.textContent = 'Escribiendo...';
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  const typingMsg = document.getElementById('typing-indicator');
  if (typingMsg) chat.removeChild(typingMsg);
}

async function sendMessage() {
  const pregunta = input.value.trim();
  if (!pregunta) return;

  addMessage(pregunta, 'user');
  input.value = '';
  showTyping();

  try {
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ pregunta })
    });

    removeTyping();

    if (response.ok) {
      const data = await response.json();
      addMessage(data.respuesta, 'bot');
    } else {
      addMessage('Error al obtener la respuesta del bot.', 'bot');
    }
  } catch (error) {
    removeTyping();
    addMessage('Hubo un problema de conexión.', 'bot');
  }
}

if (sendBtn && input) {
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}