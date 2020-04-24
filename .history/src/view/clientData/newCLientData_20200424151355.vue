<template>
  <a-drawer
    title="新增客戶資料"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="600px"
  >
    <div class="new_client_data_container">
      <a-card style="500px">
        <p class="item">
          <span class="label">選擇客戶</span>
          <a-auto-complete
            @change="handleChange"
            :filterOption="filterOption"
            :value="client_data.csn"
            placeholder="input for select"
          >
            <template slot="dataSource">
              <a-select-option
                v-for="(item,i) in clients"
                :key="i"
                :value="item.csn"
              >{{item.csn+'/'+item.ccn}}</a-select-option>
            </template>
          </a-auto-complete>
        </p>
      </a-card>

      <p>
        <span>施工地點中文名稱 (LC) Location Chinese</span>
        <a-input v-model="client_data.lc"></a-input>
      </p>

      <p>
        <span>施工地點英文名稱 (LE) Location English</span>
        <a-input v-model="client_data.le"></a-input>
      </p>
      <p>
        <span>地點序號 (LSN) Location Serial Numbe</span>
        <a-input v-model="client_data.lsn"></a-input>
      </p>
      <p>
        <span>銷售人員 英文簡稱 Sales Code</span>
        <a-input v-model="client_data.sales_code"></a-input>
      </p>
      <p>
        <span>工程區域</span>
        <a-input v-model="client_data.project_area"></a-input>
      </p>
      <p>
        <span>工程中文地址 (JCA) Job Chinese Address</span>
        <a-input v-model="client_data.jca"></a-input>
      </p>
      <p>
        <span>發票送呈地址 (BT) BILL TO</span>
        <a-input v-model="client_data.bt"></a-input>
      </p>
      <p>
        <span>客戶聯絡電話 (CT) Client Telephone</span>
        <a-input v-model="client_data.ct"></a-input>
      </p>
      <p>
        <span>客戶傳真號碼 (CF) Client FAX</span>
        <a-input v-model="client_data.cf"></a-input>
      </p>
      <p>
        <span>客戶電郵 (CE) Client Email</span>
        <a-input v-model="client_data.ce"></a-input>
      </p>
      <p>
        <span>客戶聯絡人 (CCP) Client Contact Person</span>
        <a-input v-model="client_data.ccp"></a-input>
      </p>

      <p style="text-align:right">
        <a-button type="primary" @click="onClear">Clear</a-button>
        <a-button type="primary" :loading="onSubmiting" @click="onSubmit">Submit</a-button>
      </p>
    </div>
  </a-drawer>
</template>
<script>
import { get_clients } from "@/api/client.js";
import { new_client_data } from "@/api/client_data.js";
import { validEmail } from "@/utils/validate.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      clients: [],
      client_data: {
        ccp: "",
        ce: "",
        cf: "",
        ct: "",
        bt: "",
        jca: "",
        project_area: "",
        sales_code: "",
        lsn: "",
        le: "",
        lc: "",
        csn: ""
      }
    };
  },
  created() {
    this.get_client_list();
  },
  methods: {
    onClientSelect(value) {},
    handleChange(value) {
      this.client_data.csn = value;
    },
    show(group) {
      this.onSubmiting = false;
      this.visible = true;
    },
    onClear() {
      for (const key in this.client_data) {
        if (this.client_data.hasOwnProperty(key)) {
          this.client_data[key] = "";
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
    get_client_list() {
      get_clients()
        .then(res => {
          this.clients = res.list;
          console.log("clients", this.clients);
        })
        .catch(err => {});
    },
    // 提交新增處理函數
    onSubmit() {
      if (this.client_data.csn == "" || this.client_data.csn.trim() == "") {
        this.$message.error("請選擇客戶");
        return;
      }
      if (this.client_data.lc == "" && this.client_data.le == "") {
        this.$message.error("請填寫施工地點");
        return;
      }
      this.onSubmiting = true;
      new_client_data(this.client_data)
        .then(res => {
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
    }
  }
};
</script>
<style lang="scss">
.new_client_data_container {
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label {
      min-width: 160px;
    }
  }
}
</style>

