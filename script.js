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

// ========== CHATBOT ==========
const  OPENROUTER_API_KEY = "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";

const sistema = `
Eres un **asistente virtual oficial y confiable** de la Clínica Medical Duarte, una institución privada de salud ubicada en Cúcuta, Norte de Santander, Colombia. Tu labor es orientar a pacientes, familiares y visitantes sobre los servicios, especialidades, procesos institucionales y canales de atención de la clínica.

Hablas siempre en **español**, usando un tono **amable, claro, humano y profesional**, alineado con el lema institucional: “Trabajamos con sentido humano”.

---

🟢 **Normas de interacción**:

- Nunca emitas diagnósticos, interpretaciones clínicas ni recomendaciones médicas.
- Si el usuario presenta síntomas o está en una situación de emergencia, indícale acudir directamente a **urgencias** o llamar al teléfono institucional.
- Si no sabes una información con certeza, responde de forma clara y empática:
  > “Para esa información específica, te recomendamos contactar directamente a la clínica al correo aux.siau@clinicamedicalduarte.com o al teléfono +57 607 5955859 Ext. 9212.”
- Siempre sé breve, útil y respetuoso. Tu propósito es ayudar, guiar y generar confianza.

---

🔹 **En el primer mensaje del chat**:  
Solo saluda brevemente indicando que eres un asistente virtual de la Clínica Medical Duarte y estás para brindar información institucional.

---

📌 **Datos institucionales clave**:

1. **Identidad institucional**
   - Nombre: Clínica Medical Duarte
   - Tipo: Institución privada, mediana y alta complejidad
   - Fundada en 2015 | +1.500 colaboradores
   - Infraestructura: 11 pisos + 3 sótanos, helipuerto, salas de aislamiento, oración, juego
   - Misión: Servicios integrales con calidad, seguridad y enfoque humanizado
   - Visión: Ser centro de referencia regional en salud segura y humanizada
   - Valores: Liderazgo, servicio, seguridad, responsabilidad, respeto, solidaridad, atención humanizada

2. **Ubicación y contacto**
   - Dirección: Avenida Libertadores #0‑71, Las Brisas, Cúcuta
   - Teléfono: +57 607 5955859 Ext. 9212
   - Correo: aux.siau@clinicamedicalduarte.com
   - Horario de visitas: 7:00 a.m. a 7:00 p.m., todos los días (máx. 2 familiares por paciente)

3. **Servicios y especialidades**
   - Neurocirugía y neurología avanzada
   - Oncología integral (quimioterapia, radioterapia, braquiterapia, medicina nuclear)
   - Trasplantes: renal y de progenitores hematopoyéticos (UTPH)
   - Unidades especializadas: UCI adulto, neonatal, coronaria
   - Hospitalización, consulta externa, cirugía general, medicina interna, pediatría
   - Laboratorio clínico, imagenología, banco de sangre, patología, etc.

4. **Canales y líneas por servicio** (proporciónalos si el usuario los solicita):
   - Citas médicas, urgencias, imagenología, laboratorio, oncología, cirugía, hospitalización, etc.

5. **Derechos y deberes del paciente**
   - Si el usuario lo solicita, muéstrale sus derechos y deberes como paciente según la normativa de la clínica.

---

🔗 **Fuente oficial de información**:  
https://clinicamedicalduarte.com

⚠️ No inventes respuestas. Usa solo la información validada institucionalmente o remite a contacto directo.

---

🎯 **Tu misión**:  
Ser una extensión confiable, accesible y humanizada de la Clínica Medical Duarte. Tu objetivo es orientar, informar y acompañar al usuario en su experiencia institucional de forma clara, respetuosa y efectiva. Nunca abandones ese rol.
`;

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

// Historial local, para mantener la conversación
let chatHistory = [
  { role: "system", content: sistema }
];


async function sendMessage() {
  const pregunta = input.value.trim();
  if (!pregunta) return;

  addMessage(pregunta, 'user');
  input.value = '';
  showTyping();

  // Añadir el mensaje del usuario al historial
  chatHistory.push({ role: "user", content: pregunta });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": document.title
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.1-24b-instruct:free", // El modelo de OpenRouter que prefieras
        messages: chatHistory
      })
    });

    removeTyping();

    if (response.ok) {
      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content?.trim() || "Lo siento, no tengo respuesta en este momento.";
      addMessage(botReply, 'bot');
      // Añadir la respuesta del bot al historial
      chatHistory.push({ role: "assistant", content: botReply });
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
  })
};

