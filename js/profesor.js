const usuario = JSON.parse(localStorage.getItem("infoUser"));
document.getElementById("nombre").innerText = usuario.nombre;
document.getElementById("correo").innerText=usuario.correo;