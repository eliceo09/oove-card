// JS: genera N flores aleatorias usando imágenes PNG
(function createFlowerBackground() {
  const container = document.getElementById("flower-bg");
  if (!container) return;

  // lista de flores (pone tus rutas reales)
  const flowers = [
    "./img/amapolas.png",
    "/img/fBlancas.png",
    "/img/fNegra.png",
    "/img/rosasnegras.png",
    "/img/images.png",
    "/img/favicon.png",
  ];

  const poemas = [
    "Eres la flor que ilumina mi vida.",
    "Cada pétalo de tu ser es un verso de amor.",
    "En el jardín de mi corazón, tú eres la flor más hermosa.",
    "Tu belleza florece en cada rincón de mi alma.",
    "Como una flor en primavera, mi amor por ti renace cada día.",
    "Eres la flor que da color a mis días grises.",
  ];

  const poemasRaros = [
    "Me pregunto si tus manos sienten las mías, si tus ojos me buscan cuando cierro los míos. Te pienso en cada latido, te deseo en cada silencio. Y aunque no digas lo que guardas, yo no callo mi amor: grita en mí, me atraviesa, y no hay miedo que lo detenga.",
    "Si pudiera tomar tus pensamientos, los guardaría junto a los míos. Te extraño en cada esquina, te deseo en cada respiración. Y aunque el miedo intente frenarnos, mi corazón no deja de quererte.",
  ];

  let lastPoem = null;

  function getRandomPoem() {
    let pool;
    let isRare = false;

    // probabilidad de 10% de que toque raro
    if (Math.random() < 0.3) {
      pool = poemasRaros;
      isRare = true;
    } else {
      pool = poemas; // acá estaba el error
    }

    let poem;
    do {
      poem = pool[Math.floor(Math.random() * pool.length)];
    } while (poem === lastPoem && pool.length > 1);

    lastPoem = poem;
    return { poem, isRare };
  }

  function showPoem() {
    const { poem, isRare } = getRandomPoem();

    const shield = document.createElement("div");
    shield.className = "openshield";

    if (isRare) {
      const title = document.createElement("h2");
      title.textContent = "🌟 Poema Largo 🌟";
      title.className = "poema-raro-title";

      const content = document.createElement("p");
      content.textContent = poem;

      shield.appendChild(title);
      shield.appendChild(content);
    } else {
      shield.textContent = poem;
    }

    document.body.appendChild(shield);

    setTimeout(
      () => {
        shield.remove();
      },
      isRare ? 20000 : 10000
    );
  }

  // mostrar apenas cargue
  window.onload = () => {
    showPoem();
  };

  const N = 100; // cantidad de florecitas (ajusta)
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

    /* dencidad de las flowers */

    function generateFlowers(amount = 150) {
      // Podés subir el número para más densidad
      for (let i = 0; i < amount; i++) {
        makeFlower();
      }
    }
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

  function mostrarPoema() {
    const indiceAleatorio = Math.floor(Math.random() * poemas.length);
    const poemaSeleccionado = poemas[indiceAleatorio];
    poemaSeleccionado.oppendChild;
  }
})();
