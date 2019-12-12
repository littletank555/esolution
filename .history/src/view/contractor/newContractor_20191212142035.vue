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
export default {
  data() {
    return {
      info: {
        name: "",
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
    }
  }
};
</script>

<style>
</style>