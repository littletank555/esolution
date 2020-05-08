<template>
  <div>
    <p class="search-container">
      <a-input-search placeholder="Search by name" style="width: 200px" @search="search" />
      <span>
        <a-button
          type="primary"
          @click="
          () => {
            this.$refs.uploadfile.showDrawer(this.pmaster_id);
          }
        "
        >Upload File</a-button>
        <router-link to="/home/p_master">
          <a-button type="primary">Go Back</a-button>
        </router-link>
      </span>
    </p>
    <a-table :columns="columns" :dataSource="tableData" :loading="onTableLoading">
      <template slot="download" slot-scope="record">
        <a download :href="record.url">
          <a-icon type="download" />&emsp;download
        </a>
      </template>
      <template slot="delete" slot-scope="record">
        <a href="#" @click="onDeleteFile(record.ID)">
          <a-icon type="delete" />&emsp;delete
        </a>
      </template>
    </a-table>
    <uploadfile
      ref="uploadfile"
      @done="
        () => {
          this.get_tableData();
        }
      "
    />
  </div>
</template>
<script>
import uploadfile from "./uploadFile";
import { get_project_file } from "@/api/project.js";
const columns = [
  { title: "文件名稱", dataIndex: "file_name" },
  {
    title: "上傳時間",
    dataIndex: "upload_date"
  },
  {
    title: "文件描述",
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
    this.project_meta_id = this.$route.params.pmaster_id;
    this.file_cat = this.$route.query.file_cat;
    this.get_tableData(this.project_meta_id, this.file_cat);
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
    get_tableData(project_meta_id, file_cat) {
      this.onTableLoading = true;
      get_project_file(project_meta_id, file_cat)
        .then(res => {
          this.tableData = res.list;
          this.onTableLoading = false;
        })
        .catch(err => {
          this.onTableLoading = false;
        });
    },
    onDeleteFile(fileid) {
      this.$confirm({
        title: "Do you want to delete the file?",
        maskClosable: true,
        onOk: () => {
          return delete_file(fileid)
            .then(res => {
              console.log(fileid, res.status);
              if (res.status) {
                this.$message.success("Successfully delete file!");
                this.get_tableData();
              } else {
                this.$message.error("Delete file faild!");
              }
              return true;
            })
            .catch(err => {
              this.$message.error("Delete file faild111!");
              reject(error);
            });
        }
      });
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