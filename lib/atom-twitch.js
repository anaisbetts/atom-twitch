'use babel';

import {CompositeDisposable} from 'atom';
import {setupPolymer} from './init-polymer';

let AtomTwitchView = null;

// NB: Fix a bug in WebRTC Adapter where we don't detect Electron properly
window.chrome = {};

class AtomTwitch {
  async activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    
    // Register command that toggles this view
    this.subscriptions.add(
      global.atom.commands.add('atom-workspace', {
        'atom-twitch:toggle': () => this.toggle() 
      })
    );
    
    await setupPolymer([
      require.resolve('./atom-twitch-view.html')
    ]);
    
    AtomTwitchView = require('./atom-twitch-view.html');
    
    this.atomTwitchPanel = new AtomTwitchView();
    this.panel = global.atom.workspace.addRightPanel({ item: this.atomTwitchPanel, visible: false });
  }

  deactivate() {
    this.subscriptions.dispose();
  }

  serialize() {
    return { atomTwitchViewState: this.atomTwitchPanel.serialize() };
  }

  async toggle() {
    await setupPolymer();
    
    if (this.panel.isVisible()) {
      this.panel.hide();
    } else {
      this.panel.show();
    }
  }
}

module.exports = new AtomTwitch();
