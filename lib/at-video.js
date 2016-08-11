'use babel';

import {component} from './polymer-es6';

@component('at-video')
export class AtomTwitchVideo {
  static properties() {
    return { };
  }
  
  static listeners() {
    return { 'click': 'toggleVideo' };
  }

  async toggleVideo() {
    if (!this.stream) {
      this.stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
      this.$.camera.src = window.URL.createObjectURL(this.stream);
    }
    
    this.$.camera.style.display = 
      this.$.camera.style.display === 'block' ? 'none' : 'block';
  }
}
