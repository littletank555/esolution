<template>
  <a-drawer
    title="修改客戶資料"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="500px"
  >
    <p>
      <span>客戶中文名稱</span>
      <a-input v-model="client.ccn"></a-input>
    </p>
    <p>
      <span>客戶英文名稱</span>
      <a-input v-model="client.cen"></a-input>
    </p>
    <p>
      <span>總公司地址</span>
      <a-input v-model="client.bt"></a-input>
    </p>
    <p>
      <span>聯絡人</span>
      <a-input v-model="client.contact"></a-input>
    </p>
    <p>
      <span>聯絡電話</span>
      <a-input v-model="client.ct"></a-input>
    </p>
    <p>
      <span>電郵</span>
      <a-input v-model="client.ce"></a-input>
    </p>
    <p>
      <span>傳真</span>
      <a-input v-model="client.cf"></a-input>
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
        @change="onClientSelect"
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
          let list = new Set();
          res.list.forEach(item => {
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
    onClientSelect(value) {
      this.client.c_group = value;
    },
    onUpdate() {
      if (this.client.ccn == "" || this.client.ccn.trim() == "") {
        this.$message.error("Please fill client name");
        return;
      }
      this.onSubmiting = true;
      this.client.cid = this.client.client_id;
      update_client(this.client)
        .then(res => {
          if (res.status) {
            this.get_client_group();
            this.$message.success("更新成功");
            this.visible = false;
            this.$emit("done", {});
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
