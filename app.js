document.addEventListener("DOMContentLoaded", () => {
  // 1. Datos mock
  const data = [
    { categoria: "Ventas", valor: 120 },
    { categoria: "Gastos", valor: 80 },
    { categoria: "Usuarios", valor: 45 },
    { categoria: "Admin", valor: 5 },
  ];

  // 2. Render inicial
  const categorias = getCategoriasUnicas(data);
  renderOpcionesFiltro(categorias);
  renderCards(data);
  renderTotales(data);

  // 3. Inicializar gráfico
  const ctx = document.getElementById("miGrafico").getContext("2d");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((d) => d.categoria),
      datasets: [
        {
          label: "Valores",
          data: data.map((d) => d.valor),
          backgroundColor: ["#4e8ef7", "#f78e4e", "#4ef7a3", "#f74eb0"],
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: false },
  });

  // 4. Evento de filtrado
  const filtro = document.getElementById("filtro");
  filtro.addEventListener("change", async () => {
    const valor = filtro.value;
    const cont = document.getElementById("cards");
    const actuales = Array.from(cont.querySelectorAll(".card"));

    // Animar salida
    await ocultarElementos(actuales);

    // Limpiar y renderizar nuevos
    cont.innerHTML = "";

    let nuevosDatos;
    if (valor === "todas") {
      nuevosDatos = data;
    } else {
      nuevosDatos = data.filter(
        (item) => item.categoria.toLowerCase() === valor
      );
    }

    const nuevasCards = renderCards(nuevosDatos, true);
    renderTotales(nuevosDatos);

    // Actualizar gráfico
    chart.data.labels = nuevosDatos.map((d) => d.categoria);
    chart.data.datasets[0].data = nuevosDatos.map((d) => d.valor);
    chart.update();

    // Animar entrada
    mostrarElementos(nuevasCards);
  });

  // ---- FUNCIONES ----
  function ocultarElementos(elementos) {
    return new Promise((resolve) => {
      if (!elementos.length) return resolve();
      let pendientes = elementos.length;
      elementos.forEach((el) => {
        el.classList.add("oculto");
        el.addEventListener(
          "transitionend",
          () => {
            pendientes--;
            if (pendientes === 0) resolve();
          },
          { once: true }
        );
      });
    });
  }

  function mostrarElementos(elementos) {
    requestAnimationFrame(() => {
      elementos.forEach((el) => {
        void el.offsetWidth; // forzar reflujo
        el.classList.remove("oculto");
      });
    });
  }

  function renderCards(items, iniciarOcultas = false) {
    const cont = document.getElementById("cards");
    return items.map((item) => {
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

  function renderTotales(items) {
    const resumen = items.reduce((acc, item) => {
      const cat = item.categoria.toLowerCase();
      acc[cat] = (acc[cat] || 0) + item.valor;
      return acc;
    }, {});
    document.getElementById("total-ventas").textContent = resumen.ventas || 0;
    document.getElementById("total-gastos").textContent = resumen.gastos || 0;
    document.getElementById("total-usuarios").textContent =
      resumen.usuarios || 0;
    document.getElementById("total-admin").textContent = resumen.admin || 0;
  }

  function getCategoriasUnicas(items) {
    return [...new Set(items.map((item) => item.categoria.toLowerCase()))];
  }

  function renderOpcionesFiltro(categorias) {
    const filtro = document.getElementById("filtro");
    filtro.innerHTML = "<option value='todas'>Todas</option>";
    categorias.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      filtro.appendChild(option);
    });
  }
});
