<template>
  <a-modal v-model="visible" :footer="null" title="報標文件處理流程表" width="1000px">
    <div class="created_invitation">
      <a-card class="a-card">
        <p class="checkbox">
          <span class="label"></span>
          <a-checkbox
            v-model="bid.no_reply"
            @change="e => {
          bid.replied = !e;
          bid.over = !e;
          }"
          >不報標(不需回)</a-checkbox>
          <a-checkbox
            v-model="bid.replied"
            @change="e => {
          bid.no_reply = !e;
          bid.over = !e;
          }"
          >不報標(已出回條)</a-checkbox>
          <a-checkbox
            v-model="bid.over"
            @change="e => {
          bid.replied = !e;
          bid.no_reply = !e;
          }"
          >過期未報</a-checkbox>
        </p>
        <p class="checkbox">
          <span class="label"></span>
          <a-checkbox
            v-model="contract.once"
            @change="e => {
          contract.annual = !e;
          }"
          >一次性工程</a-checkbox>
          <a-checkbox
            v-model="contract.annual"
            @change="e => {
          contract.once = !e;
          }"
          >年度合約</a-checkbox>
        </p>
      </a-card>
      <a-card class="a-card">
        <p class="item">
          <span class="label">排序</span>
          <a-auto-complete
            style="width: 100%"
            @change="onSelect"
            :value="info.sort"
            :filterOption="filterOption"
            placeholder="input for select"
          >
            <template slot="dataSource">
              <a-select-option
                v-for="(item,i) in pmaster_list"
                :key="i"
                :value="item.sort"
              >{{item.sort}}</a-select-option>
            </template>
          </a-auto-complete>
        </p>
        <p class="checkbox">
          <span class="label"></span>
          <a-checkbox v-model="handed.regist">已登記及入機</a-checkbox>
        </p>
        <p class="checkbox">
          <span class="label"></span>
          <a-checkbox v-model="handed.over_mate">硬本已交銷售同事</a-checkbox>
          <a-input v-model="handed.sales_name" class="antd-input"></a-input>
          <a-checkbox v-model="handed.whatsapp">已出 Whatsapp 群組</a-checkbox>
        </p>

        <p class="item">
          <span class="label">收到日期</span>
          <a-input v-model="pmaster.in_price_date" disabled="true"></a-input>
        </p>
        <p class="item">
          <span class="label">報價/工程-編號</span>
          <a-input v-model="pmaster.p_no" disabled="true"></a-input>
        </p>
        <p class="item">
          <span class="label">客戶</span>
          <a-input v-model="pmaster.ccn" disabled="true"></a-input>
        </p>
        <p class="item">
          <span class="label">工程地點</span>
          <a-input v-model="pmaster.pl" disabled="true"></a-input>
        </p>
        <p class="item">
          <span class="label">工程主旨</span>
          <a-input v-model="pmaster.pt" disabled="true"></a-input>
        </p>
      </a-card>
      <a-card class="a-card">
        <p style="display: flex;">
          <span style="min-width: 170px;">邀請判頭報價：</span>
          <a-checkbox v-model="invitation.send">已發送</a-checkbox>
          <a-input v-model="invitation.detail" class="antd-input"></a-input>
        </p>
        <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false">
          <template slot="sub_name" slot-scope="text,record">
            <!-- <a-input v-model="record.sub_name"></a-input> -->

            <a-select>
              <a-select-option></a-select-option>
            </a-select>
          </template>
          <template slot="price_back" slot-scope="text,record">
            <a-checkbox v-model="record.price_back">已回</a-checkbox>
          </template>
          <template slot="detail1" slot-scope="text,record">
            <a-input v-model="record.detail1"></a-input>
          </template>
          <template slot="detail2" slot-scope="text,record">
            <a-input v-model="record.detail2"></a-input>
          </template>
          <template slot="is_bid" slot-scope="text,record">
            <a-checkbox v-model="record.is_bid">中標分判</a-checkbox>
          </template>
          <template slot="footer" slot-scope>
            <p style="text-align:right">
              <a-button type="primary" @click="AddColumns">Add</a-button>
            </p>
          </template>
        </a-table>
      </a-card>
      <a-card class="a-card">
        <p class="checkbox">
          <span class="label"></span>
          <a-checkbox v-model="send.bid_notice">「合約授予通知」</a-checkbox>
          <a-checkbox v-model="send.finished">出空白「完工紙」</a-checkbox>
          <a-checkbox v-model="send.format_finished">出指明格式完工紙</a-checkbox>
        </p>
        <p class="checkbox">
          <span class="label"></span>
          <a-checkbox v-model="sign.sales">銷售簽署</a-checkbox>
          <a-checkbox v-model="sign.boss">老闆簽署</a-checkbox>
          <a-checkbox v-model="sign.send_doc">已發送「合約授予通知」及「空白完工紙」予中標分判</a-checkbox>
        </p>
        <p class="checkbox">
          <span class="label"></span>
          <a-checkbox v-model="sign.allfile">齊文件上單</a-checkbox>
        </p>
        <p class="item">
          <span class="label">開工日期</span>
          <a-date-picker format="DD-MM-YYYY" v-model="info.start_date"></a-date-picker>
        </p>
        <p class="item">
          <span class="label">完工日期</span>
          <a-date-picker format="DD-MM-YYYY" v-model="info.end_date"></a-date-picker>
        </p>
        <p class="item">
          <span class="label">BD呈報編號</span>
          <a-input v-model="info.BDno"></a-input>
        </p>
      </a-card>
      <a-card class="a-card">
        <p class="item">
          <span class="label">截標日期</span>
          <a-input v-model="pmaster.end_bid_date" disabled="true"></a-input>
        </p>
        <p class="item">
          <span class="label">截標時間</span>
          <a-input v-model="pmaster.end_bid_time" disabled="true"></a-input>
        </p>
        <p class="item">
          <span class="label">遞交日期</span>
          <a-date-picker format="DD-MM-YYYY" v-model="info.submit_date"></a-date-picker>
        </p>
        <p class="item">
          <span class="label">遞交方式</span>
          <a-select v-model="info.submit_way">
            <a-select-option value=" ">-</a-select-option>
            <a-select-option value="EMAIL">EMAIL</a-select-option>
            <a-select-option value="FAX">FAX</a-select-option>
            <a-select-option value="ONLINE">ONLINE</a-select-option>
            <a-select-option value="郵寄">郵寄</a-select-option>
            <a-select-option value="速遞">速遞</a-select-option>
            <a-select-option value="親身">親身</a-select-option>
            <a-select-option value="WASPP">WASPP</a-select-option>
            <a-select-option value="FAX+電郵">FAX+電郵</a-select-option>
          </a-select>
        </p>
        <p class="checkbox">
          <span class="label"></span>
          <a-checkbox v-model="finish.in_machine">已入機</a-checkbox>
          <a-checkbox v-model="finish.submit">已遞交</a-checkbox>
          <a-checkbox v-model="finish.mate_filing">已交同事FILING</a-checkbox>
          <a-checkbox v-model="finish.filing">已FILING</a-checkbox>
        </p>
      </a-card>

      <p style="text-align:right;margin-top:10px">
        <a :href="pdf_link" target="_blank" ref="downloadPdf" hidden></a>
        <a :href="file_link" ref="download" hidden>下載</a>
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">
              <a-icon type="file" />Word
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="file" />Pdf
            </a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px" type="primary" :disabled="enableExportBtn">
            export
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </p>
    </div>
  </a-modal>
</template>

<script>
import { created_BQD_form } from "@/api/form.js";
import { created_BQD_pdf } from "@/api/pdf.js";
import { get_sub_contractor } from "@/api/pmaster.js";
const columns = [
  { title: "", dataIndex: "sub", key: "1" },
  {
    title: "判頭",
    dataIndex: "sub_name",
    key: "2",
    scopedSlots: { customRender: "sub_name" }
  },
  {
    title: "是否回價",
    dataIndex: "price_back",
    key: "3",
    scopedSlots: { customRender: "price_back" }
  },
  {
    title: "",
    dataIndex: "detail1",
    key: "4",
    scopedSlots: { customRender: "detail1" }
  },
  {
    title: "",
    dataIndex: "detail2",
    key: "5",
    scopedSlots: { customRender: "detail2" }
  },
  {
    title: "是否中標",
    dataIndex: "is_bid",
    key: "6",
    scopedSlots: { customRender: "is_bid" }
  }
];
export default {
  data() {
    return {
      info: {
        sort: "",
        start_date: "",
        end_date: "",
        BDno: "",
        submit_date: ""
      },
      pmaster: {},
      pmaster_list: [],
      created_form_loading: false,
      visible: false,
      file_link: "",
      pdf_link: "",
      bid: { no_reply: true, replied: false, over: false },
      contract: { once: true, annual: false },
      handed: {
        whatsapp: false,
        regist: false,
        over_mate: false,
        sales_name: ""
      },
      invitation: { send: false, detail: "" },
      finish: {
        in_machine: false,
        submit: false,
        mate_filing: false,
        filing: false
      },
      send: {
        bid_notice: false,
        finished: false,
        format_finished: false
      },
      sign: { sales: false, boss: false, send_doc: false, allfile: false },
      columns: columns,
      subs: 1,
      contractor: [],
      dataSource: [
        {
          sub: 1,
          sub_name: "",
          price_back: false,
          detail1: "",
          detail2: "",
          is_bid: false
        }
      ]
    };
  },
  created() {
    this.get_contractor();
  },
  methods: {
    get_contractor() {
      get_sub_contractor()
        .then(res => {
          let list = new Set();
          res.list.forEach(element => {
            list.add(element.contractor_name);
          });
          this.contractor = Array.from(list);
        })
        .catch(err => {});
    },
    show(list) {
      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          this.info[key] = "";
        }
      }
      for (const key in this.pmaster) {
        if (this.pmaster.hasOwnProperty(key)) {
          this.pmaster[key] = "";
        }
      }
      this.subs = 1;
      this.dataSource = [
        {
          sub: 1,
          sub_name: "",
          price_back: false,
          detail1: "",
          detail2: "",
          is_bid: false
        }
      ];
      this.bid = { no_reply: true, replied: false, over: false };
      this.contract = { once: true, annual: false };
      this.handed = {
        whatsapp: false,
        regist: false,
        over_mate: false,
        sales_name: ""
      };
      this.invitation = { send: false, detail: "" };
      this.finish = {
        in_machine: false,
        submit: false,
        mate_filing: false,
        filing: false
      };
      this.send = {
        bid_notice: false,
        finished: false,
        format_finished: false
      };
      this.sign = {
        sales: false,
        boss: false,
        send_doc: false,
        allfile: false
      };
      this.pmaster_list = list;
      this.visible = true;
    },
    onSelect(e) {
      this.info.sort = e;
      this.pmaster_list.some(item => {
        if (item.sort == e) {
          this.pmaster = item;
          this.pmaster = JSON.parse(JSON.stringify(item));
          return true;
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    AddColumns() {
      this.subs++;
      if (this.subs >= 7) {
        this.$message.error("添加失敗,最多只能添加6行！");
      } else {
        this.dataSource.push({
          sub: this.subs,
          sub_name: "",
          price_back: false,
          detail1: "",
          detail2: "",
          is_bid: false
        });
      }
    },
    handleMenuClick(e) {
      let values = {};
      for (const key in this.info) {
        let date = "";
        if (typeof this.info[key] == "object") {
          date = this.info[key]._isValid
            ? this.info[key].format("DD/MM/YYYY")
            : "";
          values[key] = date;
          continue;
        }
        values[key] = this.info[key];
      }
      values.subs = JSON.stringify(this.dataSource);
      values.bid = JSON.stringify(this.bid);
      values.handed = JSON.stringify(this.handed);
      values.contract = JSON.stringify(this.contract);
      values.invitation = JSON.stringify(this.invitation);
      values.finish = JSON.stringify(this.finish);
      values.send = JSON.stringify(this.send);
      values.sign = JSON.stringify(this.sign);
      if (e.key == 1) {
        created_BQD_form(values)
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      } else if (e.key == 2) {
        created_BQD_pdf(values)
          .then(res => {
            this.pdf_link = res.link;
            this.$nextTick(function() {
              this.$refs.downloadPdf.click();
            });
          })
          .catch(err => {});
      }
    }
  },
  computed: {
    enableExportBtn: function() {
      return this.info.sort == "";
    }
  }
};
</script>

<style lang="scss">
.created_invitation {
  .a-card {
    margin-bottom: 15px;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        min-width: 170px;
      }
      .ant-calendar-picker {
        width: 100%;
      }
    }
  }
  .checkbox {
    margin-left: 170px;
  }
  .antd-input {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0px;
    width: 300px;
  }
  .ant-select {
    width: 100%;
  }
}
</style>