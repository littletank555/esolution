<template>
  <a-modal v-model="visible" :footer="null" title="Create Invitation For Tender" width="800px">
    <div class="created_invitation">
      <p class="item">
        <span class="label">排序</span>
        <a-auto-complete
          style="width: 100%"
          @change="onPNoSelect"
          :value="info.sort"
          :filterOption="filterOption"
          placeholder="input for select"
          :getPopupContainer="(triggerNode)=>{ return triggerNode.parentNode}"
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
      <!-- <p class="item">
        <span class="label">分包商</span>
        <a-auto-complete
          style="width: 100%"
          @change="onContractorSel"
          :filterOption="filterOption"
          :value="info.contractor_id"
          placeholder="input for select"
        >
          <template slot="dataSource">
            <a-select-option
              v-for="(item,i) in contractor"
              :key="i"
              :value="item.sub_contractor_id"
            >{{item.name}}</a-select-option>
          </template>
        </a-auto-complete>
      </p>-->
      <!-- <p class="item">
        <span class="label">發出時間</span>
        <a-date-picker v-model="info.send_date" format="DD/MM/YYYY"></a-date-picker>
      </p>-->
      <p class="item">
        <span class="label">分包商</span>
        <a-card style="width:100%">
          <p class="item" v-for="contractoritem in contractorarray" :key="contractoritem.itemkey">
            <a-auto-complete
              :dataSource="contractor"
              :getPopupContainer="(triggerNode)=>{ return triggerNode.parentNode}"
              v-model="contractoritem.contractor_name"
              style="width: 100%"
              placeholder="input for select"
              :filterOption="filterOption"
              @select="onContractorSel"
            />
            <a-icon type="delete" @click="onDelete(contractoritem)" />
          </p>
          <a-button type="dashed" style="width:100%;margin-top:10px;" @click="addSubInfo">
            <a-icon type="plus" />Add
          </a-button>
        </a-card>
      </p>
      <p class="item">
        <span></span>
      </p>
      <p class="item">
        <span class="label">發出方式</span>
        <a-select
          v-model="info.send_way"
          :getPopupContainer="(triggerNode)=>{ return triggerNode.parentNode}"
        >
          <a-select-option value=" ">-</a-select-option>
          <a-select-option value="電郵">電郵</a-select-option>
          <a-select-option value="傳真">傳真</a-select-option>
          <a-select-option value="傳真+電郵">傳真+電郵</a-select-option>
          <a-select-option value="Whatsapp by Sales">Whatsapp by Sales</a-select-option>
        </a-select>
      </p>
      <p class="item">
        <span class="label">工程是否屬於小型工程</span>
        <span style="width:100%;text-align:left">
          <a-radio-group v-model="info.is_min_project">
            <a-radio :value="'1'">是</a-radio>
            <a-radio :value="'0'">否</a-radio>
          </a-radio-group>
        </span>
      </p>
      <p class="item">
        <span class="label">工程負責人:</span>
        <a-input v-model="info.p_contact"></a-input>
      </p>
      <p class="item">
        <span class="label">電話:</span>
        <a-input v-model="info.p_contact_tell"></a-input>
      </p>
      <p class="item">
        <span class="label">工程地點:</span>
        <a-input v-model="pmaster.pl" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">工程主旨:</span>
        <a-input v-model="pmaster.pt" disabled="true"></a-input>
      </p>
      <p class="item">
        <span class="label">報價資料附件:</span>
        <a-input v-model="info.attachment1"></a-input>
      </p>
      <p class="item">
        <span class="label">回傳報價期限:</span>
        <!-- <a-input v-model="pmaster.end_bid_date"></a-input> -->
        <a-date-picker
          v-model="info.end_bid_date"
          :getCalendarContainer="(triggerNode)=>{ return triggerNode.parentNode}"
          format="YYYY-MM-DD"
        ></a-date-picker>
      </p>
      <p class="item" v-show="info.is_min_project=='1'">
        <span class="label">小型工程級別項目及編號:</span>
        <a-input v-model="info.p_min_no_level"></a-input>
      </p>
      <p class="item">
        <span class="label">預計所需施工期:</span>
        <a-input v-model="info.finish_days"></a-input>
      </p>
      <p class="item">
        <span class="label">發判商備註(如有):</span>
        <a-input v-model="info.remark1"></a-input>
      </p>
      <p class="item">
        <span class="label">分包商備註(如有):</span>
        <a-input v-model="info.remark2"></a-input>
      </p>
      <p style="text-align:right">
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
import { get_sub_contractor } from "@/api/pmaster.js";
import { created_in_form } from "@/api/form.js";
import { created_in_pdf } from "@/api/pdf.js";
import moment from "moment";
export default {
  data() {
    return {
      visible: false,
      contractor: [],
      itemkey: 0,
      contractorarray: [{ itemkey: 0, contractor_name: "" }],
      pmaster_list: [],
      pmaster: {},
      file_link: "",
      pdf_link: "",
      info: {
        sort: "",
        contractor_name: "",
        send_date: "",
        send_way: "",
        is_min_project: "",
        p_contact: "",
        p_contact_tell: "",
        p_min_no_level: "",
        finish_days: "",
        remark1: "",
        remark2: "",
        attachment1: "",
        end_bid_date: ""
      }
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
      this.contractorarray = [];
      this.itemkey = 0;
      this.info.send_date = moment().format("YYYY-MM-DD");
      this.pmaster_list = list;
      this.visible = true;
    },
    addSubInfo() {
      this.itemkey++;
      this.contractorarray.push({
        contractor_name: "",
        itemkey: this.itemkey
      });
    },
    onDelete(e) {
      this.contractorarray = this.contractorarray.filter(
        item => item.itemkey != e.itemkey
      );
    },
    onPNoSelect(value) {
      this.pmaster_list.some(item => {
        if (item.sort == value) {
          this.pmaster = item;
          this.pmaster = JSON.parse(JSON.stringify(item));
          if (
            this.pmaster.end_bid_date == "0000-00-00" ||
            this.pmaster.end_bid_date == null
          ) {
            this.info.end_bid_date = moment();
          } else {
            this.info.end_bid_date = moment(
              this.pmaster.end_bid_date,
              "YYYY-MM-DD"
            );
          }
          this.info.p_contact = "何先生";
          this.info.p_contact_tell = "9207 2127";
          return true;
        }
      });
      this.info.sort = value;
    },
    onContractorSel(val) {},
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    handleMenuClick(e) {
      let values = {};
      this.info.contractor_name = "";
      this.contractorarray.forEach(element => {
        this.info.contractor_name =
          this.info.contractor_name + "/" + element.contractor_name;
      });
      for (const key in this.info) {
        let date = "";
        if (typeof this.info[key] == "object") {
          date = this.info[key]._isValid
            ? this.info[key].format("YYYY-MM-DD")
            : "";
          values[key] = date;
          continue;
        }
        values[key] = this.info[key];
      }
      if (e.key == 1) {
        created_in_form(values)
          .then(res => {
            this.file_link = res.link;
            this.$nextTick(function() {
              this.$refs.download.click();
            });
          })
          .catch(err => {});
      } else if (e.key == 2) {
        created_in_pdf(values)
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
  },
  watch: {
    "info.is_min_project": function(nval, oval) {
      if (nval == "0") {
        this.info.p_min_no_level = "";
      }
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

