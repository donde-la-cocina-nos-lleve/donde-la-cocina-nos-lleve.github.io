
var options ={}

if(window.innerWidth>500){
    options = {
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        filtersContainer: document.getElementById('div_filtros'), 
        json: '/search.json',
        searchResultTemplate: '<li class="objeto_resultado show {category}"><a href="{url}"><img src="{thumbnail}"/><p>{title}</p></a></li>',
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
        searchResultTemplate: '<li><a href="{url}"><img src="{thumbnail}"/><p>{title}</p></a></li>',
        noResultsText: 'No hay resultados',
        limit: 10,
        exclude: []
    }
}

init(options);

var filtro="";
function init(options) {
    load(options.json)
    return {
        search: showMatches
    }
}

//get JSON via fetch
function initWithJSON (json) {
    put(json)
    registerInput()
}

function load (location) {
    fetch(
        location,
        { method: 'GET' }
    )
        .then( response => response.json() )
        .then( json => initWithJSON(json) )
        .catch( error =>  console.log("JSON fetch error"+location));

}

//build array of data from JSON
var data = []

function put (data) {
    if (isObject(data)) {
        return addObject(data)
    }
    if (isArray(data)) {
        return addArray(data)
    }
    return undefined
}
function clear () {
    data.length = 0
    return data
}

function isObject (obj) {
    return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}

function isArray (obj) {
    return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Array]'
}

function addObject (_data) {
    data.push(_data)
    return data
}

function addArray (_data) {
    var added = []
    clear()
    for (var i = 0, len = _data.length; i < len; i++) {
        if (isObject(_data[i])) {
            added.push(addObject(_data[i]))
        }
    }
    return added
}

//filter and get matches
function filterCategory(data, categories){
    var matches = []
    for (var i = 0; i < data.length; i++) {
        var match = findCategoryMatch(data[i], categories);
        if (match){
            matches.push(match);
        }
    }
    return matches;
}
function findCategoryMatch(object, categories){
    var arr_categories=categories.substr(0, categories.lastIndexOf(",")).split(",");
    for(var i=0;i<arr_categories.length;i++){
        if(object["category"].indexOf(arr_categories[i])>=0){
            return object;
        }
    }
}
function search(crit, category_filter, limit) {
    if (crit.length==0) {
        if(category_filter.length>0 && category_filter!="all"){
            return filterCategory(data, category_filter);
        }
        else{ 
            return []
        }
    }
    return findMatches(filterCategory(data, category_filter), crit, limit)
}


function findMatches (data, crit, limit) {
    var matches = []
    for (var i = 0; i < data.length && matches.length < limit; i++) {
        var match = findMatchesInObject(data[i], crit)
        if (match) {
            matches.push(match)
        }
    }
    return matches
}

function findMatchesInObject (obj, crit) {
    if (matches(obj["title"], crit)) {
        return obj
    }
}

function matches(str, crit) {
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
    for (var i = 0; i < len; i++) {
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
        filtro = "";
        if(elem.className.indexOf("active")==-1){
            var elems = options.filtersContainer.querySelectorAll(".active");
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
                options.filtersContainer.getElementsByClassName("btn")[0].classList.remove("active");
                elem.classList.add("active");
            }
            if(filtro.indexOf(data_filtro)>-1){
                filtro=delete_from_comma_array(filtro.split(","),data_filtro);
            }
            else{
                filtro+=data_filtro+",";
            }
        }
    }
    showMatches(options.searchInput.value, filtro); 
}

//utils
function delete_from_comma_array(arr, str){
    while (arr.indexOf(str) > -1) {
        arr.splice(arr.indexOf(str), 1); 
    }
    return arr.join(",");
}

function merge (defaultParams, mergeParams) {
    var mergedOptions = {}
    for (var option in defaultParams) {
        mergedOptions[option] = defaultParams[option]
        if (typeof mergeParams[option] !== 'undefined') {
            mergedOptions[option] = mergeParams[option]
        }
    }
    return mergedOptions
}

function isJSON (json) {
    try {
        if (json instanceof Object && JSON.parse(JSON.stringify(json))) {
            return true
        }
        return false
    } catch (err) {
        return false
    }
}

function isWhitelistedKey (key) {
    return [13, 16, 20, 37, 38, 39, 40, 91].indexOf(key) === -1
}

