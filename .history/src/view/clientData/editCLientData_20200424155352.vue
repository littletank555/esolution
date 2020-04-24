<template>
  <a-drawer
    title="修改客戶資料"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="600px"
  >
    <div class="new_client_data_container">
      <p>
        <span>施工地點中文名稱 (LC) Location Chinese</span>
        <a-input v-model="record.lc"></a-input>
      </p>
      <p>
        <span>施工地點英文名稱 (LE) Location English</span>
        <a-input v-model="record.le"></a-input>
      </p>
      <p>
        <span>地點序號 (LSN) Location Serial Numbe</span>
        <a-input v-model="record.lsn"></a-input>
      </p>
      <p>
        <span>銷售人員 英文簡稱 Sales Code</span>
        <a-input v-model="record.sales_code"></a-input>
      </p>
      <p>
        <span>工程區域</span>
        <a-input v-model="record.project_area"></a-input>
      </p>
      <p>
        <span>工程中文地址 (JCA) Job Chinese Address</span>
        <a-input v-model="record.jca"></a-input>
      </p>
      <p>
        <span>發票送呈地址 (BT) BILL TO</span>
        <a-input v-model="record.bt"></a-input>
      </p>
      <p>
        <span>客戶序號 (CSN) ClientSerial Number</span>
        <a-input v-model="record.csn" :disabled="true"></a-input>
      </p>
      <p>
        <span>客戶中文名稱 (CCN) Client Chinese Name</span>
        <a-input v-model="record.ccn" :disabled="true"></a-input>
      </p>
      <p>
        <span>客戶英文名稱 (CEN) Client English Name</span>
        <a-input v-model="record.cen" :disabled="true"></a-input>
      </p>
      <p>
        <span>客戶聯絡電話 (CT) Client Telephone</span>
        <a-input v-model="record.ct"></a-input>
      </p>
      <p>
        <span>客戶傳真號碼 (CF) Client FAX</span>
        <a-input v-model="record.cf"></a-input>
      </p>
      <p>
        <span>客戶電郵 (CE) Client Email</span>
        <a-input v-model="record.ce"></a-input>
      </p>
      <p>
        <span>客戶聯絡人 (CCP) Client Contact Person</span>
        <a-input v-model="record.ccp"></a-input>
      </p>
      <p style="text-align:right">
        <a-button type="primary" :loading="onSubmiting" @click="onUpdate">Submit</a-button>
      </p>
    </div>
  </a-drawer>
</template>
<script>
import { update_client_data } from "@/api/client_data.js";
import { validEmail } from "@/utils/validate.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      record: {}
    };
  },
  created() {},
  methods: {
    show(item) {
      this.record = JSON.parse(JSON.stringify(item));
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onUpdate() {
      this.record.cid = this.record.client_data_id;
      if (this.record.lc == "" && this.record.le == "") {
        this.$message.error("請填寫施工地點");
        return;
      }
      if (this.record.ce != "") {
        if (validEmail(this.record.ce) == false) {
          this.$message.error("請輸入正確的郵箱地址！");
          return;
        }
      }
      this.onSubmiting = true;
      update_client_data(this.record)
        .then(res => {
          console.log(res);
          this.onSubmiting = false;
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
<style lang="scss">
.new_client_data_container {
  .ant-select {
    width: 100%;
  }
}
</style>

