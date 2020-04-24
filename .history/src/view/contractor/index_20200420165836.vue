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
        >Add Contarctor</a-button>
      </span>
    </p>
    <a-table :columns="columns" :dataSource="tableData" :loading="onLoading">
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
  { title: "分包商名稱", dataIndex: "contractor_name" },
  { title: "分包商簡稱", dataIndex: "s_name" },
  { title: "聯絡人", dataIndex: "contact" },
  { title: "電話", dataIndex: "tel" },
  { title: "傳真", dataIndex: "fax" },
  { title: "郵箱", dataIndex: "email" },
  {
    title: "Edit",
    scopedSlots: { customRender: "edit" }
  },
  {
    title: "Delete",
    scopedSlots: { customRender: "delete" }
  }
];
export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onLoading: false
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

