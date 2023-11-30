const fecha = JSON.parse(localStorage.getItem("infoFecha"));
document.getElementById("inicio").innerText=fecha.inicio;
document.getElementById("fin").innerText=fecha.fin;