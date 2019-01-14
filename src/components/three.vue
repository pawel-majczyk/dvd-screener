<template>
  <div
    class="container"
    id="renderer"
    ref="renderDiv"
  />
</template>

<script>

import * as THREE from 'three';
import anon from './anon';

export default {
  data() {
    return {};
  },
  mounted() {
    const container = this.$refs.renderDiv;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45, window.innerWidth / window.innerHeight, 0.1, 1000,
    );
    camera.position.z = 1.4;
    // container.appendChild(anon);

    // const texture = new THREE.TextureLoader().load('../assets/dvd-logo.png');
    // const texture = new THREE.TextureLoader().load(textureFile2);
    // const texture = new THREE.TextureLoader().load(sourceCanvas);
    const texture = new THREE.CanvasTexture(anon);
    // texture.needsUpdate = true;
    const geometry = new THREE.SphereGeometry(1, 150, 150);
    const material = new THREE.MeshPhongMaterial({
      color: '#fff',
      // color: '#5cac6c' // greenish,
      shininess: 90,
      // wireframe: true,
      map: texture,
    });
    const desiredObj = new THREE.Mesh(geometry, material);
    desiredObj.rotation.y = 3 * Math.PI / 2;
    scene.add(desiredObj);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // eslint-disable-next-line no-use-before-define
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    const light = new THREE.PointLight(0xeeeeee, 1.2);
    const ambient = new THREE.AmbientLight(0xccffee, 0.5);
    light.position.set(-152, 152, 201);
    const directionalLight = new THREE.DirectionalLight('#fff', 1.2);
    directionalLight.position.set(-320, 200, 200);
    scene.add(directionalLight);
    // camera.add(light);
    camera.add(ambient);
    scene.add(camera);

    function animate() {
      requestAnimationFrame(animate);

      // desiredObj.rotation.x += 0.01;
      // desiredObj.rotation.y -= 0.012;
      texture.needsUpdate = true;

      renderer.render(scene, camera);
    }
    animate();
  },
};

</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
.container {
  /* border: 2px solid #BBB; */
  display: block;
  margin: 0 auto;
  cursor: crosshair;
  /* overflow: hidden; */
}


</style>
