<template>
  <canvas
    class="dvd"
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
      backgroundColor: 0x111b16,
      antialias: true,
    });
    document.addEventListener('click', () => {
      document.body.requestPointerLock();
    });
  },
  destroyed() {
    this.game.destroy();
  },
};

</script>

<style>
.dvd {
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}
</style>
