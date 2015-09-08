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
  
  async ready() {
    console.log("READY VIDEO");
    
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    this.$.camera.src = window.URL.createObjectURL(stream);
  }
  
  toggleVideo() {
    this.$.camera.style.visibility = 
      this.$.camera.style.display === 'block' ? 'none' : 'block';
  }
}
