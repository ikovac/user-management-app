<script>
import { RouterView } from "vue-router";
import AppNavbar from "./components/AppNavbar.vue";

export default {
  components: { RouterView, AppNavbar },
};
</script>

<template>
  <app-navbar />

  <RouterView />
</template>
