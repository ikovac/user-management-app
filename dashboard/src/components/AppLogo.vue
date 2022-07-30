<script>
import { RouterLink } from "vue-router";

export default {
  components: { RouterLink },
};
</script>
<template>
  <router-link
    :to="{ name: 'home' }"
    class="p-3 rounded-full border-primary border-2 bg-white text-primary font-bold"
  >
    UM
  </router-link>
</template>
