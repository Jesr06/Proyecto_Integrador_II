const datosNew = JSON.parse(localStorage.getItem("infoNew"));

document.getElementById("nombre").innerText = datosNew.nombre;
document.getElementById("documento").innerText=datosNew.documento;
document.getElementById("celular").innerText=datosNew.celular;
