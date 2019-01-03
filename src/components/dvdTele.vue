<template>
  <div>
    <canvas
      ref="canvas"
      id="gameCanvas"
      width="800"
      height="600"
    />
  </div>
</template>

<script>
import imageLogo from '../assets/dvd-logo.png';

export default {
  data() {
    return {
      imageLogo,
      logoPosition: { x: 0, y: 0 },
      logoVelocity: { x: 1, y: 1 },
      imageSize: { width: 150, height: 150 },
      time: {
        now: Date.now(),
        then: null,
        dt: null,
        total: 0,
      },
    };
  },
  computed: {
    ctx() {
      return this.$refs.canvas.getContext('2d');
    },
    canvasDimensions() {
      return ({
        height: this.$refs.canvas.height,
        width: this.$refs.canvas.width,
        offsetX: this.$refs.canvas.getBoundingClientRect().left,
        offsetY: this.$refs.canvas.getBoundingClientRect().top,
      });
    },
  },
  methods: {
    gameSetup() {
      this.$refs.canvas.addEventListener('click', this.step);
      this.logoPosition = this.imageRandomPosition();
    },
    renderImage(image, position, context) {
      const logo = new Image();
      logo.src = image;
      logo.addEventListener('load', () => context.drawImage(
        logo,
        position.x,
        position.y,
        this.imageSize.width,
        this.imageSize.height,
      ));
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvasDimensions.width, this.canvasDimensions.height);
    },
    imageRandomPosition(img = { x: 250, y: 250 }) {
      return ({
        x: Math.ceil(Math.random() * (this.$refs.canvas.width - img.x)),
        y: Math.ceil(Math.random() * (this.$refs.canvas.height - img.y)),
      });
    },
    updateLogoPositon(pos = { x: 0, y: 0 }) {
      this.logoPosition = pos;
    },
    updateState() {
      // dlaczego nie działa poniżej this.imageSize.x (=150)
      if (this.logoPosition.x > this.canvasDimensions.width - 150) {
        this.logoVelocity.x = this.logoVelocity.x * -1;
      }
      if (this.logoPosition.y > this.canvasDimensions.height - 150) {
        this.logoVelocity.y = this.logoVelocity.y * -1;
      }

      if (this.logoPosition.x < 0) {
        this.logoVelocity.x = this.logoVelocity.x * -1;
      }
      if (this.logoPosition.y < 0) {
        this.logoVelocity.y = this.logoVelocity.y * -1;
      }
      const newPos = {
        x: this.logoPosition.x + this.logoVelocity.x,
        y: this.logoPosition.y + this.logoVelocity.y,
      };
      this.updateLogoPositon(newPos);
    },
    renderState() {
      this.clearCanvas();
      this.renderImage(this.imageLogo, this.logoPosition, this.ctx);
    },
    step() { // TODO: dt (delta time) will be passed here
      this.updateState();
      this.renderState();

      setTimeout(() => { // TODO: switch to .requestanimationframe()
        this.step();
      }, 5);
      // requestAnimationFrame(this.step);
    },
  },
  mounted() {
    this.gameSetup();
    this.time.now = Date.now();
  },
};

</script>

<style scoped>
#gameCanvas {
  border: 2px solid #BBB;
  width: 800px;
  height: 600px;
  display: block;
  margin: 0 auto;
  cursor: crosshair;
}
</style>
