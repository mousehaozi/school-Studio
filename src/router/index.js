import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

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
      redirect: "/admin/banner",
      children: [
        {
          path: "banner",
          name: "admin-banner",
          component: () => import("@/views/admin/banner/BannerManageView.vue"),
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
        },
        {
          path: "studios",
          name: "admin-studios",
          component: () => import("@/views/admin/studio/StudioManageView.vue"),
        },
        {
          path: "system-configs",
          name: "admin-system-configs",
          component: () => import("@/views/admin/system/SystemConfigView.vue"),
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

  if (to.path.startsWith("/admin")) {
    if (!userStore.token) {
      return { path: "/login" };
    }
  }

  return true;
});

export default router;
