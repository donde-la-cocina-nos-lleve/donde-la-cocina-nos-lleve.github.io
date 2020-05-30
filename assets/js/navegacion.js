const sidebar_menu=document.getElementById("sidebar_menu");
const sidebar_buscar=document.getElementById("sidebar_buscar");
function toggleMenu() {
  sidebar_menu.classList.toggle("show");
}

function toggleBusqueda() {
  sidebar_buscar.classList.toggle("show");
}

var content = document.getElementById('content');
content.addEventListener('click', function(event) {
    if(sidebar_menu.classList.contains("show")){
        toggleMenu();
    }
    if(sidebar_buscar.classList.contains("show")){
        toggleBusqueda();
    }
});

var btn_abrir_menu = document.getElementById('boton-menu');
btn_abrir_menu.addEventListener('click', function(event) {
    toggleMenu();
});

var btn_cerrar_menu = document.getElementById('boton-cerrar-menu');
btn_cerrar_menu.addEventListener('click', function(event) {
    toggleMenu();
});

var btn_abrir_buscar = document.getElementById('boton-buscar');
btn_abrir_buscar.addEventListener('click', function(event) {
    toggleBusqueda();
});

var btn_cerrar_buscar = document.getElementById('boton-cerrar-buscar');
btn_cerrar_buscar.addEventListener('click', function(event) {
    toggleBusqueda();
});

