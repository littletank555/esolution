<template>
  <a-drawer
    title="Update Client"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="500px"
  >
    <p>
      <span>客戶序號 (CSN) ClientSerial Number</span>
      <a-input v-model="client.csn" :disabled="true"></a-input>
    </p>
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
    <p style="text-align:right">
      <a-button type="primary" :loading="onSubmiting" @click="onUpdate">Update</a-button>
    </p>
  </a-drawer>
</template>
<script>
import { update_client } from "@/api/client.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      client: {}
    };
  },
  methods: {
    show(client) {
      this.client = JSON.parse(JSON.stringify(client));
      this.onSubmiting = false;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onUpdate() {
      if (this.client.ccn == "" || this.client.ccn.trim() == "") {
        this.$message.error("Please fill client name");
        return;
      }
      if (this.client.cen == "" || this.client.cen.trim() == "") {
        this.$message.error("Please fill client name");
        return;
      }
      this.onSubmiting = true;
      this.client.cid = this.client.client_id;
      update_client(this.client)
        .then(res => {
          console.log(res);
          if (res.status) {
            this.$message.success("更新成功");
            this.visible = false;
            this.$emit("done", {});
          } else {
            this.$message.error("更新失敗");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("更新失敗");
        });
    }
  }
};
</script>
