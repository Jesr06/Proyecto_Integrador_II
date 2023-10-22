const dropArea = document.getElementById('drop-area');
const enviarDatosButton = document.getElementById('enviarUsuarios');


dropArea.addEventListener('dragover', function (event) {
  event.preventDefault();
  dropArea.style.border = '2px solid #777';
});

dropArea.addEventListener('dragleave', function (event) {
  event.preventDefault();
  dropArea.style.border = '2px dashed #ccc';
});

dropArea.addEventListener('drop', function (event) {
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
    const cajaPadre = document.getElementById("cajaGrande")
    cajaPadre.appendChild(nombreArchivo);


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
      cajaPadre.appendChild(nombreArchivo);


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



      enviarDatosButton.addEventListener('click', function () {
        //codigo para insertar los datos


        // Hacer una solicitud POST al servidor para insertar los datos en la base de datos
        fetch('/insertar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosJson) // Convertir los datos a JSON y enviarlos en el cuerpo de la solicitud
        })
          .then(response => response.json()) // Parsear la respuesta del servidor como JSON
          .then(data => {
            // Manejar la respuesta del servidor
            console.log(data); // Puedes mostrar la respuesta en la consola o en la interfaz de usuario
          })
          .catch(error => {
            // Manejar errores en la solicitud
            console.error('Error al enviar datos:', error);
          });
      });





    };

    lector.readAsBinaryString(archivo);
  } else {
    console.log("Por favor, selecciona un archivo Excel (.xlsx).");
    const nombreArchivo = document.createElement('p');
    nombreArchivo.classList.add("mensajeJS")
    nombreArchivo.textContent = `Por favor, selecciona un archivo Excel (.xlsx).`;
    const cajaPadre = document.getElementById("cajaGrande")
    cajaPadre.appendChild(nombreArchivo);

  }



}



