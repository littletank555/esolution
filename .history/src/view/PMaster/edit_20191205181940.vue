<template>
  <a-modal
    title="PMaster Info"
    :footer="null"
    v-model="visible"
    :afterClose="onCloseModal"
    width="1200px"
  >
    <div class="new-pmaster-modal">
      <a-row>
        <a-col span="11">
          <p class="item">
            <span class="label">工程單編號</span>
            <a-input disabled="true" v-model="info.p_no"></a-input>
          </p>
          <p class="item">
            <span class="label">排序</span>
            <a-input v-model="info.sort" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程地址短寫</span>
            <a-input v-model="info.pshort" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程地點</span>
            <a-input v-model="info.pl" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶</span>
            <a-input v-model="this.info.ccn" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">負責同事</span>
            <a-input v-model="this.info.sales_code" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">SITE location</span>
            <a-input v-model="this.info.jca" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">BILL TO</span>
            <a-input v-model="this.info.bt" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶聯絡電話</span>
            <a-input v-model="this.info.ct" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶傳真號碼</span>
            <a-input v-model="this.info.cf" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶電郵</span>
            <a-input v-model="this.info.ce" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶聯絡人</span>
            <a-input v-model="this.info.ccp" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">工程標題</span>
            <a-input v-model="info.pt"></a-input>
          </p>
          <p class="item">
            <span class="label">被邀請報價日期</span>
            <a-date-picker format="DD/MM/YYYY" v-model="info.in_price_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">截標日期</span>
            <a-date-picker format="DD/MM/YYYY" v-model="info.end_bid_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">截標時間</span>
            <!-- <a-input v-model="info.end_bid_time"></a-input> -->
            <a-time-picker style="width:100%" v-model="end_bid_time" format="HH:mm" />
          </p>
          <p class="item">
            <span class="label">交標日期</span>
            <a-date-picker format="DD/MM/YYYY" v-model="info.send_bid_date"></a-date-picker>
          </p>
        </a-col>

        <a-col span="11" offset="1">
          <p class="item">
            <span class="label">交標方法</span>
            <!-- <a-input v-model="info.send_bid_way"></a-input> -->
            <a-select v-model="info.send_bid_way">
              <a-select-option
                v-for="(item,i) in option"
                :value="item.value"
                :key="i"
              >{{item.label}}</a-select-option>
            </a-select>
          </p>
          <p class="item">
            <span class="label">出標價錢</span>
            <a-input v-model="info.out_price"></a-input>
          </p>
          <p class="item">
            <span class="label">是否中標</span>
            <span style="width:100%;text-align:left">
              <a-radio-group v-model="info.is_bidding" @change="onBid">
                <a-radio :value="'1'">是</a-radio>
                <a-radio :value="'0'">否</a-radio>
              </a-radio-group>
            </span>
          </p>
          <p class="item">
            <span class="label">接收中標日期</span>
            <a-date-picker format="DD/MM/YYYY" v-model="info.re_bidding_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">中標價錢</span>
            <a-input v-model="info.biding_price"></a-input>
          </p>
          <p class="item">
            <span class="label">報價分判資料</span>
            <a-card style="width:100%">
              <a-collapse :bordered="false" v-if="this.subinfo.length">
                <a-collapse-panel
                  v-for="item in this.subinfo"
                  :key="item.itemkey"
                  :header="'報價分判'+item.itemkey"
                >
                  <a-col :span="24">
                    <p style="margin:0;text-align:right">
                      <a-popconfirm
                        title="Are you sure delete this item?"
                        @confirm="onDelete(item)"
                        okText="Yes"
                        cancelText="No"
                      >
                        <a-icon type="delete" />
                      </a-popconfirm>
                    </p>
                    <a-col :span="24">
                      <span>報價分判名稱</span>
                      <a-input v-model="item.sub_price_name" />
                    </a-col>
                    <a-col :span="24">
                      分判報價金額
                      <a-input v-model="item.sub_price" />
                    </a-col>
                    <a-col :span="24" style="margin-bottom:10px">
                      報價單編號或呈報日期
                      <a-input v-model="item.spn_date" />
                    </a-col>
                  </a-col>
                </a-collapse-panel>
              </a-collapse>
              <a-button type="dashed" style="width:100%;margin-top:10px;" @click="addSubInfo">
                <a-icon type="plus" />Add
              </a-button>
            </a-card>
          </p>
          <p class="item">
            <span class="label">中標分判名稱</span>
            <a-input v-model="info.sub_bid_name"></a-input>
          </p>
          <p class="item">
            <span class="label">接收中標日期</span>
            <a-date-picker format="DD/MM/YYYY" v-model="info.sub_re_bid_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">分判中標價錢</span>
            <a-input v-model="info.sub_bid_price"></a-input>
          </p>
          <p class="item">
            <span class="label">分判中標編號</span>
            <a-input v-model="info.sub_bid_number"></a-input>
          </p>
          <p class="item">
            <span class="label">開工日期</span>
            <a-date-picker format="DD/MM/YYYY" v-model="info.start_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">完工日期</span>
            <a-date-picker format="DD/MM/YYYY" v-model="info.end_date"></a-date-picker>
          </p>
          <p class="item">
            <span class="label">是否需要小型工程</span>
            <span style="width:100%;text-align:left">
              <a-radio-group v-model="info.min_project">
                <a-radio :value="'1'">是</a-radio>
                <a-radio :value="'0'">否</a-radio>
              </a-radio-group>
            </span>
          </p>
          <p class="item">
            <span class="label">申報記錄BW編號</span>
            <a-input v-model="info.declare_number"></a-input>
          </p>

          <p class="item">
            <span class="label">投標書付款條款</span>
            <a-input v-model="info.regulation"></a-input>
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
import { update_pmaster } from "@/api/pmaster.js";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      info: {},
      subinfo: [],
      itemkey: 0,
      end_bid_time: null,
      option: [
        { value: "", label: "-" },
        { value: "不報不需回", label: "不報不需回" },
        { value: "不報已回", label: "不報已回" },
        { value: "過期未報", label: "過期未報" },
        { value: "Fax", label: "Fax" },
        { value: "Email", label: "Email" },
        { value: "Post", label: "Post" },
        { value: "親身", label: "親身" },
        { value: "速遞", label: "速遞" },
        { value: "Online", label: "Online" },
        { value: "WSAPP", label: "WSAPP" }
      ]
    };
  },
  created() {},
  methods: {
    moment,
    show(info) {
      // debugger;
      this.info = info;
      this.info.in_price_date = getDate(this.info.in_price_date);
      this.info.end_bid_date = getDate(this.info.end_bid_date);
      this.info.send_bid_date = getDate(this.info.send_bid_date);
      this.info.re_bidding_date = getDate(this.info.re_bidding_date);
      this.info.sub_re_bid_date = getDate(this.info.sub_re_bid_date);
      this.info.start_date = getDate(this.info.start_date);
      this.info.end_date = getDate(this.info.end_date);
      this.end_bid_time = moment(this.info.end_bid_time, "hh:mm");
      this.subinfo = [];
      let spn = this.info.sub_price_name.split("\n");
      let sp = this.info.sub_price.split("\n");
      let sd = this.info.spn_date.split("\n");
      if (spn.length > 0) {
        for (let i = 0; i < spn.length; i++) {
          this.subinfo.push({
            sub_price_name: spn[i],
            sub_price: sp[i],
            spn_date: sd[i],
            itemkey: i + 1
          });
        }
      }

      // this.itemkey = spn.length;
      this.visible = true;
    },
    onBid(e) {
      if (e.target.value == 1) {
        this.info.sub_bid_number = "SA" + this.info.sort;
      } else {
        this.info.sub_bid_number = "";
      }
    },
    onClose() {
      this.visible = false;
    },
    onCloseModal() {
      this.$emit("done", {});
    },
    onSelect(e) {},
    addSubInfo() {
      this.itemkey++;
      this.subinfo.push({
        sub_price_name: "",
        sub_price: "",
        spn_date: "",
        itemkey: this.itemkey
      });
    },
    onDelete(e) {
      this.subinfo = this.subinfo.filter(item => item.itemkey != e.itemkey);
    },
    onSubmint() {
      this.info.end_bid_time = this.end_bid_time;
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          this.info[key];
          if (typeof this.info[key] == "object") {
            if (key == "end_bid_time") {
              this.info[key] = this.info[key]._isValid
                ? this.info[key].format("HH:mm")
                : "";
            } else {
              this.info[key] = this.info[key]._isValid
                ? this.info[key].format("YYYY-MM-DD")
                : "";
            }
          }
        }
      }
      this.info.spn_date = "";
      this.info.sub_price_name = "";
      this.info.sub_price = "";
      this.subinfo.forEach((element, i) => {
        if (i == 0) {
          this.info.sub_price_name =
            this.info.sub_price_name + element.sub_price_name;
          this.info.sub_price = this.info.sub_price + element.sub_price;
          this.info.spn_date = this.info.spn_date + element.spn_date;
        } else {
          this.info.sub_price_name =
            this.info.sub_price_name + "\n" + element.sub_price_name;
          this.info.sub_price = this.info.sub_price + "\n" + element.sub_price;
          this.info.spn_date = this.info.spn_date + "\n" + element.spn_date;
        }
      });
      this.onSubmiting = true;
      update_pmaster(this.info)
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
  watch: {}
};
</script>
<style lang="scss">
.new-pmaster-modal {
  .item {
    display: flex;
    align-items: center;

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

