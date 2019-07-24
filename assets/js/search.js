SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  filtersContainer: document.getElementById('div_filtros'), 
  limit: 10,
  json: '/search.json',
  noResultsText: 'No hay resultados',
  searchResultTemplate: '<li class="objeto_resultado show {category}"><a href="{url}"><img src="{thumbnail}"/><p>{title}</p></a></li>'
})
