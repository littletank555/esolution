<template>
  <a-modal v-model="visible" :footer="null" title="Declined Return Letter" width="1000px">
    <div class="created_invitation">
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
      <p class="item">
        <span class="label">送呈</span>
        <a-input v-model="pmaster.ccn" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">編號</span>
        <a-input v-model="pmaster.p_no" disabled="true"></a-input>
      </p>
      <!-- <p class="item">
        <span class="label">日期</span>
        <a-input v-model="info.date" disabled="true"></a-input>
      </p>-->
      <p class="item">
        <span class="label">寄送地址</span>
        <a-input v-model="pmaster.bt" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">電話</span>
        <a-input v-model="pmaster.ct" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">傳真</span>
        <a-input v-model="pmaster.cf" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">致</span>
        <a-input v-model="pmaster.ccp" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">電郵</span>
        <a-input v-model="pmaster.ce" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">工程地點</span>
        <a-input v-model="pmaster.jca" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">工程主旨</span>
        <a-input v-model="pmaster.pt" disabled="true"></a-input>
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
import moment from "moment";
import { created_NRR_form } from "@/api/form.js";
import { created_NRR_pdf } from "@/api/pdf.js";
export default {
  data() {
    return {
      info: {
        sort: "",
        date: ""
      },
      pmaster_list: [],
      pmaster: {}, //選中的pmaster
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
      this.info.date = moment().format("D-MMM-YYYY");
      for (const key in this.info) {
        values[key] = this.info[key];
      }
      if (e.key == 1) {
        created_NRR_form(values)
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      } else if (e.key == 2) {
        created_NRR_pdf(values)
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