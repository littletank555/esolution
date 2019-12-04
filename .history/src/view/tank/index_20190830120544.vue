<template>
  <div class="tank-container">
    <p style="text-align:center">
      <pmaster />
    </p>
    <p>
      <span>alert</span>
      <a-button type="primary" @click="alert("error")">alert</a-button>
    </p>
  </div>
</template>
<script>
import pmaster from "../PMaster";
export default {
  data() {
    return {
      content: "fawefawe"
    };
  },
  components: { pmaster },
  methods: {
    alert(msg) {
      this.$message.error(msg);
    }
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
    margin: 10px;
    background: #eee;
  }
}
</style>