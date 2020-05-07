<template>
  <div class="contractor_list">
    <p>subcontractor</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.get_tableData();
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.contractor_list {
  .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>

