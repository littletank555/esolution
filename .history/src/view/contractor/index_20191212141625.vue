<template>
  <div class="contractor-list">
    <p class="header">
      <a-input-search placeholder="search by name" style="width: 200px" @search="onSearch" />
      <span>
        <a-button type="primary">Add Contarctor</a-button>
      </span>
    </p>
    <a-table :columns="columns" :dataSource="tableData" :loading="onLoading">
      <template slot="edit" slot-scope>
        <a>
          <a-icon type="edit" @click="()=>{
            $refs.editClient.show()
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
    <newContractor ref="newContractor" @done="()=>{get_tableData();}" />
  </div>
</template>

<script>
import { get_contractor_data } from "@/api/contractor.js";
import newContractor from "./newContractor";
const columns = [
  { title: "分包商名稱", dataIndex: "name", width: "600px" },
  { title: "傳真", dataIndex: "fax", width: "300px" },
  { title: "電話", dataIndex: "tel", width: "300px" },
  { title: "郵箱", dataIndex: "email", width: "300px" },
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
        item => item.name.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
    },
    get_tableData() {
      this.onLoading = true;
      get_contractor_data()
        .then(res => {
          console.log(res.list);
          this.tableData = res.list;
          this.dataSource = res.list;
          this.onLoading = false;
        })
        .catch(err => {
          this.onLoading = false;
        });
    }
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

