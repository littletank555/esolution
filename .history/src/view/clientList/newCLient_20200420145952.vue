<template>
  <a-drawer
    title="新增客戶資料"
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
    <!-- <p>
      <span>客戶組別</span>
      <a-select v-model="client.c_group" style="width:100%">
        <a-select-option v-for="item in client_group" :value="item" :key="item">{{item}}</a-select-option>
      </a-select>
    </p>-->
    <p>
      <span>客戶組別</span>
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
      <a-button type="primary" @click="onClear">清除</a-button>
      <a-button type="primary" :loading="onSubmiting" @click="onSubmit">提交</a-button>
    </p>
  </a-drawer>
</template>
<script>
import { create_client } from "@/api/client.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      client: {
        ccn: "",
        cen: "",
        bt: "",
        contact: "",
        ct: "",
        ce: "",
        cf: "",
        c_group: ""
      },
      client_group: [] //客戶組別
    };
  },
  methods: {
    show(group) {
      this.client_group = [];
      let list = new Set();
      group.forEach(item => {
        if (!item.c_group == "") {
          list.add(item.c_group);
        }
      });
      this.client_group = Array.from(list);
      // for (const key in this.client) {
      //   if (this.client.hasOwnProperty(key)) {
      //     this.client[key] = "";
      //   }
      // }
      this.onSubmiting = false;
      this.visible = true;
    },
    onClear() {
      for (const key in this.client) {
        if (this.client.hasOwnProperty(key)) {
          this.client[key] = "";
        }
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
    onClientSelect(value) {
      this.client.c_group = value;
    },
    onSubmit() {
      if (this.client.ccn == "" || this.client.ccn.trim() == "") {
        this.$message.error("Please fill client name");
        return;
      }
      this.onSubmiting = true;
      create_client(this.client)
        .then(res => {
          if (res.status) {
            this.$message.success("成功添加客戶");
            this.visible = false;
            this.$emit("done", {});
          } else {
            this.$message.error("添加失敗");
          }
        })
        .catch(err => {
          this.$message.error("添加失敗");
        });
    }
  }
};
</script>
