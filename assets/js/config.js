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
            fetch('https://boiling-gorge-78886.herokuapp.com/subscribe', {
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
                fetch('https://boiling-gorge-78886.herokuapp.com/unsubscribe', {
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
 
if (localStorage.getItem('theme') && localStorage.getItem('theme') == 'dark') {
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

