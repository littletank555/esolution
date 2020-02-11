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

        <a-tab-pane tab="Client Data" key="2" forceRender>
          <p>
            <a-checkbox
              @change="(e)=>{
                client_data.forEach(item=>{
                    item.select =e.target.checked
                })
            }"
            >全選</a-checkbox>
          </p>
          <p
            v-for="(item,i) in client_data"
            :key="i"
            style="margin:0px;cursor:pointer"
            class="select-item"
          >
            <a-checkbox v-model="item.select" />
            施工地點: {{item.lc}} / 客戶序號: {{item.csn}} / 客戶名稱: {{item.ccn}}
            <a-popover title>
              <template slot="content">
                <p>施工地點:{{item.lc}}</p>
                <p>地點序號:{{item.lsn}}</p>
                <p>客戶序號:{{item.csn}}</p>
                <p>客戶名稱:{{item.ccn}}</p>
                <p>工程區域:{{item.project_area}}</p>
              </template>
              <a-icon type="info-circle"></a-icon>
            </a-popover>
          </p>
          <p style="text-align:right">
            <a-button type="primary" @click="onClientDataSubmit">提交</a-button>
          </p>
        </a-tab-pane>

        <a-tab-pane tab="P Master" key="3">
          <p>
            <a-checkbox
              @change="(e)=>{
                p_master.forEach(item=>{
                    item.select =e.target.checked
                })
            }"
            >全選</a-checkbox>
          </p>
          <p
            v-for="(item,i) in p_master"
            :key="i"
            style="margin:0px;cursor:pointer"
            class="select-item"
          >
            <a-checkbox v-model="item.select" />
            排序: {{item.sort}} / 工程地點: {{item.pl}} / 工程標題: {{item.pt}}
            <a-popover title>
              <template slot="content">
                <p>排序:{{item.sort}}</p>
                <p>工程單編號:{{item.p_no}}</p>
                <p>客戶名稱:{{item.ccn}}</p>
                <p>工程地點:{{item.pl}}</p>
                <p>工程標題:{{item.pt}}</p>
              </template>
              <a-icon type="info-circle"></a-icon>
            </a-popover>
          </p>
          <p style="text-align:right">
            <a-button type="primary" @click="onPMasterSubmit">提交</a-button>
          </p>
        </a-tab-pane>

        <a-tab-pane tab="客" key="4">
          <p>
            <a-checkbox
              @change="(e)=>{
                ke.forEach(item=>{
                    item.select =e.target.checked
                })
            }"
            >全選</a-checkbox>
          </p>
          <p v-for="(item,i) in ke" :key="i" style="margin:0px;cursor:pointer" class="select-item">
            <a-checkbox v-model="item.select" />
            中標資料編號: {{item.ke_num}} / 工程地點: {{item.pl}} / 工程標題: {{item.pt}}
            <a-popover title>
              <template slot="content">
                <p>中標資料編號:{{item.ke_num}}</p>
                <p>客戶名稱:{{item.ccn}}</p>
                <p>工程地點:{{item.pl}}</p>
                <p>工程標題:{{item.pt}}</p>
              </template>
              <a-icon type="info-circle"></a-icon>
            </a-popover>
          </p>
          <p style="text-align:right">
            <a-button type="primary" @click="onKeSubmit">提交</a-button>
          </p>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
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
      client_data: [],
      p_master: [],
      ke: [],
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
      let file_id = file_list[0].uid;
      upload_client_list(file_id)
        .then(res => {
          console.log(res);
          this.file_data = res.client;
          this.file_data.forEach(item => {
            this.$set(item, "select", false);
          });
          this.client_data = res.client_data;
          this.client_data.forEach(element => {
            this.$set(element, "select", false);
          });
          this.p_master = res.p_master;
          this.p_master.forEach(element => {
            this.$set(element, "select", false);
          });
          this.ke = res.ke;
          this.ke.forEach(element => {
            this.$set(element, "select", false);
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
          // this.show_data_content = false;
          this.visible = false;
        })
        .catch(err => {});
    },
    onClientDataSubmit() {
      let data = JSON.parse(JSON.stringify(this.client_data));
      data = data.filter(item => item.select == true);
      if (data.length == 0) {
        this.$message.error("請選擇數據");
        return;
      }
      c_client_data_by_list(data)
        .then(res => {
          let existString = "工程地點: ";
          let successString = "";
          res.list.forEach(item => {
            if (!item.select) {
              existString += item.lc + "/";
            } else {
              successString += item.lc + "/";
            }
          });
          this.$notification.error({
            message: "已存在",
            description: existString + "已存在",
            key: "3",
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
              key: "4",
              duration: 0,
              onClose: close
            });
          }, 1000);

          this.$emit("done", {});
          // this.show_data_content = false;
          this.visible = false;
        })
        .catch(err => {});
    },
    onPMasterSubmit() {
      let data = JSON.parse(JSON.stringify(this.p_master));
      data = data.filter(item => item.select == true);
      if (data.length == 0) {
        this.$message.error("請選擇數據");
        return;
      }
      c_pmaster_by_list(data)
        .then(res => {
          console.log(res);
          let existString = "序號: ";
          let successString = "";
          res.list.forEach(item => {
            if (!item.select) {
              existString += item.sort + "/";
            } else {
              successString += item.sort + "/";
            }
          });
          this.$notification.error({
            message: "已存在",
            description: existString + "已存在",
            key: "5",
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
              key: "6",
              duration: 0,
              onClose: close
            });
          }, 1000);

          this.$emit("done", {});
          // this.show_data_content = false;
          this.visible = false;
        })
        .catch(err => {});
    },
    onKeSubmit() {
      let data = JSON.parse(JSON.stringify(this.ke));
      data = data.filter(item => item.select == true);
      if (data.length == 0) {
        this.$message.error("請選擇數據");
        return;
      }
      c_ke_by_list(data)
        .then(res => {
          console.log(res);
          let existString = "中標資料編號: ";
          let successString = "";
          res.list.forEach(item => {
            if (!item.select) {
              existString += item.ke_num + "/";
            } else {
              successString += item.ke_num + "/";
            }
          });
          this.$notification.error({
            message: "已存在",
            description: existString + "已存在",
            key: "7",
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
              key: "8",
              duration: 0,
              onClose: close
            });
          }, 1000);

          this.$emit("done", {});
          // this.show_data_content = false;
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
