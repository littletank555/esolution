<template>
  <a-modal v-model="visible" :footer="null" title="報價單" width="1000px">
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
        <span class="label">寄送地址</span>
        <a-select v-model="info.bt">
          <a-select-option v-for="item in btArray" :key="item.key" :value="item.bt">{{item.bt}}</a-select-option>
        </a-select>
      </p>
      <p class="item">
        <span class="label">致</span>
        <a-input v-model="pmaster.ccp" disabled="true"></a-input>
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
        <span class="label">電郵</span>
        <a-input v-model="pmaster.ce" disabled="true"></a-input>
      </p>
      <!-- <p class="item">
        <span class="label">日期</span>
        <a-date-picker v-model="info.date" format="YYYY-MM-DD"></a-date-picker>
      </p>-->
      <p class="item">
        <span class="label">工程地點</span>
        <a-input v-model="pmaster.jca" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">主旨</span>
        <a-input v-model="title" disabled="true"></a-input>
      </p>
      <a-table bordered :dataSource="dataSource" :columns="columns" :pagination="false">
        <template slot="describe" slot-scope="text,record">
          <a-textarea v-model="record.describe"></a-textarea>
        </template>
        <template slot="count" slot-scope="text,record">
          <a-input v-model="record.count"></a-input>
        </template>
        <template slot="unit" slot-scope="text,record">
          <!-- <a-input v-model="record.unit"></a-input> -->
          <a-select v-model="record.unit" style="min-width:80px">
            <a-select-option value="單">單</a-select-option>
            <a-select-option value="件">件</a-select-option>
            <a-select-option value="次">次</a-select-option>
            <a-select-option value="套">套</a-select-option>
            <a-select-option value="Job">Job</a-select-option>
            <a-select-option value="Nos">Nos</a-select-option>
            <a-select-option value="Times">Times</a-select-option>
            <a-select-option value="Sets">Sets</a-select-option>
          </a-select>
        </template>
        <template slot="price" slot-scope="text,record">
          <a-input v-model="record.price"></a-input>
        </template>
        <template slot="total" slot-scope="text,record">
          {{
          record|get_total
          }}
        </template>
        <template slot="footer" slot-scope>
          <p style="text-align:right">
            <a-input
              addonBefore="新增行數"
              size="small"
              style="width:150px;float:left;margin:0 10px 0 10px;"
              v-model="number"
            ></a-input>
            <a-button size="small" type="primary" @click="AddColumns" style="float:left">Add</a-button>
            <a-button
              size="small"
              type="primary"
              @click="onClear"
              style="float:left;margin-left:10px"
            >Clear</a-button>
            總金額：${{
            dataSource|get_sum
            }}
          </p>
        </template>
      </a-table>
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
import { created_q_form } from "@/api/form.js";
import { created_quotation_pdf } from "@/api/pdf.js";
import moment from "moment";
const columns = [
  { title: "項目", dataIndex: "project", key: "1" },
  {
    title: "工程描述",
    width: "400px",
    dataIndex: "describe",
    key: "2",
    scopedSlots: { customRender: "describe" }
  },
  {
    title: "數量",
    dataIndex: "count",
    key: "3",
    scopedSlots: { customRender: "count" }
  },
  {
    title: "單位",
    dataIndex: "unit",
    key: "4",
    scopedSlots: { customRender: "unit" }
  },
  {
    title: "單價",
    dataIndex: "price",
    key: "5",
    scopedSlots: { customRender: "price" }
  },
  {
    title: "金額",
    key: "6",
    scopedSlots: { customRender: "total" }
  }
];
function sum(data) {
  return data.reduce(
    (sum, current) => sum + parseInt(current.price) * parseInt(current.count),
    0
  );
}
export default {
  data() {
    return {
      tableData: [
        {
          project: "1",
          describe: "",
          count: "1",
          unit: "單",
          price: "0",
          total: "0"
        }
      ],
      columns: columns,
      visible: false,
      created_form_loading: false,
      pmaster_list: [],
      pmaster: {}, //選中的pmaster
      file_link: "",
      pdf_link: "",
      info: {
        sort: "",
        date: "",
        bt: ""
      },
      btArray: [],
      title: "",
      dataSource: [],
      number: 0,
      project: 2
    };
  },

  created() {},
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
      this.title = "";
      this.pmaster_list = list;
      this.btArray = [];
      this.tableData = [
        {
          project: "1",
          describe: "",
          count: "1",
          unit: "單",
          price: "0",
          total: "0"
        }
      ];
      this.number = 0;
      this.project = 2;
      this.info.date = moment().format("YYYY-MM-DD");
      this.dataSource = this.tableData;
      this.visible = true;
    },
    onClear() {
      this.tableData = [
        {
          project: "1",
          describe: "",
          count: "1",
          unit: "單",
          price: "0",
          total: "0"
        }
      ];
      this.number = 0;
      this.project = 2;
      this.dataSource = this.tableData;
    },
    onSelect(e) {
      this.info.sort = e;
      this.pmaster_list.some(item => {
        if (item.sort == e) {
          this.pmaster = item;
          this.pmaster = JSON.parse(JSON.stringify(item));
          this.title = this.pmaster.pl + "-" + this.pmaster.pt;
          this.btArray = [];
          this.btArray.push({
            key: 0,
            bt: this.pmaster.bt
          });
          this.btArray.push({
            key: 1,
            bt: this.pmaster.jca
          });
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
      if (this.number == 0) {
        this.dataSource.push({
          project: this.project++,
          describe: "",
          count: "1",
          price: "0",
          unit: "單",
          total: "0"
        });
      } else if (this.number >= 0) {
        for (let i = 0; i < this.number; i++) {
          this.dataSource.push({
            project: this.project++,
            describe: "",
            count: "1",
            price: "0",
            unit: "單",
            total: "0"
          });
        }
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
      values.project = JSON.stringify(this.dataSource);
      values.total = sum(this.dataSource);
      if (e.key == 1) {
        created_q_form(values)
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      }
      if (e.key == 2) {
        created_quotation_pdf(values)
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
    get_total: function(record) {
      record.total = record.price * record.count;
      return "$" + record.price * record.count;
    },
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

