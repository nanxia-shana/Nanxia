<template>
  <div class="portfolio">
    <span class="title">{{ t("common.portfolio") }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<style lang="less" scoped>
.portfolio {
  width: 100%;
  height: 100%;
  .title {
  }
}
</style>
