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
        meta: { title: '客戶資料', order: 1 }
      },
      {
        path: "client_data",
        name: "client_data",
        component: () => import("@/view/clientData"),
        meta: { title: '施工地點', order: 1 }
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
        meta: { title: '項目資料', order: 1 }
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
        path: "outbid",
        name: "outbid",
        component: () => import("@/view/outbid/index.vue"),
        meta: { title: '中標資料', order: 1 }
      },
      {
        path: "/home/project/subContractor/:project_id",
        name: "subContractor",
        component: () => import("@/view/project/subContractor.vue"),
        meta: { title: '承辦商資料' }
      },
      {
        path: "/home/project/fileIndex/:project_meta_id",
        name: "file",
        component: () => import("@/view/project/fileIndex.vue"),
        meta: { title: '', order: 3 }
      },
      {
        path: "/home/outbid/fileIndex/:project_id",
        name: "bidfile",
        component: () => import("@/view/outbid/fileIndex.vue"),
        meta: { title: '', order: 2 }
      },
      {
        path: "contractor",
        name: "contractor",
        component: () => import("@/view/contractor/index.vue"),
        meta: { title: '承辦商', order: 1 }
      },
      {//kerecord
        path: "/home/bid/:sort",
        name: "keRecord",
        component: () => import("@/view/bid/keRecord"),
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