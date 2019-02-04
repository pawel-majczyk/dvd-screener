import * as PIXI from 'pixi.js';
// import { ColorMatrixFilter } from 'pixi-filters';
import logo from '../../assets/dvd-logo.png';

export default class Bouncer extends PIXI.Container {
  constructor(origin, options) {
    super(options);

    this.sprite = PIXI.Sprite.from(logo);
    const spriteSize = origin.screen.width / 6;
    this.sprite.width = spriteSize;
    this.sprite.height = spriteSize;

    this.addChild(this.sprite);
    this.displayArea = origin.screen;

    this.TOP_LIMIT = 0;
    this.BOTTOM_LIMIT = this.displayArea.height - this.height;
    this.LEFT_LIMIT = 0;
    this.RIGHT_LIMIT = this.displayArea.width - this.width;

    this.currentColor = 0; // R:0 G:120 B:240;
    this.nextColor = 120;
    this.replaceRedFilter = new PIXI.filters.ColorMatrixFilter();
    this.sprite.filters = [this.replaceRedFilter];
    this.replaceRedFilter.hue(this.currentColor, false);

    this.position = {
      x: Math.floor(Math.random() * this.displayArea.width),
      y: Math.floor(Math.random() * this.displayArea.height),
    };
    this.velocity = {
      x: 1,
      y: 1,
    };
  }

  bounceCheck() {
    if (this.position.x <= this.LEFT_LIMIT) return 'LEFT';
    if (this.position.x >= this.RIGHT_LIMIT) return 'RIGHT';
    if (this.position.y <= this.TOP_LIMIT) return 'TOP';
    if (this.position.y >= this.BOTTOM_LIMIT) return 'BOTTOM';
    return false;
  }

  bounce(bound) {
    switch (bound) {
      case 'LEFT':
        this.position.x = 0;
        this.velocity.x *= -1;
        break;
      case 'RIGHT':
        this.position.x = this.RIGHT_LIMIT;
        this.velocity.x *= -1;
        break;
      case 'TOP':
        this.position.y = 0;
        this.velocity.y *= -1;
        break;
      case 'BOTTOM':
        this.position.y = this.BOTTOM_LIMIT;
        this.velocity.y *= -1;
        break;
      default:
        break;
    }
  }

  changeColor() {
    this.replaceRedFilter.hue(this.currentColor);
    setTimeout(() => {
      if (this.currentColor < this.nextColor) {
        this.currentColor += 2;
        this.changeColor();
      } else {
        this.nextColor = this.nextColor + 120;
        if (this.nextColor === 480) {
          this.nextColor = 120;
          this.currentColor = 0;
        }
      }
    }, 10);
  }

  update(delta) {
    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
    const isBouncingOnAxis = this.bounceCheck();
    if (isBouncingOnAxis) {
      this.bounce(isBouncingOnAxis);
      this.changeColor(this.nextColor);
    }
  }
}
