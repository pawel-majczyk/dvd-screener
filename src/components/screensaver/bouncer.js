import * as PIXI from 'pixi.js';
import logo from '../../assets/dvd-logo.png';

export default class Bouncer extends PIXI.Container {
  constructor(origin, options) {
    super(options);
    this.velocity = 1;

    this.sprite = PIXI.Sprite.from(logo);
    this.sprite.width = origin.screen.width / 10;
    this.sprite.height = origin.screen.width / 10;
    this.sprite.position.x = Math.random()
      * origin.screen.width - this.sprite.width / 2;
    this.sprite.position.y = Math.random()
      * origin.screen.height - this.sprite.height / 2;

    this.addChild(this.sprite);
  }

  update(delta) {
    this.sprite.position.x += this.velocity * delta;
    this.sprite.position.y += this.velocity * delta;
  }
}
