<template>
  <a-modal v-model="visible" :footer="null" title="Statement Of Account" width="1000px">
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
        <span class="label">Service Site</span>
        <a-input v-model="pmaster.pl" disabled="true"></a-input>
      </p>
      <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false">
        <template slot="invno" slot-scope="text,record">
          <a-input v-model="record.invno"></a-input>
        </template>
        <template slot="date" slot-scope="text,record">
          <!-- <a-date-picker format="D-MMM-YYYY" v-model="record.date"></a-date-picker> -->
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
      <a :href="file_link" ref="download" hidden>下載</a>
      <p style="text-align:right;margin-top:10px">
        <a-button
          type="primary"
          @click="exportForm"
          :disabled="enableExportBtn"
          :loading="created_form_loading"
        >export</a-button>
      </p>
    </div>
  </a-modal>
</template>

<script>
import moment from "moment";
import { created_SOA_form } from "@/api/form.js";
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
        sort: "",
        date: ""
      },
      created_form_loading: false,
      pmaster_list: [],
      pmaster: {}, //選中的pmaster
      visible: false,
      file_link: "",
      columns: columns,
      jobs: 0,
      dataSource: []
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
      this.jobs = 0;
      this.dataSource = [];
      this.pmaster_list = list;
      this.visible = true;
    },
    onSelect(e) {
      this.info.sort = e;
      this.pmaster_list.some(item => {
        if (item.sort == e) {
          this.pmaster = item;
          this.pmaster = JSON.parse(JSON.stringify(item));
          this.onSelectSite(item.pl);
          return true;
        }
      });
    },
    onSelectSite(pl) {
      // get_ke_select(pl)
      //   .then(res => {
      //     console.log(res);
      //     res.list.forEach(element => {
      //       this.jobs++;
      //       this.dataSource.push({
      //         job: this.jobs,
      //         invno: element.inv_no,
      //         date: moment(element.sign_date).format("D-MMM-YYYY"),
      //         jobdetail: element.pt,
      //         price: element.sign_price
      //       });
      //     });
      //   })
      //   .catch(err => {});
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
    exportForm() {
      let values = {};
      this.info.date = moment().format("D-MMM-YYYY");
      for (const key in this.info) {
        values[key] = this.info[key];
      }

      // this.dataSource.forEach(element => {
      //   element.date = element.date.format("D-MMM-YYYY");
      // });
      values.job = JSON.stringify(this.dataSource);
      values.total = sum(this.dataSource);
      this.created_form_loading = true;
      created_SOA_form(values)
        .then(res => {
          this.created_form_loading = false;
          this.file_link = res.link;
          this.$nextTick(function() {
            this.$refs.download.click();
          });
        })
        .catch(err => {
          this.created_form_loading = false;
        });
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