<template>
  <div>
    <a-dropdown v-model="visible">
      <a class="ant-dropdown-link" href="#">
        choice tank
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay" @click="handleMenuClick">
        <a-menu-item key="1">big tank.</a-menu-item>
        <a-menu-item key="2">middle tank.</a-menu-item>
        <a-menu-item key="3">small tank.</a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
export default {
    data(){
        return {
        visible: false,
        }
    },
    methods: {
    handleMenuClick (e) {
      if (e.key === '3') {
        this.visible = false
      }
    },
}
</script>