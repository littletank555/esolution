<template>
  <a-drawer
    title="修改報價承辦商"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="600px"
  >
    <p class="item">
      <span>承辦商名稱</span>
      <a-auto-complete
        style="width: 100%"
        :disabled="true"
        :filterOption="filterOption"
        v-model="info.contractor_id"
        placeholder="input for select"
      >
        <template slot="dataSource">
          <a-select-option
            v-for="(item,i) in contractor"
            :key="i"
            :value="item.sub_contractor_id"
          >{{item.contractor_name}}</a-select-option>
        </template>
      </a-auto-complete>
    </p>
    <p class="item">
      <span>發出日期</span>
      <a-date-picker style="width:100%" format="YYYY-MM-DD" v-model="info.send_date"></a-date-picker>
    </p>
    <p class="item">
      <span>報價</span>
      <a-input v-model="info.price"></a-input>
    </p>
    <p class="item">
      <span>報價日期</span>
      <a-date-picker style="width:100%" format="YYYY-MM-DD" v-model="info.receipt_date"></a-date-picker>
    </p>
    <p style="text-align:right">
      <a-button type="primary" :loading="onSubmiting" @click="onSubmit">提交</a-button>
    </p>
  </a-drawer>
</template>

<script>
import moment from "moment";
import { getDate } from "@/utils/validate.js";
import { get_sub_contractor } from "@/api/pmaster.js";
import { edit_sub_contractor } from "@/api/project.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      //   info: {
      //     project_id: 0,
      //     contractor_id: "",
      //     send_date: moment(),
      //     price: "",
      //     receipt_date: ""
      //   },
      info: {},
      contractor: []
    };
  },
  created() {},
  methods: {
    show(info) {
      this.info = info;
      this.info = JSON.parse(JSON.stringify(info));
      this.info.send_date = getDate(this.info.send_date);
      this.info.receipt_date == "0000-00-00"
        ? ""
        : getDate(this.info.send_date);
      this.get_contractor();
      this.info.project_id = this.$route.params.project_id;
      this.visible = true;
      this.onSubmiting = false;
    },
    onClose() {
      this.visible = false;
    },
    get_contractor() {
      get_sub_contractor()
        .then(res => {
          this.contractor = res.list;
        })
        .catch(err => {});
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    onSubmit() {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          if (typeof this.info[key] == "object") {
            this.info[key] = this.info[key]._isValid
              ? this.info[key].format("YYYY-MM-DD")
              : "";
          }
        }
      }
      console.log(this.info);
      if (this.info.project_id == 0) {
        this.$message.error("操作錯誤");
        return;
      }
      if (this.info.price == "") {
        this.$message.error("請填寫報價");
        return;
      }
      if (this.info.receipt_date == "0000-00-00") {
        this.$message.error("請填寫報價日期");
        return;
      }
      edit_sub_contractor(this.info)
        .then(res => {
          console.log(res);
          if (res.status) {
            this.$message.success("更新成功");
            this.$emit("done", {});
            this.visible = false;
          } else {
            this.$message.error("更新失敗");
          }
        })
        .catch(err => {
          this.$message.error("更新失敗");
        });
    }
  }
};
</script>

<style>
</style>