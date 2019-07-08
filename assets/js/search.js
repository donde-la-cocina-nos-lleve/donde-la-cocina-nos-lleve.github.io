SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  limit: 10,
  json: '/search.json',
  noResultsText: 'No hay resultados',
  searchResultTemplate: '<li><a href="{url}"><img src="{thumbnail}"/><span>{title}</span></a></li>'
})
