//Variables
let medicos = [];

let indiceInicio = 0;
let pacientes = [];
let turnos = [];

const contenedor = document.querySelector(".contenedor-medicos");
const articulos = document.querySelectorAll("article.medicos");
const imagenesMedicos = document.querySelectorAll("article.medicos img");
const textoMedicos = document.querySelectorAll("article.medicos p");
const flechaIzquierda = document.getElementById("flecha-derecha");
const flechaDerecha = document.getElementById("flecha-izquierda");
const btnAgregarMedico = document.getElementById("BtnAgregarMedico");
const formulario = document.querySelector(".formulario-medicos");
const nombreMedico = document.getElementById("nombre-medico");
const especialidadMedico = document.getElementById("especialidad-medico");
const horariosMedico = document.getElementById("horarios-medico");
const imgMedico = document.getElementById("foto-medico");
const camposFormulario = document.querySelectorAll("#form-medico input");

const btnModoOscuro = document.getElementById("btnModoOscuro");
const body = document.body;
const temaGuardado = localStorage.getItem("tema");

//Guardar medicos iniciales

//Carrusel funcion actualizar imagenes
function actualizarCarrusel() {
  for (let i = 0; i < articulos.length; i += 1) {
    const indiceMedico = (i + indiceInicio) % medicos.length;
    let especialista =
      medicos[indiceMedico].nombre +
      "<br>" +
      medicos[indiceMedico].especialidad +
      "<br>" +
      medicos[indiceMedico].horarios;
    imagenesMedicos[i].src = medicos[indiceMedico].foto;
    textoMedicos[i].innerHTML = especialista;
  }
}

async function obtenerMedicos() {
  try {
    const respuesta = await fetch("data.json");

    if (!respuesta.ok) {
      throw new Error("Error en la respuesta de la petición al servidor");
    }

    if (localStorage.getItem("medicos")) {
      medicos = JSON.parse(localStorage.getItem("medicos"));
    } else {
      medicos = await respuesta.json();
      localStorage.setItem("medicos", JSON.stringify(medicos));
    }

    actualizarCarrusel(medicos);
  } catch (error) {
    console.error("Error fetching doctors:", error);
  }
}

obtenerMedicos();

//Eventos para mover el carrusel
flechaDerecha.addEventListener("click", () => {
  indiceInicio = indiceInicio - 1;
  if (indiceInicio < 0) {
    indiceInicio = medicos.length - 1;
  }

  actualizarCarrusel();
});

flechaIzquierda.addEventListener("click", () => {
  indiceInicio = indiceInicio + 1;
  if (indiceInicio >= medicos.length) {
    indiceInicio = 0;
  }
  actualizarCarrusel();
});

function guardarMedicos() {
  localStorage.setItem("medicos", JSON.stringify(medicos));
}

function nuevoMedico(n, e, h, img) {
  this.nombre = n;
  this.especialidad = e;
  this.horarios = h;
  this.foto = img;
}

function limpiarCampos(campoFormulario) {
  campoFormulario.forEach((campos) => {
    campos.value = "";
  });
}

formulario.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (nombreMedico.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe completar el nombre del medico",
    });
  } else if (especialidadMedico.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe completar la especialidad del medico",
    });
  } else if (horariosMedico.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe completar el horario del medico",
    });
  } else if (imgMedico.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Debe cargar la imagen del medico",
    });
  } else {
    n = nombreMedico.value;
    e = especialidadMedico.value;
    h = horariosMedico.value;
    img = imgMedico.value;

    medicos.push(new nuevoMedico(n, e, h, img));

    console.log(camposFormulario);

    guardarMedicos();
    actualizarCarrusel();
    limpiarCampos(camposFormulario);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Quedo guardado el nuevo medico",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});

//modo oscuro

btnModoOscuro.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("tema", "dark");
  } else {
    localStorage.setItem("tema", "light");
  }
});

if (temaGuardado === "dark") {
  body.classList.add("dark-mode");
} else {
  // Asegurarse de que no haya un modo oscuro residual si la preferencia es light
  body.classList.remove("dark-mode");
}
