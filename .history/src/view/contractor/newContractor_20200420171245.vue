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
      <a-input v-model="info.contractor_name"></a-input>
    </p>
    <p class="item">
      <span>分包商簡稱</span>
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
      <a-button type="primary" @click="onClear">清除</a-button>
      <a-button type="primary" :loading="onSubmiting" @click="onSubmit">提交</a-button>
    </p>
  </a-drawer>
</template>

<script>
import { create_contractor } from "@/api/contractor.js";
export default {
  data() {
    return {
      info: {
        contractor_name: "",
        fax: "",
        tel: "",
        email: ""
      },
      onSubmiting: false,
      visible: false
    };
  },
  methods: {
    show() {
      this.onSubmiting = false;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onClear() {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          this.info[key] = "";
        }
      }
    },
    onSubmit() {
      if (this.info.name == "") {
        this.$message.error("Please fill name!");
        return;
      }
      //   this.onSubmiting = true;
      console.log(this.info);
      create_contractor(this.info)
        .then(res => {
          if (res.status) {
            this.$message.success("添加成功！");
            this.visible = false;
            this.$emit("done", {});
          } else {
            this.$message.error("添加失敗！");
          }
        })
        .catch(err => {
          this.$message.error("添加失敗！");
        });
    }
  }
};
</script>

<style>
</style>