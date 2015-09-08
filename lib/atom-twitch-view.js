'use babel';

import {component} from './polymer-es6';

console.log("WE DID IT");

@component('atom-twitch-view')
export class AtomTwitchView {
  static properties() {
    return {
      token: {
        type: String,
        notify: true,
        observer: '_tokenChanged'
      },
      user: {
        type: Object,
        notify: true,
        observer: '_userChanged'
      }
    };
  }
  
  ready() {
    console.log("Ready!");
  }
  
  _tokenChanged(newValue) {
    if (!newValue || newValue.length < 4) return;
    this.$.userInfo.headers = {
      'Accept': 'application/vnd.twitchtv.v3+json',
      'Authorization': `OAuth ${newValue}`
    };
    
    this.$.userInfo.generateRequest();
  }
  
  _userChanged(newValue) {
    this.$.login.style.display = 'none';
    this.$.chathost.style.width = 'auto';
    this.$.chathost.style.height = 'auto';
    this.$.chathost.style.visibility = 'visible';
    
    this.$.chat.src = `https://twitch.tv/${newValue.token.user_name}/chat`;
  }
}
