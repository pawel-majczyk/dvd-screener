<template>
  <div id="main">
    DVD Component
  </div>
</template>
<script>
import dvd from './dvdBounce';


export default {
  mounted() {
    document.getElementById('main').appendChild(dvd);
  },
};

</script>
<style lang="scss">

canvas {
  width: 640px;
  height: 480px;
}
</style>
