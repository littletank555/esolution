<template>
  <div class="contractor-list">
    <p class="header">
      <a-button type="primary">ADD Contarctor</a-button>
    </p>
    <a-table :columns="columns" :dataSource="tableData" :loading="onLoading">
      <template slot="edit" slot-scope="record">
        <a>
          <a-icon type="edit" @click="()=>{
            $refs.editClient.show(record)
        }"></a-icon>
        </a>
      </template>
      <template slot="delete" slot-scope="record">
        <a-popconfirm
          v-if="tableData.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.client_id)"
        >
          <a>
            <a-icon type="delete"></a-icon>
          </a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import { get_contractor_data } from "@/api/contractor.js";
const columns = [
  { title: "分包商名稱", dataIndex: "name" },
  { title: "傳真", dataIndex: "fax" },
  { title: "電話", dataIndex: "tel" },
  { title: "郵箱", dataIndex: "email" }
];
export default {
  data() {
    return {
      tableData: [],
      dataSource: [],
      columns,
      onLoading: false
    };
  }
};
</script>

<style lang="scss">
.contractor_list {
  .header {
    display: flex;
    justify-content: space-between;
  }
}
</style>

