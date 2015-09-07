'use babel';

export default class AtomTwitchPanel {
  constructor(serializedState) {
    // Create root element
    this.item = document.createElement('div');
    this.item.classList.add('atom-twitch');

    // Create message element
    let message = document.createElement('div');
    message.textContent = "The AtomTwitch package is Alive! It's ALIVE!";
    message.classList.add('message');
    this.item.appendChild(message);
  }
  
  getItem() {
    return this.item;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }
}
