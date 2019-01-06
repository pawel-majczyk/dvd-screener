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
// import { hslToRgb, rgbToHsl } from '../helpers/bitmapMod';

export default {
  data() {
    return {
      imageLogo,
      imagePosition: { x: 0, y: 0 },
      imageVelocity: { x: 200, y: 200 },
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
    screensaverSetup() {
      this.adjustResolution();
      this.imagePosition = this.imageRandomPosition();
      this.preloadImage();
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

    imageRandomPosition(img = { x: 250, y: 250 }) {
      return ({
        x: Math.ceil(Math.random() * (this.$refs.canvas.width - img.x)),
        y: Math.ceil(Math.random() * (this.$refs.canvas.height - img.y)),
      });
    },

    checkForBounce(pos, size, velocity) {
      const newVelocity = {
        x: velocity.x,
        y: velocity.y,
      };
      if (pos.x > this.canvasDimensions.width - size.width
        && velocity.x < 0) {
        newVelocity.x = velocity.x * -1;
        this.switchColor();
      }
      if (pos.y > this.canvasDimensions.height - size.height
        && velocity.y < 0) {
        newVelocity.y = velocity.y * -1;
        this.switchColor();
      }
      if (pos.x < 0
        && velocity.x > 0) {
        newVelocity.x = velocity.x * -1;
        this.switchColor();
      }
      if (pos.y < 0
        && velocity.y > 0) {
        newVelocity.y = velocity.y * -1;
        this.switchColor();
      }
      return { x: newVelocity.x, y: newVelocity.y };
    },

    async switchColor() {
      const imgData = this.ctx.getImageData(this.imagePosition.x, this.imagePosition.y,
        this.imageSize.width, this.imageSize.height);
      const { data } = imgData;
      for (let i = 0; i < data.length; i += 4) {
        // replace channels
        const colorSw = [data[i], data[i + 1], data[i + 2]];
        [data[i + 1], data[i + 2], data[i]] = [...colorSw];
        // const HSL = rgbToHsl(data[i], data[i + 1], data[i + 2]);
        // const RGB = hslToRgb(HSL[0], HSL[1], HSL[2]);
        // [data[i + 1], data[i + 2], data[i + 0]] = [...RGB];
      }
      this.loadedImage = await createImageBitmap(imgData);
    },

    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvasDimensions.width, this.canvasDimensions.height);
    },

    updateState() {
      const updateLogoPositon = (pos = { x: 0, y: 0 }) => {
        this.imagePosition = pos;
      };
      this.imageVelocity = this.checkForBounce(this.imagePosition,
        this.imageSize, this.imageVelocity);

      const newPos = {
        x: this.imagePosition.x - this.imageVelocity.x * this.time.dt,
        y: this.imagePosition.y - this.imageVelocity.y * this.time.dt,
      };
      updateLogoPositon(newPos);
    },

    renderState() {
      this.adjustResolution();
      this.clearCanvas();
      this.ctx.drawImage(this.loadedImage,
        this.imagePosition.x, this.imagePosition.y,
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
  },
  mounted() {
    this.screensaverSetup();
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
