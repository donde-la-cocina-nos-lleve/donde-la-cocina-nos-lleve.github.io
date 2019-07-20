SimpleJekyllSearch({
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
var last_param_filtro="";


var input=document.getElementById("search-input").addEventListener('keyup', function (e) {
    setTimeout(filter, 400, null, last_param_filtro);
});

function filter(elem, param_filtro) {
  var resultados;
  resultados = document.getElementsByClassName("objeto_resultado");
  last_param_filtro=param_filtro;
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
  var arr_filtros=filtro.substr(0,filtro.length-1).split(",");
  for (var i = 0; i < resultados.length; i++) {
    hide(resultados[i]);
    for(var j = 0; j < arr_filtros.length; j++){
      if (resultados[i].className.indexOf(arr_filtros[j]) > -1){
        show(resultados[i]);
        break;
      }
    }
  }
}

function show(element) {
  element.classList.add("show");
}

function hide(element) {
  element.classList.remove("show");
}

function delete_from_comma_array(arr, str){
  while (arr.indexOf(str) > -1) {
      arr.splice(arr.indexOf(str), 1); 
  }
  return arr.join(",");
}

