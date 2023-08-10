<template>
  <div id="sphere" ref="container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("src/assets/images/earth.jpg");
      const container = this.$refs.container;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      camera.position.z = 5;

      // 创建OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
      }

      animate();
    },
  },
};
</script>

<style scoped>
#sphere {
  width: 100%;
  height: 100%;
}
</style>
