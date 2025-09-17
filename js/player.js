window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const contenido = document.getElementById("contenido");

  // Array de imágenes para el splash
  const images = [
    "./img/hero-love.jpg",
    "./img/hero-fantasy.jpg",
    "./img/hero-cry.jpg",
    "./img/hero-red.jpg",
  ];
  splash.classList.add("hidden");
  // Elegir una imagen aleatoria
  const randomImage = images[Math.floor(Math.random() * images.length)];
  splash.style.backgroundImage = `url('${randomImage}')`;

  // Mostrar splash 2 segundos y luego ocultar
  setTimeout(() => {
    splash.classList.add("hidden");
    contenido.classList.add("visible");
    document.body.style.overflow = "auto";
  }, 2000);
});

// --- Reproductor ---
const songs = [
  {
    title: "Lo que te pediria - Louis Armstrong",
    file: "./music/Louis Armstrong - A Kiss To Build A Dream On (Live At The BBC) - LouisArmstrongVEVO.mp3",
  },
  {
    title: "La indirecta que me casaste D1 😒 - Mana",
    file: "./music/Maná - Oye Mi Amor - LatinHype.mp3",
  },
  {
    title: "Mi canción favorita De mi banda favorita - Queen",
    file: "./music/Queen - Love Of My Life (Traducida al español) - stephstyles1994 (1).mp3",
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
