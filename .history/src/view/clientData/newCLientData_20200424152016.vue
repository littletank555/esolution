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
      <a-card style="500px" title="公司資料">
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
        <p class="item">
          <span class="label">公司地址</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">聯繫人</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">電話</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">傳真</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">郵箱</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
      </a-card>
      <a-card style="500px" title="公司資料">
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
        <p class="item">
          <span class="label">公司地址</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">聯繫人</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">電話</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">傳真</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">郵箱</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
      </a-card>
      <a-card style="500px" title="公司資料">
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
        <p class="item">
          <span class="label">公司地址</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">聯繫人</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">電話</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">傳真</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
        <p class="item">
          <span class="label">郵箱</span>
          <a-input v-model="clients.bt"></a-input>
        </p>
      </a-card>

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
      min-width: 90px;
    }
  }
}
</style>

