import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: "login  "
    },
    {
      path: "/home",
      name: "home",
      redirect: "home/client_list",
      component: () => import("@/layout/home.vue"),
      children: [{
        path: "client_list",
        name: "client_list",
        component: () => import("@/view/clientList"),
        meta: { title: '客戶資料' }
      },
      {
        path: "client_data",
        name: "client_data",
        component: () => import("@/view/clientData"),
        meta: { title: '施工地點' }
      },
      {
        path: "p_master",
        name: "p_master",
        component: () => import("@/view/PMaster"),

      },
      {
        path: "project",
        name: "project",
        component: () => import("@/view/project/index.vue"),
        meta: { title: '項目資料' }
      },
      {
        path: "invitationForTender",
        name: "invitationForTender",
        component: () => import("@/view/invitationForTender")
      },
      {
        path: "Client",
        name: "Client",
        component: () => import("@/view/Client"),
      },
      {
        path: "bid",
        name: "bid",
        component: () => import("@/view/bid/index.vue"),
        meta: { title: '中標資料' }
      },
      {
        path: "/home/project/subContractor/:project_id",
        name: "subContractor",
        component: () => import("@/view/project/subContractor.vue"),
        meta: { title: '項目資料/承辦商資料' }
      },
      {
        path: "/home/project/fileIndex/:project_meta_id",
        name: "file",
        component: () => import("@/view/project/fileIndex.vue"),
        meta: {}
      },
      {
        path: "contractor",
        name: "contractor",
        component: () => import("@/view/contractor/index.vue"),
        meta: { title: '承辦商' }
      },
      {//kerecord
        path: "outbid",
        name: "keRecord",
        component: () => import("@/view/outbid/index.vue"),
        meta: { title: '中標資料' }
      },
      {//uploadFile
        path: "/home/pmaster/:pmaster_id",
        name: "fileIndex",
        component: () => import("@/view/PMaster/fileIndex.vue"),
      },
      ]
    },

    {
      path: "/login",
      component: () => import("@/view/login.vue"),
    }
  ],
  linkActiveClass: "ant-menu-item-selected"
})

router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !sessionStorage.token) {
    return next("/login");
  }
  next();
});

export default router;