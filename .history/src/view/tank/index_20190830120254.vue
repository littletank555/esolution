<template>
  <div class="tank-container">
    <p style="text-align:center">
      <pmaster />
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
    alert(msg) {}
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