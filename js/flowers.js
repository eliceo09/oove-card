// JS: genera N flores aleatorias usando imágenes PNG
(function createFlowerBackground() {
  const container = document.getElementById("flower-bg");
  if (!container) return;

  // lista de flores (pone tus rutas reales)
  const flowers = [
    "./img/amapolas.jfif",
    "/img/fBlancas.jfif",
    "/img/fNegras.webp",
    "/img/rosasnegras.jfif",
    "/img/images.jfif",
  ];

  const N = 60; // cantidad de florecitas (ajusta)
  const vw = () =>
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = () =>
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );

  // función que crea una flor
  function makeFlower(i) {
    const img = document.createElement("img");
    img.className = "flower";
    img.src = flowers[Math.floor(Math.random() * flowers.length)];
    // tamaño relativo entre 20px y 120px
    const size = Math.floor(Math.random() * 100) + 20;
    img.style.width = `${size}px`;
    img.style.height = "auto";

    // posición aleatoria dentro del viewport (usar % para que responda)
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    img.style.left = `${left}%`;
    img.style.top = `${top}%`;

    // rotación y escala
    const rot = Math.random() * 360;
    const scl = 0.6 + Math.random() * 1.2;
    img.style.transform = `translate(-50%,-50%) rotate(${rot}deg) scale(${scl})`;

    // z-index aleatorio para profundidad
    img.style.zIndex = Math.floor(Math.random() * 3); // 0,1,2

    // ligera variación de opacidad
    img.style.opacity = 0.6 + Math.random() * 0.4;

    // cargar de forma perezosa para performance
    img.loading = "lazy";

    return img;
  }

  // crear y añadir
  for (let i = 0; i < N; i++) {
    const f = makeFlower(i);
    container.appendChild(f);
  }

  // Opcional: regenerar en resize para adaptarse mejor
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // para simplificar: vaciar y volver a generar
      container.innerHTML = "";
      for (let i = 0; i < N; i++) container.appendChild(makeFlower(i));
    }, 200);
  });
})();
