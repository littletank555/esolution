<template>
  <a-drawer
    title="Add Contractor"
    plcement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="500px"
  >
    <p class="item">
      <span>分包商名稱</span>
      <a-input v-model="info.name"></a-input>
    </p>
    <p class="item">
      <span>傳真</span>
      <a-input v-model="info.fax"></a-input>
    </p>
    <p class="item">
      <span>電話</span>
      <a-input v-model="info.tel"></a-input>
    </p>
    <p class="item">
      <span>郵箱</span>
      <a-input v-model="info.email"></a-input>
    </p>
    <p style="text-align:right">
      <a-button type="primary" @click="onClear">Clear</a-button>
      <a-button type="primary" :loading="onSubmiting" @click="onSubmit">Submit</a-button>
    </p>
  </a-drawer>
</template>

<script>
import { update_contractor } from "@/api/contractor.js";
export default {
  data() {
    return {
      contractor: {},
      visible: false
    };
  },
  methods: {
    show(contractor) {
      this.contractor = contractor;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onSubmit() {
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