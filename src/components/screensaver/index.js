import * as PIXI from 'pixi.js';
import Bouncer from './bouncer';

export default class Screensaver extends PIXI.Application {
  constructor(options) {
    super(options);
    this.renderer.autoResize = true;
    this.ticker.add(this.update, this);
    const bouncer = new Bouncer(this.screen);
    this.stage.addChild(bouncer);
  }

  newSize(width, height) {
    this.renderer.resize(width, height);
    this.stage.children.forEach(child => child.setNewSize(width));
  }

  update(delta) {
    this.stage.children.forEach(child => child.update(delta));
  }
}
