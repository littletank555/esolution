<template>
  <div>
    <p class="header">
      <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
      <a-button type="primary" @click="()=>{
        this.$refs.newIn.show()
        }">Add Record</a-button>
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
      <template slot="download" slot-scope="record">
        <a>
          <a-icon type="download"></a-icon>
        </a>
      </template>
    </a-table>
    <newIn ref="newIn" @done="()=>{
      this.getTableData();
      }" />
    <edit ref="edit" @done="()=>{
      this.getTableData();
      }"></edit>
  </div>
</template>
<script>
import newIn from "./newIn";
import edit from "./edit";
import { get_pmasters, delete_pmaster } from "@/api/pmaster.js";
const columns = [
  { title: "編號", dataIndex: "sort", key: "name" },
  { title: "工程編號", dataIndex: "sort", key: "name" },
  { title: "工程地點", dataIndex: "sort", key: "name" },
  { title: "分包商名稱", dataIndex: "p_no", key: "age" },
  { width: "100px", scopedSlots: { customRender: "detail" } },
  { width: "100px", scopedSlots: { customRender: "download" } },
  { width: "100px", scopedSlots: { customRender: "delete" } }

  // { title: "被邀請報價日期", dataIndex: "name" },
  // { title: "截標日期", dataIndex: "name" },
  // { title: "截標時間", dataIndex: "name" },
  // { title: "交標日期", dataIndex: "name" },
  // { title: "交標方法", dataIndex: "name" },
  // { title: "出標價錢", dataIndex: "name" },
  // { title: "是否中標", dataIndex: "name" },
  // { title: "接收中標日期", dataIndex: "name" },
  // { title: "中標價錢", dataIndex: "name" },

  // { title: "報價分判名稱", dataIndex: "name" },
  // { title: "分判報價金額", dataIndex: "name" },
  // { title: "報價單編號或呈報日期", dataIndex: "name" },
  // { title: "中標分判名稱", dataIndex: "name" },
  // { title: "接收中標日期", dataIndex: "name" },
  // { title: "分判中標價錢", dataIndex: "name" },
  // { title: "分判中標編號", dataIndex: "name" },
  // { title: "開工日期", dataIndex: "name" },
  // { title: "完工日期", dataIndex: "name" },
  // { title: "是否需要小型工程", dataIndex: "name" },
  // { title: "申報記錄BW編號", dataIndex: "name" },
  // { title: "投標書付款條款", dataIndex: "name" },
  // { title: "SITE location", dataIndex: "name" },
  // { title: "BILL TO", dataIndex: "name" }
];
export default {
  data() {
    return {
      tableData: [],
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
      get_pmasters()
        .then(res => {
          this.onTableLoading = false;
          console.log(res.list);
          this.tableData = res.list;
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
  components: { newIn, edit }
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
