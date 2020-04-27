<template>
  <a-drawer
    title="新增施工地點資料"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="700px"
  >
    <div class="new_client_data_container">
      <a-divider style="margin-top:0px" orientation="left">公司資料</a-divider>
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
        <a-input v-model="client.bt" :disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">聯繫人</span>
        <a-input v-model="client.contact" :disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">電話</span>
        <a-input v-model="client.ct" :disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">傳真</span>
        <a-input v-model="client.cf" :disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">郵箱</span>
        <a-input v-model="client.ce" :disabled="true"></a-input>
      </p>
      <a-divider style="margin-top:0px" orientation="left">施工地點資料</a-divider>
      <p class="item">
        <span class="label">銷售人員</span>
        <a-input v-model="client_data.sales_code"></a-input>
      </p>
      <!-- <p class="item">
        <span class="label">工程區域</span>
        <a-input v-model="client_data.project_area"></a-input>
      </p>-->
      <p class="item">
        <span class="label">工程區域</span>
        <a-select v-model="client_data.project_area">
          <a-select-option v-for="(item,i) in option" :key="i" :value="item">{{item}}</a-select-option>
        </a-select>
      </p>
      <p class="item">
        <span class="label">地點序號</span>
        <a-input v-model="client_data.lsn" :disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">施工中文地址</span>
        <a-input v-model="client_data.lc"></a-input>
      </p>
      <p class="item">
        <span class="label">施工英文地址</span>
        <a-input v-model="client_data.le"></a-input>
      </p>
      <p class="item">
        <span class="label">發票地址</span>
        <a-input v-model="client_data.bill_to"></a-input>
      </p>
      <a-divider style="margin-top:0px" orientation="left">聯絡人資料</a-divider>
      <a-collapse accordion>
        <a-collapse-panel header="客戶聯絡人" key="1">
          <p class="item">
            <span class="label">姓名</span>
            <a-input v-model="contact[0].name"></a-input>
          </p>
          <p class="item">
            <span class="label">電話</span>
            <a-input v-model="contact[0].tel"></a-input>
          </p>
          <p class="item">
            <span class="label">傳真</span>
            <a-input v-model="contact[0].fax"></a-input>
          </p>
          <p class="item">
            <span class="label">郵箱</span>
            <a-input v-model="contact[0].email"></a-input>
          </p>
        </a-collapse-panel>
        <a-collapse-panel header="客戶聯絡人" key="2">
          <p class="item">
            <span class="label">姓名</span>
            <a-input v-model="contact[1].name"></a-input>
          </p>
          <p class="item">
            <span class="label">電話</span>
            <a-input v-model="contact[1].tel"></a-input>
          </p>
          <p class="item">
            <span class="label">傳真</span>
            <a-input v-model="contact[1].fax"></a-input>
          </p>
          <p class="item">
            <span class="label">郵箱</span>
            <a-input v-model="contact[1].email"></a-input>
          </p>
        </a-collapse-panel>
        <a-collapse-panel header="客戶聯絡人" key="3">
          <p class="item">
            <span class="label">姓名</span>
            <a-input v-model="contact[2].name"></a-input>
          </p>
          <p class="item">
            <span class="label">電話</span>
            <a-input v-model="contact[2].tel"></a-input>
          </p>
          <p class="item">
            <span class="label">傳真</span>
            <a-input v-model="contact[2].fax"></a-input>
          </p>
          <p class="item">
            <span class="label">郵箱</span>
            <a-input v-model="contact[2].email"></a-input>
          </p>
        </a-collapse-panel>
      </a-collapse>
      <p style="text-align:right;margin-top:15px">
        <a-button type="primary" @click="onClear">清除</a-button>
        <a-button type="primary" :loading="onSubmiting" @click="onSubmit">提交</a-button>
      </p>
    </div>
  </a-drawer>
</template>
<script>
import { get_clients } from "@/api/client.js";
import { new_client_data, get_lsn } from "@/api/client_data.js";
import { validEmail } from "@/utils/validate.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      clients: [],
      client_data: {
        bill_to: "",
        project_area: "",
        sales_code: "",
        lsn: "",
        le: "",
        lc: "",
        csn: "",
        contact: []
      },
      client: {},
      list: [],
      contact: [
        { name: "", tel: "", fax: "", email: "" },
        { name: "", tel: "", fax: "", email: "" },
        { name: "", tel: "", fax: "", email: "" }
      ],
      option: [
        "中西區",
        "東區",
        "南區",
        "灣仔區",
        "九龍城區",
        "觀塘區",
        "深水埗區",
        "黃大仙區",
        "油尖旺區",
        "離島區",
        "葵青區",
        "北區",
        "西貢區",
        "沙田區",
        "大埔區",
        "荃灣區",
        "屯門區",
        "元朗區"
      ]
    };
  },
  created() {
    this.get_client_list();
  },
  methods: {
    onClientSelect(value) {},
    handleChange(value) {
      this.client_data.csn = value;
      this.list = this.clients.filter(item => item.csn == value);
      this.client = this.list[0];
    },
    show(group) {
      this.client_data.lsn = "";
      this.get_lsn_no();
      this.onSubmiting = false;
      this.visible = true;
    },
    onClear() {
      for (const key in this.client_data) {
        if (this.client_data.hasOwnProperty(key)) {
          this.client_data[key] = "";
        }
      }
      this.client_data.contact = [];
      this.get_lsn_no();
      for (const key in this.client) {
        if (this.client.hasOwnProperty(key)) {
          this.client[key] = "";
        }
      }
      this.contact = [];
      this.contact = [
        { name: "", tel: "", fax: "", email: "" },
        { name: "", tel: "", fax: "", email: "" },
        { name: "", tel: "", fax: "", email: "" }
      ];
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
          // console.log("clients", this.clients);
        })
        .catch(err => {});
    },
    get_lsn_no() {
      get_lsn()
        .then(res => {
          this.client_data.lsn = res.list;
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
      if (this.client_data.sales_code == "") {
        this.$message.error("請填寫銷售人員");
        return;
      }
      if (this.client_data.bill_to == "") {
        this.$message.error("請填寫發票地址");
        return;
      }
      if (this.client_data.project_area == "") {
        this.$message.error("請選擇工程區域");
        return;
      }
      for (let i = 0; i < 3; i++) {
        if (
          this.contact[i].name != "" ||
          this.contact[i].tel != "" ||
          this.contact[i].fax != "" ||
          this.contact[i].email != ""
        ) {
          this.client_data.contact.push(this.contact[i]);
        }
      }
      if (this.contact[0].key == 0) {
        this.client_data.contact.push({
          name: this.client.contact,
          tel: this.client.ct,
          fax: this.client.cf,
          email: this.client.ce
        });
      }
      console.log(this.client_data);
      this.onSubmiting = true;
      new_client_data(this.client_data)
        .then(res => {
          console.log(res.list);
          if (res.status) {
            this.$message.success("成功添加");
            this.client_data.contact = [];
            this.visible = false;
            // this.$emit("done", {});
          } else {
            this.$message.error("添加失敗");
            this.client_data.contact = [];
          }
        })
        .catch(err => {
          this.$message.error("添加失敗");
          this.client_data.contact = [];
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

