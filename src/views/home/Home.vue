<template>
  <div class="home">
    <span class="title">{{ t("common.common02-001") }}</span>
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
    width: fit-content;
    font-size: 38px;
    font-weight: 600;
  }
}
</style>
