<template>
  <a-modal v-model="visible" :footer="null" title="Statement Of Account" width="1000px">
    <div class="created_invitation">
      <p class="item">
        <span class="label">排序</span>
        <a-auto-complete
          style="width: 100%"
          @select="onSelect"
          :value="info.sort"
          :filterOption="filterOption"
          placeholder="input for select"
        >
          <template slot="dataSource">
            <a-select-option v-for="(item,i) in ke_list" :key="i" :value="item.sort">{{item.sort}}</a-select-option>
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
import { get_ke_select } from "@/api/ke.js";
import { get_pmaster } from "@/api/pmaster.js";
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
      this.ke_list = list;
      this.visible = true;
    },
    onSelect(e) {}
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