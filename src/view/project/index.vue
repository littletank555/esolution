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
      :pagination="pagination"
    >
      <template slot="is_bid" slot-scope="record">
        <span v-if="record.is_bid == '是'" style="color:blue;">是</span>
        <span
          v-if="record.is_bid == '否'"
          @click="bidClick(record.project_id,record.contractor_data)"
        >
          <a style="color:red;">否</a>
        </span>
      </template>
      <template slot="send_contractor" slot-scope="record">
        <span v-for="(item,i) in record.contractor_data" :key="i">
          <a-tag color="#2db7f5" v-if="item.receipt_date == '0000-00-00'">{{item.s_name}}</a-tag>
          <a-tag color="red" v-else>{{item.s_name}}</a-tag>
        </span>
      </template>
      <template slot="subContractor" slot-scope="record">
        <router-link
          :to="{
            name: 'subContractor',
            params: { project_id: record.project_id},
            query:{
              header_title:record.lc,
              p_no:record.p_no,
            }
          }"
          tag="a"
        >
          <a-tag color="blue">報價承辦商</a-tag>
        </router-link>
        <!-- <span @click="link(record.project_id)">承辦商</span> -->
      </template>
      <template slot="edit" slot-scope="record">
        <a>
          <a-icon type="edit" @click="()=>{
            $refs.editProject.show(record)
        }"></a-icon>
        </a>
      </template>
      <!-- <template slot="delete" slot-scope="record">
        <a-popconfirm
          v-if="tableData.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.project_id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>-->
      <template slot="delete" slot-scope="record">
        <a href="#" @click="onDelete(record.project_id)">
          <a-icon type="delete" />
        </a>
      </template>
    </a-table>
    <a-modal
      title="設置中標承辦商"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      ok-text="确认"
      cancel-text="取消"
    >
      <p>
        <span>中標承辦商</span>
        <a-select style="width:100%" v-model="info.contractor_name" @change="bidChange">
          <a-select-option
            v-for="(item,i) in contractor_data"
            :key="i"
            :value="item.contractor_name"
          >{{item.contractor_name}}</a-select-option>
        </a-select>
      </p>
      <p>
        <span>中標日期</span>
        <a-date-picker format="YYYY-MM-DD" v-model="info.bid_date" style="width:100%"></a-date-picker>
      </p>
      <p>
        <span>中標價簽</span>
        <a-input v-model="info.bid_price"></a-input>
      </p>
    </a-modal>
    <newProject ref="newProject" @done="()=>{
      this.getTableData();
      }" />
    <editProject ref="editProject" @done="()=>{get_tableData();}" />
  </div>
</template>
<script>
import moment from "moment";
import newProject from "./newProject";
import editProject from "./editProject";
import { get_project, del_project } from "@/api/project.js";
import { new_bid } from "@/api/outbid.js";
const columns = [
  { title: "工程序號", dataIndex: "p_num", width: 100 },
  { title: "負責同事", dataIndex: "sales_code", width: 100 },
  { title: "工程地點", dataIndex: "lc", width: 100 },
  { title: "工程標號和標題", dataIndex: "titleandno", width: 400 },
  { title: "收到標書日期", dataIndex: "re_tender_date", width: 150 },
  { title: "截標日期", dataIndex: "end_tender_date", width: 100 },
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
  { title: "是否中標", scopedSlots: { customRender: "is_bid" }, width: 100 },
  {
    title: "標書發送",
    scopedSlots: { customRender: "send_contractor" },
    width: 200
  },
  {
    scopedSlots: { customRender: "subContractor" },
    width: 80,
    fixed: "right"
  },
  { scopedSlots: { customRender: "edit" }, width: 80, fixed: "right" },
  { scopedSlots: { customRender: "delete" }, width: 80, fixed: "right" }
];
export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onTableLoading: false,
      visible: false,
      confirmLoading: false,
      pagination: {
        defaultPageSize: 50
      },
      contractor_data: [],
      info: {
        project_id: 0,
        contractor_name: "",
        bid_price: "",
        bid_date: moment()
      }
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
    link(project_id) {
      this.$router.push({
        name: "subContractor",
        params: { project_id: project_id }
      });
    },
    bidClick(project_id, contractor_data) {
      this.contractor_data = [];
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          this.info[key] = "";
        }
      }
      this.info.bid_date = moment();
      this.info.project_id = project_id;
      contractor_data.forEach(element => {
        if (element.price != 0) {
          this.contractor_data.push(element);
        }
      });
      this.visible = true;
    },
    bidChange(contractor_name) {
      this.info.contractor_name = contractor_name;
      let contractor = this.contractor_data.filter(
        element => element.contractor_name == contractor_name
      );
      this.info.bid_price = contractor[0].price;
    },
    handleOk(e) {
      console.log(this.info);
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          if (typeof this.info[key] == "object") {
            this.info[key] = this.info[key]._isValid
              ? this.info[key].format("YYYY-MM-DD")
              : "";
          }
        }
      }
      if (this.info.contractor_name == "" || this.info.bid_price == 0) {
        this.$message.success("請輸入必要的信息！");
        return;
      }
      new_bid(this.info)
        .then(res => {
          if (res.status) {
            this.$message.success("成功添加");
            this.visible = false;
            this.getTableData();
          } else {
            this.$message.error("添加失敗");
          }
        })
        .catch(err => {
          this.$message.error("添加失敗");
        });
    },
    handleCancel(e) {
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
    },
    onDelete(project_id) {
      this.$confirm({
        title: "是否要刪除該工程",
        maskClosable: true,
        onOk: () => {
          return del_project(project_id)
            .then(res => {
              console.log(res.status);
              if (res.status) {
                this.$message.success("刪除成功");
                this.getTableData();
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
  components: { newProject, editProject }
};
</script>
<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>
