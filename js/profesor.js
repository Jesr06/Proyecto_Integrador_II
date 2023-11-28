const usuario = JSON.parse(localStorage.getItem("infoUser"));
document.getElementById("nombre").innerText = usuario.nombre;
document.getElementById("correo").innerText=usuario.correo;
document.getElementById("documento").innerText=usuario.documento;
document.getElementById("celular").innerText=usuario.celular;
document.getElementById("materias").innerText=usuario.materias;
const materiaAsociada = document.getElementById("materias").innerText;
localStorage.setItem("materiaAsociada", materiaAsociada)
