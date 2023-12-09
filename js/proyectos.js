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
    const fechaUtil = dataHOY.hoy
    console.log(fechaUtil);
    fechaHoy = fechaUtil;
    document.getElementById("semestre").value = fechaUtil
    return fechaUtil;
}

fechaDeHoyPtm();






document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('enviarProyecto').addEventListener('click', async (event) => {
        
        console.log("algo")

        const codMateria = document.getElementById("codigo").value;
        const nombre = document.getElementById("nombre").value;
        const integrantes = document.getElementById("Integrantes").value;
        const descripcion = document.getElementById("descipcion").value;
        const semestre = document.getElementById("semestre").value;


        const inputArchivo = document.getElementById('documentos');
        const archivo = inputArchivo.files[0];

        if (archivo) {
            const formData = new FormData();
            formData.append('archivo', archivo);
            formData.append('id_materia', codMateria);
            formData.append('nombre', nombre);
            formData.append('integrantes', integrantes);
            formData.append('descripcion', descripcion);
            formData.append('semestre', semestre);



            const response = await fetch('http://localhost:5500/api/proyectos', {
                method: 'POST',
                body: formData,
                cache: 'default',




            });

            const formDataObj = {};
            formData.forEach((valor, clave) => {
                formDataObj[clave] = valor;
            });

            // Imprimir el objeto resultante
            console.log(archivo);


            if (response.status == 200) {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Proyecto guardado con éxito!",
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else {
                console.error("Error en la respuesta del servidor:", data.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrio un error',
                    icon: 'error',
                    confirmButtonText: 'Volver'
                  })
            }

            document.getElementById("codigo").value = "";
            document.getElementById("nombre").value = "";
            document.getElementById("Integrantes").value = "";
            document.getElementById("descipcion").value = "";
            document.getElementById("semestre").value = "";
        }else{
            alert("Debe cargar un documento");
        }
    });
});
