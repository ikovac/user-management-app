<script>
import AppButton from "./AppButton.vue";

export default {
  components: { AppButton },
};
</script>

<template>
  <h1 class="text-center font-bold text-5xl">
    Manage your <span class="text-primary">users</span> easily
  </h1>
  <div class="mt-6 text-center">
    <app-button :to="{ name: 'dashboard' }">Get started</app-button>
  </div>
</template>
