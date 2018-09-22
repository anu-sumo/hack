const bluebird = require('bluebird');
import * as api from '../../app/api';

global.Promise = bluebird;
//TODO: use set interval
//setInterval(function(){ i + 1 ; console.log(i); }, 3000);


// add an appropriate event listener
addEventListener("openTab", (e) => {
  console.log("openTabEvent", e);
  chrome.tabs.create({ url: e.detail.url })
});


function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}



const getDoneNotifs = () => {
  const notifs = localStorage.getItem('doneNotification');
  console.log(notifs);
  if (notifs) {
    return JSON.parse(notifs);
  }
  return {};
}

const getSubs = () => {
  const subs = localStorage.getItem('subscriptions');
  if (subs) {
    return JSON.parse(subs);
  }
  return [];
}

const syncWithLocalStorage = () => {
  const subs = getSubs();
  if (!subs) {
    return;
  }
  const synced = subs.map((sub) => ({ ...sub, status: localStorage.getItem(sub.id) }));


  localStorage.setItem('subscriptions', JSON.stringify(synced));

  return synced;


}



const showNotif = () => {
  const doneNotifs = getDoneNotifs();
  const subs = syncWithLocalStorage();
  subs.forEach((sub) => {
    const status = sub.status;
    if (status === 'done' || status === 'failed') {
      let notif = {};
      if (sub.type === 'search') {
        notif = {
          iconUrl: "img/sumo.png",
          type: 'basic',
          title: 'Search',
          message: sub.sessionId + ' completed successfully.',
          requireInteraction: true
        }
      } else {
        notif = {
          iconUrl: "img/sumo.png",
          type: 'basic',
          title: 'Build Finished',
          requireInteraction: true,
          message: sub.jobUrl + ' finished'
        }
      }

      if (!doneNotifs[sub.id]) {
        chrome.notifications.create(
          sub.id,
          notif,
          function (notificationId) {
          })

        doneNotifs[sub.id] = true;

      }
    }
  });

  localStorage.setItem('doneNotification', JSON.stringify(doneNotifs));
}



// setInterval(showNotif, 18000);


// const alarmListener = () => {
//   let subs = JSON.parse(localStorage.getItem('subscriptions'));

//   subs = subs.map((sub) => {
//     if(sub.status) {
//       return sub
//     } else {
//       return {...sub, status:localStorage.getItem(sub.id)}
//     }
//   });

//   api.wakeup(subs.filter((sub) =>{
//     console.log('inFilter');
//     console.log(sub)
//     return !sub.status
//   }));

//   localStorage.setItem('subscriptions', JSON.stringify(subs));
// }


chrome.alarms.create('checkStatus', { delayInMinutes: 0.1, periodInMinutes: 0.1 });

chrome.alarms.onAlarm.addListener(showNotif)

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');
