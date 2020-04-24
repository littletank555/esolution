<template>
  <div class="client_list">
    <p class="header">
      <a-input-search placeholder="search by client name" style="width: 200px" @search="onSearch" />
      <span>
        <a :href="file_link" ref="download" hidden>下載</a>
        <!-- <a-button type="primary" @click="downloadexcel">Download Record</a-button>

        <a-button
          type="primary"
          @click="()=>{
        this.$refs.uploadList.show()
        }"
        >Add Record By Upload</a-button>-->
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="download" />Download Record
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="upload" />Add Record By Upload
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px" type="primary">
            Download / Upload
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newClient.show(dataSource)
        }"
        >新增客戶資料</a-button>
      </span>
    </p>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :loading="onLoading"
      :pagination="pagination"
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

    <uploadData ref="uploadData" @done="()=>{
      get_tableData();
      }" />
  </div>
</template>
<script>
import newCLientList from "./newCLient.vue";
import uploadData from "./uploadData.vue";
import editClient from "./editClient.vue";
import { get_clients, delete_client, download_excel } from "@/api/client.js";
const columns = [
  {
    title: "客戶序號",
    dataIndex: "csn",
    width: 150,
    key: "csn",
    sorter: (a, b) => a.csn.length - b.csn.length
  },
  {
    title: "樓盤數",
    dataIndex: "buildings",
    sorter: (a, b) => a.buildings - b.buildings
  },
  {
    title: "客戶中文名稱",
    dataIndex: "ccn",
    width: 200
  },
  {
    title: "客戶英文名稱",
    dataIndex: "cen",
    width: 300,
    sorter: (a, b) => a.cen.length - b.cen.length
  },
  {
    title: "總公司地址",
    dataIndex: "bt",
    width: 400
  },
  {
    title: "聯絡人",
    dataIndex: "contact"
  },
  {
    title: "聯絡電話",
    dataIndex: "ct"
  },
  {
    title: "電郵",
    dataIndex: "ce"
  },
  {
    title: "傳真",
    dataIndex: "cf"
  },
  {
    scopedSlots: { customRender: "edit" }
  }
  // {
  //   scopedSlots: { customRender: "delete" }
  // }
];

export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onLoading: false,
      file_link: "",
      pagination: {
        defaultPageSize: 50
      }
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
          console.log(res.list);
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
    },
    handleMenuClick(e) {
      if (e.key == 1) {
        download_excel()
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      } else if (e.key == 2) {
        this.$nextTick(function() {
          this.$refs.uploadData.show();
        });
      }
    }
  },
  components: { newCLientList, editClient, uploadData }
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

