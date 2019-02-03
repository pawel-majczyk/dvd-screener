<template>
  <canvas
    ref="view"
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
    const { view } = this.$refs;
    const { width, height } = view.getBoundingClientRect();
    this.game = new Screensaver({
      view,
      width,
      height,
      // PIXI.settings.RESOLUTIOn
      // width: 128 + 128 * Math.floor(width / 128),
      // height: 128 + 128 * Math.floor(height / 128),
      backgroundColor: 0x111b16,
      antialias: true,
    });
  },
  updated() {
    const { width, height } = this.$refs.view.getBoundingClientRect();
    console.log('i[dated');

    this.game.setSize({ width, height });
  },
  destroyed() {
    this.game.destroy();
  },
};

</script>

<style>
canvas {
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}
</style>
