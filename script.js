let video = document.getElementById("video")

let lamparaClick = document.getElementById("lamparaClick")

let estrellas = document.getElementById("estrellas")
let poster = document.getElementById("poster")

let distorsion = document.getElementById("distorsion")

let rotacionEstrellas = 0
let rotacionPoster = 0

let segundoVideo = false

let finEscena = false;

const brocha = document.getElementById("brocha");
const chapitas = document.querySelectorAll(".chapita");
let maquillajeVisible = false;

/* INICIAR VIDEO */

document.body.addEventListener("click", () => {

if(video.paused){
video.play()
}

},{once:true})

let titulo = document.getElementById("titulo")
/* SECUENCIA DEL TÍTULO */

setTimeout(()=>{

// cambiar a animación de salida
titulo.src = "Bonita_LOGO_Salida.gif"

},3000) // duración del primer gif (ajusta si quieres)


setTimeout(()=>{

// ocultar completamente
titulo.style.display = "none"

},5500) // tiempo total (entrada + salida)


/* CLICK LÁMPARA */

lamparaClick.addEventListener("click", () => {

if(!segundoVideo){

video.pause()

video.src = "cuarto_luz.mp4"

video.load()

video.play()

segundoVideo = true

/* cambiar estrellas y poster */

estrellas.src = "estrellas.svg"
poster.src = "poster.svg"

}

})



/* TECLAS */

document.addEventListener("keydown",(e)=>{

if(e.key==="a" || e.key==="A"){
crearEstrellitas(20); // cantidad de estrellas
}

/* A estrellas */

if(e.key==="a" || e.key==="A"){
estrellas.classList.toggle("rotarEstrellas");
}

/* L poster */

if(e.key==="l" || e.key==="L"){
poster.classList.toggle("rotarPoster");
}


if(e.key==="l" || e.key==="L"){
crearDestellos();
}

function crearDestellos(){

const colores = [
    "#FF4FD8", // rosa brillante
    "#4FD8FF", // azul brillante
    "#4FFF9C"  // verde brillante
];

let total = 6; // 2 de cada color

for(let i = 0; i < total; i++){

    let destello = document.createElement("div");
    destello.classList.add("destello");

    // ✦ forma de 4 puntas
    destello.innerHTML = "✦";

    // color (2 por color)
    let colorIndex = Math.floor(i / 2);
    destello.style.color = colores[colorIndex];

    // posición aleatoria
    destello.style.left = Math.random() * window.innerWidth + "px";
    destello.style.top = Math.random() * window.innerHeight + "px";

    // 📏 tamaño grande
    let size = Math.random() * 80 + 80; // entre 80px y 160px
    destello.style.fontSize = size + "px";

    // ⏱️ aparición escalonada
    let delay = i * 150; // cada uno aparece después del anterior
    destello.style.animationDelay = delay + "ms";

    document.body.appendChild(destello);

    // eliminar después
    setTimeout(()=>{
        destello.remove();
    }, 2000 + delay);
}
}

/* ESPACIO maquillaje */

if(e.code==="Space"){

maquillajeVisible = !maquillajeVisible;

if(maquillajeVisible){

brocha.style.display="block";

chapitas.forEach(c=>{
c.style.opacity="1";
});

}else{

brocha.style.display="none";

chapitas.forEach(c=>{
c.style.opacity="0";
});

}

}

});

document.addEventListener("mousemove", (e)=>{

if(brocha.style.display === "block"){

brocha.style.left = (e.clientX - 40) + "px"
brocha.style.top = (e.clientY - 40) + "px"

}

})


/* MICRÓFONO SEGUNDO 53 */

video.addEventListener("timeupdate", () => {

if(video.currentTime >= 53){
activarMicrofono()
}

video.addEventListener("timeupdate", () => {

if(video.currentTime >= 95 && !finEscena){

    finEscena = true;

    video.currentTime = 95; // fijar en 1:35
    video.pause(); // detener definitivamente

}

})

/* MINUTO 1:27 (87 segundos) */

if(video.currentTime >= 87 && !finEscena){

finEscena = true;

    video.pause();
    video.currentTime = 90;


estrellas.style.display = "none";
poster.style.display = "none";

brocha.remove();

brocha.style.display = "none";

chapitas.forEach(c=>{
c.style.display = "none";
});

let lagrima1 = document.getElementById("lagrima1")
let lagrima2 = document.getElementById("lagrima2")

lagrima1.classList.remove("cayendo")
lagrima2.classList.remove("cayendo")

lagrima1.style.display = "none";
lagrima2.style.display = "none";

distorsion.classList.remove("glitch");
distorsion.style.display = "none";

if(video.paused){
video.play()
}

}

})

let microActivo = false

async function activarMicrofono(){

if(microActivo) return
microActivo = true

let stream = await navigator.mediaDevices.getUserMedia({audio:true})

let audioContext = new AudioContext()
let mic = audioContext.createMediaStreamSource(stream)
let analyser = audioContext.createAnalyser()

analyser.fftSize = 1024

mic.connect(analyser)

let data = new Uint8Array(analyser.fftSize)

setInterval(()=>{

// 🔹 obtener señal en el tiempo (mejor para volumen real)
analyser.getByteTimeDomainData(data)

// 🔹 calcular RMS (volumen real)
let suma = 0
for(let i = 0; i < data.length; i++){
    let val = (data[i] - 128) / 128
    suma += val * val
}
let rms = Math.sqrt(suma / data.length)

//  DEBUG
console.log(rms)

// umbral MUCHO más sensible
if(rms < 0.02){

// silencio → volumen 50%
video.volume = 0.5

distorsion.classList.add("glitch")
lagrima1.classList.add("cayendo1")
lagrima2.classList.add("cayendo2")

}else{

// sonido → volumen normal
video.volume = 1

distorsion.classList.remove("glitch")
lagrima1.classList.remove("cayendo1")
lagrima2.classList.remove("cayendo2")

}

},150)

}

function crearEstrellitas(cantidad){

const colores = [
    "#FFD1DC", // rosa pastel
    "#CDE7FF", // azul pastel
    "#D4F8D4", // verde pastel
    "#FFF5BA"  // amarillo pastel
];

for(let i = 0; i < cantidad; i++){

    let estrella = document.createElement("div");
    estrella.classList.add("estrellita");

    estrella.innerHTML = "★";

    // color
    estrella.style.color = colores[Math.floor(Math.random() * colores.length)];

    // posición inicial
    estrella.style.left = Math.random() * window.innerWidth + "px";
    estrella.style.top = "-30px";

    // ⭐ tamaño más grande y variado
    let size = Math.random() * 20 + 15; // antes era 10–20
    estrella.style.fontSize = size + "px";

    // 🎲 duración aleatoria (caen diferente)
    let duracion = Math.random() * 2 + 2; // entre 2s y 4s
    estrella.style.animationDuration = duracion + "s";

    // 🎲 delay aleatorio (no salen todas al mismo tiempo)
    estrella.style.animationDelay = Math.random() * 0.5 + "s";

    // 🎲 ligera variación horizontal (movimiento natural)
    estrella.style.setProperty("--desplazamientoX", (Math.random() * 100 - 50) + "px");

    document.body.appendChild(estrella);

    setTimeout(()=>{
        estrella.remove();
    }, duracion * 1000 + 500);

}
}