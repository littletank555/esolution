<template>
  <div class="client_list">
    <p class="header">
      <a-input-search placeholder="search by client name" style="width: 200px" @search="onSearch" />
      <span>
        <a :href="file_link" ref="download" hidden>下載</a>
        <a-button type="primary" @click="downloadexcel">download</a-button>

        <a-button
          type="primary"
          @click="()=>{
        this.$refs.uploadList.show()
        }"
        >Add Client By Upload</a-button>

        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newClient.show(dataSource)
        }"
        >Add Client</a-button>
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
            </a-menu-item></a-menu>
      </span>
    </p>
    <a-table :columns="columns" :dataSource="tableData" :loading="onLoading">
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
          @confirm="() => onDelete(record.client_id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>
    </a-table>
    <newCLientList ref="newClient" @done="()=>{
      get_tableData();
      }" />

    <editClient ref="editClient" @done="()=>{
      get_tableData();
      }" />

    <uploadList ref="uploadList" @done="()=>{
      get_tableData();
      }" />
  </div>
</template>
<script>
import newCLientList from "./newCLient.vue";
import uploadList from "./uploadList.vue";
import editClient from "./editClient.vue";
import { get_clients, delete_client, download_excel } from "@/api/client.js";
const columns = [
  {
    title: "客戶序號 (CSN) ClientSerial Number",
    dataIndex: "csn"
  },
  {
    title: "客戶中文名稱 (CCN) Client Chinese Name",
    dataIndex: "ccn"
  },
  {
    title: "客戶英文名稱 (CEN) Client English Name",
    dataIndex: "cen"
  },
  {
    title: "發票送呈地址 (BT) BILL TO",
    dataIndex: "bt"
  },
  {
    title: "客戶聯絡電話 (CT) Client Telephone",
    dataIndex: "ct"
  },
  {
    scopedSlots: { customRender: "edit" }
  },
  {
    scopedSlots: { customRender: "delete" }
  }
];

export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onLoading: false,
      file_link: ""
    };
  },
  created() {
    this.get_tableData();
  },
  methods: {
    onSearch(val) {
      const dataSource = [...this.dataSource];
      this.tableData = dataSource.filter(
        item =>
          (item.ccn + item.cen + item.csn)
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
    },
    downloadexcel() {
      download_excel()
        .then(res => {
          this.file_link = res.link;
          this.$nextTick(function() {
            this.$refs.download.click();
          });
        })
        .catch(err => {});
    },
    get_tableData() {
      this.onLoading = true;
      get_clients()
        .then(res => {
          res.list.forEach((item, index) => {
            item.key = index;
          });
          this.tableData = res.list;
          this.dataSource = res.list;
          this.onLoading = false;
        })
        .catch(err => {
          this.onLoading = false;
        });
    },
    onDelete(cid) {
      delete_client(cid)
        .then(res => {
          if (res.status) {
            this.get_tableData();
          } else {
          }
        })
        .catch(err => {});
    }
  },
  components: { newCLientList, editClient, uploadList }
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

