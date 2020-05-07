<template>
  <a-drawer
    title="Add PMaster Record"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="600px"
  ></a-drawer>
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