## Guía del archivo app.js (Mini‑Dashboard)

Esta guía explica, en lenguaje sencillo, cómo funciona el `app.js` del proyecto y te deja recursos para aprender cada concepto que se utiliza.

### 1) Estructura general
- Se espera a que el HTML cargue con `DOMContentLoaded`.
- Se define un arreglo de datos (mock) con pares categoría/valor.
- Se renderizan: opciones del filtro, tarjetas (cards), totales y un gráfico con Chart.js.
- Al cambiar el filtro, se vuelven a renderizar las tarjetas y totales, y se actualiza el gráfico con una animación de entrada/salida.

### 2) Arranque: esperar al DOM listo
```js
document.addEventListener("DOMContentLoaded", () => { /* ... */ });
```
Significa: "Ejecuta mi código cuando el HTML esté listo", evitando errores por elementos aún no existentes.

Recurso: MDN - addEventListener (DOMContentLoaded)
- https://developer.mozilla.org/docs/Web/API/Document/DOMContentLoaded_event

### 3) Datos de ejemplo (mock)
```js
const data = [
  { categoria: "Ventas", valor: 120 },
  { categoria: "Gastos", valor: 80 },
  { categoria: "Usuarios", valor: 45 },
  { categoria: "Admin", valor: 5 },
];
```
Se usan para practicar sin necesitar un servidor. Más adelante podrías reemplazarlos por datos reales (fetch).

Recurso: MDN - Arrays en JS
- https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

### 4) Render inicial
```js
const categorias = getCategoriasUnicas(data);
renderOpcionesFiltro(categorias);
renderCards(data);
renderTotales(data);
```
- `getCategoriasUnicas` usa `Set` para eliminar duplicados.
- `renderOpcionesFiltro` llena el `<select>`.
- `renderCards` crea y pinta tarjetas según los datos.
- `renderTotales` suma por categoría y actualiza los `<span>`.

Recursos:
- MDN - Set: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set
- MDN - map(): https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- MDN - reduce(): https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

### 5) Gráfico con Chart.js
```js
const ctx = document.getElementById("miGrafico").getContext("2d");
const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: data.map(d => d.categoria),
    datasets: [{
      label: "Valores",
      data: data.map(d => d.valor),
      backgroundColor: ["#4e8ef7", "#f78e4e", "#4ef7a3", "#f74eb0"],
    }],
  },
  options: { responsive: true, maintainAspectRatio: false },
});
```
- `getContext("2d")` obtiene el contexto para dibujar.
- `new Chart(...)` crea un gráfico de barras con etiquetas y datos.
- `responsive` permite que el gráfico se adapte al tamaño del contenedor.

Recursos:
- Chart.js (Docs): https://www.chartjs.org/docs/latest/
- MDN - CanvasRenderingContext2D: https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D

### 6) Filtrar datos y animaciones
```js
const filtro = document.getElementById("filtro");
filtro.addEventListener("change", async () => {
  const valor = filtro.value;
  const cont = document.getElementById("cards");
  const actuales = Array.from(cont.querySelectorAll(".card"));

  await ocultarElementos(actuales); // anima salida
  cont.innerHTML = "";              // limpia

  const nuevosDatos = valor === "todas"
    ? data
    : data.filter(item => item.categoria.toLowerCase() === valor);

  const nuevasCards = renderCards(nuevosDatos, true);
  renderTotales(nuevosDatos);

  chart.data.labels = nuevosDatos.map(d => d.categoria);
  chart.data.datasets[0].data = nuevosDatos.map(d => d.valor);
  chart.update();

  mostrarElementos(nuevasCards);    // anima entrada
});
```
- `change` se dispara al seleccionar una opción.
- `filter` devuelve solo los elementos de la categoría elegida.
- Se actualizan tarjetas, totales y gráfico.
- Se aplican clases CSS para animaciones (salida/entrada) con transiciones.

Recursos:
- MDN - addEventListener: https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener
- MDN - querySelectorAll: https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll
- MDN - filter(): https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

### 7) Animar salida: `ocultarElementos`
```js
function ocultarElementos(elementos) {
  return new Promise(resolve => {
    if (!elementos.length) return resolve();
    let pendientes = elementos.length;
    elementos.forEach(el => {
      el.classList.add("oculto");
      el.addEventListener("transitionend", () => {
        pendientes--;
        if (pendientes === 0) resolve();
      }, { once: true });
    });
  });
}
```
- Agrega la clase `.oculto` (definida en CSS) que activa la transición.
- Espera a `transitionend` en todos los elementos antes de continuar.
- Usa una `Promise` para poder hacer `await` y encadenar la animación correctamente.

Recursos:
- MDN - transitionend: https://developer.mozilla.org/docs/Web/API/Element/transitionend_event
- MDN - Promises: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

### 8) Animar entrada: `mostrarElementos`
```js
function mostrarElementos(elementos) {
  requestAnimationFrame(() => {
    elementos.forEach(el => {
      void el.offsetWidth; // fuerza reflujo para reiniciar transición
      el.classList.remove("oculto");
    });
  });
}
```
- `requestAnimationFrame` asegura que los cambios de clase ocurran en frames distintos.
- `void el.offsetWidth` fuerza un reflow, útil para reiniciar la animación CSS.

Recursos:
- MDN - requestAnimationFrame: https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame
- Reflow/repintado (artículo): https://web.dev/learn/performance/animations-and-performance/

### 9) Crear tarjetas: `renderCards`
```js
function renderCards(items, iniciarOcultas = false) {
  const cont = document.getElementById("cards");
  return items.map(item => {
    const card = document.createElement("article");
    card.className = `card card-${item.categoria.toLowerCase()}`;
    if (iniciarOcultas) card.classList.add("oculto");

    const h3 = document.createElement("h3");
    h3.textContent = item.categoria;

    const p = document.createElement("p");
    p.textContent = `Valor: ${item.valor}`;

    card.appendChild(h3);
    card.appendChild(p);
    cont.appendChild(card);
    return card;
  });
}
```
- Crea elementos del DOM con `createElement` y los agrega con `appendChild`.
- Usa clases CSS para estilos y animaciones.

Recursos:
- MDN - createElement: https://developer.mozilla.org/docs/Web/API/Document/createElement
- MDN - appendChild: https://developer.mozilla.org/docs/Web/API/Node/appendChild

### 10) Totales por categoría: `renderTotales`
```js
function renderTotales(items) {
  const resumen = items.reduce((acc, item) => {
    const cat = item.categoria.toLowerCase();
    acc[cat] = (acc[cat] || 0) + item.valor;
    return acc;
  }, {});
  document.getElementById("total-ventas").textContent = resumen.ventas || 0;
  document.getElementById("total-gastos").textContent = resumen.gastos || 0;
  document.getElementById("total-usuarios").textContent = resumen.usuarios || 0;
  document.getElementById("total-admin").textContent = resumen.admin || 0;
}
```
- `reduce` acumula valores por categoría en un objeto.
- Se actualizan los `<span>` del HTML con `textContent`.

Recursos:
- MDN - reduce(): https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
- MDN - textContent: https://developer.mozilla.org/docs/Web/API/Node/textContent

### 11) Categorías únicas: `getCategoriasUnicas`
```js
function getCategoriasUnicas(items) {
  return [...new Set(items.map(item => item.categoria.toLowerCase()))];
}
```
- `map` extrae las categorías, `Set` elimina duplicados y `...` las vuelve array.

Recursos:
- MDN - Spread syntax: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Spread_syntax

### 12) Llenar el filtro: `renderOpcionesFiltro`
```js
function renderOpcionesFiltro(categorias) {
  const filtro = document.getElementById("filtro");
  filtro.innerHTML = "<option value='todas'>Todas</option>";
  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    filtro.appendChild(option);
  });
}
```
- Limpia el `<select>` y agrega una opción "Todas".
- Crea `<option>` por cada categoría, capitalizando la primera letra.

Recurso:
- MDN - charAt/slice: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

---

## Recomendaciones para seguir aprendiendo
- Aprende DOM básico (seleccionar, crear, modificar elementos):
  - https://developer.mozilla.org/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents
- Eventos en el navegador (click, change, input):
  - https://developer.mozilla.org/docs/Learn/JavaScript/Building_blocks/Events
- Arrays y métodos (map, filter, reduce):
  - https://developer.mozilla.org/docs/Learn/JavaScript/First_steps/Arrays
- Asincronía (Promises, async/await):
  - https://developer.mozilla.org/docs/Learn/JavaScript/Asynchronous/Promises
- Chart.js (gráficos):
  - https://www.chartjs.org/docs/latest/

Con estas bases podrás adaptar el dashboard: traer datos reales con `fetch`, agregar nuevas categorías, cambiar tipos de gráficos, y mejorar animaciones.


