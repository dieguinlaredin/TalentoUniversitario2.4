/**
 * Módulo: Perfil Académico
 * Guarda solo en memoria (ejemplo). Fecha de actualización: estática (en backend se usará timestamp).
 */

function basePath() {
  var path = window.location.pathname || '/';
  var i = path.lastIndexOf('/');
  return window.location.origin + (i >= 0 ? path.substring(0, i + 1) : '/');
}

var MESES_ES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function formatearFechaActual() {
  var d = new Date();
  return d.getDate() + ' de ' + MESES_ES[d.getMonth()] + ', ' + d.getFullYear();
}

window.initModuloDatosPersonales = function () {
  var form = document.getElementById('form-datos-personales');
  if (!form) return;

  var base = basePath();
  var iconDate = document.querySelector('.form-field__icon--date');
  if (iconDate && iconDate.tagName === 'IMG') {
    iconDate.src = base + 'images/calendario.png';
  }

  var store = window.__talentoStore && window.__talentoStore.datosPersonales;
  if (store) {
    if (form.nombreCompleto) form.nombreCompleto.value = store.nombreCompleto || '';
    if (form.disponibilidad) form.disponibilidad.value = store.disponibilidad || '';
    if (form.nombreCarrera) form.nombreCarrera.value = store.nombreCarrera || '';
    if (form.nivel) form.nivel.value = store.nivel || '';
    if (form.promedio) form.promedio.value = store.promedio || '';
    if (form.tipoPeriodo) form.tipoPeriodo.value = store.tipoPeriodo || '';
    if (form.numeroPeriodo) form.numeroPeriodo.value = store.numeroPeriodo || '';
  }
  var display = document.getElementById('fecha-actualizacion-display');
  var hiddenInput = document.getElementById('fecha-actualizacion');
  if (display && hiddenInput) {
    var fechaValor = store && store.fechaActualizacion;
    if (!fechaValor) {
      var ahora = new Date();
      fechaValor = ahora.toISOString();
    }
    hiddenInput.value = fechaValor;
    var d = new Date(fechaValor);
    if (!isNaN(d.getTime())) {
      display.textContent = d.getDate() + ' de ' + MESES_ES[d.getMonth()] + ', ' + d.getFullYear();
    } else {
      display.textContent = formatearFechaActual();
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = {
      nombreCompleto: form.nombreCompleto && form.nombreCompleto.value,
      disponibilidad: form.disponibilidad && form.disponibilidad.value,
      nombreCarrera: form.nombreCarrera && form.nombreCarrera.value,
      nivel: form.nivel && form.nivel.value,
      promedio: form.promedio && form.promedio.value,
      tipoPeriodo: form.tipoPeriodo && form.tipoPeriodo.value,
      numeroPeriodo: form.numeroPeriodo && form.numeroPeriodo.value
    };

    fetch('/api/perfil-academico', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    .then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          throw err;
        });
      }
      return response.json();
    })

    .then(function () {
      if (window.__talentoStore) {
        window.__talentoStore.datosPersonales = data;
      }

      document.dispatchEvent(new Event('perfilGuardado'));
    })

    .catch(function (error) {
      console.error('Error:', error);
      alert('Error al guardar el perfil académico');
    });
  });
};
