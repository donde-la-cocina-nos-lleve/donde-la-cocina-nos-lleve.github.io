const publicVapidKey = 'BEgC9Ob9muH0OjvrkXxmQsy6lnNCdSnIEX2lWjbxnNRsh9JvhFHqm0Mo9cCHkBl5GrrnHIlpJCH0TWjIrzgRwnM';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

if ('serviceWorker' in navigator) {
    if(swRegistration != null){
        swRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                if (localStorage.getItem('notification') != "false") {
                    if(subscription === null){
                        swRegistration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                        }).then(subscription => {
                            localStorage.setItem('notification', "true"); 
                            fetch('https://pushdlcnl.herokuapp.com/subscribe', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(subscription),
                            });
                        }).catch(e => {
                            console.log(e)
                        })
                    }
                }
            })
    }
}
const toggleNotification= document.getElementById('notification');

if (localStorage.getItem('notification') && localStorage.getItem('notification')=="true") {
    toggleNotification.checked = true;
}

function switchNotification(e) {
    if (e.target.checked) {
        localStorage.setItem('notification', "true"); 
        updateSubscription(true);
    }
    else {
        localStorage.setItem('notification', "false"); 
        updateSubscription(false);
    }    
}

toggleNotification.addEventListener('change', switchNotification, false);


function updateSubscription(subscribe) {
    if(subscribe){
        swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        }).then(subscription => {
            fetch('https://pushdlcnl.herokuapp.com/subscribe', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription),
            })
        })
    }
    else{
        swRegistration.pushManager.getSubscription().then(subscription => {
            subscription.unsubscribe().then(res => {
                fetch('https://pushdlcnl.herokuapp.com/unsubscribe', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subscription),
                })
            })
        })
    }
}


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

if (localStorage.getItem('theme') && localStorage.getItem('theme') == 'dark' || window.matchMedia('(prefers-color-scheme: dark)')) {
    toggleDark.checked = true;
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

if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme',localStorage.getItem('theme'));
}

