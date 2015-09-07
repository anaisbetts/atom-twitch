'use babel';

import {component} from './polymer-es6';

console.log("AT VIDEO");

@component('at-video')
export class AtomTwitchVideo {
  static properties() {
    return { };
  }
  
  static listeners() {
    return { 'click': 'toggleVideo' };
  }
  
  ready() {
    console.log("READY VIDEO");
    
    navigator.webkitGetUserMedia({video: true, audio: false}, (stream) => {
      this.$.camera.src = window.URL.createObjectURL(stream);
    }, () => {});
  }
  
  toggleVideo() {
    this.$.camera.style.visibility = 
      this.$.camera.style.visibility === 'visible' ? 'hidden' : 'visible';
  }
}
