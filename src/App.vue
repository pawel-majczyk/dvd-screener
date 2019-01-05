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
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
};
body {
  color: #fff;
  background-color: #1d1d1f;
}

#app {
  // flex: 1;
  width: 100%;
  height: 100%;
}

nav { display: none;}
</style>
