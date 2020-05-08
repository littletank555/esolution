<template>
  <a-drawer
    :destroyOnClose="true"
    title="上载文件"
    :width="600"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{
        height: 'calc(100% - 108px)',
        overflow: 'auto',
        paddingBottom: '108px'
      }"
  >
    <p>
      <span>文件名稱</span>
      <a-input v-model="info.file_name" />
    </p>
    <p>
      <span>上傳時間</span>
      <a-date-picker style="width:100%" format="YYYY-MM-DD" v-model="info.upload_date"></a-date-picker>
    </p>
    <p>
      <span>文件描述</span>
      <a-input v-model="info.remark" />
    </p>
    <a-upload
      name="orm_file"
      :multiple="false"
      :action="action_url"
      :directory="false"
      @change="handleChange"
      :remove="onfileRemove"
    >
      <a-button :disabled="canUpload">
        <a-icon type="upload" />上傳文件
      </a-button>
    </a-upload>
    <a-button style="float:right" type="primary" @click="onSubmit" :disabled="disable">提交</a-button>
  </a-drawer>
</template>
<script>
import { new_project_file } from "@/api/project.js";
export default {
  data() {
    return {
      visible: false,
      project_meta_id: 0,
      file_cat: 0,
      info: {
        file_name: "",
        upload_date: moment(),
        remark: "",
        file_id: 0
      },
      // fileinfo: {},
      action_url: this.$store.getters.domain + "file-upload/",
      disable: true
    };
  },
  created() {
    if (location.hostname == "localhost") {
      this.action_url = "api/file-upload/";
    }
  },
  methods: {
    showDrawer(pmaster_id) {
      this.pmaster_id = pmaster_id;
      this.disable = true;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log("file", info);
        this.info.file_id = info.file.response.id;
        // this.fileinfo = info.fileList[0].response;
        this.disable = false;
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    onSubmit() {}
  }
};
</script>
<style lang="scss">
.search-container {
  display: flex;
  justify-content: space-between;
}
</style>