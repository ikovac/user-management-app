<script>
import { RouterLink } from "vue-router";

export default {
  components: { RouterLink },
  props: {
    to: { type: Object, default: null },
    text: { type: Boolean, default: false },
  },
};
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :class="{
      'text-primary hover:bg-primary hover:text-white hover:border-2 hover:border-primary':
        text,
      'bg-primary border-2 border-primary text-white hover:bg-white hover:text-primary':
        !text,
    }"
    class="px-5 py-1 rounded-full font-medium tracking-wider"
  >
    <slot></slot>
  </component>
</template>
