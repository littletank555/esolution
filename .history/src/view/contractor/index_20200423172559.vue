<template>
  <div class="contractor_list">
    <p class="header">
      <a-input-search placeholder="search by name" style="width: 200px" @search="onSearch" />
      <span>
        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newContractor.show()
        }"
        >新增承辦商資料</a-button>
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
          <a-icon
            type="edit"
            @click="()=>{
            $refs.editContractor.show(record)
        }"
          ></a-icon>
        </a>
      </template>
      <template slot="delete" slot-scope="record">
        <a-popconfirm
          v-if="tableData.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.sub_contractor_id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>
    </a-table>
    <newContractor ref="newContractor" @done="()=>{get_tableData();}" />
    <editContractor ref="editContractor" @done="()=>{get_tableData();}" />
  </div>
</template>

<script>
import { get_contractor_data, delete_contractor } from "@/api/contractor.js";
import newContractor from "./newContractor";
import editContractor from "./editContractor";
const columns = [
  { title: "承辦商序號", dataIndex: "sub_contractor_id" },
  { title: "承辦商名稱", dataIndex: "contractor_name" },
  { title: "承辦商簡稱", dataIndex: "s_name" },
  { title: "公司地址", dataIndex: "address" },
  { title: "聯絡人", dataIndex: "contact" },
  { title: "電話", dataIndex: "tel" },
  { title: "傳真", dataIndex: "fax" },
  { title: "郵箱", dataIndex: "email" },
  {
    scopedSlots: { customRender: "edit" }
  }
  // {
  //   title: "Delete",
  //   scopedSlots: { customRender: "delete" }
  // }
];
export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      innerColumns,
      innerData,
      onLoading: false,
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
          item.contractor_name.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
    },
    get_tableData() {
      this.onLoading = true;
      get_contractor_data()
        .then(res => {
          this.tableData = res.list;
          this.dataSource = res.list;
          this.onLoading = false;
        })
        .catch(err => {
          this.onLoading = false;
        });
    },
    onDelete(con_id) {
      delete_contractor(con_id)
        .then(res => {
          if (res.status) {
            this.get_tableData();
          }
        })
        .catch(err => {});
    }
  },
  components: {
    newContractor,
    editContractor
  }
};
</script>

<style lang="scss">
.contractor_list {
  .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>

