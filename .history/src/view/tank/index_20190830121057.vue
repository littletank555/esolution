<template>
  <div class="tank-container">
    <p style="text-align:center">
      <pmaster />
    </p>
    <p>
      <span>alert</span>
      <a-button type="primary" @click="alert('error')">alert</a-button>
    </p>
  </div>
</template>
<script>
import pmaster from "../PMaster";
import { get_pmasters } from "@/api/pmaster.js";
import { resolve } from "q";
export default {
  data() {
    return {
      content: "fawefawe"
    };
  },
  components: { pmaster },
  methods: {
    alert(msg) {
      this.$message.success(msg);
    }
  },
  created() {
    get_pmasters
      .then(res => {
        console.log(res);
        this.alert("tank", "success");
      })
      .catch(() => {});
  },
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