<template>
  <div>
    <p class="header">
      <a-input-search placeholder="search by client name" style="width: 200px" @search="onSearch" />
      <router-link to="/home/bid">
        <a-button type="primary">Go Back</a-button>
      </router-link>
    </p>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :scroll="{ x: 4200}"
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
    <edit ref="edit" @done="()=>{
      this.getTableData();
      }" />
  </div>
</template>

<script>
import { get_bid_kerecord } from "@/api/bid";
import { delete_ke } from "@/api/ke";
import edit from "@/view/Client/edit";
const columns = [
  { title: "中標資料編號", dataIndex: "ke_num", width: 400 },
  { title: "負責同事", dataIndex: "sales_code", width: 200 },
  { title: "工程單編號", dataIndex: "p_no", width: 400 },
  { title: "客戶", dataIndex: "ccn", width: 600 },
  { title: "工程地點", dataIndex: "pl", width: 400 },
  { title: "工程標題", dataIndex: "pt", width: 800 },
  { title: "工程金額", dataIndex: "biding_price", width: 400 },
  { title: "狀態", dataIndex: "status", width: 200 },
  { title: "ES發票號碼", dataIndex: "inv_no", width: 400 },
  { title: "ES上單日期", dataIndex: "sign_date", width: 400 },
  { title: "百分比注釋", dataIndex: "percent", width: 200 },
  { title: "ES上單金額", dataIndex: "sign_price", width: 400 },
  { title: "ES收款日期", dataIndex: "receipt_date", width: 400 },
  {
    title: "ES收款方式 支票-號碼 入賬-資料",
    dataIndex: "receipt_way",
    width: 600
  },
  { title: "ES收款金額", dataIndex: "receipt_price", width: 400 },
  { title: "客戶尚未支付餘額", dataIndex: "client_no_pay", width: 400 },
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
    width: 600
  },
  { title: "分判折扣優惠", dataIndex: "discount", width: 400 },
  { title: "ES支付金額", dataIndex: "pay_price", width: 400 },
  { title: "支付記錄編號", dataIndex: "pay_record_no", width: 400 },
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
  destroyed() {
    sessionStorage.kesort = "";
  },
  methods: {
    getTableData() {
      let sort = this.$route.params.sort;
      //保存在sessionStorge
      if (sort) {
        sessionStorage.setItem("kesort", sort);
      }
      this.onTableLoading = true;
      get_bid_kerecord(sort)
        .then(res => {
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
  components: { edit }
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>