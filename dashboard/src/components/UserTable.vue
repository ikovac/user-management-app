<script>
export default {
  props: {
    users: { type: Array, default: () => [] },
  },
};
</script>

<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <caption
        class="p-5 text-lg font-semibold text-left text-gray-900 bg-white"
      >
        Users
      </caption>
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="py-3 px-6">Email</th>
          <th class="py-3 px-6">Firstname</th>
          <th class="py-3 px-6">Lastname</th>
          <th class="py-3 px-6">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="bg-white border-b">
          <td class="py-4 px-6">{{ user.email }}</td>
          <td class="py-4 px-6">{{ user.firstName }}</td>
          <td class="py-4 px-6">{{ user.lastName }}</td>
          <td class="py-4 px-6">{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
