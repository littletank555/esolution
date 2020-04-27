<template>
  <div class="client_list">
    <p class="header">
      <a-input-search placeholder="search by name" style="width: 200px" @search="onSearch" />
      <a-button
        type="primary"
        @click="()=>{
        this.$refs.newClient.show(dataSource)
        }"
      >新增施工地點</a-button>
    </p>

    <a-table
      :columns="columns"
      :dataSource="tableData"
      :loading="this.onTableLoading"
      :pagination="pagination"
      class="components-table-demo-nested"
    >
      <template slot="edit" slot-scope="record">
        <a>
          <a-icon type="edit" @click="()=>{
        $refs.editClient.show(record)
        }"></a-icon>
        </a>
      </template>

      <template slot="delete" slot-scope="record">
        <a-popconfirm
          v-if="tableData.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.client_data_id,record.csn)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>
      <a-table
        slot="expandedRowRender"
        slot-scope="record"
        :columns="innerColumns"
        :dataSource="record.meta"
        :pagination="false"
      ></a-table>
    </a-table>

    <newClientData ref="newClient" @done="()=>{
      this.getTableData()}" />
    <editClientData ref="editClient" @done="()=>{
      this.getTableData()}" />
  </div>
</template>
<script>
import newClientData from "./newClientData";
import editClientData from "./editClientData";
import { get_client_data, delete_client_data } from "@/api/client_data";
const columns = [
  {
    title: "地點序號",
    dataIndex: "lsn",
    width: 200
  },
  {
    title: "工程區域",
    dataIndex: "project_area",
    width: 100,
    filter: [],
    onFilter: (value, record) => record.project_area.indexOf(value) === 0
  },
  {
    title: "施工地點",
    dataIndex: "location",
    width: 200
  },
  {
    title: "銷售人員 英文簡稱",
    dataIndex: "sales_code",
    width: 200
  },
  {
    title: "客戶序號",
    dataIndex: "ccn",
    width: 200
  },
  {
    title: "聯繫人",
    dataIndex: "contact1",
    width: 200
  },
  {
    title: "電話",
    dataIndex: "tel1",
    width: 200
  },
  {
    title: "郵箱",
    dataIndex: "email1",
    width: 200
  },

  {
    title: "傳真",
    dataIndex: "fax1",
    width: 200
  },
  {
    title: "Edit",
    scopedSlots: { customRender: "edit" },
    width: 100
  },
  {
    title: "Delete",
    scopedSlots: { customRender: "delete" },
    width: 100
  }
];
const innerColumns = [
  { title: "", dataIndex: "key", key: "key" },
  { title: "聯繫人", dataIndex: "contact", key: "contact" },
  { title: "電話", dataIndex: "tel", key: "tel" },
  { title: "傳真", dataIndex: "fax", key: "fax" },
  { title: "郵箱", dataIndex: "email", key: "email" }
];

export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onTableLoading: false,
      innerColumns,
      pagination: {
        defaultPageSize: 50
      }
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.onTableLoading = true;
      let option = [
        "中西區",
        "東區",
        "南區",
        "灣仔區",
        "九龍城區",
        "觀塘區",
        "深水埗區",
        "黃大仙區",
        "油尖旺區",
        "離島區",
        "葵青區",
        "北區",
        "西貢區",
        "沙田區",
        "大埔區",
        "荃灣區",
        "屯門區",
        "元朗區"
      ];
      get_client_data()
        .then(res => {
          console.log(res.list);
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
          (item.ccn + item.le + item.lc + item.project_area)
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
    },
    onDelete(cid, csn) {
      delete_client_data(cid, csn)
        .then(res => {
          if (res.status) {
            this.getTableData();
          } else {
          }
        })
        .catch(err => {});
    }
  },
  components: { newClientData, editClientData }
};
</script>
<style lang="scss">
.client_list {
  .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>

