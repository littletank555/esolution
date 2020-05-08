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
import moment from "moment";
import { new_project_file } from "@/api/project.js";
export default {
  data() {
    return {
      visible: false,
      info: {
        file_name: "",
        file_cat: 0,
        project_meta_id: 0,
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
    showDrawer() {
      this.info.project_meta_id = this.$route.params.project_meta_id;
      this.info.file_cat = this.$route.query.file_cat;
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
        if (this.info.file_name == "") {
          this.info.file_name = info.file.response.name;
        }

        // this.fileinfo = info.fileList[0].response;
        this.disable = false;
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    onSubmit() {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          if (typeof this.info[key] == "object") {
            this.info[key] = this.info[key]._isValid
              ? this.info[key].format("YYYY-MM-DD")
              : "";
          }
        }
      }
      console.log(this.info);
      new_project_file(this.info)
        .then(res => {
          console.log(res.status);
          if (res.status) {
            this.$message.success("成功添加");
            this.visible = false;
            this.$emit("done", {});
          } else {
            this.$message.error("添加失敗");
          }
        })
        .catch(err => {
          this.$message.error("添加失敗");
        });
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