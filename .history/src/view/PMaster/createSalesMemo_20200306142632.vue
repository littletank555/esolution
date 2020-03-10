<template>
  <a-modal v-model="visible" :footer="null" title="Sales Mome" width="1000px">
    <div class="created_invitation">
      <p class="item">
        <span class="label">排序</span>
        <a-auto-complete
          :getPopupContainer="(triggerNode)=>{ return triggerNode.parentNode}"
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
        <span class="label">客戶</span>
        <a-input v-model="pmaster.ccn" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">工程單編號</span>
        <a-input v-model="pmaster.p_no" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">工程總金額</span>
        <a-input v-model="pmaster.biding_price" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">中標日期</span>
        <a-input v-model="pmaster.re_bidding_date" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">工程地點</span>
        <a-input v-model="pmaster.pl" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">工程內容</span>
        <a-input v-model="pmaster.pt" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">負責同事</span>
        <a-input v-model="info.chargepepole1"></a-input>
        <span style="margin-left:10px;width:200px">佣金(公司)</span>
        <a-input v-model="info.companycommiss"></a-input>
      </p>
      <p class="item">
        <span class="label"></span>
        <a-input v-model="info.chargepepole2"></a-input>
        <span style="margin-left:10px;width:200px">佣金(其他)</span>
        <a-input v-model="info.othercommiss"></a-input>
      </p>
      <p class="item">
        <span class="label">施工分判商名稱</span>
        <a-input v-model="pmaster.sub_bid_name" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">分判商中標編號</span>
        <a-input v-model="pmaster.sub_bid_number" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">分判商報價資料</span>
        <a-input v-model="pmaster.spn_date" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">分判商中標金額</span>
        <a-input v-model="pmaster.sub_bid_price" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">分判商聯絡人</span>
        <a-input v-model="info.contact"></a-input>
      </p>
      <p class="item">
        <span class="label">備註</span>
        <a-textarea v-model="info.ps"></a-textarea>
      </p>

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
import { created_sm_form } from "@/api/form.js";
import { created_SM_pdf } from "@/api/pdf.js";
export default {
  data() {
    return {
      pmaster_list: [],
      pmaster: {}, //選中的pmaster
      info: {
        sort: "",
        ps: "",
        chargepepole1: "",
        chargepepole2: "",
        companycommiss: "",
        othercommiss: "",
        contact: ""
      },
      visible: false,
      file_link: "",
      pdf_link: ""
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
      }
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
    handleMenuClick(e) {
      let values = {};
      for (const key in this.info) {
        values[key] = this.info[key];
      }
      if (e.key == 1) {
        created_sm_form(values)
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      } else if (e.key == 2) {
        created_SM_pdf(values)
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