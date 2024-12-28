<template>
  <div class="flex items-center justify-between">
    <div class="text-2xl font-bold">
      <NuxtLink :to="title.route ? { name: title.route } : undefined">{{ title.text }}</NuxtLink>
    </div>
    <HeaderUserBlock />
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: Object as PropType<{ text: string; route?: string }>,
    default: { text: '', route: undefined },
  },
});
</script>
