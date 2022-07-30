<script>
import { useAuth0 } from "@auth0/auth0-vue";
import AppButton from "./AppButton.vue";
import AppLogo from "./AppLogo.vue";

export default {
  components: { AppButton, AppLogo },
  setup() {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
    return { loginWithRedirect, logout, isAuthenticated };
  },
};
</script>

<template>
  <div class="flex justify-between items-center py-4">
    <app-logo class="ml-4" />
    <div class="pr-4">
      <app-button v-if="!isAuthenticated" @click="loginWithRedirect">
        Login
      </app-button>
      <app-button v-else text @click="logout">Logout</app-button>
    </div>
  </div>
</template>
