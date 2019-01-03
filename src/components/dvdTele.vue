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
import dvdLogo from '../assets/dvd-logo.png';

export default {
  data() {
    return {
      dvdLogo,
    };
  },
  computed: {
    ctx() {
      return this.$refs.canvas.getContext('2d');
    },
  },
  methods: {
    renderImage(image, position, context) {
      const logo = new Image();
      logo.src = image;
      logo.addEventListener('load', () => context.drawImage(logo, position.x, position.y, 150, 150));
    },
    imageRandomPosition(img = { x: 250, y: 250 }) {
      return ({
        x: Math.ceil(Math.random() * (this.$refs.canvas.width - img.x)),
        y: Math.ceil(Math.random() * (this.$refs.canvas.height - img.y)),
      });
    },
  },
  mounted() {
    const ctx = this.$refs.canvas.getContext('2d');
    this.renderImage(this.dvdLogo, this.imageRandomPosition(), ctx);
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
}
</style>
