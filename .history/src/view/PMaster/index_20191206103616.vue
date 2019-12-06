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
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item
              key="1"
              @click="()=>{
                this.$refs.createInvitationFile.show(tableData)
              }"
            >
              <a-icon type="file" />Create invitation for tender
            </a-menu-item>
            <a-menu-item
              key="2"
              @click="()=>{
                this.$refs.createQuotation.show(tableData)
              }"
            >
              <a-icon type="file" />Create quotation
            </a-menu-item>
            <a-menu-item
              key="3"
              @click="()=>{
                this.$refs.createSubContractorNotice.show(tableData)
                }"
            >
              <a-icon type="file" />Create Sub-Contractor Contract Award Notice
            </a-menu-item>
            <a-menu-item
              key="4"
              @click="()=>{
                this.$refs.createFinshedFile.show(tableData)
                }"
            >
              <a-icon type="file" />Create Finshed
            </a-menu-item>
            <a-menu-item
              key="5"
              @click="()=>{
                this.$refs.createSalesMemo.show(tableData)
                }"
            >
              <a-icon type="file" />Create Sales Memo
            </a-menu-item>
            <a-menu-item
              key="6"
              @click="()=>{
                this.$refs.createNoReturnLetter.show(tableData)
                }"
            >
              <a-icon type="file" />Create Declined Return Letter
            </a-menu-item>
            <a-menu-item
              key="7"
              @click="()=>{
                this.$refs.createStatementOfAccount.show(tableData)
                }"
            >
              <a-icon type="file" />Create Statement Of Account
            </a-menu-item>
            <a-menu-item
              key="8"
              @click="()=>{
                this.$refs.createBidQuotationDoc.show(tableData)
                }"
            >
              <a-icon type="file" />Create Bid quotation Document
            </a-menu-item>
          </a-menu>
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
      <template slot="sub_name" slot-scope="record">
        <span>{{record.sub_price_name.split("\n")}}</span>
      </template>
      <template slot="sub_price" slot-scope="record">
        <span>{{record.sub_price.split("\n")}}</span>
      </template>
      <template slot="bid" slot-scope="record">
        <span v-show="record.is_bidding == 1">是</span>
        <span v-show="record.is_bidding == 0">否</span>
      </template>
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
    <createInvitationFile ref="createInvitationFile" />
    <createQuotation ref="createQuotation" />
    <createSubContractorNotice ref="createSubContractorNotice" />
    <createFinshedFile ref="createFinshedFile" />
    <createSalesMemo ref="createSalesMemo" />
    <createNoReturnLetter ref="createNoReturnLetter" />
    <createStatementOfAccount ref="createStatementOfAccount" />
    <createBidQuotationDoc ref="createBidQuotationDoc" />
    <edit ref="edit" @done="()=>{
      this.getTableData();
      }"></edit>
  </div>
</template>
<script>
import newPMaster from "./newPMaster";
import createInvitationFile from "./createInvitationFile";
import createQuotation from "./createQuotation";
import createSubContractorNotice from "./createSubContractorNotice";
import createFinshedFile from "./createFinshedFile";
import createSalesMemo from "./createSalesMemo";
import createNoReturnLetter from "./createNoReturnLetter";
import createStatementOfAccount from "./createStatementOfAccount";
import createBidQuotationDoc from "./createBidQuotationDoc";
import uploadFile from "./uploadFile";
import edit from "./edit";
import { get_pmasters, delete_pmaster } from "@/api/pmaster.js";
const columns = [
  { title: "排序", dataIndex: "sort", key: "name" },
  { title: "負責同事", dataIndex: "sales_code", key: "address" },
  { title: "工程地點", dataIndex: "pl", key: "address" },
  { title: "工程標題", dataIndex: "pt", key: "address", width: "400px" },
  {
    title: "是否中標",
    width: "100px",
    scopedSlots: { customRender: "bid" },
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
          this.onTableLoading = false;
          let is_bidding = new Set();
          res.list.forEach((item, i) => {
            is_bidding.add(item.is_bidding);
          });
          this.columns[4].filters = [];
          is_bidding.forEach(item => {
            if (item == 1) {
              this.columns[4].filters.push({ text: "是", value: item });
            } else {
              this.columns[4].filters.push({ text: "否", value: item });
            }
          });
          this.tableData = res.list;
          this.dataSource = res.list;
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
  },
  components: {
    newPMaster,
    edit,
    createInvitationFile,
    createQuotation,
    createSubContractorNotice,
    createFinshedFile,
    createSalesMemo,
    createNoReturnLetter,
    createStatementOfAccount,
    createBidQuotationDoc
  }
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
