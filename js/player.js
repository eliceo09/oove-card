const images = [
  "./img/hero-love.jpg",
  "./img/hero-fantasy.jpg",
  "./img/hero-cry.jpg",
  "./img/hero-red.jpg",
];

let lastImage = null; // Mantener en memoria durante la sesión

function getRandomNonRepeating(arr, last) {
  if (!arr || arr.length === 0) return null;
  if (arr.length === 1) return arr[0];
  let choice;
  do {
    choice = arr[Math.floor(Math.random() * arr.length)];
  } while (choice === last);
  return choice;
}

window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const contenido = document.getElementById("contenido");
  if (!splash) return;

  // Elegir splashart distinta a la última usada en esta sesión
  const randomImage = getRandomNonRepeating(images, lastImage);
  lastImage = randomImage;
  splash.style.backgroundImage = `url('${randomImage}')`;

  // Mostrar splash 2 segundos y luego ocultar
  setTimeout(() => {
    splash.classList.add("hidden");
    if (contenido) contenido.classList.add("visible");
    document.body.style.overflow = "auto";
  }, 2000);
});

// --- Reproductor ---
const songs = [
  {
    title: "mi miedo es...",
    file: "./music/Cuando no.mp3",
  },
  {
    title: "me gustas mucho",
    file: "./music/Me Gustas Mucho.mp3",
  },
  {
    title: "i💗you",
    file: "./music/Vámonos a Marte.mp3",
  },
];

let currentSong = 0;

const audio = document.getElementById("audio");
audio.preload = "auto"; // <-- forzar preload
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const songTitle = document.getElementById("song-title");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");

// cargar canción
function loadSong(index) {
  audio.src = songs[index].file;
  songTitle.textContent = songs[index].title;
  audio.load(); // forzar carga del archivo
}

// controles
playBtn.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      // manejar la promesa por políticas del navegador
      await audio.play();
      playBtn.textContent = "⏸";
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  } catch (err) {
    console.error("No se pudo reproducir el audio:", err);
    alert("Error al reproducir el audio. Revisa la consola.");
  }
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play().catch((err) => console.error("Play falló:", err));
  playBtn.textContent = "⏸";
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play().catch((err) => console.error("Play falló:", err));
  playBtn.textContent = "⏸";
});

// actualizar barra
audio.addEventListener("timeupdate", () => {
  if (isFinite(audio.duration) && audio.duration > 0) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
  } else {
    progressBar.style.width = "0%";
  }
});

// saltar en la barra
progress.addEventListener("click", (e) => {
  const width = progress.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (isFinite(duration) && duration > 0) {
    audio.currentTime = (clickX / width) * duration;
  }
});

// reproducir siguiente cuando termine
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// mostrar errores de carga
audio.addEventListener("error", (e) => {
  console.error("Error cargando el audio:", audio.error);
  alert("No se pudo cargar el archivo de audio. Revisa la ruta en songs[].");
});

// cargar primera canción
loadSong(currentSong);
