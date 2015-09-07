'use babel';

import {CompositeDisposable} from 'atom';
import {setupPolymer} from './init-polymer';

let AtomTwitchView = null;

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
    console.log(this.atomTwitchPanel);
    
    this.panel = global.atom.workspace.addRightPanel({ item: this.atomTwitchPanel, visible: false });
  }

  deactivate() {
    this.panel.destroy();
    this.subscriptions.dispose();
    this.atomTwitchPanel.destroy();
  }

  serialize() {
    return { atomTwitchViewState: this.atomTwitchPanel.serialize() };
  }

  async toggle() {
    console.log('AtomTwitch was toggled!');
    await setupPolymer();
    
    if (this.panel.isVisible()) {
      this.panel.hide();
    } else {
      this.panel.show();
    }
  }
}

module.exports = new AtomTwitch();
