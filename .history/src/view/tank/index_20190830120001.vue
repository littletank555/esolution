<template>
  <div class="tank-container">
    <p style="text-align:center">
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          Hover me
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </p>
  </div>
</template>
<script>
import pmaster from "./PMaster";
export default {
  data() {
    return {
      content: "fawefawe"
    };
  },
  created() {},
  mounted() {},
  destroyed() {},
  updated() {}
};
</script>

<style lang="scss">
.tank-container {
  p {
    background: #eee;
  }
}
</style>