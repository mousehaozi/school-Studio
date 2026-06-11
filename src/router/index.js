import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

const SUPERADMIN_ROUTES = { roles: ["SUPERADMIN"] };

function getDefaultAdminPath(role) {
  return role === "SUPERADMIN" ? "/admin/banner" : "/admin/profile";
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/admin",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/loginView.vue"),
    },
    {
      path: "/admin",
      component: () => import("@/layouts/AdminLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "banner",
          name: "admin-banner",
          component: () => import("@/views/admin/banner/BannerManageView.vue"),
          meta: SUPERADMIN_ROUTES,
        },
        {
          path: "profile",
          name: "admin-profile",
          component: () =>
            import("@/views/admin/profile/StudioProfileManageView.vue"),
        },
        {
          path: "studio-intro-article",
          name: "admin-studio-intro-article",
          component: () =>
            import("@/views/admin/profile/StudioIntroArticleView.vue"),
        },
        {
          path: "news",
          name: "admin-news",
          component: () => import("@/views/admin/news/NewsManageView.vue"),
        },
        {
          path: "account",
          name: "admin-account",
          component: () => import("@/views/admin/account/AccountView.vue"),
          meta: SUPERADMIN_ROUTES,
        },
        {
          path: "topics",
          name: "admin-topics",
          component: () => import("@/views/admin/topic/TopicManageView.vue"),
        },
        {
          path: "articles",
          name: "admin-articles",
          component: () =>
            import("@/views/admin/article/ArticleManageView.vue"),
        },
        {
          path: "chat",
          name: "admin-chat",
          component: () => import("@/views/admin/chat/ChatView.vue"),
          meta: SUPERADMIN_ROUTES,
        },
        {
          path: "studios",
          name: "admin-studios",
          component: () => import("@/views/admin/studio/StudioManageView.vue"),
          meta: SUPERADMIN_ROUTES,
        },
        {
          path: "system-configs",
          name: "admin-system-configs",
          component: () => import("@/views/admin/system/SystemConfigView.vue"),
          meta: SUPERADMIN_ROUTES,
        },
      ],
    },
    {
      path: "/home",
      redirect: "/admin",
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.path === "/login") {
    if (userStore.token) {
      return { path: "/admin" };
    }
    return true;
  }

  if (to.meta.requiresAuth && !userStore.token) {
    return { path: "/login" };
  }

  if (to.path === "/admin") {
    return { path: getDefaultAdminPath(userStore.role) };
  }

  if (to.meta.roles && !to.meta.roles.includes(userStore.role)) {
    return { path: getDefaultAdminPath(userStore.role) };
  }

  return true;
});

export default router;
