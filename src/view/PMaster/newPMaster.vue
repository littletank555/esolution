<template>
  <a-drawer
    title="Add PMaster Record"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    width="1200px"
  >
    <div class="new-pmaster-modal">
      <a-row>
        <a-col span="11">
          <p class="item">
            <span class="label">工程地點</span>
            <a-auto-complete
              style="width: 100%"
              @change="onlsnSelect"
              :filterOption="filterOption"
              :value="info.pl"
              placeholder="input for select"
            >
              <template slot="dataSource">
                <a-select-option
                  v-for="(item,i) in client_data_list"
                  :key="i"
                  :value="item.lc"
                >{{item.lc}}</a-select-option>
              </template>
            </a-auto-complete>
          </p>
          <p class="item">
            <span class="label">客戶編碼</span>
            <a-input v-model="this.select_client_data.csn" disabled="true" />
          </p>
          <p class="item">
            <span class="label">排序</span>
            <a-input v-model="info.sort"></a-input>
          </p>
          <p class="item">
            <span class="label">工程標號</span>
            <a-input v-model="project_no"></a-input>
          </p>
          <p class="item">
            <span class="label">工程地址短寫</span>
            <a-input v-model="this.select_client_data.project_area" disabled="true"></a-input>
          </p>

          <p class="item">
            <span class="label">客戶</span>
            <a-input v-model="this.select_client_data.ccn" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">負責同事</span>
            <a-input v-model="this.select_client_data.sales_code" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">SITE location</span>
            <a-input v-model="this.select_client_data.jca" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">BILL TO</span>
            <a-input v-model="this.select_client_data.bt" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶聯絡電話</span>
            <a-input v-model="this.select_client_data.ct" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶傳真號碼</span>
            <a-input v-model="this.select_client_data.cf" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶電郵</span>
            <a-input v-model="this.select_client_data.ce" disabled="true"></a-input>
          </p>
          <p class="item">
            <span class="label">客戶聯絡人</span>
            <a-input v-model="this.select_client_data.ccp" disabled="true"></a-input>
          </p>

          <!-- <p class="item">
            <span class="label">交標日期</span>
            <a-date-picker format="DD/MM/YYYY" v-model="info.send_bid_date"></a-date-picker>
          </p>-->
        </a-col>
        <a-col span="11" offset="1">
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
            <a-time-picker style="width:100%" v-model="info.end_bid_time" format="HH:mm" />
          </p>
          <!-- <p class="item">
            <span class="label">交標方法</span>
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
              <a-radio-group v-model="info.is_bidding">
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
          </p>-->
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
          <!-- <p class="item">
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
          </p>-->
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
import moment from "moment";
import { get_client_data } from "@/api/client_data";
import { new_pmaster } from "@/api/pmaster";
export default {
  data() {
    return {
      visible: false,
      onSubmiting: false,
      info: {
        sort: "",
        p_no: "",
        pl: "",
        pt: "",
        pshort: "",
        in_price_date: "",
        end_bid_date: "",
        end_bid_time: "",
        send_bid_date: "",
        send_bid_way: "",
        out_price: "",
        is_bidding: "",
        re_bidding_date: "",
        biding_price: "",
        sub_price_name: "",
        sub_price: "",
        spn_date: "",
        sub_bid_name: "",
        sub_re_bid_date: "",
        sub_bid_price: "",
        sub_bid_number: "",
        start_date: "",
        end_date: "",
        min_project: "",
        declare_number: "",
        regulation: ""
      },
      client_data_list: [],
      select_client_data: {}, //選中的工程單對應的client data
      itemkey: 0,
      subinfo: [],
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
  created() {
    this.get_client();
  },
  computed: {
    project_no: function() {
      let no_string =
        "19-" +
        this.select_client_data.csn +
        "-" +
        this.info.sort +
        this.select_client_data.sales_code;
      if (no_string.indexOf("undefined") > -1) {
        return "";
      }
      return no_string;
    }
  },
  methods: {
    show() {
      // this.select_client_data = {};
      // this.subinfo = [];
      // for (const key in this.info) {
      //   if (key != "sort") {
      //     if (this.info.hasOwnProperty(key)) {
      //       this.info[key] = "";
      //     }
      //   }
      // }
      this.visible = true;
      this.onSubmiting = false;
    },
    moment,
    onClear() {
      this.select_client_data = {};
      this.subinfo = [];
      this.itemkey = 0;
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          this.info[key] = "";
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
    onlsnSelect(key) {
      this.client_data_list.some(item => {
        if (item.lc == key) {
          this.select_client_data = item;
          // this.info.client_data_id = item.client_data_id;
          this.info.pl = item.lc;
          this.info.pshort = item.project_area;
          return true;
        }
      });
    },
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
    onSubmit() {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
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
      if (this.info.lc == "") {
        this.$message.error("請選擇工程地點");
        return;
      }
      this.info.p_no = this.project_no;
      this.onSubmiting = true;
      if (this.itemkey != 0) {
        this.subinfo.forEach((element, i) => {
          if (i == 0) {
            this.info.sub_price_name =
              this.info.sub_price_name + element.sub_price_name;
            this.info.sub_price = this.info.sub_price + element.sub_price;
            this.info.spn_date = this.info.spn_date + element.spn_date;
          } else {
            this.info.sub_price_name =
              this.info.sub_price_name + "\n" + element.sub_price_name;
            this.info.sub_price =
              this.info.sub_price + "\n" + element.sub_price;
            this.info.spn_date = this.info.spn_date + "\n" + element.spn_date;
          }
        });
      } else {
        this.info.sub_price_name = "";
        this.info.sub_price = "";
        this.info.spn_date = "";
      }
      console.log(this.info);
      new_pmaster(this.info)
        .then(res => {
          console.log(res.status);
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
    },
    get_client() {
      get_client_data()
        .then(res => {
          this.client_data_list = res.list;
        })
        .catch(err => {});
    }
  }
};
</script>
<style lang="scss">
.new-pmaster-modal {
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

