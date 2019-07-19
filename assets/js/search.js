SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  limit: 10,
  json: '/search.json',
  noResultsText: 'No hay resultados',
  searchResultTemplate: '<li class="objeto_resultado {category}"><a href="{url}"><img src="{thumbnail}"/><p>{title}</p></a></li>'
})
