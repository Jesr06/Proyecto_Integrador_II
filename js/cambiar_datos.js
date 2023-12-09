document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre2").value;
        const celular = document.getElementById("celular2").value;
        const documento = document.getElementById("cedula2").value;

        const usuario = JSON.parse(localStorage.getItem("infoUser"));

        const codigo = usuario.codigo;
        const body = {
            nombre: nombre,
            codigo: codigo,
            celular: celular,
            documento: documento
        }

        const response = await fetch('http://localhost:5500/api/act', {
            method: 'PATCH',
            body: JSON.stringify(body),
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            }

        });

        const datosNuevos = await response.json();
        console.log(datosNuevos);

        if (response.status == 200) {
            localStorage.setItem("infoNew", JSON.stringify(datosNuevos))
            Swal.fire({
                position: "top",
                icon: "success",
                title: "Datos cambiados con éxito!",
                showConfirmButton: false,
                timer: 1500
              })
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrio un error',
                icon: 'error',
                confirmButtonText: 'Volver'
              })
        }

        document.getElementById("nombre2").value = "";
        document.getElementById("celular2").value = "";
        document.getElementById("cedula2").value = "";
    });
});

function limpiarLocalStorage() {
    localStorage.clear();
    
}

document.getElementById('cerrar').addEventListener('click', limpiarLocalStorage);