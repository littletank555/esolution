<template>
  <div>
    <p class="header">
      <a-input-search placeholder="search by client name" style="width: 200px" @search="onSearch" />
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
                this.$refs.createcommercial.show(tableData)
              }"
            >
              <a-icon type="file" />Create COMMERCIAL INVOICE
            </a-menu-item>
            <a-menu-item
              key="2"
              @click="()=>{
                this.$refs.createstatement.show(tableData)
              }"
            >
              <a-icon type="file" />Create Statement Of Account
            </a-menu-item>
          </a-menu>
        </a-dropdown>

        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newClient.show(dataSource)
        }"
        >Add Record</a-button>
      </span>
    </p>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :scroll="{ x: 4500}"
      :loading="onTableLoading"
    >
      <template slot="edit" slot-scope="record">
        <a>
          <a-icon type="edit" @click="()=>{
            $refs.edit.show(record)
        }"></a-icon>
        </a>
      </template>
      <template slot="delete" slot-scope="record">
        <a-popconfirm
          v-if="tableData.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.ke_id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>
    </a-table>
    <newClient ref="newClient" @done="()=>{this.getTableData()}" />
    <edit ref="edit" @done="()=>{
      this.getTableData();
      }" />
    <createcommercial ref="createcommercial" />
    <createstatement ref="createstatement" />
  </div>
</template>

<script>
import { get_ke, delete_ke } from "@/api/ke";
import newClient from "./newClient";
import createcommercial from "./createcommercial";
import createstatement from "./createStatementOfAccount";
import edit from "./edit";
const columns = [
  { title: "中標資料編號", dataIndex: "ke_num", width: 400 },
  { title: "負責同事", dataIndex: "sales_code", width: 200 },
  { title: "工程單編號", dataIndex: "p_no", width: 400 },
  { title: "客戶", dataIndex: "ccn", width: 1100 },
  { title: "工程地點", dataIndex: "pl", width: 400 },
  { title: "工程標題", dataIndex: "pt", width: 1500 },
  { title: "工程金額", dataIndex: "biding_price", width: 300 },
  {
    title: "狀態",
    dataIndex: "status",
    width: 250,
    filters: [],
    filterMultiple: true,
    onFilter: (value, record) => record.status.indexOf(value) === 0
  },
  { title: "ES發票號碼", dataIndex: "inv_no", width: 400 },
  { title: "ES上單日期", dataIndex: "sign_date", width: 400 },
  { title: "百分比注釋", dataIndex: "percent", width: 200 },
  { title: "ES上單金額", dataIndex: "sign_price", width: 400 },
  { title: "ES收款日期", dataIndex: "receipt_date", width: 400 },
  {
    title: "ES收款方式 支票-號碼 入賬-資料",
    dataIndex: "receipt_way",
    width: 300
  },
  { title: "ES收款金額", dataIndex: "receipt_price", width: 400 },
  { title: "客戶尚未支付餘額", dataIndex: "client_no_pay", width: 400 },
  { title: "分水嶺", dataIndex: "watershed", width: 200 },
  { title: "中標分判名稱", dataIndex: "sub_bid_name", width: 400 },
  { title: "分判中標價錢", dataIndex: "sub_bid_price", width: 400 },
  { title: "分判上單日期", dataIndex: "sub_sign_date", width: 400 },
  { title: "分判發票號碼", dataIndex: "sub_inv_no", width: 400 },
  { title: "分判上單金額", dataIndex: "sub_sign_price", width: 400 },
  { title: "百分比注釋", dataIndex: "sub_percent", width: 200 },
  { title: "分判收款日期", dataIndex: "sub_receipt_date", width: 400 },
  {
    title: "ES支付方式 支票-號碼 入賬-資料",
    dataIndex: "pay_way",
    width: 300
  },
  { title: "分判折扣優惠", dataIndex: "discount", width: 200 },
  { title: "ES支付金額", dataIndex: "pay_price", width: 400 },
  { title: "支付記錄編號", dataIndex: "pay_record_no", width: 300 },
  { title: "ES尚未支付餘額", dataIndex: "no_pay", width: 400 },
  { title: "分判中標日期", dataIndex: "sub_re_bid_date", width: 400 },
  { title: "分判中標通知書編號", dataIndex: "sub_bid_number", width: 800 },
  {
    title: "Edit",
    scopedSlots: { customRender: "edit" },
    fixed: "right",
    width: 100
  },
  {
    title: "Delete",
    scopedSlots: { customRender: "delete" },
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
      get_ke()
        .then(res => {
          let status = new Set();
          res.list.forEach((item, i) => {
            status.add(item.status);
          });
          this.columns[7].filters = [];
          status.forEach(item => {
            this.columns[7].filters.push({ text: item, value: item });
          });
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
          (item.ccn + item.cen + item.sort + item.pl + item.sub_bid_name)
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
    },
    onDelete(keid) {
      delete_ke(keid)
        .then(res => {
          if (res.status) {
            this.getTableData();
          } else {
          }
        })
        .catch(err => {});
    }
  },
  components: { newClient, edit, createcommercial, createstatement }
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>