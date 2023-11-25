const usuario = JSON.parse(localStorage.getItem("infoUser"));
const xd = document.getElementById("nombre");
xd.innerText=usuario.nombre;
document.getElementById("correo").innerText=usuario.correo;