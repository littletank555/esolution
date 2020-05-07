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
      <a-input></a-input>
    </p>
    <p class="item">
      <span>發出日期</span>
      <a-input></a-input>
    </p>
    <p class="item">
      <span>報價</span>
      <a-input></a-input>
    </p>
    <p class="item">
      <span>報價日期</span>
      <a-input></a-input>
    </p>
    <p style="text-align:right">
      <a-button type="primary" @click="onClear">清除</a-button>
      <a-button type="primary" :loading="onSubmiting" @click="onSubmit">提交</a-button>
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