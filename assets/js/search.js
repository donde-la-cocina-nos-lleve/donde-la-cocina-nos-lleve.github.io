SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  filtersContainer: document.getElementById('div_filtros'), 
  limit: 10,
  json: '/search.json',
  noResultsText: 'No hay resultados',
  searchResultTemplate: '<li class="objeto_resultado show {category}"><a href="{url}"><img src="{thumbnail}"/><p>{title}</p></a></li>'
})

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
