var sjs=SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  limit: 30,
  json: '/search.json',
  noResultsText: 'No hay resultados',
  searchResultTemplate: '<li class="objeto_resultado show {category}"><a href="{url}"><img src="{thumbnail}"/><p>{title}</p></a></li>'
})

var btn_all;
document.addEventListener("DOMContentLoaded", function() {
    btn_all = document.getElementById("search-container").getElementsByClassName("active")[0];
    filter(btn_all, "all");
});

var filtro="";

var input=document.getElementById("search-input");

function filter(elem, param_filtro) {
  if (param_filtro == "all"){
    filtro = "";
    elem=btn_all;
    if(elem.className.indexOf("active")==-1){
      var btnContainer = document.getElementById("search-container");
      var elems = btnContainer.querySelectorAll(".active");
      [].forEach.call(elems, function(el) {
          el.classList.remove("active");
      });
      elem.classList.add("active");
    }
  }
  else{
    if(elem != null){
      if(elem.className.indexOf("active")>-1){
        elem.classList.remove("active");
      }
      else{
        btn_all.classList.remove("active");
        elem.classList.add("active");
      }
      if(filtro.indexOf(param_filtro)>-1){
        filtro=delete_from_comma_array(filtro.split(","),param_filtro);
      }
      else{
        filtro+=param_filtro+",";
      }
    }
  }
  sjs.search(input.value, filtro); 
}

function delete_from_comma_array(arr, str){
  while (arr.indexOf(str) > -1) {
      arr.splice(arr.indexOf(str), 1); 
  }
  return arr.join(",");
}

function mostrarFiltros(elem){
  if (elem.className.indexOf("active")>-1) {
    elem.classList.remove("active");
  } else {
    elem.classList.add("active");
  } 
  var div_filtros=document.getElementById("div_filtros");
  if (div_filtros.className.indexOf("show")>-1) {
    div_filtros.classList.remove("show");
  } else {
    div_filtros.classList.add("show");
  } 
}
