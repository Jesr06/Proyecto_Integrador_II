const fechas = async () => {
    const responseFecha = await fetch('http://localhost:5500/api/fechas', {
        method: 'GET',
        cache: 'default',
        headers: {
            'Content-Type': 'application/json'
        }


    });

    const dataFecha = await responseFecha.json()
    console.log(dataFecha);
    const fechaInicio = dataFecha.inicio
    const fechaFinal = dataFecha.final
    const fechaI = new Date(fechaInicio);
    const fechaF = new Date(fechaFinal)
    // Obtener año, mes y día de la fecha inicio
    var yeari = fechaI.getFullYear();
    var monthi = fechaI.getMonth() + 1;  // Sumar 1 porque los meses van de 0 a 11
    var dayi = fechaI.getDate();
    // Obtener año, mes y día de la fecha final
    var yearf = fechaF.getFullYear();
    var monthf = fechaF.getMonth() + 1;  // Sumar 1 porque los meses van de 0 a 11
    var dayf = fechaF.getDate();

    // Crear la fecha inicio
    var fechaFormateadai = (dayi < 10 ? "0" : "") + dayi  + "-" + (monthi < 10 ? "0" : "") + monthi + "-" + yeari;
    // Crear la fecha final
    var fechaFormateadaf = (dayf < 10 ? "0" : "") + dayf + "-" + (monthf < 10 ? "0" : "") + monthf + "-" + yearf ;
    

    document.getElementById("inicio").innerText = fechaFormateadai;
    document.getElementById("fin").innerText = fechaFormateadaf;

    return 0;
}

fechas();