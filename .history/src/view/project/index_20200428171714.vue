<template>
  <div>
    <p class="header">
      <a-input-search placeholder="search by Project site" style="width: 200px" @search="onSearch" />
      <span>
        <a-dropdown @click="handleButtonClick">
          <a-button style="margin-left: 8px" type="primary">
            Create form
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newPMaster.show()
        }"
        >Add Record</a-button>
      </span>
    </p>
    <a-table :columns="columns" :dataSource="tableData" :loading="onTableLoading">
      <template slot="detail" slot-scope="record">
        <a @click="()=>{
          $refs.edit.show(record)
          }">更多</a>
      </template>
      <template slot="delete" slot-scope="record">
        <a-popconfirm
          v-if="tableData.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.pmaster_id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>
      <template slot="file" slot-scope="record">
        <!-- <a @click="()=>{
          $refs.uploadFile.show()
        }">
          <a-icon type="upload" />
        </a>-->
        <router-link
          :to="{
            name: 'fileIndex',
            params: { pmaster_id: record.pmaster_id},
            query:{
              header_title:record.sub_bid_name,
              p_no:record.p_no,
            }
          }"
          tag="a"
        >
          <a-icon type="upload" />
        </router-link>
      </template>
    </a-table>
    <newPMaster ref="newPMaster" @done="()=>{
      this.getTableData();
      }" />
    <edit ref="edit" @done="()=>{
      this.getTableData();
      }"></edit>
  </div>
</template>
<script>
import newPMaster from "./newPMaster";
import uploadFile from "./uploadFile";
import edit from "./edit";
import { get_pmasters, delete_pmaster } from "@/api/pmaster.js";
const columns = [
  { title: "排序", dataIndex: "sort", key: "name" },
  { title: "負責同事", dataIndex: "sales_code", key: "address" },
  { title: "工程地點", dataIndex: "pl", key: "address" },
  { title: "工程標題", dataIndex: "pt", key: "address", width: "550px" },
  {
    title: "是否中標",
    width: "150px",
    dataIndex: "is_bidding",
    filter: [],
    filterMultiple: true,
    onFilter: (value, record) => record.is_bidding.indexOf(value) === 0
  },
  { title: "報價分判名稱", scopedSlots: { customRender: "sub_name" } },
  { title: "分判報價金額", scopedSlots: { customRender: "sub_price" } },
  { title: "中標分判名稱", dataIndex: "sub_bid_name", key: "sub_bid_name" },
  { scopedSlots: { customRender: "file" } },
  { scopedSlots: { customRender: "detail" } },
  { scopedSlots: { customRender: "delete" } }
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
      get_pmasters()
        .then(res => {
          this.tableData = res.list;
          this.dataSource = res.list;
          let is_bidding = new Set();
          res.list.forEach((item, i) => {
            is_bidding.add(item.is_bidding);
            if (item.is_bidding == 1) {
              this.tableData[i].is_bidding = "是";
              this.dataSource[i].is_bidding = "是";
            } else {
              this.tableData[i].is_bidding = "否";
              this.dataSource[i].is_bidding = "否";
            }
          });
          this.columns[4].filters = [];
          is_bidding.forEach(item => {
            if (item == 1) {
              this.columns[4].filters.push({ text: "是", value: "是" });
            } else {
              this.columns[4].filters.push({ text: "否", value: "否" });
            }
          });
          this.onTableLoading = false;
        })
        .catch(err => {});
    },
    onDelete(cid) {
      delete_pmaster(cid)
        .then(res => {
          if (res.status) {
            this.getTableData();
          } else {
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
