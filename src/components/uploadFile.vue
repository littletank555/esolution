<template>
  <div class="uploadfile">
    <a-upload
      :action="action_url"
      listType="picture"
      name="orm_file"
      :defaultFileList="List"
      :fileList="List"
      @change="handleChange"
      :remove="onRemoveFile"
    >
      <a-button :disabled="disabled">
        <a-icon type="upload" />upload
      </a-button>
    </a-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      List: [],
      action_url: this.$store.getters.domain + "upload-file/"
    };
  },
  created() {
    this.List = [];
    if (location.hostname == "localhost") {
      this.action_url = "api/upload-file/";
    }
  },
  props: ["value", "disabled"],
  methods: {
    handleChange(info) {
      this.value = info.fileList.filter(item => item.status !== "removed");
      this.$emit("input", this.value);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (
        info.file.status === "done" &&
        Object.keys(info.file.response).length != 0
      ) {
        info.fileList[info.fileList.length - 1].uid = info.file.response.id;
        info.fileList[info.fileList.length - 1].url = info.file.response.url;
        delete info.file.lastModified;
        // this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    get_file_info() {
      this.value.forEach(value => {
        for (var key in value) {
          if (
            key == "name" ||
            key == "url" ||
            key == "uid" ||
            key == "status"
          ) {
            continue;
          }
          delete value[key];
        }
      });
      return this.value;
    },
    onRemoveFile(file) {
      if (file["url"] == undefined) return true;
      return true;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(nval, oval) {
        this.List = nval;
        // console.log(nval);
      }
    }
  }
};
</script>
<style lang="scss">
.uploadfile {
  /* tile uploaded pictures */
  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
  .ant-upload-list-item-info .anticon-close {
    font-size: 16px !important;
  }
}
</style>