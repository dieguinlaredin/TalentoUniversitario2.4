/**
 * Módulo: Portafolio y Enlaces Finales
 * Guarda solo en memoria (ejemplo). Corrige ruta del icono de recomendación.
 */

function basePath() {
  var path = window.location.pathname || '/';
  var i = path.lastIndexOf('/');
  return window.location.origin + (i >= 0 ? path.substring(0, i + 1) : '/');
}

window.initModuloPortafolio = function () {
  var form = document.getElementById('form-portafolio');
  if (!form) return;

  var base = basePath();
  var hintIcon = document.querySelector('.form-field__hint-icon');
  if (hintIcon && hintIcon.tagName === 'IMG') {
    hintIcon.src = base + 'images/recomendacion.png';
  }

  var store = window.__talentoStore && window.__talentoStore.portafolio;
  if (store && form.urlPortafolio) form.urlPortafolio.value = store.urlPortafolio || '';
  
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    var data = {
      urlPortafolio: form.urlPortafolio && form.urlPortafolio.value
    };
    
    fetch('/api/portafolio', {
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
        window.__talentoStore.portafolio = data;
      }

      document.dispatchEvent(new Event('portafolioGuardado'));
    })

    .catch(function (error) {
      console.error('Error:', error);
      alert('Error al guardar el url del portafolio')
    });
  });
};
