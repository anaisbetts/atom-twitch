'use babel';

import _ from 'lodash';
import url from 'url';
import path from 'path';

let initPromise = null;

export function loadHtmlImport(href) {
  return new Promise((resolve, reject) => {
    console.log(`Creating link to ${href}`);
    let link = document.createElement('link');
    link.rel = 'import';
    link.href = href;
    
    link.onerror = reject;
    link.onload = () => {
      console.log(`Loaded!`);
      resolve(true);
    };
    
    document.head.appendChild(link);
  });
}

export function setupPolymer(elements=[]) {
  if (initPromise) return initPromise;
  
  require('../bower_components/webcomponentsjs/webcomponents.js');
  
  return initPromise = 
    loadHtmlImport(require.resolve('../bower_components/polymer/polymer.html'))
      .then(() => {
        return Promise.all(_.map(elements, (href) => loadHtmlImport(href)));
      });
}

window.fileUriToPath = (theUrl) => {
  let ret = url.parse(theUrl).pathname;
  if (process.platform === 'win32') {
    ret = path.splice(1);
  }
  
  return path.dirname(ret);
};

(function(){
  let script = document.createElement('script');
  script.innerText = 'window.importRequire = function(src) { require(src.replace(/^\\.\\\//, fileUriToPath(document.currentScript.baseURI) + "/")) };';
  
  document.head.appendChild(script);
})();
