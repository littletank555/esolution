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
    <a-modal v-model="show_data_content" title="Select Item" :footer="null" width="900px">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="C List" key="1">
          <p>
            <a-checkbox
              @change="(e)=>{
                file_data.forEach(item=>{
                    item.select =e.target.checked
                })
            }"
            >全選</a-checkbox>
          </p>
          <p
            v-for="(item,i) in file_data"
            :key="i"
            style="margin:0px;cursor:pointer"
            class="select-item"
          >
            <a-checkbox v-model="item.select" />
            CSN: {{item.csn}} / CCN: {{item.ccn}} / CEN: {{item.cen}}
            <a-popover title>
              <template slot="content">
                <p>CSN:{{item.csn}}</p>
                <p>CCN:{{item.ccn}}</p>
                <p>CEN:{{item.cen}}</p>
                <p>BT:{{item.bt}}</p>
                <p>CT:{{item.ct}}</p>
              </template>
              <a-icon type="info-circle"></a-icon>
            </a-popover>
          </p>
          <p style="text-align:right">
            <a-button type="primary" @click="onfileDataSubmit">提交</a-button>
          </p>
        </a-tab-pane>
        <a-tab-pane tab="Client Data" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane tab="P Master" key="3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs>
    </a-modal>
  </a-drawer>
</template>
<script>
import uploadFile from "@/components/uploadFile.vue";
import { upload_client_list, c_client_by_list } from "@/api/client.js";

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
    onSubmit() {
      let file_list = this.$refs.uploadfile.get_file_info();
      if (file_list.length < 1) {
        this.$message.error("請選擇文件 !");
        return;
      }
      let file_id = file_list[0].uid;
      upload_client_list(file_id)
        .then(res => {
          console.log(res);
          this.file_data = res.client;
          this.file_data.forEach(item => {
            this.$set(item, "select", false);
          });
          this.show_data_content = true;
        })
        .catch(err => {});
    },
    onfileDataSubmit() {
      let data = JSON.parse(JSON.stringify(this.file_data));
      data = data.filter(item => item.select == true);
      if (data.length == 0) {
        this.$message.error("請選擇數據");
        return;
      }
      c_client_by_list(data)
        .then(res => {
          let existString = "以下客戶序號: ";
          let successString = "";
          res.list.forEach(item => {
            if (!item.select) {
              existString += item.csn + "/";
            } else {
              successString += item.csn + "/";
            }
          });

          this.$notification.error({
            message: "已存在",
            description: existString + "已存在",
            key: "1",
            style: {
              width: "600px",
              marginLeft: `${335 - 600}px`
            },
            duration: 0,
            onClose: close
          });
          setTimeout(() => {
            if (successString == "") {
              successString = " 無";
            }
            this.$notification.success({
              message: "成功插入",
              description: "成功插入客戶序號: " + successString,
              style: {
                width: "600px",
                marginLeft: `${335 - 600}px`
              },
              key: "2",
              duration: 0,
              onClose: close
            });
          }, 1000);

          this.$emit("done", {});
          this.show_data_content = false;
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
