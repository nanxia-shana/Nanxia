<template>
  <div class="character">
    <span class="title">{{ t("common.common02-004") }}</span>
    <a href="https://www.baidu.com/" target="_blank" rel="noopener">百度一下</a>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
// const toCharacter = () => {};
</script>
<style lang="less" scoped>
.character {
  width: 100%;
  height: 100%;
  .title {
  }
}
</style>
