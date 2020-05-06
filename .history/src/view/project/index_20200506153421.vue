<template>
  <div>
    <p class="header">
      <a-input-search placeholder="search by Project site" style="width: 200px" @search="onSearch" />
      <span>
        <a-button
          type="primary"
          @click="()=>{
        this.$refs.newProject.show()
        }"
        >新增項目資料</a-button>
      </span>
    </p>
    <a-table
      :columns="columns"
      :dataSource="tableData"
      :loading="onTableLoading"
      :rowKey="record => record.project_id"
    >
      <template slot="is_bid" slot-scope="record">
        <span v-if="record.is_bid == '是'" style="color:blue;">是</span>
        <span v-if="record.is_bid == '否'" @click="bidClick(record.project_id)">
          <a style="color:red;">否</a>
        </span>
        <a-modal
          title="Title"
          :visible="visible"
          @ok="handleOk"
          :confirmLoading="confirmLoading"
          @cancel="handleCancel"
        >
          <p>{{ ModalText }}</p>
        </a-modal>
      </template>
      <template slot="send_contractor" slot-scope="record">
        <span v-for="(item,i) in record.contractor_data" :key="i">
          <a-tag color="#2db7f5" v-if="item.receipt_date == '0000-00-00'">{{item.s_name}}</a-tag>
          <a-tag color="red" v-else>{{item.s_name}}</a-tag>
        </span>
      </template>
      <template slot="edit" slot-scope="record">
        <a>
          <a-icon type="edit" @click="()=>{
            $refs.editProject.show(record)
        }"></a-icon>
        </a>
      </template>
      <template slot="delete" slot-scope="record">
        <a-popconfirm
          v-if="tableData.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.project_id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>
    </a-table>
    <newProject ref="newProject" @done="()=>{
      this.getTableData();
      }" />
    <editProject ref="editProject" @done="()=>{get_tableData();}" />
  </div>
</template>
<script>
import newProject from "./newProject";
import { get_project } from "@/api/project.js";
const columns = [
  { title: "工程序號", dataIndex: "p_num" },
  { title: "負責同事", dataIndex: "sales_code" },
  { title: "工程地點", dataIndex: "lc" },
  { title: "工程標號和標題", dataIndex: "titleandno", width: "550px" },
  { title: "收到標書日期", dataIndex: "re_tender_date" },
  { title: "截標日期", dataIndex: "end_tender_date" },
  // {
  //   title: "是否中標",
  //   width: "150px",
  //   dataIndex: "is_bid",
  //   filter: [
  //     { text: "是", value: "是" },
  //     { text: "否", value: "否" }
  //   ],
  //   filterMultiple: true,
  //   onFilter: (value, record) => record.is_bidding.indexOf(value) === 0
  // },
  { title: "是否中標", scopedSlots: { customRender: "is_bid" } },
  { title: "標書發送", scopedSlots: { customRender: "send_contractor" } },
  { scopedSlots: { customRender: "contractor" } },
  { scopedSlots: { customRender: "edit" } },
  { scopedSlots: { customRender: "delete" } }
];
export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onTableLoading: false,
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false
    };
  },
  created() {
    this.getTableData();
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
    bidClick(project_id) {
      this.visible = true;
    },
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    getTableData() {
      this.onTableLoading = true;
      get_project()
        .then(res => {
          console.log(res.list);
          this.tableData = res.list;
          this.dataSource = res.list;
          this.onTableLoading = false;
        })
        .catch(err => {});
    }
  },
  components: { newProject, editProject }
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
