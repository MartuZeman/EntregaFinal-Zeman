//Variables

let medicos = JSON.parse(localStorage.getItem("medicos")) || [
  {
    nombre: "Dr. Juan Pérez",
    especialidad: "Cardiología",
    horarios: "Lunes a Viernes 9-13",
    foto: "assets/img/medico.png",
  },
  {
    nombre: "Dra. María López",
    especialidad: "Pediatría",
    horarios: "Martes y Jueves 14-18",
    foto: "assets/img/medica.png",
  },
  {
    nombre: "Dr. Carlos Gómez",
    especialidad: "Dermatología",
    horarios: "Lunes, Miércoles y Viernes 10-15",
    foto: "assets/img/medico1.png",
  },
  {
    nombre: "Dra. Ana Torres",
    especialidad: "Ginecología",
    horarios: "Martes a Sábado 8-12",
    foto: "assets/img/medica1.png",
  },
  {
    nombre: "Dr. Luis Martínez",
    especialidad: "Neurología",
    horarios: "Lunes y Miércoles 9-14",
    foto: "assets/img/medico2.png",
  },
  {
    nombre: "Dra. Paula Fernández",
    especialidad: "Odontología",
    horarios: "Martes a Viernes 10-16",
    foto: "assets/img/medica2.png",
  },
  {
    nombre: "Dr. Ricardo Díaz",
    especialidad: "Traumatología",
    horarios: "Lunes a Viernes 8-12",
    foto: "assets/img/medico3.png",
  },
  {
    nombre: "Dra. Sofía García",
    especialidad: "Oftalmología",
    horarios: "Miércoles y Viernes 13-18",
    foto: "assets/img/medica3.png",
  },
];
let indiceInicio = 0;
let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
let turnos = JSON.parse(localStorage.getItem("turnos")) || [];

const contenedor = document.querySelector(".contenedor-medicos");
const articulos = contenedor.querySelectorAll("article.medicos");
const flechaIzquierda = contenedor.querySelector("article.flecha:first-of-type img");
const flechaDerecha = contenedor.querySelector("article.flecha:last-of-type img");
const formulario = document.querySelector(".formulario-medicos");
const formularioPacientes = document.querySelector("#form-paciente");
const selectPaciente = document.getElementById("paciente-turno");
const selectMedico = document.getElementById("medico-turno");
const formularioTurnos = document.getElementById("form-turno");

//Funcion actualizar carrusel
function renderizarCarrusel() {
  for (let i = 0; i < articulos.length; i++) {
    const indiceMedico = (indiceInicio + i) % medicos.length;
    const medico = medicos[indiceMedico];

    const img = articulos[i].querySelector("img");
    if (img !== null) {
      img.src = medico.foto;
      img.alt = `Foto de ${medico.nombre}`;
    }

    const p = articulos[i].querySelector("p");
    if (p !== null) {
      p.innerHTML = `
        <strong>${medico.nombre}</strong><br />
        ${medico.especialidad}<br />
        <em>${medico.horarios}</em>
      `;
    }
  }
}

renderizarCarrusel();

//Eventos flechas carrusel
flechaDerecha.addEventListener("click", () => {
  indiceInicio--;
  if (indiceInicio < 0) {
    indiceInicio = medicos.length - 1;
  }
  renderizarCarrusel();
});

flechaIzquierda.addEventListener("click", () => {
  indiceInicio++;
  if (indiceInicio >= medicos.length) {
    indiceInicio = 0;
  }
  renderizarCarrusel();
});

//Formulario medicos
function guardarMedicos() {
  localStorage.setItem("medicos", JSON.stringify(medicos));
}

function agregarMedico(nombre, especialidad, horarios, foto) {
  const nuevoMedico = {
    nombre,
    especialidad,
    horarios,
    foto,
  };

  medicos.push(nuevoMedico);
  guardarMedicos();
  cargarMedicosEnSelect();
  renderizarCarrusel();
}
//Evento sumbit para formulario medicos
formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = formulario.querySelector('input[name="nombre"]').value.trim();
  const especialidad = formulario
    .querySelector('input[name="especialidad"]')
    .value.trim();
  const horarios = formulario
    .querySelector('input[name="horarios"]')
    .value.trim();
  const foto = formulario.querySelector('input[name="foto"]').value.trim();

  if (!nombre || !especialidad || !horarios || !foto) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  agregarMedico(nombre, especialidad, horarios, foto);

  formulario.querySelector('input[name="nombre"]').value = "";
  formulario.querySelector('input[name="especialidad"]').value = "";
  formulario.querySelector('input[name="horarios"]').value = "";
  formulario.querySelector('input[name="foto"]').value = "";
});

//Formulario Pacientes
function guardarPacientes() {
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

function agregarPaciente(nombre, email, obraSocial) {
  const nuevoPaciente = {
    nombre,
    email,
    obraSocial,
  };

  pacientes.push(nuevoPaciente);
  guardarPacientes();
  cargarPacientesEnSelect();
}

// Evento submit para el formulario pacientes
formularioPacientes.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = formularioPacientes
    .querySelector('input[name="nombre"]')
    .value.trim();
  const email = formularioPacientes
    .querySelector('input[name="email"]')
    .value.trim();
  const obraSocial = formularioPacientes
    .querySelector('input[name="obraSocial"]')
    .value.trim();

  if (!nombre || !email) {
    alert("Por favor, completá el nombre y el email.");
    return;
  }

  agregarPaciente(nombre, email, obraSocial);

  formularioPacientes.querySelector('input[name="nombre"]').value = "";
  formularioPacientes.querySelector('input[name="email"]').value = "";
  formularioPacientes.querySelector('input[name="obraSocial"]').value = "";
});
