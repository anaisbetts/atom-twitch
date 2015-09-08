var ipc = require('ipc');

window.sendLocation = function() {
  ipc.sendToHost('oauth', window.location.href);
};
