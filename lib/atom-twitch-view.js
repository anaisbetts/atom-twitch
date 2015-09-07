'use babel';

import {component} from './polymer-es6';

console.log("WE DID IT");

@component('atom-twitch-view')
export class AtomTwitchView {
  static properties() {
    return {};
  }
  
  ready() {
    console.log("Ready!");
  }
}
