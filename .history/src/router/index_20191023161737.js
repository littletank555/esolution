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
      path: "/test",
      name: "test",
      component: () => import("@/view/test")
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
        path: "invitationForTender",
        name: "invitationForTender",
        component: () => import("@/view/invitationForTender")
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