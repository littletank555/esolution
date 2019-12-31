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
            >{{item.sort+'/'+item.p_no+'/'+item.ccn}}</a-select-option>
          </template>
        </a-auto-complete>
      </p>
      <p class="item">
        <span class="label">日期</span>
        <a-date-picker format="DD/MM/YYYY" v-model="info.date"></a-date-picker>
      </p>
      <p class="item">
        <span class="label">本司工程單編號</span>
        <a-input :value="pmaster.p_no" disabled="true" />
      </p>
      <p class="item">
        <span class="label">客戶名稱</span>
        <a-input :value="pmaster.ccn" disabled="true" />
      </p>
      <p class="item">
        <span class="label">聯絡人</span>
        <a-input :value="pmaster.ccp" disabled="true" />
      </p>
      <p class="item">
        <span class="label">聯絡電話</span>
        <a-input :value="pmaster.ct" disabled="true" />
      </p>
      <p class="item">
        <span class="label">傳真號碼</span>
        <a-input :value="pmaster.ce" disabled="true" />
      </p>
      <p class="item">
        <span class="label">管理處地址</span>
        <a-input :value="pmaster.jca" disabled="true" />
      </p>
      <p class="item">
        <span class="label">工作地點</span>
        <a-input :value="pmaster.pl" disabled="true" />
      </p>
      <p class="item">
        <span class="label">工作內容</span>
        <a-input :value="pmaster.pt" disabled="true" />
      </p>
      <p class="item">
        <span class="label">完工日期</span>
        <a-date-picker format="DD/MM/YYYY" v-model="info.finishdate"></a-date-picker>
      </p>
      <p class="item">
        <span class="label">備註</span>
        <a-textarea v-model="info.ps" />
      </p>
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
import { created_finished_form } from "@/api/form.js";
export default {
  data() {
    return {
      info: {
        sort: "",
        finishdate: "",
        ps: "",
        date: ""
      },
      pmaster_list: [],
      pmaster: {},
      visible: false,
      file_link: "",
      pdf_link:""
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
    exportForm() {
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
      this.created_form_loading = true;
      created_finished_form(values)
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