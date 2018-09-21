const bluebird = require('bluebird');
import * as api from '../../app/api';



global.Promise = bluebird;

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







const alarmListener = () => {
  let subs = JSON.parse(localStorage.getItem('subscriptions'));
  console.log('subs', subs);
  subs = subs.map((sub) => ({...sub, status:localStorage.getItem(sub.id)}))
  
  api.wakeup(subs.filter((sub) =>{
    console.log('inFilter');
    console.log(sub)
    return !sub.status
  }));
  subs.forEach((sub) => {
    if (sub.status === 'done' || sub.status === 'failed') {
      let notif = {};
      if (sub.type === 'search') {
        notif = {
          iconUrl: "img/sumo.png",
          type: 'basic',
          title: 'Search',
          message: 'The search Finished'
        }
      } else {
        notif = {

          iconUrl: "img/jenkins.png",
          type: 'basic',
          title: 'Build',
          message: 'The Build Finished'
        }
      }
      chrome.notifications.create(
        'reminder' + sub.id,
        notif,
        function (notificationId) {
          console.log('notified');
        })
    }
  });
}


chrome.alarms.create('checkStatus', { delayInMinutes: 0.1, periodInMinutes: 0.1 });

chrome.alarms.onAlarm.addListener(alarmListener)

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
