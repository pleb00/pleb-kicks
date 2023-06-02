<script>
import { RouterView, RouterLink } from "vue-router"
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
    showNavbar() {
      return this.$route.name !== 'login' && this.$route.name !== 'register';
    }
  }
}
</script>

<template>
  <Navbar v-if="showNavbar" />
  <RouterView />
</template>
