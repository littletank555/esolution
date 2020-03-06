<template>
  <a-drawer
    title="上載 客戶列表"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="500px"
  >
    <p>
      <uploadFile v-model="file" ref="uploadfile" :disabled="file.length>0" />
    </p>
    <p style="text-align:right">
      <a-button type="primary" :loading="onSubmiting" @click="onSubmit">Submit</a-button>
    </p>
  </a-drawer>
</template>
<script>
import uploadFile from "@/components/uploadFile.vue";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false
    };
  },
  components: { uploadFile },
  methods: {
    show() {
      this.onSubmiting = false;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>