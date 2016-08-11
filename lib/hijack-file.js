'use strict';

const {BrowserWindow, protocol} = require('electron');
const fs = require('fs');
const url = require('url');

let alreadyRun = false;
  
protocol.interceptBufferProtocol('file', function(rq, completion) {
  let u = url.parse(rq.url);
  let f = u.pathname.replace(/^file:\/\//, '');
  if (process.platform === 'win32') {
    f = f.slice(1);
  }

  let content = fs.readFileSync(f);

  if (!rq.url.match(/index\.html/i)) {
    completion(content);
    return;
  }

  let contentStr = content.toString('utf8');
  
  let goodbyeMeta = contentStr.split('\n')
    .map((l) => l.replace(/<meta[^>]*>/, ''))
    .join('\n');
    
  completion(new Buffer(goodbyeMeta));
});

module.exports = function(windowId, href) {
  if (alreadyRun) return;
  alreadyRun = true;
  
  let bw = BrowserWindow.fromId(windowId);
  setTimeout(() => bw.loadURL(href), 10);
};
