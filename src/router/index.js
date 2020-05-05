import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    meta: {
      requiresAnon: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    meta: {
      requiresAnon: true
    }
  },
  {
    path: "/properties",
    name: "Properties",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Properties.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/add",
    name: "Add",
    component: () => import(/* webpackChunkName: "add" */ "../views/Add.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/view/:id",
    name: "View",
    component: () => import(/* webpackChunkName: "view" */ "../views/View.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import(/* webpackChunkName: "view" */ "../views/Edit.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    redirect: "properties"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && to.matched.some((record) => record.meta.requiresAnon)) {
      next({
        path: "/properties"
      });
    } else if (!user && to.matched.some((record) => record.meta.requiresAuth)) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  });
});

export default router;
