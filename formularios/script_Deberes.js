const deberes = [
  {
    title: "Brindar información clara, completa y veraz sobre su estado de salud",
    desc: "El paciente debe comunicar a los profesionales toda la información relevante sobre su condición para recibir la mejor atención.",
    img: "../assents/Deberes/Deberes1.png"
  },
  {
    title: "Cumplir las normas e instrucciones de los profesionales de salud",
    desc: "Es deber seguir las indicaciones médicas y respetar los protocolos establecidos por el personal de salud.",
    img: "../assents/Deberes/Deberes2.png"
  },
  {
    title: "Tratar con respeto al personal de salud y demás pacientes",
    desc: "Todos deben ser tratados con respeto, cortesía y consideración dentro del entorno de salud.",
    img: "../assents/Deberes/Deberes3.png"
  },
  {
    title: "Cuidar y hacer uso responsable de los recursos e instalaciones",
    desc: "El paciente debe contribuir al cuidado del lugar donde recibe atención para garantizar su conservación.",
    img: "../assents/Deberes/Deberes4.png"
  },
  {
    title: "Firmar el consentimiento informado para procedimientos",
    desc: "Es necesario dar consentimiento por escrito cuando se va a realizar un procedimiento médico.",
    img: "../assents/Deberes/Deberes5.png"
  },
  {
    title: "Asumir la responsabilidad del cuidado de su salud y entorno",
    desc: "Mantener hábitos saludables y actuar proactivamente en el cuidado personal y comunitario es un deber del paciente.",
    img: "../assents/Deberes/Deberes6.png"
  },
  {
    title: "Participar en actividades de promoción y prevención",
    desc: "Involucrarse en campañas y programas que promuevan la salud ayuda a prevenir enfermedades y mejora la calidad de vida.",
    img: "../assents/Deberes/Deberes7.png"
  },
  {
    title: "Reportar efectos adversos de medicamentos y tratamientos",
    desc: "Es importante informar si se presentan reacciones no esperadas a los tratamientos prescritos.",
    img: "../assents/Deberes/Deberes8.png"
  },
  {
    title: "Abstenerse de realizar actos que pongan en riesgo la vida",
    desc: "No se debe realizar ninguna acción que pueda afectar la vida propia o la de otros dentro del entorno clínico.",
    img: "../assents/Deberes/Deberes9.png"
  },
  {
    title: "Contribuir con el cumplimiento de las normas del sistema de salud",
    desc: "Cumplir con los requisitos, citas, autorizaciones y pagos es parte del compromiso con el sistema.",
    img: "../assents/Deberes/Deberes10.png"
  }
];

// QUIZ DE DEBERES
const quizDataDeberes = [
  { q: "¿Debes informar a los profesionales sobre tu estado de salud?", options: ["Sí", "No"], correct: 0 },
  { q: "¿Es obligatorio seguir las indicaciones médicas?", options: ["Sí", "No"], correct: 0 },
  { q: "¿Puedes faltar el respeto al personal de salud?", options: ["Sí", "No"], correct: 1 },
  { q: "¿Debes cuidar las instalaciones de la clínica?", options: ["Sí", "No"], correct: 0 },
  { q: "¿Es necesario firmar el consentimiento para ciertos procedimientos?", options: ["Sí", "No"], correct: 0 },
  { q: "¿Puedes omitir informar efectos adversos de medicamentos?", options: ["Sí", "No"], correct: 1 },
  { q: "¿Debes participar en actividades de prevención y promoción de la salud?", options: ["Sí", "No"], correct: 0 },
  { q: "¿Puedes realizar actos que pongan en riesgo tu vida o la de otros?", options: ["Sí", "No"], correct: 1 }
];

function obtenerPreguntasAleatorias(cantidad) {
  const copia = [...quizDataDeberes];
  const seleccionadas = [];
  while (seleccionadas.length < cantidad && copia.length > 0) {
    const idx = Math.floor(Math.random() * copia.length);
    seleccionadas.push(copia.splice(idx, 1)[0]);
  }
  return seleccionadas;
}

// === ESTADO DE LECTURA Y RENDER CARDS ===
let currentDeber = 0;
let leidos = Array(deberes.length).fill(false);
const grid = document.getElementById('derechosGrid'); // Reusar id por compatibilidad

deberes.forEach((deber, idx) => {
  const card = document.createElement('div');
  card.className = "derecho-card";
  card.innerHTML = `
    <div class="derecho-check">✔️</div>
    <div class="derecho-num">${idx + 1}</div>
    <div class="derecho-img"><img src="${deber.img}" alt="Imagen ${idx + 1}"></div>
    <div class="derecho-title">${deber.title}</div>
  `;
  card.onclick = () => openModal(idx);
  grid.appendChild(card);
});
actualizaChecklist();

function actualizaChecklist() {
  const cards = document.querySelectorAll('.derecho-card');
  leidos.forEach((l, i) => {
    cards[i].classList.toggle('leido', l);
  });
}

// === MODAL ===
const modalBg = document.getElementById('modal-bg');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

function openModal(idx) {
  currentDeber = idx;
  leidos[idx] = true;
  showDeber(currentDeber);
  modalBg.classList.add('active');
  actualizaChecklist();
}
function showDeber(idx) {
  const deber = deberes[idx];
  modalTitle.innerText = deber.title;
  modalDesc.innerText = deber.desc;
  modalImg.src = deber.img || '';
  modalImg.style.display = deber.img ? "" : "none";
  modalPrev.disabled = idx === 0;
  modalNext.disabled = idx === deberes.length - 1;
}
modalPrev.onclick = e => { e.stopPropagation(); if (currentDeber > 0) openModal(currentDeber - 1); };
modalNext.onclick = e => { e.stopPropagation(); if (currentDeber < deberes.length - 1) openModal(currentDeber + 1); };
modalClose.onclick = e => { e.stopPropagation(); modalBg.classList.remove('active'); window.speechSynthesis.cancel(); };
modalBg.onclick = e => { if (e.target === modalBg) modalBg.classList.remove('active'); window.speechSynthesis.cancel(); };

// === QUIZ DINÁMICO ===
const quizBtn = document.getElementById('quizBtn');
const quizBg = document.getElementById('quiz-bg');
const quizClose = document.getElementById('quizClose');
const quizBody = document.getElementById('quizBody');
const quizNext = document.getElementById('quizNext');
const quizResult = document.getElementById('quizResult');

let quizStep = 0, quizScore = 0, quizSelected = -1;
let preguntasDelQuiz = [];

quizBtn.onclick = function () {
  preguntasDelQuiz = obtenerPreguntasAleatorias(5);
  quizBg.classList.add('active');
  quizStep = 0; quizScore = 0; quizSelected = -1;
  quizResult.textContent = '';
  showQuiz();
};
quizClose.onclick = () => quizBg.classList.remove('active');
quizBg.onclick = e => { if (e.target === quizBg) quizBg.classList.remove('active'); };

function showQuiz() {
  let q = preguntasDelQuiz[quizStep];
  quizBody.innerHTML = `<div class="quiz-question">${q.q}</div>
    <div class="quiz-options">${q.options.map((opt, i) => `
      <button class="quiz-option" data-i="${i}">${opt}</button>`).join('')}</div>`;
  quizNext.style.display = 'block';
  quizNext.disabled = true;
  quizSelected = -1;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.onclick = function () {
      quizSelected = +btn.dataset.i;
      document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizNext.disabled = false;
    };
  });
  quizNext.textContent = quizStep < preguntasDelQuiz.length - 1 ? "Siguiente" : "Ver resultado";
}
quizNext.onclick = () => {
  if (quizSelected === preguntasDelQuiz[quizStep].correct) quizScore++;
  quizStep++;
  if (quizStep < preguntasDelQuiz.length) showQuiz();
  else {
    quizBody.innerHTML = '';
    quizNext.style.display = 'none';
    quizResult.innerHTML = `¡Puntaje: <b>${quizScore}/${preguntasDelQuiz.length}</b>!<br>${quizScore === preguntasDelQuiz.length ? "🎉 ¡Excelente!" : "Sigue explorando para aprender más."}`;
  }
};

function obtenerIniciales(nombre) {
  if (!nombre) return 'U';
  const partes = nombre.trim().split(' ').filter(Boolean);
  if (partes.length >= 2) return (partes[0][0] + partes[1][0]).toUpperCase();
  if (partes.length === 1 && partes[0].length > 1) return partes[0].slice(0,2).toUpperCase();
  return 'U';
}

function mostrarDatosUsuarioEnPaginas() {
  const userData = JSON.parse(sessionStorage.getItem('userData') || localStorage.getItem('userData') || '{}');
  if (!userData || !userData.nombre) return;
  const iniciales = obtenerIniciales(userData.nombre);

  if (document.getElementById('inicialesHeader')) document.getElementById('inicialesHeader').textContent = iniciales;
  if (document.getElementById('inicialesMenu')) document.getElementById('inicialesMenu').textContent = iniciales;
  if (document.getElementById('nombreUsuarioMenu')) document.getElementById('nombreUsuarioMenu').textContent = "Nombre: " + userData.nombre;
  if (document.getElementById('documentoInfo')) document.getElementById('documentoInfo').textContent = "# de documento: " + (userData.tipoDocumento || "") + " " + (userData.numeroDocumento || "");
  if (document.getElementById('habitacionInfo')) document.getElementById('habitacionInfo').textContent = "Habitación: " + (userData.habitacion || "");
  if (document.getElementById('servicioInfo')) document.getElementById('servicioInfo').textContent = "Servicio: " + (userData.servicio || "");
}
document.addEventListener('DOMContentLoaded', mostrarDatosUsuarioEnPaginas);