<template>
  <div class="computer">
    <div class="computer-box">
      <img src="@/assets/images/MAC.png" alt="iphone" />
      <div class="computer-box-mac"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
// import { useI18n } from "vue-i18n";
import { timeFormatCN } from "@/utils/tools";
// const { t } = useI18n();
const curTime = ref<string>(timeFormatCN(new Date(), "hh:mm"));
const setIphoneTime = () => {
  curTime.value = timeFormatCN(new Date(), "hh:mm");
};
let nowtime = ref();
onMounted(() => {
  //启动定时器
  nowtime.value = setInterval(() => {
    setIphoneTime();
  }, 1000);
});
onBeforeUnmount(() => {
  // 在组件消费前，销毁定时器
  clearInterval(nowtime.value);
});
</script>
<style lang="less" scoped>
.computer {
  overflow: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &-box {
    width: 80%;
    position: relative;
    img {
      width: 100%;
      object-fit: contain;
    }
    &-mac {
      width: 91.8%;
      height: 63.8%;
      background-color: rgba(200, 162, 22, 0.6);
      position: absolute;
      top: 4.6%;
      left: 4.1%;
    }
  }
}
</style>
