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

var btn_menu = document.getElementById('boton-menu');
btn_menu.addEventListener('click', function(event) {
    abrirMenu();
});

var btn_buscar = document.getElementById('boton-buscar');
btn_buscar.addEventListener('click', function(event) {
    abrirBusqueda();
});
