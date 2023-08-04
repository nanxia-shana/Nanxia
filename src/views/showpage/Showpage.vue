<template>
  <div class="showpage">
    <div class="showpage-back" @click="router.back()">
      <svg-icon name="backfix" className="icon"></svg-icon>
    </div>
    <RouterView></RouterView>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style lang="less" scoped>
.showpage {
  width: 100%;
  height: 100%;
  position: relative;
  &-back {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    inset-inline-end: 24px;
    inset-block-end: 48px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    position: fixed;
    bottom: 100px;
    right: 50px;
    z-index: 99;
    cursor: pointer;
    .icon {
      width: 100%;
      height: 100%;
      fill: #fff;
    }
  }
}
</style>
