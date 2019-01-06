<template>
  <div>
    <canvas
      ref="canvas"
      id="gameCanvas"
    />
  </div>
</template>

<script>
import imageLogo from '../assets/dvd-logo.png';
import { hslToRgb, rgbToHsl } from '../helpers/bitmapMod';

export default {
  data() {
    return {
      imageLogo,
      logoPosition: { x: 0, y: 0 },
      logoVelocity: { x: 140, y: 140 },
      loadedImage: new Image(),
      imageSize: { width: 250, height: 250 },
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
      this.adjustResolution();
      this.logoPosition = this.imageRandomPosition();
      this.preloadImage();
      this.step();
    },
    adjustResolution() {
      // canvas
      this.$refs.canvas.width = Math.max(
        document.documentElement.clientWidth, window.innerWidth || 0,
      );
      this.$refs.canvas.height = Math.max(
        document.documentElement.clientHeight, window.innerHeight || 0,
      );
      this.canvasDimensions.width = this.$refs.canvas.width;
      this.canvasDimensions.height = this.$refs.canvas.height;

      // image size proportions
      this.imageSize.width = this.canvasDimensions.height / 100 * 25;
      this.imageSize.height = this.canvasDimensions.height / 100 * 25;
    },
    preloadImage() {
      this.loadedImage = new Image();
      this.loadedImage.src = this.imageLogo;
      this.loadedImage.addEventListener('load', () => {
        this.step();
        return undefined;
      });
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

      if (this.logoPosition.x > this.canvasDimensions.width - this.imageSize.width
        && this.logoVelocity.x < 0) {
        this.logoVelocity.x *= -1;
        this.switchColor();
      }
      if (this.logoPosition.y > this.canvasDimensions.height - this.imageSize.height
        && this.logoVelocity.y < 0) {
        this.logoVelocity.y = this.logoVelocity.y * -1;
        this.switchColor();
      }
      if (this.logoPosition.x < 0
        && this.logoVelocity.x > 0) {
        this.logoVelocity.x = this.logoVelocity.x * -1;
        this.switchColor();
      }
      if (this.logoPosition.y < 0
        && this.logoVelocity.y > 0) {
        this.logoVelocity.y = this.logoVelocity.y * -1;
        this.switchColor();
      }
      const newPos = {
        x: this.logoPosition.x - this.logoVelocity.x * this.time.dt,
        y: this.logoPosition.y - this.logoVelocity.y * this.time.dt,
      };
      updateLogoPositon(newPos);
    },
    renderState() {
      this.adjustResolution();
      this.clearCanvas();
      this.ctx.drawImage(this.loadedImage,
        this.logoPosition.x, this.logoPosition.y,
        this.imageSize.width, this.imageSize.height);
      // 0, 0, 64, 64);
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
    async switchColor() {
      const imgData = this.ctx.getImageData(this.logoPosition.x, this.logoPosition.y,
        this.imageSize.width, this.imageSize.height);
      const { data } = imgData;
      for (let i = 0; i < data.length; i += 4) {
        const HSL = rgbToHsl(data[i], data[i + 1], data[i + 2]);
        const RGB = hslToRgb(HSL[0], HSL[1], HSL[2]);
        [data[i + 1], data[i + 2], data[i + 0]] = [...RGB];
      }
      this.loadedImage = await createImageBitmap(imgData);
    },
  },
  mounted() {
    this.gameSetup();
  },
};

</script>
<style scoped>
div {
  width: 100%;
  height: 100%;
}
#gameCanvas {
  /* border: 2px solid #BBB; */
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
  cursor: crosshair;
}
</style>
