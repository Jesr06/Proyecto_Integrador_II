
const resultadosDiv = document.getElementById("resultados")

let contadorProyectos
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('buscarProyectos').addEventListener('click', async (event) => {
        event.preventDefault();
        contadorProyectos =0;
        while (resultadosDiv.firstChild) {
            resultadosDiv.removeChild(resultadosDiv.firstChild);
        }

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

        for (let i = 0; i < data.results[0].length; i++) {
            let cajaProyecto = document.createElement('div');
            cajaProyecto.classList.add("cajaProyecto");

            let materiaName = data.results[0][i].id_materia;
            let nombreProyecto = data.results[0][i].nombre;
            let integrantes = data.results[0][i].integrantes;
            let descripcion = data.results[0][i].descripcion;
            let semestreProyecto = data.results[0][i].id_semestre_proyecto;
            let documentos = data.results[0][i].documentos;

            let textoMateria = document.createElement('p');
            textoMateria.classList.add("TextoAtributo");
            textoMateria.textContent = "Materia: " + materiaName;
            cajaProyecto.appendChild(textoMateria);

            let textoSemestre = document.createElement('p');
            textoSemestre.classList.add("TextoAtributo");
            textoSemestre.textContent = "Semestre del proyecto: " + semestreProyecto;
            cajaProyecto.appendChild(textoSemestre);

            let textoNombreProyecto = document.createElement('p');
            textoNombreProyecto.classList.add("TextoAtributo");
            textoNombreProyecto.textContent = "Nombre del proyecto: " + nombreProyecto;
            cajaProyecto.appendChild(textoNombreProyecto);

            let textoIntegrantes = document.createElement('p');
            textoIntegrantes.classList.add("TextoAtributo");
            textoIntegrantes.textContent = "Integrantes: " + integrantes;
            cajaProyecto.appendChild(textoIntegrantes);

            let textoDescripcion = document.createElement('p');
            textoDescripcion.classList.add("TextoAtributo");
            textoDescripcion.textContent = "Descripción: " + descripcion;
            cajaProyecto.appendChild(textoDescripcion);

            let textoDocumentos = document.createElement('p');
            textoDocumentos.classList.add("TextoAtributo");
            textoDocumentos.innerHTML = `Documentos: <a href=${documentos} target=_blank>${documentos}</a>`
            cajaProyecto.appendChild(textoDocumentos);

            resultadosDiv.append(i + 1, cajaProyecto);

            contadorProyectos++;
        }


        if (response.status == 200) {
            // alert("Materias buscadas");
            console.log("Materias encontradas");
        }
        else {
            alert("Ocurrio un error");
        }
    });
});


document.getElementById('generar-pdf').addEventListener('click', async (event) => {
    event.preventDefault();
    try {
        // Obtener el contenido del div
        
        const contenidoDiv = document.getElementById('resultados').innerText;
        const materia = document.getElementById('busquedaMateria').value;
        const semestre = document.getElementById('busquedaSemestre').value;

        // Llamar al endpoint del servidor para generar el PDF
        const response = await fetch('http://localhost:5500/api/generarPDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contenidoDiv, materia, semestre, contadorProyectos }), // Include materia and semestre
        });

        if (!response.ok) {
            throw new Error(`Error al llamar al servidor: ${response.statusText}`);
        }

        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
});


// document.getElementById('generar-pdf').addEventListener('click', async (event) => {
//     event.preventDefault();
//     try {
//         // Obtener el contenido del div

//         const contenidoDiv = document.getElementById('resultados').innerText;
//         const materia = document.getElementById('busquedaMateria').innerText;
//         const semestre = document.getElementById('busquedaSemestre').innerText;

        
//         // Llamar al endpoint del servidor para generar el PDF
//         const response = await fetch('http://localhost:5500/api/generarPDF', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ contenidoDiv }),
//         });

//         if (!response.ok) {
//             throw new Error(`Error al llamar al servidor: ${response.statusText}`);
//         }

//         const data = await response.text();
//         console.log(data);
//     } catch (error) {
//         console.error(error);
//     }
// });




