## Guía del archivo style.css (Mini‑Dashboard)

Explicación simple de qué hace cada sección del CSS y recursos para aprender los conceptos usados.

### 1) Reset y base
```css
* { box-sizing: border-box; padding: 0; margin: 0; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #2d3748; min-height: 100vh;
}
```
- El reset quita márgenes/rellenos por defecto y usa `border-box` para que el ancho/alto incluyan padding y borde.
- `body` define fuente, colores y un fondo con degradado.

Recursos:
- MDN - box-sizing: https://developer.mozilla.org/docs/Web/CSS/box-sizing
- MDN - background-image (gradientes): https://developer.mozilla.org/docs/Web/CSS/gradient

### 2) Header
```css
header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem; text-align: center;
  position: sticky; top: 0; z-index: 100;
}
header h1 {
  font-size: 2rem; font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
```
- Fondo semitransparente y efecto de desenfoque del contenido detrás (`backdrop-filter`).
- `position: sticky` hace que el header se quede pegado arriba al hacer scroll.
- El título usa un degradado aplicado al texto.

Recursos:
- MDN - position: https://developer.mozilla.org/docs/Web/CSS/position
- MDN - backdrop-filter: https://developer.mozilla.org/docs/Web/CSS/backdrop-filter

### 3) Sección de tarjetas (Grid)
```css
#cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem; padding: 2rem; max-width: 1200px; margin: 0 auto;
}
.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  padding: 1.5rem; border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease; position: relative; overflow: hidden;
}
.card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}
.card:hover { transform: translateY(-8px); box-shadow: 0 16px 48px rgba(0,0,0,0.15); }
.card h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; }
.card p { font-size: 1.1rem; color: #4a5568; font-weight: 500; }
.card.oculto { opacity: 0; transform: scale(0.9) translateY(20px); pointer-events: none; }
```
- `display: grid` distribuye tarjetas en columnas fluidas con `auto-fit` y `minmax`.
- La tarjeta usa glassmorphism (fondo translúcido, blur, borde suave).
- `::before` dibuja una barra de color superior.
- `.oculto` se usa para animaciones (entrada/salida) junto con `transition`.

Recursos:
- MDN - CSS Grid: https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout
- MDN - Pseudo-elementos (::before): https://developer.mozilla.org/docs/Web/CSS/Pseudo-elements
- MDN - transition: https://developer.mozilla.org/docs/Web/CSS/transition

### 4) Totales (Flex)
```css
#totales {
  background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
  border-radius: 16px; padding: 2rem; box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: center; align-items: center;
  border: 1px solid rgba(255,255,255,0.2); margin: 2rem; max-width: 1200px; margin-left: auto; margin-right: auto;
}
#totales p { margin: 0; font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem; }
#total-ventas, #total-gastos, #total-usuarios, #total-admin {
  display: inline-block; min-width: 120px; margin: 0.5rem; padding: 1rem 1.5rem;
  font-size: 1.1rem; font-weight: 700; border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2); color: white;
  box-shadow: 0 4px 16px rgba(102,126,234,0.3); border: none; text-align: center;
  transition: all 0.3s ease;
}
#total-ventas:hover, #total-gastos:hover, #total-usuarios:hover, #total-admin:hover {
  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(102,126,234,0.4);
}
```
- Contenedor usa Flexbox para centrar y permitir varias filas.
- Cada total es una “pill” con degradado y sombra.

Recursos:
- MDN - Flexbox: https://developer.mozilla.org/docs/Web/CSS/CSS_flexible_box_layout

### 5) Controles (label + select)
```css
#controles { margin: 2rem auto; display: flex; align-items: center; gap: 1rem; justify-content: center; max-width: 1200px; padding: 0 2rem; }
#controles label { font-weight: 600; color: white; font-size: 1.1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
#filtro {
  padding: 0.8rem 1.5rem; border-radius: 12px; border: 2px solid rgba(255,255,255,0.3);
  font-size: 1rem; background: rgba(255,255,255,0.95); color: #2d3748; transition: all 0.3s ease; backdrop-filter: blur(10px); cursor: pointer;
}
#filtro:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.2); transform: scale(1.02); }
#filtro:hover { border-color: #667eea; transform: scale(1.02); }
```
- Flexbox alinea el label y el select.
- En el `select`, se definen estados `:hover` y `:focus` para mejor accesibilidad.

Recursos:
- MDN - Selectores y pseudoclases: https://developer.mozilla.org/docs/Web/CSS/Pseudo-classes

### 6) Gráfico (canvas)
```css
#grafico {
  background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
  border-radius: 20px; overflow: hidden; margin: 2rem auto; padding: 2rem;
  border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  text-align: center; max-width: 1200px;
}
#grafico canvas {
  border: none; border-radius: 16px; margin: 0 auto; transition: all 0.3s ease;
  min-height: 300px; height: 350px; max-width: 800px; width: 100%; display: block;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
#grafico canvas:hover { transform: scale(1.02); box-shadow: 0 8px 32px rgba(0,0,0,0.15); }
```
- Contenedor con estilo “tarjeta grande”.
- El `canvas` crece hasta un ancho máximo y tiene una animación sutil al pasar el mouse.

Recursos:
- MDN - overflow: https://developer.mozilla.org/docs/Web/CSS/overflow

### 7) Footer fijo
```css
footer {
  background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
  text-align: center; padding: 1rem;
  position: fixed; left: 0; right: 0; bottom: 0;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.1); border-top: 1px solid rgba(255,255,255,0.2);
}
footer p { margin: 0.25rem 0; font-weight: 500; }
```
- `position: fixed` lo pega al borde inferior de la ventana.

Recurso:
- MDN - fixed: https://developer.mozilla.org/docs/Web/CSS/position#fixed

### 8) Responsive (móviles)
```css
@media (max-width: 768px) {
  #cards { grid-template-columns: 1fr; padding: 1rem; }
  #totales { margin: 1rem; padding: 1.5rem; }
  #grafico { margin: 1rem; padding: 1.5rem; }
  #grafico canvas { height: 250px; }
  header h1 { font-size: 1.5rem; }
}
```
- Media query aplica estilos solo en pantallas pequeñas.
- Se reduce padding, se usa 1 columna y se ajusta la altura del gráfico.

Recursos:
- MDN - Media queries: https://developer.mozilla.org/docs/Web/CSS/Media_Queries/Using_media_queries

---

## Tips para personalizar
- Cambia la paleta: modifica los hex (#667eea, #764ba2) en degradados y sombras.
- Ajusta la densidad: aumenta/disminuye `gap`, `padding`, `border-radius`.
- Animaciones: juega con `transition`, `transform` y la clase `.oculto` para crear distintos efectos.

## Recursos recomendados (CSS)
- MDN - Guía CSS: https://developer.mozilla.org/docs/Web/CSS
- Flexbox (Guía visual): https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- Grid (Guía visual): https://css-tricks.com/snippets/css/complete-guide-grid/
- Shadow y efectos: https://developer.mozilla.org/docs/Web/CSS/box-shadow
- Tipografía web: https://web.dev/learn/css/typography/


