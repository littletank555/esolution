<template>
  <a-drawer
    title="新增報價承辦商"
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
import { get_sub_contractor } from "@/api/pmaster.js";
import { new_sub_contractor } from "@/api/project.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      info: {
        contractor_id: "",
        send_date: moment(),
        price: "",
        receipt_date: ""
      },
      contractor: []
    };
  },
  created() {},
  methods: {
    show() {
      this.get_contractor();
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
      //   if (this.info.contractor_id == "") {
      //     this.$message.error("請選擇承辦商");
      //     return;
      //   }
      //   if (this.info.send_date == "") {
      //     this.$message, error("請填寫發送日期");
      //     return;
      //   }
      //   new_sub_contractor(this.info)
      //     .then(res => {
      //       console.log(res.status);
      //       if (res.status) {
      //         this.$message.success("成功添加");
      //         this.visible = false;
      //         this.$emit("done", {});
      //       } else {
      //         this.$message.error("添加失敗");
      //       }
      //     })
      //     .catch(err => {
      //       this.$message.error("添加失敗");
      //     });
    }
  }
};
</script>

<style>
</style>