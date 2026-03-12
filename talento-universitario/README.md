# Talento Universitario

Plataforma para recolectar información institucional, perfil educativo y portafolio de experiencia de estudiantes.

## Estructura del proyecto

- **HTML**: Página principal `index.html` y bloques reutilizables en `partials/` (aside, módulos institucional, perfil académico, portafolio). En el aside se muestra el logo (`images/logo.png`) y el nombre «Talento Universitario»; el favicon es `images/favicon.png`. Diseño responsivo con menú colapsable en móvil (botón hamburguesa).
- **CSS**: `css/styles.css` (global), `css/layout/` (aside, header), `css/components/` (formularios, botones, pasos), `css/modules/` (por sección).
- **JS**: `js/main.js` (carga de partials), `js/layout/aside-menu.js`, `js/components/` (step-indicator, form-actions), `js/modules/` (por formulario).

## Cómo probar

Abrir las páginas con un servidor local para que los partials se carguen por `fetch` (evitar abrir los HTML directamente por file://). Por ejemplo:

```bash
# Con Python 3
python3 -m http.server 8000

# O con Node (npx serve)
npx serve .
```

Luego visitar: `http://localhost:8000` o `http://localhost:8000/informacion-institucional.html`.

## Datos

Los datos de los formularios se guardan **solo en memoria** (`window.__talentoStore`) durante la sesión. No se usa `localStorage` ni se persiste nada al cerrar o recargar la página; la barra de progreso y el step indicator reflejan únicamente lo completado en esa sesión. Con el backend, los datos se enviarán y guardarán en base de datos.
