document.addEventListener('DOMContentLoaded', () => {
  // === DATA DE DERECHOS ===
  const derechos = [
    {
      title: "Conocer todos los trámites administrativos",
      desc: "Puedes preguntar sobre cualquier trámite, proceso o gestión relacionada con tu atención en la clínica. Siempre tienes derecho a saber cómo se manejan tus solicitudes.",
      img: "../assents/Derechos/Derecho1.png"
    },
    {
      title: "Ser informado de todo lo relacionado con su atención",
      desc: "Tienes derecho a que el personal te explique tu diagnóstico, exámenes, tratamientos y cualquier aspecto relevante de tu atención.",
      img: "../assents/Derechos/Derecho2.png"
    },
    {
      title: "Recibir atención que salvaguarde su dignidad y respete sus valores",
      desc: "La atención debe ser respetuosa, proteger tu integridad y tener en cuenta tus creencias y valores personales.",
      img: "../assents/Derechos/Derecho3.png"
    },
    {
      title: "Privacidad y confidencialidad",
      desc: "Tu información médica y tu historia clínica son privadas y confidenciales. Nadie puede acceder a ellas sin tu autorización.",
      img: "../assents/Derechos/Derecho4.png"
    },
    {
      title: "Trato amable y humano",
      desc: "Todo el personal debe tratarte con amabilidad, cortesía y humanidad en todo momento, sin discriminación.",
      img: "../assents/Derechos/Derecho5.png"
    },
    {
      title: "Conocer información sobre enfermedad y tratamiento",
      desc: "Tienes derecho a que te expliquen tu enfermedad, los procedimientos y tratamientos recomendados, y a preguntar cualquier duda.",
      img: "../assents/Derechos/Derecho6.png"
    },
    {
      title: "Atención por personal capacitado",
      desc: "Serás atendido siempre por profesionales de la salud con la formación y experiencia necesarias para tu caso.",
      img: "../assents/Derechos/Derecho7.png"
    },
    {
      title: "Recibir prescripción y explicación de medicamentos",
      desc: "Debes recibir recetas claras y la explicación de cómo tomar tus medicamentos y para qué sirven.",
      img: "../assents/Derechos/Derecho8.png"
    },
    {
      title: "Aceptar o rechazar procedimientos",
      desc: "Puedes aceptar o rechazar cualquier procedimiento médico, dejando constancia escrita de tu decisión.",
      img: "../assents/Derechos/Derecho9.png"
    },
    {
      title: "Atención según tus necesidades",
      desc: "Debes recibir la atención adecuada según tus necesidades de salud, sin discriminación.",
      img: "../assents/Derechos/Derecho10.png"
    }
  ];

  // === QUIZ DE DERECHOS ===
  const quizDataDerechos = [
    { q: "¿Tienes derecho a conocer los trámites administrativos?", options: ["Sí", "No"], correct: 0 },
    { q: "¿Debes recibir atención respetuosa y digna?", options: ["Sí", "No"], correct: 0 },
    { q: "¿Se puede compartir tu historia clínica sin permiso?", options: ["Sí", "No"], correct: 1 },
    { q: "¿Debes recibir trato amable y humano?", options: ["Sí", "No"], correct: 0 },
    { q: "¿Tienes derecho a rechazar procedimientos?", options: ["Sí", "No"], correct: 0 },
    { q: "¿Te deben informar sobre tus tratamientos?", options: ["Sí", "No"], correct: 0 },
    { q: "¿La atención puede discriminar?", options: ["Sí", "No"], correct: 1 },
    { q: "¿Tu diagnóstico debe ser explicado?", options: ["Sí", "No"], correct: 0 },
    { q: "¿Cualquiera puede acceder a tu historia clínica?", options: ["Sí", "No"], correct: 1 },
    { q: "¿Puedes preguntar sobre tus medicamentos?", options: ["Sí", "No"], correct: 0 }
  ];

  function obtenerPreguntasAleatorias(cantidad) {
    const copia = [...quizDataDerechos];
    const seleccionadas = [];
    while (seleccionadas.length < cantidad && copia.length > 0) {
      const idx = Math.floor(Math.random() * copia.length);
      seleccionadas.push(copia.splice(idx, 1)[0]);
    }
    return seleccionadas;
  }

  // === RENDER TARJETAS ===
  let currentDerecho = 0;
  let leidos = Array(derechos.length).fill(false);
  const grid = document.getElementById('derechosGrid');

  derechos.forEach((derecho, idx) => {
    const card = document.createElement('div');
    card.className = "derecho-card";
    card.innerHTML = `
      <div class="derecho-check">✔️</div>
      <div class="derecho-num">${idx + 1}</div>
      <div class="derecho-img"><img src="${derecho.img}" alt="Imagen ${idx + 1}"></div>
      <div class="derecho-title">${derecho.title}</div>
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
    currentDerecho = idx;
    leidos[idx] = true;
    showDerecho(currentDerecho);
    modalBg.classList.add('active');
    actualizaChecklist();
  }
  function showDerecho(idx) {
    const derecho = derechos[idx];
    modalTitle.innerText = derecho.title;
    modalDesc.innerText = derecho.desc;
    modalImg.src = derecho.img || '';
    modalImg.style.display = derecho.img ? "" : "none";
    modalPrev.disabled = idx === 0;
    modalNext.disabled = idx === derechos.length - 1;
  }
  modalPrev.onclick = e => { e.stopPropagation(); if (currentDerecho > 0) openModal(currentDerecho - 1); };
  modalNext.onclick = e => { e.stopPropagation(); if (currentDerecho < derechos.length - 1) openModal(currentDerecho + 1); };
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
});

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