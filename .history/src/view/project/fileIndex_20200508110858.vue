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
import { get_file_list, delete_file } from "@/api/pmaster.js";
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
      pmaster_id: "",
      columns,
      tableData: [],
      onTableLoading: false
    };
  },
  created() {
    this.pmaster_id = this.$route.params.pmaster_id;
    this.get_tableData();
  },
  destroyed() {
    sessionStorage.pmfile = "";
  },
  methods: {
    get_tableData() {
      let pmfile = "file" + this.$route.params.pmaster_id;
      if (pmfile) {
        sessionStorage.setItem("pmfile", pmfile);
      }
      this.onTableLoading = true;
      get_file_list(this.pmaster_id)
        .then(res => {
          console.log(res);
          // this.tableData = res.list;
          let types = new Set();
          res.list.forEach((item, i) => {
            types.add(item.type);
          });
          this.columns[1].filters = [];
          types.forEach(item => {
            this.columns[1].filters.push({ text: item, value: item });
          });
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