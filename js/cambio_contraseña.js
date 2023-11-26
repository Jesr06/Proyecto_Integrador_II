document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const contrasena = document.getElementById("contrasena").value;
       
        
        const usuario = JSON.parse(localStorage.getItem("infoUser"));
        
        const codigo = usuario.codigo;
        const body = {
            contrasena: contrasena,
            codigo: codigo,
        }

        const response = await fetch('http://localhost:5500/api/actu', {
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
            alert("Contraseña cambiada con exito");
        }
        else{
             alert("Ocurrio un error");
        }
        document.getElementById("contrasena").value = "";
    });
});