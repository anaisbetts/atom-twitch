# Twitch.tv Live Coding Plugin

![](http://cl.ly/image/0c3L181y3B2e/content#png)

This plugin adds the controls for twitch.tv live coding directly into your editor itself, so that you don't need to use an overlay that potentially obscures the editor surface.

This app is also a great sample for using [Polymer](https://polymer-project.org) in an Atom plugin, as well as using ES6 via Babel.

### Dragons Be Here

Until / unless atom/atom#8697 is merged, you'll need to have a custom build of Atom that has this change. Without this, using Polymer is much more difficult (though technically possible, via Vulcanize).

### Why doesn't the camera turn off once I toggle the plugin?

afaik there's no way to turn off the camera once you turn it on via `getUserMedia`. I would love to be wrong though!
