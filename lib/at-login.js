'use babel';

import {component} from './polymer-es6';
import _ from 'lodash';

console.log("AT LOGIN");

@component('at-login')
export class AtomTwitchLogin {
  static properties() {
    return { };
  }

  ready() {
    const query = {
      'response_type': 'token',
      'client_id': 'akeo37esgle8e0r3w7r4f6fpt7prj21',
      'redirect_uri': 'https://paulcbetts.github.io/atom-twitch/oauth.html',
      'scope': 'user_read channel_editor channel_commercial channel_subscriptions user_subscriptions chat_login'
    };
    
    let queryString = _.map(Object.keys(query), (x) => `${x}=${encodeURIComponent(query[x])}`).join('&');
    
    this.$.login.src = `https://api.twitch.tv/kraken/oauth2/authorize?${queryString}`;
  }
}
