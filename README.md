# 🚀 Mini‑Dashboard Interactivo (para todo público)

Un dashboard minimalista e interactivo construido con **HTML + CSS + JavaScript** y **Chart.js** para visualizar datos en un **gráfico de barras**. Pensado para aprender paso a paso, sin frameworks complicados.

## ✨ ¿Qué puedes hacer con este dashboard?

- **Filtrar datos por categoría** con un menú desplegable
- **Ver tarjetas (cards)** que muestran los valores por categoría
- **Ver totales** por cada categoría (Ventas, Gastos, Usuarios, Admin)
- **Observar un gráfico de barras** que se actualiza automáticamente con Chart.js
- **Disfrutar de animaciones suaves** usando solo CSS

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos y diseño responsive
- **JavaScript ES6+**: Lógica de la app y manejo del DOM
- **Chart.js (CDN)**: Biblioteca para gráficos

## 📁 Estructura del proyecto

```
mini-dashboard/
├── index.html          # Página principal HTML
├── app.js             # Lógica principal de la aplicación
├── style.css          # Estilos CSS
├── JS_EXPLICACION.md   # Guía paso a paso del JavaScript
├── CSS_EXPLICACION.md  # Guía paso a paso del CSS
└── README.md          # Documentación del proyecto
```

## 🚀 Instalación y uso

### Requisitos previos
- Navegador web moderno con soporte para ES6+
- Conexión a internet para cargar Chart.js desde CDN

### Pasos de Instalación

1. **Clona o descarga el proyecto**
   ```bash
   git clone [url-del-repositorio]
   cd mini-dashboard
   ```

2. **Abre el proyecto**
   - Abre `index.html` en tu navegador web
   - O utiliza un servidor local para desarrollo

3. **Para desarrollo local** (opcional)
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js
   npx serve .
   
   # Con PHP
   php -S localhost:8000
   ```

## 🔧 Configuración

### Chart.js
El proyecto utiliza Chart.js desde CDN. Si prefieres usar una versión local:

1. Descarga Chart.js desde `https://www.chartjs.org/`
2. Reemplaza el CDN en `index.html` con la ruta local

### Personalización
- Modifica `style.css` para cambiar colores y estilos
- Edita `app.js` para agregar nuevas funcionalidades
- Actualiza `index.html` para cambiar la estructura

## 🧠 ¿Cómo funciona por dentro?

- Al cargar la página, `app.js` espera al evento `DOMContentLoaded` y ejecuta:
  - Crea datos de ejemplo (mock) con categorías y valores
  - Rellena el selector de filtro con las categorías únicas
  - Dibuja las tarjetas y calcula los totales
  - Crea un gráfico de barras con Chart.js usando esos datos
- Cuando cambias el filtro:
  - Se ocultan las tarjetas con una animación CSS
  - Se filtran los datos, se actualizan tarjetas y totales
  - Se actualiza el gráfico (labels y valores) y se vuelven a mostrar las tarjetas con animación

Para explicación paso a paso, consulta `JS_EXPLICACION.md` y `CSS_EXPLICACION.md`.

## 🎨 Personalización

### Colores y Temas
Puedes personalizar fácilmente:
- Paleta de colores principal
- Esquemas de colores oscuro/claro
- Tipografías y tamaños de fuente

### Animaciones
- Velocidad de transiciones
- Efectos de entrada y salida
- Timing de las animaciones

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ usando JavaScript puro y Chart.js.

## 🙏 Agradecimientos

- **Chart.js** por facilitar la creación de gráficos
- **Comunidad web** por documentación y ejemplos

## 📞 Soporte

Si tienes alguna pregunta o sugerencia:
- Abre un issue en el repositorio
- Contacta al desarrollador principal

---

**¡Disfruta explorando tu mini-dashboard interactivo! 🎉**

## 📚 Recursos para aprender
- MDN JavaScript (arrays, map, filter, reduce): https://developer.mozilla.org/docs/Learn/JavaScript/First_steps/Arrays
- MDN DOM (crear y modificar elementos): https://developer.mozilla.org/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
- Chart.js (documentación): https://www.chartjs.org/docs/latest/
- CSS Grid: https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout
- Flexbox: https://developer.mozilla.org/docs/Web/CSS/CSS_flexible_box_layout
