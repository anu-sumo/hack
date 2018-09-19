const bluebird = require('bluebird');

console.log('background');

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

console.log('background.js')
chrome.alarms.create('checkStatus', {
  delayInMinutes: 0.1, periodInMinutes: 0.1
});


// chrome.alarms.onAlarm.addListener(function (alarm) {
//   console.log(alarm);

//   chrome.notifications.create('reminder' + alarm.scheduledTime, {
//     type: 'basic',
//     iconUrl: "img/icon-48.png",
//     title: 'Don\'t forget!',
//     message: 'bla bla sl'
//   }, function (notificationId) { });

// });

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
