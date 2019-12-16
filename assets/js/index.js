---
---
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
const publicVapidKey = 'BEgC9Ob9muH0OjvrkXxmQsy6lnNCdSnIEX2lWjbxnNRsh9JvhFHqm0Mo9cCHkBl5GrrnHIlpJCH0TWjIrzgRwnM';

let swRegistration = null;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(registration => {
        swRegistration = registration;
        registration.pushManager.getSubscription()
        .then(function(subscription) {
            if(subscription === null){
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                }).then(subscription => {
                    let categoria="{% for categoria in site.category %}{{ categoria.slug }},{% endfor %}"
                    localStorage.setItem('categoria', categoria); 

                    body={ subscription: subscription, categoria: categoria}
                    console.log(JSON.stringify(body));
                    //document.getElementById("token").innerHTML=JSON.stringify(subscription);
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
        })
    })
}
