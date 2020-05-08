<template>
  <a-drawer
    :destroyOnClose="true"
    title="上载文件"
    :width="700"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{
        height: 'calc(100% - 108px)',
        overflow: 'auto',
        paddingBottom: '108px'
      }"
  >
    <p>
      <span>File Rename</span>
      <a-input v-model="rename" />
    </p>
    <p>
      <span>File Type</span>
      <a-select style="width:100%" v-model="filetype">
        <a-select-option value>-</a-select-option>
        <a-select-option value="小型工程文件">小型工程文件</a-select-option>
        <a-select-option value="分判資料">分判資料</a-select-option>
        <a-select-option value="報標資料">報標資料</a-select-option>
      </a-select>
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
        <a-icon type="upload" />Click to Upload
      </a-button>
    </a-upload>
    <a-button style="float:right" type="primary" @click="onSubmit" :disabled="disable">Submit</a-button>
  </a-drawer>
</template>
<script>
import { update_upload_file } from "@/api/pmaster.js";
export default {
  data() {
    return {
      visible: false,
      pmaster_id: "",
      rename: "",
      filetype: "",
      fileinfo: {},
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
        this.fileinfo = info.fileList[0].response;
        this.disable = false;
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    onSubmit() {
      let values = {};
      values.fileid = this.fileinfo.id;
      values.filetype = this.filetype;
      values.rename = this.rename;
      update_upload_file(values, this.pmaster_id)
        .then(res => {
          if (values.fileid == res.status) {
            this.$message.success("Successfully upload file!");
            this.$emit("done");
            this.visible = false;
          } else {
            this.$message.error("Upload file faild!");
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="scss">
.search-container {
  display: flex;
  justify-content: space-between;
}
</style>