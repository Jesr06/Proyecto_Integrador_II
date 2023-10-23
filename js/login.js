

//const entrar = document.getElementById('entrar');
//
// entrar.addEventListener('click', async () => {
//     const body = {
//         user:user,
//         pass:pass
//     }
//
//     const response = await fetch('http://localhost:5500/api/consultar', {
//         method: 'POST',
//         body: body,
//         cache: 'default',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//
//     });
//
// });

function loguear() {
    let user = document.getElementById("correo").value;
    let pass = document.getElementById("contrasena").value;
    if (user == "1" && pass == "1") {

        window.location="../admin/perfil_administrador.html"
    }

    else {

        alert("Datos incorrectos");
    }
}
