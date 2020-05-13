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
      <template slot="invoice" slot-scope="record">
        <router-link
          :to="{
            name: 'bidfile',
            params: { project_id: record.project_id,title:'invoice'},
            query:{
             file_cat:0,
            },
          }"
          tag="a"
        >
          <a-tag color="blue">{{record.receivable}}</a-tag>
        </router-link>
        <router-link
          :to="{
            name: 'bidfile',
            params: { project_id: record.project_id,title:'invoice'},
            query:{
             file_cat:1,
            },
          }"
          tag="a"
        >
          <a-tag color="red">{{record.uncollected}}</a-tag>
        </router-link>
      </template>
      <template slot="spending" slot-scope="record">
        <a-tag color="blue">{{record.dues}}</a-tag>
        <a-tag color="red">{{record.overdues}}</a-tag>
      </template>
      <template slot="schedule">
        <a-icon type="paper-clip" />
      </template>
      <template slot="edit" slot-scope="record">
        <a>
          <a-icon type="edit" @click="()=>{
            $refs.editProject.show(record)
        }"></a-icon>
        </a>
      </template>
    </a-table>
  </div>
</template>
<script>
import { get_bid } from "@/api/outbid.js";
const columns = [
  { title: "工程序號", dataIndex: "p_num" },
  { title: "工程地點", dataIndex: "lc" },
  { title: "中標承辦商", dataIndex: "contractor_name", width: "550px" },
  { title: "中標價錢", dataIndex: "bid_price" },
  { title: "開工日期", dataIndex: "start_date" },
  { title: "完工日期", dataIndex: "end_date" },
  { title: "invoice", scopedSlots: { customRender: "invoice" } },
  { title: "開支", scopedSlots: { customRender: "spending" } },
  { title: "工程進度", scopedSlots: { customRender: "schedule" } },
  { scopedSlots: { customRender: "edit" } }
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
      get_bid()
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
.header {
  display: flex;
  justify-content: space-between;
}
</style>
