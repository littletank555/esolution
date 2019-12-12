<template>
  <a-drawer
    title="Add Contractor"
    plcement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width:500px
  >
    <p class="item">
      <span>分包商名稱</span>
      <a-input></a-input>
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
      }
    };
  }
};
</script>

<style>
</style>