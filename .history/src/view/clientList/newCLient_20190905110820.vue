<template>
  <a-drawer
    title="Add Client"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="500px"
  >
    <p>
      <span>客戶中文名稱 (CCN) Client Chinese Name</span>
      <a-input v-model="client.ccn"></a-input>
    </p>
    <p>
      <span>客戶英文名稱 (CEN) Client English Name</span>
      <a-input v-model="client.cen"></a-input>
    </p>
    <p>
      <span>發票送呈地址 (BT) BILL TO</span>
      <a-input v-model="client.bt"></a-input>
    </p>
    <p>
      <span>客戶聯絡電話 (CT) Client Telephone</span>
      <a-input v-model="client.ct"></a-input>
    </p>
    <p>
      <span>客戶組別</span>
      <a-select v-model="client.c_group" style="width:100%">
        <a-select-option v-for="item in client_group" :value="item" :key="item">{{item}}</a-select-option>
      </a-select>
    </p>
    <p style="text-align:right">
      <a-button type="primary" :loading="onSubmiting" @click="onSubmit">Submit</a-button>
    </p>
  </a-drawer>
</template>
<script>
import { create_client } from "@/api/client.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      client: { ccn: "", cen: "", bt: "", ct: "", c_group: "" },
      client_group: [] //客戶組別
    };
  },
  methods: {
    show(group) {
      this.client_group = [];

      let list = new Set();
      group.forEach(item => {
        if (!item.c_group == "") {
          list.add(item.c_group);
        }
      });
      this.client_group = Array.from(list);

      for (const key in this.client) {
        if (this.client.hasOwnProperty(key)) {
          this.client[key] = "";
        }
      }
      this.onSubmiting = false;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onSubmit() {
      if (this.client.ccn == "" || this.client.ccn.trim() == "") {
        this.$message.error("Please fill client name");
        return;
      }
      if (this.client.cen == "" || this.client.cen.trim() == "") {
        this.$message.error("Please fill client name");
        return;
      }
      this.onSubmiting = true;
      create_client(this.client)
        .then(res => {
          if (res.status) {
            this.$message.success("成功添加客戶");
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
