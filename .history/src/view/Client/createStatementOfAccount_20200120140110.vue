<template>
  <a-modal v-model="visible" :footer="null" title="Statement Of Account" width="1000px">
    <div class="created_invitation">
      <p class="item">
        <span class="label">工程地點</span>
        <a-auto-complete
          :dataSource="ke_pl"
          style="width: 100%"
          @select="onSelect"
          :value="info.pl"
          :filterOption="filterOption"
          placeholder="input for select"
        ></a-auto-complete>
      </p>
      <p class="item">
        <span class="label">To</span>
        <a-input v-model="pmaster.ccn" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">Bill to</span>
        <a-input v-model="pmaster.bt" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">Attn.</span>
        <a-input v-model="pmaster.ccp" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">Tel. No.</span>
        <a-input v-model="pmaster.ct" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">Fax No.</span>
        <a-input v-model="pmaster.cf" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">Email</span>
        <a-input v-model="pmaster.ce" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">Status</span>
        <a-select v-model="status" @select="onSelectStatus">
          <!-- <a-select-option value=" ">-</a-select-option>
          <a-select-option value="未上">未上</a-select-option>
          <a-select-option value="未到期上">未到期上</a-select-option>
          <a-select-option value="未收未付">未收未付</a-select-option>
          <a-select-option value="未收已付">未收已付</a-select-option>
          <a-select-option value="已收已付">已收已付</a-select-option>
          <a-select-option value="已收未付">已收未付</a-select-option>
          <a-select-option value="未到期上已付">未到期上已付</a-select-option>-->
          <a-select-option v-for="item in statusArray" :key="item">{{item}}</a-select-option>
        </a-select>
      </p>
      <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false">
        <template slot="invno" slot-scope="text,record">
          <a-input v-model="record.invno"></a-input>
        </template>
        <template slot="date" slot-scope="text,record">
          <a-input v-model="record.date"></a-input>
        </template>
        <template slot="jobdetail" slot-scope="text,record">
          <a-textarea v-model="record.jobdetail"></a-textarea>
        </template>
        <template slot="price" slot-scope="text,record">
          <a-input v-model="record.price"></a-input>
        </template>
        <template slot="footer" slot-scope>
          <p style="text-align:right">
            <a-button type="primary" @click="AddColumns" style="float:left">Add</a-button>
            總金額：${{
            dataSource|get_sum
            }}
          </p>
        </template>
      </a-table>

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
import { created_SOA_form } from "@/api/form.js";
import { created_SOA_pdf } from "@/api/pdf.js";
import { get_pmasters } from "@/api/pmaster.js";
const columns = [
  { title: "Job", dataIndex: "job", key: "1" },
  {
    title: "Inovice No.",
    dataIndex: "invno",
    key: "2",
    scopedSlots: { customRender: "invno" }
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "3",
    scopedSlots: { customRender: "date" }
  },
  {
    title: "Job Details",
    width: "400px",
    dataIndex: "jobdetail",
    key: "4",
    scopedSlots: { customRender: "jobdetail" }
  },
  {
    title: "Amount",
    key: "5",
    scopedSlots: { customRender: "price" }
  }
];
function sum(data) {
  return data.reduce((sum, current) => sum + parseInt(current.price), 0);
}
export default {
  data() {
    return {
      info: {
        pl: "",
        date: ""
      },
      created_form_loading: false,
      pmaster_list: [],
      ke_list: [],
      ke_pl: [],
      pmaster: {}, //選中的pmaster
      visible: false,
      file_link: "",
      pdf_link: "",
      columns: columns,
      jobs: 0,
      dataSource: [],
      status: "",
      account: [],
      statusArray: []
    };
  },
  created() {
    this.get_pmasters();
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
      this.status = "";
      this.jobs = 0;
      this.dataSource = [];
      this.ke_list = list;
      this.ke_pl = [];
      let ke_pl = new Set();
      list.forEach(item => {
        if (!item.pl == "") {
          ke_pl.add(item.pl);
        }
      });
      this.ke_pl = Array.from(ke_pl);
      this.visible = true;
    },
    onSelect(e) {
      this.info.pl = e;
      this.pmaster_list.some(item => {
        if (item.pl == e) {
          this.pmaster = item;
          if (!item.status == "") {
            this.statusArray.add(item.status);
          }
          this.statusArray = Array.from(this.statusArray);
          this.pmaster = JSON.parse(JSON.stringify(item));
          return true;
        }
      });
    },
    onSelectStatus(status) {
      this.dataSource = [];
      let filterstatus = this.ke_list.filter(
        item => item.status.toLowerCase().indexOf(status.toLowerCase()) > -1
      );
      let filterpl = filterstatus.filter(
        item => item.pl.toLowerCase().indexOf(this.info.pl.toLowerCase()) > -1
      );
      filterpl.forEach(element => {
        this.jobs++;
        this.dataSource.push({
          job: this.jobs,
          invno: element.inv_no,
          date: moment(element.sign_date).format("D-MMM-YYYY"),
          jobdetail: element.pt,
          price: element.sign_price
        });
      });
    },
    get_pmasters() {
      get_pmasters()
        .then(res => {
          this.pmaster_list = res.list;
        })
        .catch(err => {});
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    AddColumns() {
      this.jobs++;
      this.dataSource.push({
        job: this.jobs,
        invno: "",
        date: "",
        jobdetail: "",
        price: 0
      });
    },
    handleMenuClick(e) {
      let values = {};
      this.info.date = moment().format("D-MMM-YYYY");
      for (const key in this.info) {
        values[key] = this.info[key];
      }
      values.job = JSON.stringify(this.dataSource);
      values.total = sum(this.dataSource);
      if (e.key == 1) {
        created_SOA_form(values)
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      } else if (e.key == 2) {
        created_SOA_pdf(values)
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
  filters: {
    get_sum: function(data) {
      return sum(data);
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