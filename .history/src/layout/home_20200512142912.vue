<template>
  <div class="home-container">
    <a-layout class="components-layout-demo-fixed">
      <a-layout-header :style="{ zIndex: 1, width: '100%',position: 'fixed' ,display:'flex' }">
        <!-- <p class="logo"> -->
        <img height="64px" src="http://34.92.29.165:8080/wp-content/uploads/2020/04/logo.png" />
        <!-- </p> -->
        <a-menu
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px',width:'80%' }"
          v-model="activeItem"
        >
          <a-menu-item
            v-for="item in memu"
            :key="item.r_name"
            @click="onMenuSelect(item)"
          >{{item.title}}</a-menu-item>
        </a-menu>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item
              key="3"
              @click="()=>{
                admin_logout();
                
                }"
            >
              <a-icon type="arrow-left" />登出
            </a-menu-item>
          </a-menu>
          <p class="user">
            <a-icon type="user" />
          </p>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content :style="{ padding: '0 50px' }">
        <a-breadcrumb style="margin:76px 0px 16px 0px">
          <span v-for="item in breadcrumb" :key="item">{{item}}</span>
          <span v-if="breadcrumb.length == 0">{{ $route.meta.title}}</span>
        </a-breadcrumb>
        <div
          :style="{ background: '#fff',padding: '24px', minHeight: '80px' ,'margin-bottom':'50px','margin-top':'0px'}"
        >
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { logout } from "@/api/user.js";
export default {
  data() {
    const { lang } = this.$route.params;
    return {
      memu: [
        {
          r_name: "client_list",
          title: "客戶資料"
        },
        { r_name: "contractor", title: "承辦商" },
        {
          r_name: "client_data",
          title: "施工地點"
        },
        { r_name: "project", title: "項目資料" },
        { r_name: "bid", title: "中標資料" }
        // { r_name: "Client", title: "客" }
        // { r_name: "invitationForTender", title: " Invitation for Tender" }
      ],
      breadcrumb: [],
      activeItem: []
    };
  },
  watch: {
    $route: function(val) {
      this.breadcrumb = [];
      val.meta.title && this.breadcrumb.push(val.meta.title);
      val.params.title && this.breadcrumb.push(val.params.title);
    }
  },
  created() {
    this.activeItem[0] = this.$route.name;
  },
  methods: {
    onMenuSelect(item) {
      this.$router.push({ name: item.r_name });
    },
    admin_logout() {
      logout()
        .then(res => {
          if (res.status == true) {
            sessionStorage.token = "";
            this.$router.push({ path: "/login" });
          } else {
            this.$message.error("登出失敗");
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="scss">
.home-container {
  height: 100%;
  background: #f0f2f5;
  .components-layout-demo-fixed {
    .logo {
      width: 120px;
      height: 64px;
      margin: 0px 77px 0px 0;
      font-size: 25px;
      float: left;
    }
    .user {
      cursor: pointer;
      width: auto;
      height: 31px;
      font-size: 25px;
      padding: 3px 8px;
      float: right;
      margin: 16px 0px 16px 0;
      line-height: 100%;
      background: rgba(255, 255, 255, 0.2);
      -moz-border-radius: 50px;
      -webkit-border-radius: 50px;
      border-radius: 50px;
      color: aliceblue;
      text-align: center;
    }
  }
  .ant-breadcrumb-link {
    font-weight: 600;
  }
}
</style>
