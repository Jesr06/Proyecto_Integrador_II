let abrir1 = document.getElementById("abrir-1");
let modal1 = document.getElementById("modal-1");
let abrir2 = document.getElementById("abrir-2");
let modal2 = document.getElementById("modal-2");
let cerrar1 = document.getElementById("volver");
let cerrar2 = document.getElementById("volver2");

abrir1.onclick = function() {
    modal1.style.visibility = "visible";
}

cerrar1.onclick = function() {
    modal1.style.visibility = "hidden";
    location.reload();
}

abrir2.onclick = function() {
    modal2.style.visibility = "visible";
}

cerrar2.onclick = function() {
    modal2.style.visibility = "hidden";
}

