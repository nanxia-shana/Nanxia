<template>
  <div class="person">
    <span class="title">{{ t("common.person") }}</span>
    <div class="msg">
      <div class="msg-avater" @click="avaterModify" @mouseenter="avaterFocus" @mouseleave="avatarBlur">
        <img src="@/assets/images/Iraina3.jpg" alt="avater" />
        <div class="msg-modify" :class="{ modifyShow: avaterIsModify }">
          <edit-outlined :style="{ fontSize: '40px', color: '#aaa' }" />
        </div>
      </div>
      <div class="msg-nickname">
        <span class="msg-nickname-name">Nickname :</span>
        <div class="msg-nickname-input">
          <a-input
            :disabled="!isEditNickname"
            v-model:value="nickname"
            show-count
            allow-clear
            :maxlength="8"
            @pressEnter="submitNickname" />
        </div>
        <edit-outlined
          v-if="!isEditNickname"
          :style="{ fontSize: '22px', color: '#aaa' }"
          style="cursor: pointer"
          @click="isEditNickname = true" />
        <check-circle-outlined
          v-else
          :style="{ fontSize: '22px', color: '#aaa' }"
          style="cursor: pointer"
          @click="isEditNickname = false" />
      </div>
    </div>
    <a-button type="primary" class="buttonP" @click="toCharacter">Character Card</a-button>
    <a-modal v-model:visible="visible" title="Avatar" width="800px" :confirm-loading="confirmLoading" @ok="handleOk">
      <div class="modalBox">
        <div class="modalBox-left">
          <img :src="avaterCutUrl" alt="avater" />
        </div>
        <div class="modalBox-right">
          <a-upload-dragger
            v-model:fileList="fileList"
            name="avatar"
            accept=".jpg,.png,.jpeg"
            :maxCount="1"
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            :beforeUpload="handldBeforeUpload">
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
            </p>
          </a-upload-dragger>
        </div>
      </div>
      <div class="modalCropper" v-if="!!cropperData.isShow">
        <span>调节裁剪框制作头像</span>
        <div class="modalCropper-box">
          <vueCropper
          style="width: 300px; height: 300px; margin-top: 10px;"
          ref="cropper"
          :img="cropperData.option.img"
          :outputSize="cropperData.option.outputSize"
          :outputType="cropperData.option.outputType"
          :autoCrop="cropperData.option.autoCrop"
          :autoCropWidth="cropperData.option.autoCropWidth"
          :autoCropHeight="cropperData.option.autoCropHeight"
          :fixed="true"
          :centerBox="cropperData.option.centerBox"
          @realTime="getCropDataBase64"
          />
        </div>
        <div class="modalCropper-btn">
          <UndoOutlined class="modalCropper-btn-item" @click="rotateLeft" />
          <RedoOutlined class="modalCropper-btn-item" @click="rotateRight" />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
// 导入VueCropper
import 'vue-cropper/dist/index.css'
import { VueCropper } from "vue-cropper";
import { ref, reactive, getCurrentInstance } from "vue";
import { EditOutlined, InboxOutlined, CheckCircleOutlined, UndoOutlined, RedoOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const instance: any = getCurrentInstance();
const { t } = useI18n();
const router = useRouter();
const avaterIsModify = ref<boolean>(false);
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const fileList = ref([]);
const nickname = ref<string>("Iraina");
const isEditNickname = ref<boolean>(false);
let cropperData = reactive({
  option: {
    img: "", //裁剪图片的地址
    outputSize: 1, //outputSize 0~1
    outputType: 'jpeg', //裁剪生成图片的格式
    autoCrop: true, //是否默认生成截图框
    autoCropWidth: 300,//默认生成截图框宽度
    autoCropHeight: 300,//默认生成截图框高度
    centerBox: true,//截图框是否被限制在图片里面
  },
  isShow: false,
})
const cropper: any = ref({})
let avaterCutUrl = ref<any>(new URL('@/assets/images/Iraina3.jpg', import.meta.url).href)
const avaterModify = () => {
  visible.value = true;
};
const handleOk = () => {
  confirmLoading.value = true;
  setTimeout(() => {
    visible.value = false;
    confirmLoading.value = false;
  }, 2000);
};
const avaterFocus = () => {
  avaterIsModify.value = true;
};
const avatarBlur = () => {
  avaterIsModify.value = false;
};
const handldBeforeUpload = async (file: any) => {
  // 判断文件格式
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    instance.proxy.$message.error('You can only upload JPG/PNG file!');
    return false
  }
  // 判断文件大小
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    instance.proxy.$message.error('Image must smaller than 2MB!');
    return false
  }
  // 判断图片的宽高
  const URL = window.URL || window.webkitURL
  const isWH = await readImageWH(URL.createObjectURL(file))
  if (!isWH) {
    instance.proxy.$message.error('图片“宽度x高度”至少为“150x150”像素');
    return false
  }
  cropperData.isShow = true
  cropperData.option.img = URL.createObjectURL(file)
  return false
};
//向左旋转图片
const rotateLeft = () => {
  cropper.value.rotateLeft()
}
//向右旋转图片
const rotateRight = () => {
  cropper.value.rotateRight()
}
const getCropDataBase64 = () => {
  cropper.value.getCropData((data: any) => {
    avaterCutUrl.value = data
  })
}
function readImageWH(base64StrOrUrl: any) {
	return new Promise((resolve) => {
		// 创建Image对象(相当于html中的img标签)，在内存中加载图片，并未插到DOM中，所以不可见
		let img = new Image()
		// 加载成功
		img.onload = () => {
			resolve(img.width > 150 && img.height > 150)
		}
		// 加载失败，返回false
		img.onerror = () => {
			resolve(false)
		}
		// 网络图片时支持跨域请求
		img.crossOrigin = 'anonymous'
		// src属性设置一定要放在onload之后，否则在IE11上报错
		img.src = base64StrOrUrl
	})
}
const submitNickname = (nickname: any) => {
  isEditNickname.value = false;
  nickname.value = nickname;
};
const toCharacter = () => {
  router.push("/person/character");
};
</script>
<style lang="less" scoped>
.person {
  width: 100%;
  height: 100%;
  .title {
    width: fit-content;
    font-size: 38px;
    font-weight: 600;
  }
  .msg {
    width: 100%;
    padding: 40px 20px 20px;
    display: flex;
    flex-direction: column;
    &-avater {
      width: 200px;
      height: 200px;
      margin-bottom: 50px;
      border-radius: 50%;
      position: relative;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: contain;
      }
    }
    &-modify {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: rgba(80, 80, 80, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    .modifyShow {
      opacity: 1;
      transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    &-nickname {
      width: 100%;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      &-name {
        width: 100px;
        margin-right: 60px;
        font-size: 18px;
        font-weight: 600;
        display: inline-block;
        text-align: end;
      }
      &-input {
        width: 220px;
        margin-right: 30px;
      }
    }
  }
}
.modalBox {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  &-left {
    width: 30%;
    display: flex;
    justify-content: center;
    border-right: 1px solid var(--primary-color);
    img {
      width: 150px;
      height: 150px;
      object-fit: contain;
      border-radius: 50%;
    }
  }
  &-right {
    width: 70%;
    padding: 0 5%;
  }
}
.modalCropper{
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-btn{
    width: 300px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &-item{
      padding: 2px;
      margin-left: 16px;
      border: 1px solid var(--primary-color);
      border-radius: 4px;
      font-size: 22px;
      color: var(--primary-color);
    }
  }
}
</style>
<style>
.ant-modal-footer .ant-btn + .ant-btn:not(.ant-dropdown-trigger):hover,
.ant-modal-footer .ant-btn + .ant-btn:not(.ant-dropdown-trigger):focus {
  color: #fff !important;
}
</style>
