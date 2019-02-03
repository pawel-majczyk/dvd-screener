import * as PIXI from 'pixi.js';
import Bouncer from './bouncer';

export default class Screensaver extends PIXI.Application {
  constructor(options) {
    super(options);
    this.ticker.add(this.update, this);
    const bouncer = new Bouncer(this);

    this.stage.addChild(bouncer);
  }

  // eslint-disable-next-line
  update(delta) {
    this.stage.children.forEach(child => child.update(delta));
  }
}
