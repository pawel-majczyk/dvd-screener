import * as PIXI from 'pixi.js';

export default class Screensaver extends PIXI.Application {
  constructor(options) {
    super(options);
    this.ticker.add(this.update);
  }

  // eslint-disable-next-line class-methods-use-this
  update() {
    // console.log('update');
  }
}
