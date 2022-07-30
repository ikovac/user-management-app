<script>
export default {
  props: {
    showModal: { type: Boolean, default: false },
  },
  emits: ["save", "close"],
  data: function () {
    return {
      email: null,
      firstName: null,
      lastName: null,
      role: "Admin",
    };
  },
  methods: {
    save(e) {
      const { email, firstName, lastName, role } = this;
      if (!email || !firstName || !lastName || !role) return;
      e.preventDefault();
      this.$emit("save", { email, firstName, lastName, role });
    },
  },
};
</script>
<template>
  <div
    v-if="showModal"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-gray-500 bg-opacity-70"
    aria-modal="true"
    role="dialog"
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <div class="relative bg-white rounded-lg shadow">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          @click="$emit('close')"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="py-6 px-6 lg:px-8">
          <h3 class="mb-4 text-xl font-medium text-gray-900">Add User</h3>
          <form class="space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Email</label
              >
              <input
                v-model="email"
                type="email"
                name="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                for="firstName"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Firstname</label
              >
              <input
                v-model="firstName"
                type="text"
                name="firstName"
                placeholder="John"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                for="lastName"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Lastname</label
              >
              <input
                v-model="lastName"
                type="text"
                name="lastName"
                placeholder="Doe"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                for="role"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Select an option</label
              >
              <select
                v-model="role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click="save"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
