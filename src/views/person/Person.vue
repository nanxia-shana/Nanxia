<template>
  <div class="person">
    <span class="title">{{ t("common.person") }}</span>
    <div class="message">
      <div class="message-avater" @click="avaterModify" @mouseenter="avaterFocus" @mouseleave="avatarBlur">
        <img src="@/assets/images/Iraina3.jpg" alt="avater" />
        <div class="message-modify" :class="{ modifyShow: avaterIsModify }">
          <edit-outlined :style="{ fontSize: '40px', color: '#aaa' }" />
        </div>
      </div>
    </div>
    <a-button type="primary" class="buttonP" @click="toCharacter">Character Card</a-button>
    <a-modal v-model:visible="visible" title="Title" width="800px" :confirm-loading="confirmLoading" @ok="handleOk">
      <div class="modalBox">
        <div class="modalBox-left"></div>
        <div class="modalBox-right">
          <a-upload-dragger
            v-model:fileList="fileList"
            name="avatar"
            accept=".jpg,.png,.jpeg"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="handleChange"
            @drop="handleDrop">
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
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance } from "vue";
import type { UploadChangeParam } from "ant-design-vue";
import { EditOutlined, InboxOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const instance: any = getCurrentInstance();
const { t } = useI18n();
const router = useRouter();
const avaterIsModify = ref<boolean>(false);
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const fileList = ref([]);
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
const handleDrop = (e: DragEvent) => {
  console.log(e);
};
const avaterFocus = () => {
  avaterIsModify.value = true;
};
const avatarBlur = () => {
  avaterIsModify.value = false;
};
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (status === "done") {
    instance.proxy.$message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    instance.proxy.$message.error(`${info.file.name} file upload failed.`);
  }
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
  .message {
    width: 100%;
    display: flex;
    flex-direction: column;
    &-avater {
      width: 200px;
      height: 200px;
      margin-top: 40px;
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
  }
}
.modalBox {
  width: 100%;
  display: flex;
  &-left {
  }
  &-right {
  }
}
</style>
