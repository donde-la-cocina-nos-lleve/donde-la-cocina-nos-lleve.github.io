function abrirMenu() {
  document.getElementById("sidebar_menu").className = "menu_abierto";
}

function cerrarMenu() {
  document.getElementById("sidebar_menu").className = "menu_cerrado";
}

function abrirBusqueda() {
  document.getElementById("sidebar_buscar").className = "buscar_abierto";
}

function cerrarBusqueda() {
  document.getElementById("sidebar_buscar").className = "buscar_cerrado";
}

var btn_abrir_menu = document.getElementById('boton-menu');
btn_abrir_menu.addEventListener('click', function(event) {
    abrirMenu();
});

var btn_cerrar_menu = document.getElementById('boton-cerrar-menu');
btn_cerrar_menu.addEventListener('click', function(event) {
    cerrarMenu();
});


var btn_buscar = document.getElementById('boton-buscar');
btn_buscar.addEventListener('click', function(event) {
    abrirBusqueda();
});
