
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('formulario').addEventListener('submit', async (event) => {
        event.preventDefault();

        const user = document.getElementById("correo").value;
        const pass = document.getElementById("contrasena").value;

        const body = {
            user: user,
            pass: pass
        }
        const response = await fetch('http://localhost:5500/api/consultar', {
            method: 'POST',
            body: JSON.stringify(body),
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        const data = await response.json();
        console.log(data);




        if (response.status == 200) {
            localStorage.setItem("infoUser",JSON.stringify(data))

           
            
            if (data.isadmin == true) {
                window.location.href = "/admin/perfil_administrador.html";
            }
            else {

                window.location.href = "/profesor/perfil_profesor.html";

            }
        }
        else {
            alert("Credenciales incorrectas");
        }


    });
});
