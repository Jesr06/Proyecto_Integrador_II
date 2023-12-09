const usuario = JSON.parse(localStorage.getItem("infoUser"));
document.getElementById("nombre").innerText = usuario.nombre;
document.getElementById("correo").innerText = usuario.correo;
document.getElementById("documento").innerText = usuario.documento;
document.getElementById("celular").innerText = usuario.celular;
const cajaMaterias = document.getElementById("mat_asociadas")

function proyectoDeMateria(value) {
    const materiaAsociada = value;
    localStorage.setItem("materiaAsociada", materiaAsociada)
}

const materiasProfesor = async () => {

    let codigo = usuario.codigo;
    console.log("algo")

    const body = {
        codigo: codigo
    }

    const response = await fetch('http://localhost:5500/api/materiasProfesor', {
        method: 'POST',
        body: JSON.stringify(body),
        cache: 'default',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json()
    console.log(data.results);

    for (let i = 0; i < data.results[0].length; i++) {
        let cajaMateria = document.createElement("div");
        cajaMateria.classList.add("cajaMateria");

        let codigoMateria = data.results[0][i].codigo;
        let nombreMateria = data.results[0][i].nombre;

        let enlaceProyecto = document.createElement('a');
        enlaceProyecto.classList.add("textoMateria")
        enlaceProyecto.href = "/profesor/nuevo_proyecto.html";

        let textoCodigo = document.createElement('p');
        textoCodigo.classList.add("textoMateria")
        textoCodigo.textContent = codigoMateria;

        textoCodigo.onclick = function () {
            proyectoDeMateria(this.innerText);
        };
        
        enlaceProyecto.appendChild(textoCodigo);

        cajaMateria.appendChild(enlaceProyecto);

        cajaMaterias.append(nombreMateria);

        cajaMaterias.appendChild(cajaMateria);
    }

    return data.results;
}

materiasProfesor();
