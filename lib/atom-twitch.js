'use babel';

import AtomTwitchPanel from './atom-twitch-view';
import {CompositeDisposable} from 'atom';

class AtomTwitch {
  activate(state) {
    this.atomTwitchPanel = new AtomTwitchPanel(state.atomTwitchViewState);
    this.panel = global.atom.workspace.addRightPanel({ item: this.atomTwitchPanel.getItem(), visible: false });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      global.atom.commands.add('atom-workspace', {
        'atom-twitch:toggle': () => this.toggle() 
      })
    );
  }

  deactivate() {
    this.panel.destroy();
    this.subscriptions.dispose();
    this.atomTwitchPanel.destroy();
  }

  serialize() {
    return { atomTwitchViewState: this.atomTwitchPanel.serialize() };
  }

  toggle() {
    console.log('AtomTwitch was toggled!');

    if (this.panel.isVisible()) {
      this.panel.hide();
    } else {
      this.panel.show();
    }
  }
}

module.exports = new AtomTwitch();
