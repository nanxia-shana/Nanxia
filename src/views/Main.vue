<template>
  <div class="main">
    <div class="box" v-loading="loading"></div>
    <div @click="submit">aaaa</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const loading = ref(false);
const submit = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1500);
};
</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 800px;
  height: 600px;
  background-color: aquamarine;
}
</style>
