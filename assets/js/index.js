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

if ('serviceWorker' in navigator) {
    console.log('Registering service worker');

    run().catch(error => console.error(error));
}

async function run() {
    console.log('Registering service worker');
    const registration = await navigator.serviceWorker.
        register('/sw.js', {scope: '/'});
    console.log('Registered service worker');

    console.log('Registering push');
    const subscription = await registration.pushManager.
        subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
    console.log('Registered push');
    console.log(JSON.stringify(subscription));
    document.getElementById("token").innerHTML=JSON.stringify(subscription);

    console.log('Sending push');
    await fetch('https://boiling-gorge-78886.herokuapp.com/subscribe', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        mode: 'no-cors',
    });
    console.log('Sent push');
}

