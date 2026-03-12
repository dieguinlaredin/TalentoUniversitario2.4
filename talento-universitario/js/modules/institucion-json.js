(function () {

  function obtenerDatosFormulario() {
    var form = document.getElementById('form-institucional');
    if (!form) return null;

    return {
      nombreInstitucion: form.nombreInstitucion ? form.nombreInstitucion.value || "" : "",
      cct: form.cct ? form.cct.value || "" : "",
      correo: form.correo ? form.correo.value || "" : "",
      telefono: form.telefono ? form.telefono.value || "" : "",
      estado: form.estado ? form.estado.value || "" : ""
    };
  }

  function generarJSON() {
    var datos = obtenerDatosFormulario();
    if (!datos) return "";

    return JSON.stringify(datos);
  }

  function mostrarJSON() {
    var output = document.getElementById('json-output');
    if (!output) return;

    var json = generarJSON();
    output.textContent = json;
  }

  document.addEventListener('click', function (e) {

    if (e.target && e.target.id === 'btn-generar-json') {
      console.log(generarJSON());
    }

    if (e.target && e.target.id === 'btn-mostrar-json') {
      mostrarJSON();
    }

  });

})();