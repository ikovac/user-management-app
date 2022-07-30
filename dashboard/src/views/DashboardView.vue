<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import UserTable from "../components/UserTable.vue";
import AddUserModal from "../components/AddUserModal.vue";

export default {
  components: { UserTable, AddUserModal },
  setup() {
    const { getAccessTokenSilently } = useAuth0();
    const showModal = ref(false);
    const url = new URL("api/users", import.meta.env.VITE_SERVER_URL);
    const addAuthorizationHeader = async ({ options }) => {
      const token = await getAccessTokenSilently();
      const headers = {
        ...options.headers,
        Authorization: ["Bearer", token].join(" "),
      };
      return { options: { ...options, headers } };
    };
    const { data: users, execute } = useFetch(url.href, {
      initialData: [],
      beforeFetch: addAuthorizationHeader,
    }).json();

    const save = async (user) => {
      await useFetch(url.href, { beforeFetch: addAuthorizationHeader })
        .post(user)
        .json();
      showModal.value = false;
      return execute();
    };

    return { users, showModal, save };
  },
};
</script>

<template>
  <main class="mt-2 p-4">
    <h1 class="mb-4 text-2xl font-medium">Dashboard</h1>
    <div class="flex justify-end">
      <button
        class="mb-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        @click="showModal = true"
      >
        Add
      </button>
    </div>
    <user-table :users="users" />
    <add-user-modal
      :show-modal="showModal"
      @save="save"
      @close="showModal = false"
    />
  </main>
</template>
