window.onload = function() {
    verificarAutenticacion();
};

// Función para verificar la autenticación
document.addEventListener("DOMContentLoaded", function verificarAutenticacion() {
    // Tu variable que indica si el usuario está autenticado
    let autenticadoreal = localStorage.getItem('infoUser');

    console.log(autenticadoreal);

    // Si el usuario no está autenticado, redirige a la página de inicio
    if (!autenticadoreal) {
         window.location.href = "../login.html";
    }
});