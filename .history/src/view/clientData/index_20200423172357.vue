<template>
  <div class="client_list">
    <p class="header">
      <a-input-search placeholder="search by name" style="width: 200px" @search="onSearch" />
      <a-button
        type="primary"
        @click="()=>{
        this.$refs.newClient.show(dataSource)
        }"
      >Add Client Data</a-button>
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
          @confirm="() => onDelete(record.client_data_id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>
      <a-table
        slot="expandedRowRender"
        slot-scope="text"
        :columns="innerColumns"
        :dataSource="innerData"
        :pagination="false"
      >
        <span slot="status" slot-scope="text">
          <a-badge status="success" />Finished
        </span>
        <span slot="operation" slot-scope="text" class="table-operation">
          <a>Pause</a>
          <a>Stop</a>
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item>Action 1</a-menu-item>
              <a-menu-item>Action 2</a-menu-item>
            </a-menu>
            <a>
              More
              <a-icon type="down" />
            </a>
          </a-dropdown>
        </span>
      </a-table>
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
    width: 100
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
const innerColumns = [
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Status", key: "state", scopedSlots: { customRender: "status" } },
  { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: "2014-12-24 23:12:00",
    name: "This is production name",
    upgradeNum: "Upgraded: 56"
  });
}
export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onTableLoading: false,
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
      get_client_data()
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
          (item.ccn + item.cen + item.lc)
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
    },
    onDelete(cid) {
      delete_client_data(cid)
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

