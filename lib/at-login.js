'use babel';

import {component} from './polymer-es6';
import _ from 'lodash';
import url from 'url';

@component('at-login')
export class AtomTwitchLogin {
  static properties() {
    return {
      accessToken: {
        type: String,
        notify: true,
        readOnly: true,
        reflectToAttribute: true
      }
    };
  }

  ready() {
    const query = {
      'response_type': 'token',
      'client_id': 'akeo37esgle8e0r3w7r4f6fpt7prj21',
      'redirect_uri': 'https://paulcbetts.github.io/atom-twitch/oauth.html',
      'scope': 'user_read channel_editor channel_commercial channel_subscriptions user_subscriptions chat_login'
    };
    
    let queryString = _.map(Object.keys(query), (x) => `${x}=${encodeURIComponent(query[x])}`).join('&');
    
    this.$.login.preload = require.resolve('./at-login-preload');
    this.$.login.src = `https://api.twitch.tv/kraken/oauth2/authorize?${queryString}`;
    
    this.$.login.addEventListener('ipc-message', (e) => {
      let query = url.parse(e.args[0]).hash;
      
      let dict = _.reduce(query.slice(1).split('&'), (acc,part) => {
        let [k,v] = part.split('=');
        acc[decodeURIComponent(k)] = decodeURIComponent(v);
        return acc;
      }, {});
      
      this._setAccessToken(dict['access_token']);
      this.$.login.style.display = 'none';
    });
  }
}
