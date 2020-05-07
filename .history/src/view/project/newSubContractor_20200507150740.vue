<template>
  <a-drawer
    title="新增報價承辦商"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="600px"
  >
    <p class="item">
      <span>承辦商名稱</span>
      <a-input v-model="info.contractor_name"></a-input>
    </p>
    <p class="item">
      <span>承辦商名稱</span>
      <a-input v-model="info.contractor_name"></a-input>
    </p>
    <p class="item">
      <span>承辦商名稱</span>
      <a-input v-model="info.contractor_name"></a-input>
    </p>
    <p class="item">
      <span>承辦商名稱</span>
      <a-input v-model="info.contractor_name"></a-input>
    </p>
  </a-drawer>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false
    };
  },
  methods: {
    show() {
      this.visible = true;
      this.onSubmiting = false;
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style>
</style>