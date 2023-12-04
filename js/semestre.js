document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('semestre').addEventListener('click', async (event) => {

        console.log("algo")

        const id = document.getElementById("ID_sem").value;
        const inicio = document.getElementById("inicio_sem").value;
        const fin = document.getElementById("fin_sem").value;

        const body = {
            inicio: inicio,
            id: id,
            fin: fin
        }

        const response = await fetch('http://localhost:5500/api/semestre', {
            method: 'POST',
            body: JSON.stringify(body),
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            }



        });
        const data= await response.json();

        if (response.status == 200) {
            
            alert("Semestre cargado")
        }
        else {
            alert("Semestre no cargado");
        }

        document.getElementById("ID_sem").value = "";
        document.getElementById("inicio_sem").value = "";
        document.getElementById("fin_sem").value = "";

        
    });
});
