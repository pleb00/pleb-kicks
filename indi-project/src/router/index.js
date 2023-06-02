import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import DetailsView from "../views/DetailsView.vue";
import RegisterView from "../views/RegisterView.vue";
import WishlistView from "../views/WishlistView.vue";
import CartView from "../views/CartView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/details/:id",
      name: "details",
      component: DetailsView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: WishlistView,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === "wishlist" && !localStorage.access_token) {
    next("/login");
  } else if (to.name === "login" && localStorage.access_token) {
    next("/");
  } else {
    next();
  }
});

export default router;
