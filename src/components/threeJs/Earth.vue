<template>
  <div id="earth" ref="container"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const loader = new GLTFLoader();
export default {
  mounted() {
    this.initScene();
  },
  methods: {
    initScene() {
      // const scene = new THREE.Scene();
      // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      // camera.position.z = 5;
      // const renderer = new THREE.WebGLRenderer();
      // const container = this.$refs.container;
      // renderer.setSize(container.clientWidth, container.clientHeight);
      // container.appendChild(renderer.domElement);
      // const loader = new GLTFLoader();
      // const spotLight = new THREE.SpotLight(0xffffff, 1.0);
      // spotLight.intensity = 3000.0; //光照强度
      // spotLight.position.set(20, 20, 30);
      // const ambient = new THREE.AmbientLight(0xffffff, 0.4);
      // scene.add(ambient);
      // // spotLight.angle = Math.PI / 6; //光锥角度的二分之一
      // scene.add(spotLight); //光源添加到场景中
      // loader.load(
      //   "/src/assets/diqiu.glb",
      //   (gltf) => {
      //     scene.add(gltf.scene);
      //   },
      //   (xhr) => {
      //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      //   },
      //   (error) => {
      //     console.error("Error loading .glb file:", error);
      //   },
      // );
      // // 创建OrbitControls
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.update();
      // function animate() {
      //   requestAnimationFrame(animate);
      //   if (scene) {
      //     scene.rotation.y += 0.01;
      //   }
      //   renderer.render(scene, camera);
      // }
      // animate();
    },
  },
};
</script>

<style scoped>
#earth {
  width: 100%;
  height: 100%;
}
</style>
