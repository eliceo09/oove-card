// Texto a mostrar
const textoEmergente = `🌷 Me salió decirte “amor” sin pensarlo.
No era para presionarte ni ponerle nombre a nada, simplemente me salió con cariño, nada más.

Mi reacción después no fue la que quería.
Me agarró desprevenido, fue un reflejo… y discúlpame por reaccionar así.
Se nota que te molestó, aunque sea un poco, que no te gustó, y por eso te pido perdón.

Me siento culpable, porque nunca quiero hacerte sentir mal.
Soy humano, cometo errores.
Sé muy bien que no somos nada y lo tengo presente siempre…
pero necesito quererte, aunque sea desde esta posición.

Esto no justifica lo que hice, pero quiero que veas que me arrepiento.
No soy capaz de estar enojado con vos, porque te amo mucho, Agos. ❤️ 🌷`;

// Seleccionamos el contenedor
const contenedor = document.getElementById("contenedor");

// Creamos el h1
const h1 = document.createElement("h1");
h1.textContent = textoEmergente.replace(/\n/g, " ").trim();

// Reemplazamos saltos de línea por <br> para que se respeten
h1.innerHTML = textoEmergente.replace(/\n/g, "<br>").trim();

// Agregamos el h1 al contenedor
contenedor.appendChild(h1);

// Animamos el contenedor
setTimeout(() => {
  contenedor.classList.add("show");
}, 100);

// Animamos el texto
setTimeout(() => {
  h1.classList.add("show");
}, 500);
