<template>
  <div class="person">
    <span class="title">{{ t("common.person") }}</span>
    <a-button type="primary" class="buttonP" @click="toCharacter">Character Card</a-button>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const router = useRouter();
const toCharacter = () => {
  router.push("/person/character");
};
</script>
<style lang="less" scoped>
.person {
  width: 100%;
  height: 100%;
  .title {
  }
}
</style>
