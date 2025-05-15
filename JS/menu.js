const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

let jugador = {
  x: 100,
  y: canvas.height - 50,
  vy: 0,
  ancho: 50,
  alto: 50,
  color: "#3498db",
  imagen: "../IMAGENES/cara-amarilla-muriendo",
  enSuelo: false
};

const gravedad = 0.5;
const rebote = -10;
const velocidad = 5;

let teclas = {};

document.addEventListener("keydown", (e) => {
  teclas[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  teclas[e.key] = false;
});

function actualizar() {
  // Movimiento horizontal
  if (teclas["ArrowLeft"] && jugador.x > 0) jugador.x -= velocidad;
  if (teclas["ArrowRight"] && jugador.x < canvas.width - jugador.ancho) jugador.x += velocidad;

  // Salto
  if (teclas["ArrowUp"] && jugador.enSuelo) {
    jugador.vy = rebote;
    jugador.enSuelo = false;
  }

  // Aplicar gravedad
  jugador.vy += gravedad;
  jugador.y += jugador.vy;

  // Límite inferior (suelo)
  if (jugador.y + jugador.alto >= canvas.height) {
    jugador.y = canvas.height - jugador.alto;
    jugador.vy = 0;
    jugador.enSuelo = true;
  }
}

function dibujarJugador() {
  ctx.fillStyle = jugador.color;
  ctx.fillRect(jugador.x, jugador.y, jugador.ancho, jugador.alto);
}

function bucle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actualizar();
  dibujarJugador();
  requestAnimationFrame(bucle);
}

bucle();