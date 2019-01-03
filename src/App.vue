<template>
  <div id="app">
    <dvdNavigation />
    <router-view />
  </div>
</template>

<script>
import dvdNavigation from './views/dvdNavigation.vue';

export default {
  components: {
    dvdNavigation,
  },
  data() {
    return {
      dvdText: 'dvd-text',
    };
  },
};

</script>


<style lang="scss">
body {
  color: #fff;
  background-color: #1d1d1f;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
