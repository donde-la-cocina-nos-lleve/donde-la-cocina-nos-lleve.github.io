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
    navigator.serviceWorker.register('/sw.js', {scope: '/'});
    navigator.serviceWorker.ready.then(registration => {
        swRegistration = registration;
        registration.pushManager.getSubscription()
        .then(function(subscription) {
            if (localStorage.getItem('notification') != "false") {
                if(subscription === null){
                    registration.pushManager.subscribe({
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
    })
}


if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme',localStorage.getItem('theme'));
}

