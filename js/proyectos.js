// import { fechaDeHoy } from "../src/controllers/usuarios.controllers";


document.getElementById("codigo").value = localStorage.getItem("materiaAsociada");
document.getElementById("codigo").disabled = true;
document.getElementById("semestre").disabled = true;
let fechaHoy;

const fechaDeHoyPtm = async () => {
    const responseHOY = await fetch('http://localhost:5500/api/fechaDeHoy', {
        method: 'GET',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json'
        }


    });

    const dataHOY = await responseHOY.json()
    // console.log(dataHOY.hoy.id_semestre);
    const fechaUtil =  dataHOY.hoy
    console.log(fechaUtil);
    fechaHoy = fechaUtil;
    document.getElementById("semestre").value = fechaUtil
    return fechaUtil;
}

fechaDeHoyPtm();
console.log(fechaHoy);





document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('enviarProyecto').addEventListener('click', async (event) => {

        console.log("algo")

        const codMateria = document.getElementById("codigo").value;
        const nombre = document.getElementById("nombre").value;
        const integrantes = document.getElementById("Integrantes").value;
        const descripcion = document.getElementById("descipcion").value;
        const semestre = document.getElementById("semestre").value;

        const body = {
            id_materia: codMateria,
            nombre: nombre,
            integrantes: integrantes,
            descripcion: descripcion,
            id_semestre_proyecto: semestre
        }

        const response = await fetch('http://localhost:5500/api/proyectos', {
            method: 'POST',
            body: JSON.stringify(body),
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            }



        });
        const data = await response.json()

        if (response.ok) {
            alert("proyecto cargado")
        }
        else {
            console.error("Error en la respuesta del servidor:", data.message);
            alert("Datos incorrectos");
        }

        document.getElementById("codigo").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("Integrantes").value = "";
        document.getElementById("descipcion").value = "";
        document.getElementById("semestre").value = "";
    });
});
