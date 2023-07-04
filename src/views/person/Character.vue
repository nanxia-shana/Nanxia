<template>
  <div class="character">
    <span class="title">{{ t("common.person") }}</span>
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
