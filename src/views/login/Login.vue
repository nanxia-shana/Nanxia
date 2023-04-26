<template>
  <div class="bg" v-loading="loading">
    <div class="loginBox">
      <span class="title">Login</span>
      <Input ref="userInput" :type="'text'" :placeholder="'Username'" class="inputItem">
        <img src="./assets/userIcon.svg" alt="user" />
      </Input>
      <Input ref="passwordInput" :type="'password'" :placeholder="'Password'" class="inputItem">
        <img src="./assets/passwordIcon.svg" alt="user" />
      </Input>
      <Button @click="submit" class="loginBtn" />
    </div>
    <div class="loader"></div>
  </div>
</template>

<script lang="ts" setup>
import Input from "./components/input.vue";
import Button from "./components/button.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const userInput = ref<InstanceType<typeof Input>>();
const passwordInput = ref<InstanceType<typeof Input>>();
const router = useRouter();
const loading = ref(false);
const submit = () => {
  loading.value = true;
  if (userInput.value?.inputMsg && passwordInput.value?.inputMsg) {
    setTimeout(() => {
      router.push("/main");
      loading.value = false;
    }, 1500);
  } else {
    setTimeout(() => {
      loading.value = false;
    }, 1500);
  }
};
</script>

<style scoped>
.bg {
  min-height: 100vh;
  background-color: #1e1e1e;
  background-image: url("./assets/night-sea.jpg");
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
.loginBtn {
  margin-top: 20px;
}

.loader {
  position: relative;
  margin: auto;
  box-sizing: border-box;
  background-clip: padding-box;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  -webkit-mask: linear-gradient(rgba(0, 0, 0, 0.1), #000000 90%);
  transform-origin: 50% 60%;
  transform: perspective(200px) rotateX(66deg) translateX(-20px);
  animation: spinner-wiggle 2s infinite;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  margin: -4px;
  box-sizing: inherit;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  opacity: 0.05;
  border: inherit;
  border-color: transparent;
  animation: spinner-spin 2s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, spinner-fade 2s linear infinite;
}
.loader:before {
  border-top-color: #66e6ff;
}
.loader:after {
  border-top-color: #f0db75;
  animation-delay: 0.3s;
}
@keyframes spinner-spin {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes spinner-fade {
  20% {
    opacity: 0.1;
  }

  40% {
    opacity: 1;
  }

  60% {
    opacity: 0.1;
  }
}
</style>
