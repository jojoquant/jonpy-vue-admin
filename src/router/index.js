import Vue from "vue";
import VueRouter from "vue-router";
import DashboardIndex from "../views/dashboard/DashboardIndex";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/",
    name: "dashboard",
    component: DashboardIndex,
    meta: {
      title: "主控制台"
    },
    // beforeEnter: (to, from, next) => {
    //   let token = localStorage.getItem('token')
    //   if (!token || typeof(token)==='undefined') {
    //     return next({ name: 'login' });
    //   }
    //   return next();
    // },
    children: [
      {
        path: "/backtester",
        name: "backtester",
        component: () => import("../views/backtester/BacktesterIndex.vue"),
        meta: {
          title: "策略回测"
        },
      },
      {
        path: "/dataloader",
        name: "dataloader",
        component: () => import("../views/dataloader/DataloaderIndex.vue"),
        meta: {
          title: "数据加载"
        }
      },
      {
        path: "/monitor",
        name: "monitor",
        component: () =>
          import("../views/monitor/MonitorIndex.vue"),
        meta: {
          title: "策略监控"
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(to)
  document.title = to.meta.title;
  next();
});

export default router;
