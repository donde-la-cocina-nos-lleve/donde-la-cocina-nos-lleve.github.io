
var options ={}

if(window.innerWidth>500){
    options = {
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        filtersContainer: document.getElementById('div_filtros'), 
        json: '/search.json',
        searchResultTemplate: '<li class="objeto_resultado show {category}"><a href="{url}"><img alt="Imagen de {title}" src="{thumbnail}"/><p>{title}</p></a></li>',
        noResultsText: 'No hay resultados',
        limit: 10,
        exclude: []
    }
}
else{
    options = {
        searchInput: document.getElementById('search-input-mobile'),
        resultsContainer: document.getElementById('results-container-mobile'),
        filtersContainer: document.getElementById('div-filtros-mobile'), 
        json: '/search.json',
        searchResultTemplate: '<li><a href="{url}"><img alt="Imagen de {title}" src="{thumbnail}"/><p>{title}</p></a></li>',
        noResultsText: 'No hay resultados',
        limit: 10,
        exclude: []
    }
}

init(options);

var filtro=[];
var data;

function init(options) {
    load(options.json)
    registerInput()
}

//get JSON via fetch
function load (location) {
    fetch(
        location,
        { method: 'GET' }
    )
        .then( response => response.json() )
        .then( json => data=json )
        .catch( error =>  console.log("JSON fetch error"+location));

}

//filter and get matches
function filterCategory(data, categories){
    var matches = []
    for (let i = 0; i < data.length; i++) {
        let match = findCategoryMatch(data[i], categories);
        if (match){
            matches.push(match);
        }
    }
    return matches;
}

function findCategoryMatch(object, categories){
    for(let category of categories){
        if(object["category"].indexOf(category)>=0){
            return object;
        }
    }
}

function search(crit, category_filter, limit) {
    if(category_filter.length>0 && !category_filter.includes("all")){
        if (crit.length==0) {
            return filterCategory(data, category_filter);
        }
        else{
            return findMatches(filterCategory(data, category_filter), crit, limit)
        }
    }
    else{ 
        if (crit.length==0) {
            return []
        }
        else{
            return findMatches(data, crit, limit)
        }
    }
}

function findMatches (data, crit, limit) {
    var matches = []
    for (let i = 0; i < data.length && matches.length < limit; i++) {
        if (match(data[i]["title"], crit)) {
            matches.push(data[i])
        }
    }
    return matches
}

function match(str, crit) {
    if (!str) return false

    str = str.trim().toLowerCase()
    crit = crit.trim().toLowerCase()

    return crit.split(' ').filter(function (word) {
        return str.indexOf(word) >= 0
    }).length === crit.split(' ').length
}

//Show matches
function showMatches(query, category_filter) {
    emptyResultsContainer()
    render(search(query, category_filter, options.limit), query)
}

function render (results, query) {
    var len = results.length
    if (len === 0) {
        return appendToResultsContainer(options.noResultsText)
    }
    for (let i = 0; i < len; i++) {
        results[i].query = query
        appendToResultsContainer(compile(results[i]))
    }
}

function compile (data) {
    return options.searchResultTemplate.replace(/\{(.*?)\}/g, function (match, prop) {
        return data[prop] || match
    })
}

//DOM
function emptyResultsContainer () {
    options.resultsContainer.innerHTML = ''
}

function appendToResultsContainer (text) {
    options.resultsContainer.innerHTML += text
}

function registerInput () {
    var buttons = options.filtersContainer.getElementsByClassName("btn");

    for (let button of buttons) {
        button.addEventListener('click', filter);    
    }
    options.searchInput.addEventListener('keyup', function (e) {
        if (isWhitelistedKey(e.which)) {
            emptyResultsContainer()
            showMatches(e.target.value, filtro)
        }
    })
}

function filter(evt) {
    var elem=evt.target;
    var data_filtro=elem.getAttribute("data-filter");
    if (data_filtro == "all"){
        filtro = [];
        if(elem.className.indexOf("active")==-1){
            var elems = options.filtersContainer.querySelectorAll(".active");
            for (let el of elems){
                el.classList.remove("active");
            }
            elem.classList.add("active");
        }
    }
    else{
        if(elem.className.indexOf("active")>-1 && filtro.indexOf(data_filtro)>-1){
            elem.classList.remove("active");
            if (options.filtersContainer.querySelectorAll(".active").length==0){
                options.filtersContainer.getElementsByClassName("btn")[0].classList.add("active");

            }

            filtro=filtro.filter(e => e !== data_filtro);
        }
        else if(elem.className.indexOf("active")==-1 && filtro.indexOf(data_filtro)==-1){
            options.filtersContainer.getElementsByClassName("btn")[0].classList.remove("active");
            elem.classList.add("active");

            filtro.push(data_filtro);
        }
    }
    showMatches(options.searchInput.value, filtro); 
}

function isWhitelistedKey (key) {
    return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1
}


