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
        component: () => import("@/view/clientList")
      },
      {
        path: "client_data",
        name: "client_data",
        component: () => import("@/view/clientData")
      },
      {
        path: "p_master",
        name: "p_master",
        component: () => import("@/view/PMaster")
      },
      {
        path: "project",
        name: "project",
        component: () => import("@/view/project/index.vue")
      },
      {
        path: "invitationForTender",
        name: "invitationForTender",
        component: () => import("@/view/invitationForTender")
      },
      {
        path: "Client",
        name: "Client",
        component: () => import("@/view/Client")
      },
      {
        path: "bid",
        name: "bid",
        component: () => import("@/view/bid/index.vue"),
      },
      {
        path: "contractor",
        name: "contractor",
        component: () => import("@/view/contractor/index.vue"),
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