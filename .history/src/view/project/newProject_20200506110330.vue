<template>
  <a-drawer
    title="新增項目資料"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="600px"
  >
    <div class="new-pmaster-modal">
      <p class="item">
        <span class="label">地點序號</span>
        <a-auto-complete
          style="width: 100%"
          @change="onlsnSelect"
          :filterOption="filterOption"
          :value="info.lsn"
          placeholder="input for select"
        >
          <template slot="dataSource">
            <a-select-option
              v-for="(item,i) in client_data_list"
              :key="i"
              :value="item.lsn"
            >{{item.lsn +'/'+item.lc}}</a-select-option>
          </template>
        </a-auto-complete>
      </p>
      <p class="item">
        <span class="label">工程序號</span>
        <a-input v-model="info.p_num" :disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">工程標號</span>
        <a-input v-model="info.p_no"></a-input>
      </p>
      <p class="item">
        <span class="label">工程標題</span>
        <a-input v-model="info.pt"></a-input>
      </p>
      <p class="item">
        <span class="label">被邀請報價日期</span>
        <a-date-picker format="DD/MM/YYYY" v-model="info.in_bid_date"></a-date-picker>
      </p>
      <p class="item">
        <span class="label">截標日期</span>
        <a-date-picker format="DD/MM/YYYY" v-model="info.end_bid_date"></a-date-picker>
      </p>
      <p>
        <span>標書資料</span>
        <a-upload
          name="orm_file"
          :multiple="false"
          :action="action_url"
          :directory="false"
          @change="handleChange"
          :remove="onfileRemove"
          style="margin-left:90px"
        >
          <a-button :disabled="canUpload">
            <a-icon type="upload" />上傳標書
          </a-button>
        </a-upload>
      </p>
      <p class="item">
        <span class="label">填寫標書資料</span>
        <a-textarea style="height:100px"></a-textarea>
      </p>
      <p style="text-align:right">
        <a-button type="primary" @click="onClear">清除</a-button>
        <a-button type="primary" :loading="onSubmiting" @click="onSubmit">提交</a-button>
      </p>
    </div>
  </a-drawer>
</template>
<script>
import moment from "moment";
import { get_client_data } from "@/api/client_data";
import { new_pmaster } from "@/api/pmaster";
import { get_project_num } from "@/api/project";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      info: {
        p_num: "",
        p_no: "",
        lsn: "",
        p_title: "",
        in_bid_date: "",
        is_bid: "",
        file_id: "",
        re_tender_date: "",
        end_tender_date: "",
        tender_file_id: 0,
        tender_text: ""
      },
      client_data_list: [],
      select_client_data: {}, //選中的工程單對應的client data
      itemkey: 0,
      subinfo: [],
      action_url: this.$store.getters.domain + "file-upload/"
    };
  },
  created() {
    this.get_client();
    if (location.hostname == "localhost") {
      this.action_url = "api/file-upload/";
    }
  },
  methods: {
    show() {
      // this.select_client_data = {};
      // this.subinfo = [];
      // for (const key in this.info) {
      //   if (key != "sort") {
      //     if (this.info.hasOwnProperty(key)) {
      //       this.info[key] = "";
      //     }
      //   }
      // }
      this.get_project_num();
      this.visible = true;
      this.onSubmiting = false;
    },
    moment,
    onClear() {
      this.select_client_data = {};
      this.subinfo = [];
      this.itemkey = 0;
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          this.info[key] = "";
        }
      }
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log("file", info);

        this.fileinfo = info.fileList[0].response;
        this.disable = false;
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    onClose() {
      this.visible = false;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    onlsnSelect(key) {
      this.client_data_list.some(item => {
        if (item.lc == key) {
          this.select_client_data = item;
          // this.info.client_data_id = item.client_data_id;
          this.info.pl = item.lc;
          this.info.pshort = item.project_area;
          return true;
        }
      });
    },
    get_project_num() {
      get_project_num()
        .then(res => {
          this.info.p_num = res.list;
        })
        .catch(err => {});
    },
    addSubInfo() {
      this.itemkey++;
      this.subinfo.push({
        sub_price_name: "",
        sub_price: "",
        spn_date: "",
        itemkey: this.itemkey
      });
    },
    onDelete(e) {
      this.subinfo = this.subinfo.filter(item => item.itemkey != e.itemkey);
    },
    onSubmit() {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          if (typeof this.info[key] == "object") {
            if (key == "end_bid_time") {
              this.info[key] = this.info[key]._isValid
                ? this.info[key].format("HH:mm")
                : "";
            } else {
              this.info[key] = this.info[key]._isValid
                ? this.info[key].format("YYYY-MM-DD")
                : "";
            }
          }
        }
      }
      if (this.info.lc == "") {
        this.$message.error("請選擇工程地點");
        return;
      }
      this.info.p_no = this.project_no;
      this.onSubmiting = true;
      if (this.itemkey != 0) {
        this.subinfo.forEach((element, i) => {
          if (i == 0) {
            this.info.sub_price_name =
              this.info.sub_price_name + element.sub_price_name;
            this.info.sub_price = this.info.sub_price + element.sub_price;
            this.info.spn_date = this.info.spn_date + element.spn_date;
          } else {
            this.info.sub_price_name =
              this.info.sub_price_name + "\n" + element.sub_price_name;
            this.info.sub_price =
              this.info.sub_price + "\n" + element.sub_price;
            this.info.spn_date = this.info.spn_date + "\n" + element.spn_date;
          }
        });
      } else {
        this.info.sub_price_name = "";
        this.info.sub_price = "";
        this.info.spn_date = "";
      }
      console.log(this.info);
      new_pmaster(this.info)
        .then(res => {
          console.log(res.status);
          if (res.status) {
            this.$message.success("成功添加");
            this.visible = false;
            this.$emit("done", {});
          } else {
            this.$message.error("添加失敗");
          }
        })
        .catch(err => {
          this.$message.error("添加失敗");
        });
    },
    get_client() {
      get_client_data()
        .then(res => {
          console.log(res.list);
          this.client_data_list = res.list;
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="scss">
.new-pmaster-modal {
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label {
      min-width: 150px;
    }
    .ant-calendar-picker {
      width: 100%;
    }
  }
  .ant-select {
    width: 100%;
  }
}
</style>

