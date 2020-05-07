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
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :loading="onTableLoading"
      :rowKey="record => record.id"
      :pagination="pagination"
    ></a-table>
  </div>
</template>

<script>
import { get_sub_contractor } from "@/api/project.js";
const columns = [
  { title: "序號", dataIndex: "" },
  { title: "承辦商名稱", dataIndex: "contractor_name" },
  { title: "發出日期", dataIndex: "contractor_name" },
  { title: "報價", dataIndex: "contractor_name" },
  { title: "報價日期", dataIndex: "contractor_name" },
  { title: "報價函", scopedSlots: { customRender: "tender" } },
  { title: "回傳報價文件", scopedSlots: { customRender: "re_tender" } },
  { title: "郵件發送", scopedSlots: { customRender: "email" } }
];
export default {
  data() {
    return {
      project_id: 0,
      tableData: [],
      dataSource: [],
      columns
    };
  },
  created() {
    this.project_id = this.$route.params.project_id;
    this.getTableData(this.project_id);
  },
  methods: {
    onSearch(val) {
      const dataSource = [...this.dataSource];
      this.tableData = dataSource.filter(
        item =>
          (item.pl + item.sort + item.ccn)
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
    },
    getTableData(project_id) {
      this.onTableLoading = true;
      get_sub_contractor(project_id)
        .then(res => {
          console.log(res.list);
          this.tableData = res.list;
          this.dataSource = res.list;
          this.onTableLoading = false;
        })
        .catch(err => {});
    }
  },
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

