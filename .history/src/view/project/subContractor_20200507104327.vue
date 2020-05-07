<template>
  <div class="contractor_list">
    <p class="header">
      <a-input-search placeholder="search by Project site" style="width: 200px" @search="onSearch" />
      <span>
        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newProject.show()
        }"
        >新增報價承辦商</a-button>
      </span>
    </p>
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

