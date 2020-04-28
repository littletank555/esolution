<template>
  <a-drawer
    title="修改承辦商資料"
    plcement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="500px"
  >
    <p class="item">
      <span>承辦商名稱</span>
      <a-input v-model="info.contractor_name"></a-input>
    </p>
    <p class="item">
      <span>承辦商簡稱</span>
      <a-input v-model="info.s_name"></a-input>
    </p>
    <p class="item">
      <span>公司地址</span>
      <a-input v-model="info.address"></a-input>
    </p>
    <p class="item">
      <span>聯絡人</span>
      <a-input v-model="info.contact"></a-input>
    </p>
    <p class="item">
      <span>電話</span>
      <a-input v-model="info.tel"></a-input>
    </p>
    <p class="item">
      <span>傳真</span>
      <a-input v-model="info.fax"></a-input>
    </p>
    <p class="item">
      <span>郵箱</span>
      <a-input v-model="info.email"></a-input>
    </p>
    <p style="text-align:right">
      <a-button type="primary" :loading="onSubmiting" @click="onSubmit">提交</a-button>
    </p>
  </a-drawer>
</template>

<script>
import { update_contractor } from "@/api/contractor.js";
export default {
  data() {
    return {
      info: {},
      visible: false,
      onSubmiting: false
    };
  },
  methods: {
    show(info) {
      this.info = JSON.parse(JSON.stringify(info));
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onSubmit() {
      if (this.info.contractor_name == "" || this.info.s_name == "") {
        this.$message.error("請填寫承辦商全稱和簡稱");
        return;
      }
      if (this.info.address == "") {
        this.$message.error("請填寫公司地址");
        return;
      }
      if (this.info.contact == "") {
        this.$message.error("請填寫承辦商聯絡人");
        return;
      }
      if (this.info.tel == "" && this.info.fax == "" && this.info.email == "") {
        this.$message.error("請填寫傳真、郵箱、電話其中一項聯繫方式");
        return;
      }
      update_contractor(this.info)
        .then(res => {
          if (res.status) {
            this.$message.success("修改成功！");
            this.$emit("done", {});
            this.visible = false;
          } else {
            this.$message.error("修改失敗！");
          }
        })
        .catch(err => {
          this.$message.error("修改失敗！");
        });
    }
  }
};
</script>

<style>
</style>