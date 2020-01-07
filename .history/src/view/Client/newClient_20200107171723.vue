<template>
  <a-drawer
    title="Add Client"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="1200px"
  >
    <div class="new_client_container">
      <a-row>
        <a-col span="11">
          <p class="item">
            <span class="label">排序序號</span>
            <a-auto-complete
              style="width: 100%"
              @change="onClientSelect"
              :value="info.sort"
              :filterOption="filterOption"
              placeholder="input for select"
            >
              <template slot="dataSource">
                <a-select-option
                  v-for="(item,i) in this.ke_list"
                  :key="i"
                  :value="item.sort"
                >{{item.sort}}</a-select-option>
              </template>
            </a-auto-complete>
          </p>
          <p class="item">
            <span class="label">中標資料編號</span>
            <a-input v-model="info.ke_num" @change="onChangeInv"></a-input>
          </p>
          <p class="item">
            <span class="label">負責同事</span>
            <a-input v-model="select_pmaster_data.sales_code" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程單編號</span>
            <a-input v-model="select_pmaster_data.p_no" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶</span>
            <a-input v-model="select_pmaster_data.ccn" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程地點</span>
            <a-input v-model="select_pmaster_data.pl" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程金額</span>
            <a-input v-model="select_pmaster_data.biding_price" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">狀態</span>
            <a-input v-model="info.status"></a-input>
          </p>
          <p class="item">
            <span class="label">發票號碼</span>
            <a-input v-model="info.inv_no"></a-input>
          </p>
          <p class="item">
            <span class="label">上單日期</span>
            <!-- <a-input v-model="info.sign_date"></a-input> -->
            <a-date-picker format="DD/MM/YYYY" v-model="info.sign_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">百分比注釋</span>
            <a-input v-model="info.percent" addonAfter="%" @change="onChangePercent"></a-input>
          </p>
          <p class="item">
            <span class="label">上單金額</span>
            <a-input v-model="sign_price"></a-input>
          </p>
          <p class="item">
            <span class="label">收款日期</span>
            <!-- <a-input v-model="info.receipt_date"></a-input> -->
            <a-date-picker format="DD/MM/YYYY" v-model="info.receipt_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">收款方式</span>
            <a-input v-model="info.receipt_way"></a-input>
          </p>
          <p class="item">
            <span class="label">收款金額</span>
            <a-input v-model="receipt_price"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶尚未支付餘額</span>
            <a-input v-model="info.client_no_pay"></a-input>
          </p>
        </a-col>
        <a-col span="11">
          <p class="item">
            <span class="label">分水嶺</span>
            <a-input v-model="info.watershed"></a-input>
          </p>
          <p class="item">
            <span class="label">中標分判名稱</span>
            <a-input v-model="select_pmaster_data.sub_bid_name" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">分判中標價錢</span>
            <a-input v-model="select_pmaster_data.sub_bid_price" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">分判上單日期</span>
            <!-- <a-input v-model="info.sub_sign_date"></a-input> -->
            <a-date-picker format="DD/MM/YYYY" v-model="info.sub_sign_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">分判發票號碼</span>
            <a-input v-model="info.sub_inv_no"></a-input>
          </p>
          <p class="item">
            <span class="label">分判上單金額</span>
            <a-input v-model="sub_sign_price"></a-input>
          </p>
          <p class="item">
            <span class="label">百分比注釋</span>
            <a-input v-model="info.sub_percent" @change="onChangeSubPercent" addonAfter="%" />
          </p>
          <p class="item">
            <span class="label">分判收款日期</span>
            <!-- <a-input v-model="info.sub_receipt_date"></a-input> -->
            <a-date-picker format="DD/MM/YYYY" v-model="info.sub_receipt_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">支付方式</span>
            <a-input v-model="info.pay_way"></a-input>
          </p>
          <p class="item">
            <span class="label">分判折扣優惠</span>
            <a-input v-model="discount"></a-input>
          </p>
          <p class="item">
            <span class="label">支付金額</span>
            <a-input v-model="pay_price"></a-input>
          </p>
          <p class="item">
            <span class="label">支付記錄編號</span>
            <a-input v-model="info.pay_record_no"></a-input>
          </p>
          <p class="item">
            <span class="label">尚未支付餘額</span>
            <a-input v-model="info.no_pay"></a-input>
          </p>
          <p class="item">
            <span class="label">分判中標日期</span>
            <a-input v-model="select_pmaster_data.sub_re_bid_date" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">分判中標通知書編號</span>
            <a-input v-model="select_pmaster_data.sub_bid_number" disabled="true"></a-input>
          </p>
        </a-col>
      </a-row>

      <p style="text-align:right">
        <a-button type="primary" @click="onClear">Clear</a-button>
        <a-button type="primary" :loading="onSubmiting" @click="onSubmit">Submit</a-button>
      </p>
    </div>
  </a-drawer>
</template>
<script>
import { get_pmasters } from "@/api/pmaster";
import { new_ke } from "@/api/ke.js";
import moment from "moment";
export default {
  data() {
    return {
      info: {
        sort: "",
        ke_num: "",
        status: "",
        inv_no: "",
        sign_date: "",
        percent: 100,
        sign_price: 0,
        receipt_date: "",
        receipt_way: "",
        receipt_price: 0,
        client_no_pay: 0,
        watershed: "",
        sub_sign_date: "",
        sub_inv_no: "",
        sub_sign_price: 0,
        sub_percent: 100,
        sub_receipt_date: "",
        pay_way: "",
        discount: 0,
        pay_price: 0,
        pay_record_no: "",
        no_pay: 0
      },
      ke_list: [],
      visible: false,
      onSubmiting: false,
      select_pmaster_data: {}, //选择sort
      receipt_price: 0,
      sign_price: 0,
      sub_sign_price: 0,
      discount: 0,
      pay_price: 0
    };
  },
  created() {
    this.get_pmaster_data();
  },
  methods: {
    show() {
      // this.ke_list = {};
      // for (const key in this.info) {
      //   if (this.info.hasOwnProperty(key)) {
      //     this.info[key] = "";
      //   }
      // }
      // for (const key in this.select_pmaster_data) {
      //   if (this.select_pmaster_data.hasOwnProperty(key)) {
      //     this.select_pmaster_data[key] = "";
      //   }
      // }
      this.visible = true;
      this.onSubmiting = false;
    },
    onClose() {
      this.visible = false;
    },
    onClear() {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          this.info[key] = "";
        }
      }
      for (const key in this.select_pmaster_data) {
        if (this.select_pmaster_data.hasOwnProperty(key)) {
          this.select_pmaster_data[key] = "";
        }
      }
      this.info.percent = 100;
      this.info.sub_percent = 100;
      this.receipt_price = 0;
      this.sign_price = 0;
      this.sub_sign_price = 0;
      this.discount = 0;
      this.pay_price = 0;
    },
    onChangePercent(val) {
      this.info.sign_price =
        (this.select_pmaster_data.biding_price * this.info.percent) / 100;
      this.sign_price = this.info.sign_price;
    },
    onChangeSubPercent(val) {
      this.info.sub_sign_price =
        (this.select_pmaster_data.sub_bid_price * this.info.sub_percent) / 100;
      this.sub_sign_price = this.info.sub_sign_price;
    },
    onChangeInv(e) {
      this.info.inv_no = this.info.inv_no + e.data;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    onClientSelect(e) {
      this.get_pmaster_data();
      this.ke_list.some(item => {
        if (item.sort == e) {
          this.select_pmaster_data = item;
          this.info.sort = item.sort;
          this.info.inv_no = "INV-" + item.sort;
          this.info.ke_num = this.info.sort;
          this.info.sign_price = (item.biding_price * this.info.percent) / 100;
          this.sign_price = (item.biding_price * this.info.percent) / 100;
          this.info.sub_sign_price =
            (item.sub_bid_price * this.info.sub_percent) / 100;
          this.sub_sign_price =
            (item.sub_bid_price * this.info.sub_percent) / 100;
          return true;
        }
      });
    },
    get_pmaster_data() {
      get_pmasters()
        .then(res => {
          this.ke_list = res.list;
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
      if (this.info.sort == "") {
        this.$message.error("請選擇中標資料編號");
        return;
      }
      this.onSubmiting = true;
      new_ke(this.info)
        .then(res => {
          if (res.sta == false) {
            this.$message.error("中標資料編號已存在");
          } else {
            if (res.status) {
              this.$message.success("成功添加");
              this.visible = false;
              this.$emit("done", {});
            } else {
              this.$message.error("添加失敗");
            }
          }
        })
        .catch(err => {
          this.$message.error("添加失敗");
        });
    }
  },
  computed: {
    client_no_pay() {
      const { sign_price, receipt_price } = this;
      return {
        sign_price,
        receipt_price
      };
    },
    no_pay() {
      const { sub_sign_price, discount, pay_price } = this;
      return {
        sub_sign_price,
        discount,
        pay_price
      };
    }
  },
  watch: {
    client_no_pay: {
      handler: function(val) {
        this.info.receipt_price = parseInt(val.receipt_price);
        this.info.client_no_pay = val.sign_price - parseInt(val.receipt_price);
      },
      deep: true
    },
    no_pay: {
      handler: function(val) {
        this.info.discount = parseInt(val.discount);
        this.info.pay_price = parseInt(val.pay_price);
        this.info.no_pay =
          val.sub_sign_price - parseInt(val.discount) - parseInt(val.pay_price);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.new_client_container {
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 50px;
    .label {
      min-width: 160px;
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