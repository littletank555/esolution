<template>
  <div>
    <p class="search-container">
      <a-input-search placeholder="Search by name" style="width: 200px" @search="onSearch" />
      <span>
        <a-button
          type="primary"
          @click="
          () => {
            this.$refs.uploadfile.showDrawer();
          }
        "
        >上傳文件</a-button>
      </span>
    </p>
    <a-table :columns="columns" :dataSource="tableData" :loading="onTableLoading">
      <template slot="download" slot-scope="record">
        <a download :href="record.url">
          <a-icon type="download" />&emsp;download
        </a>
      </template>
      <template slot="delete" slot-scope="record">
        <a href="#" @click="onDeleteFile(record.id,record.file_id)">
          <a-icon type="delete" />&emsp;delete
        </a>
      </template>
    </a-table>
    <uploadfile
      ref="uploadfile"
      @done="
        () => {
          this.get_tableData(this.project_id, this.file_cat);
        }
      "
    />
  </div>
</template>
<script>
import uploadfile from "./uploadFile";
import { get_bid_file } from "@/api/outbid.js";
const columns = [
  { title: "文件類型", dataIndex: "file_cat" },
  {
    title: "上傳時間",
    dataIndex: "upload_date"
  },
  {
    title: "金額",
    dataIndex: "price"
  },
  {
    title: "備註",
    dataIndex: "remark"
  },
  {
    title: "下载",
    scopedSlots: { customRender: "download" }
  },
  {
    title: "删除",
    scopedSlots: { customRender: "delete" }
  }
];
export default {
  data() {
    return {
      project_meta_id: 0,
      file_cat: 0,
      columns,
      tableData: [],
      onTableLoading: false
    };
  },
  created() {
    this.project_meta_id = this.$route.params.project_meta_id;
    if (this.$route.query.file_cat == 0) {
      this.file_cat = 0;
    } else if (this.$route.query.file_cat == 2) {
      this.file_cat = 2;
    } else {
      this.file_cat = 4;
    }
    this.get_tableData(this.project_id, this.file_cat);
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
    get_tableData(project_id, file_cat) {
      console.log(project_id);
      this.onTableLoading = true;
      get_bid_file(project_id, file_cat)
        .then(res => {
          console.log(res.list);
          this.tableData = res.list;
          this.onTableLoading = false;
        })
        .catch(err => {
          this.onTableLoading = false;
        });
    },
    onDeleteFile(pid, file_id) {
      // this.$confirm({
      //   title: "是否要刪除該文件",
      //   maskClosable: true,
      //   onOk: () => {
      //     return del_project_file(pid, file_id)
      //       .then(res => {
      //         console.log(res.status);
      //         if (res.status) {
      //           this.$message.success("刪除成功");
      //           this.get_tableData();
      //         } else {
      //           this.$message.error("刪除失敗");
      //         }
      //         return true;
      //       })
      //       .catch(err => {
      //         this.$message.error("刪除失敗!");
      //         reject(error);
      //       });
      //   }
      // });
    }
  },
  components: { uploadfile }
};
</script>
<style lang="scss">
.search-container {
  display: flex;
  justify-content: space-between;
}
</style>