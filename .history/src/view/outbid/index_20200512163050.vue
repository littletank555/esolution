<template>
  <div>
    <p class="header">
      <a-input-search placeholder="search by Project site" style="width: 200px" @search="onSearch" />
    </p>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :loading="onTableLoading"
      :rowKey="record => record.project_id"
      :pagination="pagination"
    >
      <template slot="edit" slot-scope="record">
        <a>
          <a-icon type="edit" @click="()=>{
            $refs.editProject.show(record)
        }"></a-icon>
        </a>
      </template>
      <template slot="delete" slot-scope="record">
        <a href="#" @click="onDelete(record.project_id)">
          <a-icon type="delete" />
        </a>
      </template>
    </a-table>
  </div>
</template>
<script>
import { get_project, del_project } from "@/api/project.js";
const columns = [
  { title: "工程序號", dataIndex: "p_num" },
  { title: "負責同事", dataIndex: "sales_code" },
  { title: "工程地點", dataIndex: "lc" },
  { title: "工程標號和標題", dataIndex: "titleandno", width: "550px" },
  { title: "收到標書日期", dataIndex: "re_tender_date" },
  { title: "截標日期", dataIndex: "end_tender_date" },
  { title: "標書發送", scopedSlots: { customRender: "send_contractor" } },
  { scopedSlots: { customRender: "contractor" } },
  { scopedSlots: { customRender: "edit" } },
  { scopedSlots: { customRender: "delete" } }
];
export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onTableLoading: false,
      visible: false,
      pagination: {
        defaultPageSize: 50
      }
    };
  },
  created() {
    this.getTableData();
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
    getTableData() {
      this.onTableLoading = true;
      get_project()
        .then(res => {
          console.log(res.list);
          this.tableData = res.list;
          this.dataSource = res.list;
          this.onTableLoading = false;
        })
        .catch(err => {});
    },
    onDelete(project_id) {
      this.$confirm({
        title: "是否要刪除該工程",
        maskClosable: true,
        onOk: () => {
          return del_project(project_id)
            .then(res => {
              console.log(res.status);
              if (res.status) {
                this.$message.success("刪除成功");
                this.getTableData();
              } else {
                this.$message.error("刪除失敗");
              }
              return true;
            })
            .catch(err => {
              this.$message.error("刪除失敗!");
              reject(error);
            });
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
