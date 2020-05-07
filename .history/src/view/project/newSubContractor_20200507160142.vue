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
import { get_sub_contractor } from "@/api/pmaster.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      info: {
        contractor_id: "",
        send_date: "",
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
      console.log(this.info);
      if (info.contractor_name == "") {
      }
    }
  }
};
</script>

<style>
</style>