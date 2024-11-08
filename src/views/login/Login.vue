<template>
  <div class="bg" v-loading="loading">
    <div ref="background" class="backgrounb"></div>
    <div class="loginBox" :class="{ loginPage: isLoginPage }">
      <div class="title" @click="switchMode">Sign In / <span>Sign Up</span></div>
      <span class="titleName">Sign In</span>
      <Input ref="userInput" :type="'text'" :placeholder="'Username'" class="inputItem" :isShow="false" :isVisible="false">
        <svg-icon name="user" className="icon-input" @click="iconClick(1)"></svg-icon>
      </Input>
      <Input
        ref="passwordInput"
        :type="passwordLoginT"
        :placeholder="'Password'"
        class="inputItem"
        :isShow="true"
        :isVisible="passwordLoginV"
        @switch-visible="switchVisible('login')"
        @pass-input="passInput">
        <svg-icon name="unlock" className="icon-input" @click="iconClick(2)"></svg-icon>
      </Input>
      <span class="forget">Forgot Password?</span>
      <Button @click="login" class="loginBtn" text="Login" />
    </div>
    <div class="registerBox" :class="{ registerPage: !isLoginPage }">
      <div class="title" @click="switchMode"><span>Sign In</span> / Sign Up</div>
      <span class="titleName">Sign Up</span>
      <Input ref="userInputR" :type="'text'" :placeholder="'Username'" class="inputItem" :isShow="false" :isVisible="false">
        <svg-icon name="user" className="icon-input" @click="iconClick(1)"></svg-icon>
      </Input>
      <Input
        ref="passwordInputR"
        :type="passwordRegisterT"
        :placeholder="'Password'"
        class="inputItem"
        :isShow="true"
        :isVisible="passwordRegisterV"
        @switch-visible="switchVisible('register')"
        @pass-input="passInput">
        <svg-icon name="unlock" className="icon-input" @click="iconClick(2)"></svg-icon>
      </Input>
      <span class="forget"> &nbsp </span>
      <Button @click="register" class="loginBtn" text="Register" />
    </div>
    <!-- <Base /> -->
  </div>
</template>

<script lang="ts" setup>
import Input from "./components/input.vue";
import Button from "./components/button.vue";
// import Base from "./components/base.vue";
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { aesEncrypt, md5} from "@/utils/authentication"
import { debounce } from "@/utils/tools";
const userInput = ref<InstanceType<typeof Input>>(null);
const passwordInput = ref<InstanceType<typeof Input>>(null);
const userInputR = ref<InstanceType<typeof Input>>(null);
const passwordInputR = ref<InstanceType<typeof Input>>(null);
const background = ref<null | HTMLElement>(null);
const passwordLoginT = ref<string>("password");
const passwordLoginV = ref<boolean>(false);
const passwordRegisterT = ref<string>("password");
const passwordRegisterV = ref<boolean>(false);
const router = useRouter();
const isLoginPage = ref<boolean>(true);
const loading = ref(false);
const instance: any = getCurrentInstance();
onMounted(() => {
  userInput.value?.input?.focus();
  passwordInput.value?.input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      login();
    }
  });
  passwordInputR.value?.input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      register();
    }
  });
  userInput.value?.button.addEventListener("focus", () => {
    userInput.value?.input?.focus();
  });
  passwordInput.value?.button.addEventListener("focus", () => {
    passwordInput.value?.input?.focus();
  });
  userInputR.value?.button.addEventListener("focus", () => {
    userInputR.value?.input?.focus();
  });
  passwordInputR.value?.button.addEventListener("focus", () => {
    passwordInputR.value?.input?.focus();
  });
  userInput.value?.input.addEventListener("blur", () => {
    const backgrounbStatu = (userInput.value?.inputMsg.length > 5 ? 1 : 0) + (passwordInput.value?.inputMsg.length > 7 ? 1 : 0)
    if (backgrounbStatu == 2) {
      background.value.style.filter = `blur(0)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    } else if (backgrounbStatu == 1) {
      background.value.style.filter = `blur(10px)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    } else {
      background.value.style.filter = `blur(20px)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    }
  });
  passwordInput.value?.input.addEventListener("blur", () => {
    const backgrounbStatu = (userInput.value?.inputMsg.length > 5 ? 1 : 0) + (passwordInput.value?.inputMsg.length > 7 ? 1 : 0)
    if (backgrounbStatu == 2) {
      background.value.style.filter = `blur(0)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    } else if (backgrounbStatu == 1) {
      background.value.style.filter = `blur(10px)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    } else {
      background.value.style.filter = `blur(20px)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    }
  });
  userInputR.value?.input.addEventListener("blur", () => {
    const backgrounbStatu = (userInputR.value?.inputMsg.length > 5 ? 1 : 0) + (passwordInputR.value?.inputMsg.length > 7 ? 1 : 0)
    if (backgrounbStatu == 2) {
      background.value.style.filter = `blur(0)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    } else if (backgrounbStatu == 1) {
      background.value.style.filter = `blur(10px)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    } else {
      background.value.style.filter = `blur(20px)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    }
  });
  passwordInputR.value?.input.addEventListener("blur", () => {
    const backgrounbStatu = (userInputR.value?.inputMsg.length > 5 ? 1 : 0) + (passwordInputR.value?.inputMsg.length > 7 ? 1 : 0)
    if (backgrounbStatu == 2) {
      background.value.style.filter = `blur(0)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    } else if (backgrounbStatu == 1) {
      background.value.style.filter = `blur(10px)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    } else {
      background.value.style.filter = `blur(20px)`;
      background.value.style.transition = `filter 0.5s ease-out`;
    }
  });
});
const login = async () => {
  loading.value = true;
  if (userInput.value?.inputMsg.length > 5 && passwordInput.value?.inputMsg.length > 7) {
    const res = await instance.proxy.$request.post("/user/login", {
      username: aesEncrypt(userInput.value?.inputMsg),
      password: md5(passwordInput.value?.inputMsg),
    })
    if (res.status == 200) {
      router.push("/");
      loading.value = false;
    } else {
      loading.value = false;
    }
  } else {
    loading.value = false;
  }
};
const register = async () => {
  loading.value = true;
  if (userInputR.value?.inputMsg.length > 5 && passwordInputR.value?.inputMsg.length > 7) {
    const res = await instance.proxy.$request.post("/user/register", {
      username: aesEncrypt(userInputR.value?.inputMsg),
      password: md5(passwordInputR.value?.inputMsg),
    })
    if (res.status == 200) {
      router.push("/");
      loading.value = false;
    } else {
      loading.value = false;
    }
  } else {
    loading.value = false;
  }
};
const iconClick = (num: number) => {
  if (num === 1) {
    userInput.value?.input?.focus();
    userInputR.value?.input?.focus();
  } else if (num === 2) {
    passwordInput.value?.input?.focus();
    passwordInputR.value?.input?.focus();
  }
};
const switchVisible = (type: string) => {
  if (type == "login") {
    passwordLoginT.value = passwordLoginT.value == "text" ? "password" : "text";
    passwordLoginV.value = !passwordLoginV.value;
  } else {
    passwordRegisterT.value = passwordRegisterT.value == "text" ? "password" : "text";
    passwordRegisterV.value = !passwordRegisterV.value;
  }
};
const switchMode = () => {
  isLoginPage.value = !isLoginPage.value;
  setTimeout(() => {
    userInput.value?.modifyInput("");
    userInputR.value?.modifyInput("");
    passwordInput.value?.modifyInput("");
    passwordInputR.value?.modifyInput("");
  }, 300);
};
const passInput = (length: number) => {
    // const blurValue = 16 - length * 2;
    // background.value.style.filter = `blur(${blurValue}px)`;
};
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  color: #fff;
  overflow: hidden;
  position: relative;
}
.backgrounb {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  background: url("../../assets/images/beauty01.jpg") no-repeat center center/cover;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  filter: blur(20px);
  // transition: filter 0.2s;
}
.loginBox,
.registerBox {
  width: 500px;
  height: 400px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  // background-color: rgba(74, 74, 74, 0.7);
  background-color: rgba(180, 180, 180, 0.1);
  box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);

  transform-style: preserve-3d;
  transform: rotateX(15deg) rotateY(-20deg) translateX(-250px) translateY(-250px) translateZ(60px);
  opacity: 0.4;
  filter: blur(1px);
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);

  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
}
.loginPage {
  filter: none;
  opacity: 1;
  box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1), inset 0 0.5rem 2rem 0 rgba(255, 255, 255, 0.125);
  transform: rotateX(15deg) rotateY(-20deg) translateX(-250px) translateY(-250px);
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 3;
  .titleName {
    opacity: 1;
  }
}
.registerPage {
  filter: none;
  opacity: 1;
  box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1), inset 0 0.5rem 2rem 0 rgba(255, 255, 255, 0.125);
  transform: rotateX(15deg) rotateY(-20deg) translateX(-250px) translateY(-250px);
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 3;
  .titleName {
    opacity: 1;
  }
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: rgba(160, 123, 255, 0.7);
  position: absolute;
  top: -40px;
  left: 6px;
  cursor: pointer;
  user-select: none;
  span {
    color: rgba(204, 204, 204, 0.4);
  }
}
.titleName {
  margin: 10px 0 30px;
  opacity: 0.3;
  font-size: 30px;
  font-weight: bold;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.9));
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.inputItem {
  margin: 15px 0;
}
.icon-input {
  width: 22px;
  height: 22px;
  color: #333333;
}
.forget {
  margin: -10px 100px 20px 0;
  font-size: 14px;
  // color: rgba(160, 123, 255, 0.6);
  letter-spacing: 1px;
  align-self: flex-end;
  transition: color 0.2s ease-out;
  cursor: pointer;
  user-select: none;
}
.forget:hover {
  color: var(--primary-color);
}
</style>
