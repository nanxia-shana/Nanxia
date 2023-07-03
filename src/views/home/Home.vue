<template>
  <div class="home">
    <span class="title">{{ t("common.home") }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  .title {
  }
}
</style>
