<template>
  <div class="schodule">
    <span class="title">{{ t("common.schedule") }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<style lang="less" scoped>
.schodule {
  width: 100%;
  height: 100%;
  .title {
  }
}
</style>
