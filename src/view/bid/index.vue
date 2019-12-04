<template>
  <div>
    <p class="header">
      <a-input-search placeholder="search by client name" style="width: 200px" @search="onSearch" />
      <!-- <span>
        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newClient.show(dataSource)
        }"
        >Add Record</a-button>
      </span>-->
    </p>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :scroll="{ x: 2300}"
      :loading="onTableLoading"
    >
      <template slot="profit" slot-scope="record">
        <span>{{record.biding_price - record.sub_bid_price}}</span>
      </template>
      <template slot="keRecord" slot-scope="record">
        <!-- <a>
          <a-icon type="wallet" @click="()=>{
        $refs.keRecord.show(record)
        }"></a-icon>
        </a>-->
        <router-link
          :to="{
            name: 'keRecord',
            params: { sort: record.sort},
            query:{
              header_title:record.sub_bid_name,
              p_no:record.p_no,
            }
          }"
          tag="a"
        >
          <a-icon type="wallet" />
        </router-link>
      </template>
    </a-table>
    <keRecordData ref="keRecord" @done="()=>{
      this.getTableData()}" />
  </div>
</template>

<script>
import { get_bid_data } from "@/api/bid";
import keRecord from "./keRecord";
const columns = [
  { title: "編號", dataIndex: "sort", width: 200 },
  { title: "負責同事", dataIndex: "sales_code", width: 200 },
  { title: "工程單編號", dataIndex: "p_no", width: 400 },
  { title: "客戶", dataIndex: "ccn", width: 400 },
  { title: "工程地點", dataIndex: "pl", width: 400 },
  { title: "工程標題", dataIndex: "pt", width: 600 },
  { title: "ES中標日期", dataIndex: "re_bidding_date", width: 400 },
  { title: "ES中標價錢", dataIndex: "biding_price", width: 400 },
  { title: "中標分判名稱", dataIndex: "sub_bid_name", width: 400 },
  { title: "接收中標日期", dataIndex: "sub_re_bid_date", width: 400 },
  { title: "中標分判價錢", dataIndex: "sub_bid_price", width: 400 },
  { title: "分判中標編號", dataIndex: "sub_bid_number", width: 400 },
  {
    title: "利潤",
    scopedSlots: { customRender: "profit" },
    width: 200
  },
  {
    title: "客",
    scopedSlots: { customRender: "keRecord" },
    fixed: "right",
    width: 100
  }
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
    getTableData() {
      this.onTableLoading = true;
      get_bid_data()
        .then(res => {
          console.log(res);
          this.onTableLoading = false;
          this.tableData = res.list;
          this.dataSource = res.list;
        })
        .catch(err => {
          this.onTableLoading = false;
        });
    },
    onSearch(val) {
      const dataSource = [...this.dataSource];
      this.tableData = dataSource.filter(
        item =>
          (item.ccn + item.sort + item.pl)
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
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