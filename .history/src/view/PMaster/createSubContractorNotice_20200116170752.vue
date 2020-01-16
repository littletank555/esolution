<template>
  <a-modal
    v-model="visible"
    :footer="null"
    title="Sub-Contractor Contract Award Notice"
    width="1000px"
  >
    <div class="created_invitation">
      <p class="item">
        <span class="label">排序序号</span>
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
      <p class="item">
        <span class="label">授予通知編號</span>
        <a-input :value="pmaster.sub_bid_number" disabled="true" />
      </p>
      <p class="item">
        <span class="label">發出時間</span>
        <a-input :value="sub_re_bid_date" disabled="true" />
      </p>
      <p class="item">
        <span class="label">發送方法</span>
        <a-select v-model="info.send_way">
          <a-select-option value=" ">-</a-select-option>
          <a-select-option value="電郵">電郵</a-select-option>
          <a-select-option value="傳真">傳真</a-select-option>
          <a-select-option value="傳真+電郵">傳真+電郵</a-select-option>
          <a-select-option value="Whatsapp">Whatsapp</a-select-option>
          <a-select-option value="郵寄">郵寄</a-select-option>
          <a-select-option value="親身">親身</a-select-option>
          <a-select-option value="速遞">速遞</a-select-option>
          <a-select-option value="ONLINE">ONLINE</a-select-option>
        </a-select>
      </p>
      <p class="item">
        <span class="label">分包商名稱</span>
        <a-input :value="pmaster.sub_bid_name" disabled="true" />
      </p>
      <p class="item">
        <span class="label">傳真號碼</span>
        <a-input v-model="info.fax" />
      </p>
      <p class="item">
        <span class="label">工程編號</span>
        <a-input :value="pmaster.p_no" disabled="true" />
      </p>
      <p class="item">
        <span class="label">工程負責同事</span>
        <a-input v-model="info.principle_workmate" />
      </p>
      <p class="item">
        <span class="label">工程負責人</span>
        <a-input v-model="info.principle" />
      </p>
      <p class="item">
        <span class="label">電話</span>
        <a-input v-model="info.tel" />
      </p>
      <p class="item">
        <span class="label">工程地點</span>
        <a-input :value="pmaster.pl" disabled="true" />
      </p>
      <p class="item">
        <span class="label">工程主旨</span>
        <a-input :value="pmaster.pt" disabled="true" />
      </p>
      <p class="item">
        <span class="label">分包商報價單資料</span>
        <a-input :value="pmaster.spn_date" disabled="true" />
      </p>
      <p class="item">
        <span class="label">分包商合約授予工程金額</span>
        <a-input :value="pmaster.sub_bid_price" disabled="true" />
      </p>
      <p class="item">
        <span class="label">工程是否屬於小型工程</span>
        <span style="width:100%;text-align:left">
          <a-radio-group v-model="info.is_mini_project">
            <a-radio :value="'1'">是</a-radio>
            <a-radio :value="'0'">否</a-radio>
          </a-radio-group>
        </span>
      </p>
      <p class="item" v-show="info.is_mini_project=='1'">
        <span class="label">小型工程級別項目及編號</span>
        <a-input v-model="info.mini_project_no" />
      </p>
      <p class="item">
        <span class="label">施工起始日期</span>
        <a-date-picker v-model="info.start_date" format="DD/MM/YYYY"></a-date-picker>
      </p>
      <p class="item">
        <span class="label">預計施工完成日</span>
        <a-date-picker v-model="info.end_date" format="DD/MM/YYYY"></a-date-picker>
      </p>
      <p style="text-align:right;margin-top:10px">
        <a :href="file_link" ref="download" hidden>下載</a>
        <a :href="pdf_link" target="_blank" ref="downloadPdf" hidden></a>
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
import { created_SCN_form } from "@/api/form.js";
import { created_SCN_pdf } from "@/api/pdf.js";
import moment from "moment";
export default {
  data() {
    return {
      info: {
        sort: "",
        fax: "",
        principle: "",
        tel: "",
        is_mini_project: "",
        mini_project_no: "",
        start_date: "",
        end_date: "",
        send_way: ""
      },
      pmaster_list: [],
      pmaster: {},
      visible: false,
      file_link: "",
      pdf_link: "",
      sub_re_bid_date: ""
    };
  },
  methods: {
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
        this.sub_re_bid_date = "";
      }
      this.pmaster_list = list;
      this.visible = true;
    },
    onSelect(e) {
      this.info.sort = e;
      this.pmaster_list.some(item => {
        if (item.sort == e) {
          this.pmaster = item;
          this.sub_re_bid_date = moment(item.sub_re_bid_date).format(
            "DD/MM/YYYY"
          );
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
      if (e.key == 1) {
        created_SCN_form(values)
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      }
      if (e.key == 2) {
        created_SCN_pdf(values)
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
  .ant-select {
    width: 100%;
  }
}
</style>