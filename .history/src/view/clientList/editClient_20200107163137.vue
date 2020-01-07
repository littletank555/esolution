<template>
  <a-drawer
    title="Update Client"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="500px"
  >
    <p>
      <span>客戶序號 (CSN) ClientSerial Number</span>
      <a-input v-model="client.csn"></a-input>
    </p>
    <p>
      <span>客戶中文名稱 (CCN) Client Chinese Name</span>
      <a-input v-model="client.ccn"></a-input>
    </p>
    <p>
      <span>客戶英文名稱 (CEN) Client English Name</span>
      <a-input v-model="client.cen"></a-input>
    </p>
    <p>
      <span>發票送呈地址 (BT) BILL TO</span>
      <a-input v-model="client.bt"></a-input>
    </p>
    <p>
      <span>客戶聯絡電話 (CT) Client Telephone</span>
      <a-input v-model="client.ct"></a-input>
    </p>
    <p>
      <span>客戶組別</span>
      <!-- <a-input v-model="client.c_group"></a-input> -->
      <!-- <a-auto-complete
        style="width: 100%"
        @change="handleChange"
        :filterOption="filterOption"
        :value="client.c_group"
        placeholder="input for select"
      >
        <template slot="dataSource">
          <a-select-option
            v-for="(item,i) in client_group"
            :key="i"
            :value="item.c_group"
          >{{item.c_group}}</a-select-option>
        </template>
      </a-auto-complete>-->
      <a-auto-complete
        :dataSource="client_group"
        :value="client.c_group"
        style="width: 100%"
        placeholder="input for select"
        :filterOption="filterOption"
        @select="onClientSelect"
      />
    </p>
    <p style="text-align:right">
      <a-button type="primary" :loading="onSubmiting" @click="onUpdate">Update</a-button>
    </p>
  </a-drawer>
</template>
<script>
import { get_clients, update_client } from "@/api/client.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      client: {},
      client_group: []
    };
  },
  created() {
    this.get_client_group();
  },
  methods: {
    show(client) {
      this.client = JSON.parse(JSON.stringify(client));
      this.onSubmiting = false;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    get_client_group() {
      get_clients()
        .then(res => {
          // this.client_group = res.list;
          let list = new Set();
          res.list.forEach(element => {
            if (!item.c_group == "") {
              list.add(item.c_group);
            }
          });
          this.client_group = Array.from(list);
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
    handleChange(value) {
      this.client.c_group = value;
    },
    onUpdate() {
      if (this.client.ccn == "" || this.client.ccn.trim() == "") {
        this.$message.error("Please fill client name");
        return;
      }
      // if (this.client.cen == "" || this.client.cen.trim() == "") {
      //   this.$message.error("Please fill client name");
      //   return;
      // }
      this.onSubmiting = true;
      this.client.cid = this.client.client_id;
      console.log(this.client);
      update_client(this.client)
        .then(res => {
          console.log(res);
          if (res.status) {
            this.$message.success("更新成功");
            this.visible = false;
            this.$emit("done", {});
          } else {
            this.$message.error("更新失敗");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("更新失敗");
        });
    }
  }
};
</script>
