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
import { upload_client_list, c_client_by_list } from "@/api/client.js";
import { c_client_data_by_list } from "@/api/client_data.js";
import { c_pmaster_by_list } from "@/api/pmaster.js";
import { c_ke_by_list } from "@/api/ke.js";

export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      file: [],
      file_data: [],
      show_data_content: false
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
    },
    callback(key) {
      console.log(key);
    },
    onSubmit() {
      let file_list = this.$refs.uploadfile.get_file_info();

      if (file_list.length < 1) {
        this.$message.error("請選擇文件 !");
        return;
      }
      if (file_list[0].name != "template.xlsx") {
        this.$notification.error({
          message: "提交失敗",
          description: "請上傳正確的模板文件 !",
          style: {
            width: "600px",
            marginLeft: `${435 - 600}px`
          },
          key: "2",
          duration: 0,
          onClose: close
        });
        // console.log(file_list[0].name);
        return;
      }
      let file_id = file_list[0].uid;
      upload_client_list(file_id)
        .then(res => {
          console.log(res);
          this.$notification.success({
            message: "上傳成功",
            description: "成功插入" + res.success + "條數據",
            style: {
              width: "600px",
              marginLeft: `${335 - 600}px`
            },
            key: "1",
            duration: 0,
            onClose: close
          });
          this.$emit("done", {});
          this.visible = false;
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="scss" >
.select-item {
  cursor: pointer;
  color: black;
  &:hover {
    background: #eee;
  }
}
</style>
