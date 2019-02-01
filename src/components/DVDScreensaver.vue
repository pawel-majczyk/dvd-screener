<template>
  <canvas
    ref="canvas"
  />
</template>
<script>
import Screensaver from './screensaver/index';

export default {
  data() {
    return {
      game: undefined,
    };
  },
  mounted() {
    const { canvas } = this.$refs;
    this.game = new Screensaver({
      canvas,
      width: canvas.width,
      height: canvas.height,
    });
  },
};

</script>

<style>
canvas {
  box-sizing: border-box;
  border: 1px dashed grey;
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}
</style>
