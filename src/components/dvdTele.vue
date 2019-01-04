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
      logoVelocity: { x: 166, y: 166 },
      imageSize: { width: 150, height: 150 },
      time: {
        now: Date.now() / 1000,
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
      // this.$refs.canvas.addEventListener('click', this.run);
      this.logoPosition = this.imageRandomPosition();
      this.step();
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
    updateState() {
      const updateLogoPositon = (pos = { x: 0, y: 0 }) => {
        this.logoPosition = pos;
      };

      // dlaczego nie działa poniżej this.imageSize.x (=150)
      if (this.logoPosition.x > this.canvasDimensions.width - this.imageSize.width) {
        this.logoVelocity.x = this.logoVelocity.x * -1;
      }
      if (this.logoPosition.y > this.canvasDimensions.height - this.imageSize.height) {
        this.logoVelocity.y = this.logoVelocity.y * -1;
      }

      if (this.logoPosition.x < 0) {
        this.logoVelocity.x = this.logoVelocity.x * -1;
      }
      if (this.logoPosition.y < 0) {
        this.logoVelocity.y = this.logoVelocity.y * -1;
      }
      const newPos = {
        x: this.logoPosition.x + this.logoVelocity.x * this.time.dt,
        y: this.logoPosition.y + this.logoVelocity.y * this.time.dt,
      };
      updateLogoPositon(newPos);
    },
    renderState() {
      // this.ctx.clearRect(this.logoPosition.x - 1, this.logoPosition.y - 1, 150, 1);
      // this.ctx.clearRect(this.logoPosition.x - 1, this.logoPosition.y - 1, 1, 150);


      // gowno nie dziala!!!! Tzn działa za dobrze - usuwa nawet to, co jeszcze nie jest narysowane
      // this.clearCanvas();

      this.renderImage(this.imageLogo, this.logoPosition, this.ctx);
    },

    step() {
      this.time.then = this.time.now;
      this.time.total += this.time.dt;

      this.updateState();
      this.renderState();

      this.time.now = Date.now() / 1000;
      this.time.dt = this.time.now - this.time.then;
      requestAnimationFrame(this.step);
    },
  },
  mounted() {
    this.gameSetup();
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
