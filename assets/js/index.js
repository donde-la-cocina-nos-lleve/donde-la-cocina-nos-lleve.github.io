let swRegistration = null;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {scope: '/'});
    navigator.serviceWorker.ready.then(registration => {
        swRegistration = registration;
    })
}


if (localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme',localStorage.getItem('theme'));
}

