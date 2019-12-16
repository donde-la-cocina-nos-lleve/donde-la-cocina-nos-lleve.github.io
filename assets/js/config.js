---
---

var currentCategoria= localStorage.getItem('categoria'); 
{% for categoria in site.category %}

    const toggle{{ categoria.slug }}= document.getElementById('{{ categoria.slug }}');

    if (currentCategoria) {
        if (currentCategoria.includes("{{ categoria.slug }}")) {
            toggle{{ categoria.slug }}.checked = true;
        }
    }

    function switch{{ categoria.slug }}(e) {
        if (e.target.checked) {
            if (!currentCategoria) {
                localStorage.setItem('categoria', "{{ categoria.slug }},"); 
            }
            else if (!currentCategoria.includes("{{ categoria.slug }}")) {
                localStorage.setItem('categoria', currentCategoria+"{{ categoria.slug }},"); 
            }
        }
        else {
            if (currentCategoria.includes("{{ categoria.slug }}")) {
                localStorage.setItem('categoria', removeValue(currentCategoria, "{{ categoria.slug }}")); 
            }    
        }    
        currentCategoria= localStorage.getItem('categoria'); 
    }

    toggle{{ categoria.slug }}.addEventListener('change', switch{{ categoria.slug }}, false);

{% endfor %}

function saveConfig() {
    let categoria=localStorage.getItem("categoria");
    console.log(categoria);
    console.log(swRegistration);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    }).then(subscription => {
        body={ subscription: subscription, categoria: categoria}
        console.log(JSON.stringify(body));
        fetch('https://boiling-gorge-78886.herokuapp.com/subscribe', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    })
}

const saveButton = document.getElementById('save');
saveButton.addEventListener('click', saveConfig, false);

function removeValue(list, value) {
  var separator = ",";
  var values = list.split(separator);
  for(var i = 0 ; i < values.length ; i++) {
    if(values[i] == value) {
      values.splice(i, 1);
      return values.join(separator);
    }
  }
  return list;
}


const toggleDark = document.getElementById('night');
const currentTheme = localStorage.getItem('theme'); 

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleDark.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); 
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); 
    }    
}

toggleDark.addEventListener('change', switchTheme, false);

