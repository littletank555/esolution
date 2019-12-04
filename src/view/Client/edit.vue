<template>
  <a-modal title="KE" :footer="null" v-model="visible" width="1200px">
    <div class="new-ke-modal">
      <a-row>
        <a-col span="11">
          <p class="item">
            <span class="label">选择排序序號/Select Sort</span>
            <!-- <a-select v-model="info.sort" @change="onClientSelect">
          <a-select-option v-for="(item,i) in ke_list" :key="i" :value="item.sort">{{item.sort}}</a-select-option>
            </a-select>-->
            <a-input v-model="info.sort" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">中標資料編號</span>
            <a-input v-model="info.ke_num"></a-input>
          </p>
          <p class="item">
            <span class="label">負責同事</span>
            <a-input v-model="info.sales_code" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程單編號</span>
            <a-input v-model="info.p_no" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶</span>
            <a-input v-model="info.ccn" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程地點</span>
            <a-input v-model="info.pl" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程金額</span>
            <a-input v-model="info.biding_price" disabled="true"></a-input>
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
            <a-input v-model="info.percent" @change="onChangePercent" addonAfter="%"></a-input>
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
            <span class="label">中標分判名稱</span>
            <a-input v-model="info.sub_bid_name" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">分判中標價錢</span>
            <a-input v-model="info.sub_bid_price" disabled="true"></a-input>
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
            <span class="label">百分之注釋</span>
            <a-input v-model="info.sub_percent" @change="onChangeSubPercent" addonAfter="%"></a-input>
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
            <a-input v-model="info.sub_re_bid_date" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">分判中標通知書編號</span>
            <a-input v-model="info.sub_bid_number" disabled="true"></a-input>
          </p>
        </a-col>
      </a-row>
      <p style="text-align:right">
        <a-button type="primary" :loading="onSubmiting" @click="onSubmint">Submit</a-button>
      </p>
    </div>
  </a-modal>
</template>

<script>
import moment from "moment";
import { getDate } from "@/utils/validate.js";
import { update_ke } from "@/api/ke.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      info: {},
      receipt_price: 0,
      sign_price: 0,
      sub_sign_price: 0,
      discount: 0,
      pay_price: 0
    };
  },
  methods: {
    show(info) {
      this.info = info;
      this.info.sign_date = getDate(this.info.sign_date);
      this.info.receipt_date = getDate(this.info.receipt_date);
      this.info.sub_sign_date = getDate(this.info.sub_sign_date);
      this.info.sub_receipt_date = getDate(this.info.sub_receipt_date);
      //   this.info.sub_re_bid_date = getDate(this.info.sub_re_bid_date);
      this.sign_price = info.sign_price;
      this.sub_sign_price = info.sub_sign_price;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onSelect(e) {
      console.log(e);
    },
    onChangePercent(val) {
      this.info.sign_price = (this.info.biding_price * this.info.percent) / 100;
      this.sign_price = this.info.sign_price;
    },
    onChangeSubPercent(val) {
      this.info.sub_sign_price =
        (this.info.sub_bid_price * this.info.sub_percent) / 100;
      this.sub_sign_price = this.info.sub_sign_price;
    },
    onSubmint() {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          this.info[key];
          if (typeof this.info[key] == "object") {
            this.info[key] = this.info[key]._isValid
              ? this.info[key].format("YYYY-MM-DD")
              : "";
          }
        }
      }
      console.log(this.info);
      this.onSubmiting = true;
      update_ke(this.info)
        .then(res => {
          this.onSubmiting = false;
          if (res.status) {
            this.$message.success("更新成功");
            this.$emit("done", {});
            this.visible = false;
          } else {
            this.$message.error("更新失敗");
          }
        })
        .catch(err => {
          this.onSubmiting = false;
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
.new-ke-modal {
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