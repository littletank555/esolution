<template>
  <div>
    <p class="header">
      <a-input-search placeholder="search by Project site" style="width: 200px" @search="onSearch" />
      <span>
        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newProject.show()
        }"
        >新增項目資料</a-button>
      </span>
    </p>
    <a-table :columns="columns" :dataSource="tableData" :loading="onTableLoading">
      <template slot="is_bid" slot-scope="record">
        <span v-if="record.is_bid == '是'">是</span>
        <span v-if="record.is_bid == '否'">否</span>
      </template>
    </a-table>
    <newProject ref="newProject" @done="()=>{
      this.getTableData();
      }" />
  </div>
</template>
<script>
import newProject from "./newProject";
import { get_project } from "@/api/project.js";
const columns = [
  { title: "工程序號", dataIndex: "p_num" },
  { title: "負責同事", dataIndex: "sales_code" },
  { title: "工程地點", dataIndex: "lc" },
  { title: "工程標號和標題", dataIndex: "p_title", width: "550px" },
  { title: "收到標書日期", dataIndex: "re_tender_date" },
  { title: "截標日期", dataIndex: "end_tender_date" },
  // {
  //   title: "是否中標",
  //   width: "150px",
  //   dataIndex: "is_bid",
  //   filter: [
  //     { text: "是", value: "是" },
  //     { text: "否", value: "否" }
  //   ],
  //   filterMultiple: true,
  //   onFilter: (value, record) => record.is_bidding.indexOf(value) === 0
  // },
  { scopedSlots: { title: "是否中標", customRender: "is_bid" } },
  { scopedSlots: { title: "標書發送", customRender: "send_contractor" } },
  { scopedSlots: { customRender: "contractor" } }
];
export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onTableLoading: false
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
    }
  },
  components: { newProject }
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
