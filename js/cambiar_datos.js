document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const celular = document.getElementById("celular").value;
        const documento = document.getElementById("cedula").value;
        
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
        const data = await response.json();
        console.log(data);

        if(response.status==200){
            alert("Datos cambiados con exito");
        }
        else{
             alert("Ocurrio un error");
        }

        document.getElementById("nombre").value = "";
        document.getElementById("celular").value = "";
        document.getElementById("cedula").value = "";
    });
});