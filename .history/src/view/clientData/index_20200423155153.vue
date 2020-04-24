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
      :scroll="{ x: 2600}"
      :loading="this.onTableLoading"
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
    title: "施工地點",
    dataIndex: "le",
    width: 200
  },

  {
    title: "銷售人員 英文簡稱 Sales Code",
    dataIndex: "sales_code",
    width: 200
  },
  {
    title: "客戶序號 (CSN) Client Serial Number",
    dataIndex: "csn",
    width: 200
  },
  {
    title: "客戶中文名稱 (CCN) Client Chinese Name",
    dataIndex: "ccn",
    width: 200
  },
  {
    title: "客戶英文名稱 (CEN) Client English Name",
    dataIndex: "cen",
    width: 200
  },

  {
    title: "工程中文地址 (JCA) Job Chinese Address",
    dataIndex: "jca",
    width: 200
  },
  {
    title: "發票送呈地址 (BT) BILL TO",
    dataIndex: "bt",
    width: 200
  },
  {
    title: "客戶聯絡電話 (CT) Client Telephone",
    dataIndex: "ct",
    width: 200
  },
  {
    title: "客戶傳真號碼 (CF) Client FAX",
    dataIndex: "cf",
    width: 200
  },
  {
    title: "客戶電郵 (CE) Client Email",
    dataIndex: "ce",
    width: 200
  },
  {
    title: "客戶聯絡人 (CCP) Client Contact Person",
    dataIndex: "ccp",
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

