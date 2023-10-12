const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const campos = {
  usuario: false,
  nombre: false,
  password: false,
  correo: false,
  telefono: false,
};

// Seleccionamos el Formulario:
const formulario = document.getElementById("formulario");
// Seleccionmos todos los Inputs del Formulario:
const inputs = document.querySelectorAll("#formulario input");

// Funcion para Validar los Input de acuerdo a las Expresiones Regulares:
const validarFormulario = (e) => {
  switch (e) {
    case "nombre":
      break;

    default:
      break;
  }
};

// Recorremos cada uno de los inputs:
inputs.forEach((input) => {
  // Evento que escucha cuando suelta el Teclado Precionado:
  input.addEventListener("keyup", validarFormulario);
  // Evento que selecciona el campos del input:
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
});

// ESTA VALIDACION ES DEL BOOTSTRAP:
// Seccionamos el Elemento del Formulario:
var forms = document.querySelectorAll(".needs-validation");
// Convertimos todos los elementos dentro del formulario en un Array:
Array.prototype.slice
  .call(document.querySelectorAll('input[type="checkbox"]'))
  .forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      // Verifica si al menos un checkbox está seleccionado
      const alMenosUnoSeleccionado = Array.from(
        document.querySelectorAll('input[type="checkbox"]')
      ).some(function (checkbox) {
        return checkbox.checked;
      });

      // Elimina el atributo 'required' de todos los checkboxes si al menos uno está seleccionado
      Array.prototype.slice
        .call(document.querySelectorAll('input[type="checkbox"]'))
        .forEach(function (checkbox) {
          if (alMenosUnoSeleccionado) {
            checkbox.removeAttribute("required");
          } else {
            checkbox.setAttribute("required", "required");
          }
        });
    });
  });

Array.prototype.slice.call(forms).forEach(function (form) {
  console.log(form);
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        guardar();
      }
      form.classList.add("was-validated");
    },
    false
  );
});
