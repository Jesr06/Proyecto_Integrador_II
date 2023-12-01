


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('buscarProyectos').addEventListener('click', async (event) => {
        event.preventDefault();
        
        const materia = document.getElementById('busquedaMateria').value;
        const semestre = document.getElementById('busquedaSemestre').value;

        const body = {
            materia: materia,
            semestre: semestre
        }

        console.log(body);
        const response = await fetch('http://localhost:5500/api/buscar', {
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
            // alert("Materias buscadas");
        }
        else {
            alert("Ocurrio un error");
        }
        document.getElementById("contrasena").value = "";
    });
});
