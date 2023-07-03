<template>
  <div class="person">
    <span class="title">{{ t("common.person") }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
<style lang="less" scoped>
.person {
  width: 100%;
  height: 100%;
  .title {
  }
}
</style>
