<template>
  <div class="three">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.three {
  width: 100%;
  height: 100%;
}
</style>
