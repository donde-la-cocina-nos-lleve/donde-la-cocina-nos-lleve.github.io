function toggleMenu() {
  document.getElementById("sidebar_menu").classList.toggle("show");
}

function toggleBusqueda() {
  document.getElementById("sidebar_buscar").classList.toggle("show");
}

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

