<template>
  <a-drawer
    title="修改施工地點資料"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="600px"
  >
    <div class="new_client_data_container">
      <a-divider style="margin-top:0px" orientation="left">公司資料</a-divider>
      <p class="item">
        <span class="label">客戶序號</span>
        <a-input v-model="record.csn" :disable="true"></a-input>
      </p>
      <p class="item">
        <span class="label">公司地址</span>
        <a-input v-model="record.bt"></a-input>
      </p>
      <p class="item">
        <span class="label">聯繫人</span>
        <a-input v-model="record.bt"></a-input>
      </p>
      <p class="item">
        <span class="label">電話</span>
        <a-input v-model="record.bt"></a-input>
      </p>
      <p class="item">
        <span class="label">傳真</span>
        <a-input v-model="record.bt"></a-input>
      </p>
      <p class="item">
        <span class="label">郵箱</span>
        <a-input v-model="record.bt"></a-input>
      </p>
      <a-divider style="margin-top:0px" orientation="left">施工地點資料</a-divider>
      <p class="item">
        <span class="label">銷售人員</span>
        <a-input v-model="record.sales_code"></a-input>
      </p>
      <p class="item">
        <span class="label">工程區域</span>
        <a-input v-model="record.project_area"></a-input>
      </p>
      <p class="item">
        <span class="label">地點序號</span>
        <a-input v-model="record.lsn" :disable="true"></a-input>
      </p>
      <p class="item">
        <span class="label">施工中文地址</span>
        <a-input v-model="record.lc"></a-input>
      </p>
      <p class="item">
        <span class="label">施工英文地址</span>
        <a-input v-model="record.le"></a-input>
      </p>
      <p class="item">
        <span class="label">發票地址</span>
        <a-input v-model="record.bt"></a-input>
      </p>
      <a-divider style="margin-top:0px" orientation="left">聯絡人資料</a-divider>

      <a-collapse accordion>
        <a-collapse-panel v-for="(item,i) in record.meta" header="客戶聯絡人" :key="i">
          <p class="item">
            <span class="label">聯絡人姓名</span>
            <a-input v-model="item.contact"></a-input>
          </p>
          <p class="item">
            <span class="label">電話</span>
            <a-input v-model="item.tel"></a-input>
          </p>
          <p class="item">
            <span class="label">傳真</span>
            <a-input v-model="item.fax"></a-input>
          </p>
          <p class="item">
            <span class="label">郵箱</span>
            <a-input v-model="item.email"></a-input>
          </p>
        </a-collapse-panel>
        <a-collapse-panel v-if="record.meta.length < 2" header="客戶聯絡人" :key="2">
          <p class="item">
            <span class="label">聯絡人姓名</span>
            <a-input v-model="data1.contact"></a-input>
          </p>
          <p class="item">
            <span class="label">電話</span>
            <a-input v-model="data1.tel"></a-input>
          </p>
          <p class="item">
            <span class="label">傳真</span>
            <a-input v-model="data1.fax"></a-input>
          </p>
          <p class="item">
            <span class="label">郵箱</span>
            <a-input v-model="data1.email"></a-input>
          </p>
        </a-collapse-panel>
        <a-collapse-panel v-if="record.meta.length < 3" header="客戶聯絡人" :key="3">
          <p class="item">
            <span class="label">聯絡人姓名</span>
            <a-input v-model="data2.contact"></a-input>
          </p>
          <p class="item">
            <span class="label">電話</span>
            <a-input v-model="data2.tel"></a-input>
          </p>
          <p class="item">
            <span class="label">傳真</span>
            <a-input v-model="data2.fax"></a-input>
          </p>
          <p class="item">
            <span class="label">郵箱</span>
            <a-input v-model="data2.email"></a-input>
          </p>
        </a-collapse-panel>
      </a-collapse>
      <p style="text-align:right;margin-top:15px;">
        <a-button type="primary" :loading="onSubmiting" @click="onUpdate">提交</a-button>
      </p>
    </div>
  </a-drawer>
</template>
<script>
import { update_client_data } from "@/api/client_data.js";
import { get_client_by_csn } from "@/api/client.js";
import { validEmail } from "@/utils/validate.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      record: {},
      data1: {
        contact: "",
        tel: "",
        fax: "",
        email: ""
      },
      data2: {
        contact: "",
        tel: "",
        fax: "",
        email: ""
      }
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
      if (this.record.meta.length < 3) {
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
    },
    get_client_by_csn() {}
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

