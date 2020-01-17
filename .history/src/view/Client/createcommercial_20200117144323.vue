<template>
  <a-modal v-model="visible" :footer="null" title="Create COMMERCIAL INVOICE" width="800px">
    <div class="created_commercial">
      <p class="item">
        <span class="label">中標資料編號</span>
        <a-auto-complete
          style="width: 100%"
          @change="onsortSelect"
          :value="info.ke_id"
          :filterOption="filterOption"
          placeholder="input for select"
        >
          <template slot="dataSource">
            <a-select-option
              v-for="(item,i) in commercial_data_list"
              :key="i"
              :value="item.ke_id"
            >{{item.sort+'/'+item.pl+'/'+item.pt}}</a-select-option>
          </template>
        </a-auto-complete>
      </p>
      <p class="item">
        <span class="label">To</span>
        <a-input :value="client_data.ccn" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Location Chineese</span>
        <a-input :value="client_data.jca" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Date</span>
        <a-input :value="commercial_data.sign_date" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Invoice No.</span>
        <a-input :value="commercial_data.inv_no" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Tel. No.</span>
        <a-input :value="client_data.ct" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Fax No.</span>
        <a-input :value="client_data.cf" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Attn.</span>
        <a-input :value="client_data.ccp" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Email</span>
        <a-input :value="client_data.ce" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Service Site</span>
        <a-input :value="commercial_data.pl" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Job No.</span>
        <a-input :value="commercial_data.p_no" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Content</span>
        <a-input :value="commercial_data.pt" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Contract Sum Amount</span>
        <a-input :value="commercial_data.biding_price" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Percent of contract sum</span>
        <a-input :value="commercial_data.percent" disabled="true" />
      </p>
      <p class="item">
        <span class="label">Total</span>
        <a-input :value="commercial_data.sign_price" disabled="true" />
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
import { get_client_data } from "@/api/client_data.js";
import { created_INV_form } from "@/api/form.js";
import { created_INV_pdf } from "@/api/pdf.js";
export default {
  data() {
    return {
      info: {
        pl: "",
        ke_id: ""
      },
      commercial_data_list: [],
      client_data_list: [],
      client_data: {},
      commercial_data: {},
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
      for (const key in this.client_data) {
        if (this.client_data.hasOwnProperty(key)) {
          this.client_data[key] = "";
        }
      }
      for (const key in this.commercial_data) {
        if (this.commercial_data.hasOwnProperty(key)) {
          this.commercial_data[key] = "";
        }
      }
      this.commercial_data_list = list;
      this.visible = true;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    onsortSelect(e) {
      this.commercial_data_list.some(item => {
        if (item.ke_id == e) {
          this.commercial_data = item;
          this.info.pl = item.pl;
          this.info.ke_id = item.ke_id;
          this.commercial_data = JSON.parse(JSON.stringify(item));
          get_client_data()
            .then(res => {
              this.client_data = res.list.filter(item => {
                return item.lc == this.info.pl;
              });
              this.client_data = this.client_data[0];
            })
            .catch(err => {});
          return true;
        }
      });
    },
    handleMenuClick(e) {
      let values = {};
      for (const key in this.info) {
        values[key] = this.info[key];
      }
      if (e.key == 1) {
        created_INV_form(values)
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      } else if (e.key == 2) {
        created_INV_pdf(values)
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
      return this.info.ke_id == "";
    }
  }
};
</script>

<style lang="scss">
.created_commercial {
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