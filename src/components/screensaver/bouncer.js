import * as PIXI from 'pixi.js';
import logo from '../../assets/dvd-logo.png';
import {
  HORIZONTAL_VELOCITY,
  VERTICAL_VELOCITY,
  SPRITE_SIZE_FACTOR,
  COLOR_CHANGE_SPEED,
} from './constants';

export default class Bouncer extends PIXI.Container {
  constructor(displayArea, options) {
    super(options);
    this.state = {
      velocity: {
        x: HORIZONTAL_VELOCITY,
        y: VERTICAL_VELOCITY,
      },
      // position: {}, // container has own position property
      screen: displayArea,
      isBouncing: false,
      color: {
        list: [0, 120, 240, 360], // R:0 G:120 B:240;
        current: 0,
        nextIndex: 1,
        isChanging: false,
      },
    };

    this.sprite = PIXI.Sprite.from(logo);
    this.sprite.width = this.state.screen.width * SPRITE_SIZE_FACTOR;
    this.sprite.height = this.state.screen.width * SPRITE_SIZE_FACTOR;
    this.addChild(this.sprite);

    this.replaceRedFilter = new PIXI.filters.ColorMatrixFilter();
    this.sprite.filters = [this.replaceRedFilter];
    this.replaceRedFilter.hue(this.state.color.current);

    this.setStartingPosition();
  }

  setStartingPosition() {
    this.position.x = Math.floor(Math.random()
      * (this.state.screen.width - this.sprite.width));
    this.position.y = Math.floor(Math.random()
      * (this.state.screen.height - this.sprite.height));
  }

  updatePosition(delta) {
    this.position.x += this.state.velocity.x * delta;
    this.position.y += this.state.velocity.y * delta;
    this.bounceCheck();
  }

  setNewSize(width) {
    this.sprite.width = width * SPRITE_SIZE_FACTOR;
    this.sprite.height = width * SPRITE_SIZE_FACTOR;
  }

  bounceCheck() { // to refactor
    const { position, sprite } = this;
    const { screen } = this.state;
    let bounceAxis = false;
    if (position.x < screen.x) { // bounce left
      position.x = 0;
      bounceAxis = 'x';
    }
    if (position.x > screen.width - sprite.width) { // bounce right
      position.x = screen.width - sprite.width;
      bounceAxis = 'x';
    }
    if (position.y < screen.y) { // bounce top
      bounceAxis = 'y';
      position.y = 0;
    }
    if (position.y > screen.height - sprite.height) { // bounce bottom
      bounceAxis = 'y';
      position.y = screen.height - sprite.height;
    }
    if (bounceAxis) {
      this.changeVelocity(bounceAxis, -1);
      this.changeColor();
    }
  }

  changeVelocity(axis, speed) {
    this.state.velocity[axis] = this.state.velocity[axis] * speed;
  }

  changeColor() {
    const { color } = this.state;
    color.isChanging = true;

    if (color.current
      < color.list[color.nextIndex]) {
      color.current += COLOR_CHANGE_SPEED;

      this.replaceRedFilter.hue(color.current);

      setTimeout(() => {
        this.changeColor();
      }, 10);
    } else {
      if (color.nextIndex === color.list.length - 1) {
        color.current = 0;
        color.nextIndex = 0;
      }
      color.nextIndex += 1;
      color.isChanging = false;
    }
  }

  update(delta) {
    this.updatePosition(delta);
  }
}
