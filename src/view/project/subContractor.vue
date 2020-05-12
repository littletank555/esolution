<template>
  <div class="contractor_list">
    <p class="header">
      <a-input-search placeholder="search by Project site" style="width: 200px" @search="onSearch" />
      <span>
        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newSubContractor.show()
        }"
        >新增報價承辦商</a-button>
      </span>
    </p>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :loading="onTableLoading"
      :rowKey="record => record.id"
      :pagination="pagination"
    >
      <template slot="tender" slot-scope="record">
        <router-link
          :to="{
            name: 'file',
            params: { project_meta_id: record.id,title:'報價函'},
            query:{
             file_cat:1,
            },
          }"
          tag="a"
        >
          <a-icon type="file" />
        </router-link>
      </template>
      <template slot="re_tender" slot-scope="record">
        <router-link
          :to="{
            name: 'file',
            params: { project_meta_id: record.id,title:'回傳報價文件'},
            query:{
             file_cat:2,
            }
          }"
          tag="a"
        >
          <a-icon type="file" />
        </router-link>
      </template>
      <template slot="email">
        <a-icon type="mail" />
      </template>
      <template slot="edit" slot-scope="record">
        <a>
          <a-icon
            type="edit"
            @click="()=>{
            $refs.editSubContractor.show(record)
        }"
          ></a-icon>
        </a>
      </template>
      <!-- <template slot="delete" slot-scope="record">
        <a-popconfirm
          v-if="tableData.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>-->
      <template slot="delete" slot-scope="record">
        <a href="#" @click="onDelete(record.id)">
          <a-icon type="delete" />
        </a>
      </template>
    </a-table>
    <newSubContractor
      ref="newSubContractor"
      @done="()=>{
      this.getTableData(this.project_id);
      }"
    />
    <editSubContractor ref="editSubContractor" @done="()=>{getTableData(this.project_id);}" />
  </div>
</template>

<script>
import newSubContractor from "./newSubContractor";
import editSubContractor from "./editSubContractor";
import { get_sub_contractor, del_sub_contractor } from "@/api/project.js";
const columns = [
  { title: "承辦商名稱", dataIndex: "contractor_name" },
  { title: "發出日期", dataIndex: "send_date" },
  { title: "報價", dataIndex: "price" },
  { title: "報價日期", dataIndex: "receipt_date" },
  { title: "報價函", scopedSlots: { customRender: "tender" } },
  { title: "回傳報價文件", scopedSlots: { customRender: "re_tender" } },
  { title: "郵件發送", scopedSlots: { customRender: "email" } },
  { scopedSlots: { customRender: "edit" } },
  { scopedSlots: { customRender: "delete" } }
];
export default {
  data() {
    return {
      project_id: 0,
      tableData: [],
      dataSource: [],
      columns,
      pagination: {
        defaultPageSize: 50
      }
    };
  },
  created() {
    this.project_id = this.$route.params.project_id;
    this.getTableData(this.project_id);
  },
  methods: {
    onSearch(val) {
      const dataSource = [...this.dataSource];
      this.tableData = dataSource.filter(
        item =>
          (item.pl + item.sort + item.ccn)
            .toLowerCase()
            .indexOf(val.toLowerCase()) > -1
      );
      if (val == "") {
        this.tableData = this.dataSource;
      }
    },
    getTableData(project_id) {
      console.log(project_id);
      this.onTableLoading = true;
      get_sub_contractor(project_id)
        .then(res => {
          console.log(res.list);
          this.tableData = res.list;
          this.dataSource = res.list;
          this.onTableLoading = false;
        })
        .catch(err => {});
    },
    onDelete(pid) {
      this.$confirm({
        title: "是否要刪除該承辦商",
        maskClosable: true,
        onOk: () => {
          return del_sub_contractor(pid)
            .then(res => {
              console.log(res.status);
              if (res.status) {
                this.$message.success("刪除成功");
                this.getTableData(this.project_id);
              } else {
                this.$message.error("刪除失敗");
              }
              return true;
            })
            .catch(err => {
              this.$message.error("刪除失敗!");
              reject(error);
            });
        }
      });
    }
  },
  components: {
    newSubContractor,
    editSubContractor
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

