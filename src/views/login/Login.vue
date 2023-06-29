<template>
  <div class="bg" v-loading="loading">
    <div class="loginBox">
      <span class="title">Login</span>
      <Input ref="userInput" :type="'text'" :placeholder="'Username'" class="inputItem">
        <svg-icon name="user" className="icon-input"></svg-icon>
      </Input>
      <Input ref="passwordInput" :type="'password'" :placeholder="'Password'" class="inputItem">
        <svg-icon name="unlock" className="icon-input"></svg-icon>
      </Input>
      <Button @click="submit" class="loginBtn" />
    </div>
    <Base />
  </div>
</template>

<script lang="ts" setup>
import Input from "./components/input.vue";
import Button from "./components/button.vue";
import Base from "./components/base.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const userInput = ref<InstanceType<typeof Input>>();
const passwordInput = ref<InstanceType<typeof Input>>();
const router = useRouter();
const loading = ref(false);
onMounted(() => {
  userInput.value?.input?.focus();
});
const submit = () => {
  loading.value = true;
  if (userInput.value?.inputMsg && passwordInput.value?.inputMsg) {
    console.log(userInput.value?.inputMsg, passwordInput.value?.inputMsg);
    setTimeout(() => {
      router.push("/noFound");
      loading.value = false;
    }, 1500);
  } else {
    setTimeout(() => {
      loading.value = false;
    }, 1500);
  }
};
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #1e1e1e;
  background-image: url("../../assets/images/night-sea.jpg");
  background-position: 0 0;
  background-size: 100% 100%;
  color: #fff;
  overflow: scroll;
  position: relative;
}
.loginBox {
  width: 500px;
  padding: 30px;
  margin: 200px auto 0;

  border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 14px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);

  transform-style: preserve-3d;
  transform: rotateX(15deg) rotateY(-20deg) translateX(-20px);
  transition: all 0.5s;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* animation: box-spin 8s infinite; */
}
@keyframes box-spin {
  0% {
    transform: rotateX(15deg) rotateY(-20deg) translateX(-20px);
  }
  30% {
    transform: rotateX(5deg) rotateY(-6deg) translateX(-20px);
  }
  100% {
    transform: rotateX(15deg) rotateY(-20deg) translateX(-20px);
  }
}
.title {
  font-size: 30px;
  font-weight: bold;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.9));
  margin: 10px 0 30px;
}
.inputItem {
  width: 330px;
  margin: 15px 0;
}
.icon-input {
  width: 22px;
  height: 22px;
  color: #333333;
}
.loginBtn {
  margin-top: 20px;
}
</style>
