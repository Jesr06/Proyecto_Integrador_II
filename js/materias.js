const dropArea = document.getElementById('drop-materias');
const enviarDatosButton = document.getElementById('enviarMaterias');


dropArea.addEventListener('dragover', function (event) {
    event.preventDefault();
    dropArea.style.border = '2px solid #777';
});

dropArea.addEventListener('dragleave', function (event) {
    event.preventDefault();
    dropArea.style.border = '2px dashed #ccc';
});

dropArea.addEventListener('drop', function (event) {
    dropArea.appendChild(" ");
    event.preventDefault();
    dropArea.style.border = '2px dashed #ccc';

    const files = event.dataTransfer.files;
    // Verificar si se seleccionó al menos un archivo
    if (files.length > 0) {
        const archivo = files[0];
        // Mostrar el nombre del archivo en un elemento de la página
        const nombreArchivo = document.createElement('p');
        nombreArchivo.classList.add("mensajeJS")

        nombreArchivo.textContent = `Archivo seleccionado: ${archivo.name}`;
        dropArea.appendChild(nombreArchivo);


        handleFiles(files);
    }
});

dropArea.addEventListener('click', function () {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx'; // Solo permite archivos Excel
    fileInput.addEventListener('change', function () {
        const files = this.files;
        // Verificar si se seleccionó al menos un archivo
        if (files.length > 0) {
            const archivo = files[0];
            // Mostrar el nombre del archivo en un elemento de la página
            const nombreArchivo = document.createElement('p');
            nombreArchivo.classList.add("mensajeJS")
            nombreArchivo.textContent = `Archivo seleccionado: ${archivo.name}`;
            const cajaPadre = document.getElementById("cajaGrande")
            const logoExcel = new Image(100, 50)
            logoExcel.src = "../img/excel.svg"
            logoExcel.classList.add("mensajeJS")
            dropArea.append(logoExcel, nombreArchivo);



            handleFiles(files);
        }
    });
    fileInput.click();
});

function handleFiles(files) {
    if (files.length === 0) {
        console.log("No se han seleccionado archivos.");
        return;
    }


    const archivo = files[0];

    if (archivo.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        const lector = new FileReader();

        lector.onload = function (evento) {
            const data = evento.target.result;
            const workbook = XLSX.read(data, { type: "binary" });

            const nombreHoja = workbook.SheetNames[0];
            const datosJson = XLSX.utils.sheet_to_json(workbook.Sheets[nombreHoja]);

            console.log("Datos del archivo Excel convertidos a JSON:", datosJson);

            // Mostrar el botón enviarUsuarios después de leer los datos del archivo
            enviarDatosButton.style.display = 'block';

            enviarDatosButton.addEventListener('click', async () => {
                if (datosJson && datosJson.length > 0) {
                    try {
                        console.log('Antes de la solicitud fetch');
                        console.log(datosJson);

                        const response = await fetch('http://localhost:5500/api/materias', {
                            method: 'POST',
                            body: JSON.stringify(datosJson), // Convertir los datos a JSON y enviarlos en el cuerpo de la solicitud
                            cache: 'default',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (response.ok) {
                            const responseData = await response.json(); // Esperar la respuesta del servidor
                            console.log('Respuesta del servidor:', responseData);
                        } else {
                            console.error('Error en la solicitud:', response.status, response.statusText);
                        }

                        console.log('Después de la solicitud fetch');
                        console.log(datosJson);
                        if (response.status === 200) {
                            while (dropArea.firstChild) {
                                dropArea.removeChild(dropArea.firstChild);
                            }
                            const Mensaje = document.createElement('p');
                            Mensaje.classList.add("mensajeJS")
                            Mensaje.textContent = `Materias enviadas con exito`;
                            dropArea.appendChild(Mensaje);
                        }
                    } catch (error) {
                        console.error('Error al realizar la solicitud:', error);
                    }
                } else {
                    console.log("No hay datos para enviar.");
                }
            });

        };

        lector.readAsBinaryString(archivo);
    } else {
        while (dropArea.firstChild) {
            dropArea.removeChild(dropArea.firstChild);
        }
        const nombreArchivo = document.createElement('p');
        nombreArchivo.classList.add("mensajeJS")
        nombreArchivo.textContent = `Por favor, selecciona un archivo Excel (.xlsx).`;
        dropArea.appendChild(nombreArchivo);

    }



}



