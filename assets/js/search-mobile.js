SimpleJekyllSearch({
  searchInput: document.getElementById('search-input-mobile'),
  resultsContainer: document.getElementById('results-container-mobile'),
  limit: 10,
  json: '/search.json',
  noResultsText: 'No hay resultados',
  searchResultTemplate: '<li><a href="{url}"><img src="{thumbnail}"/><p>{title}</p></a></li>'
})
