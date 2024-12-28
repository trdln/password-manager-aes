<template>
  <v-menu activator="parent">
    <div class="rounded-lg border border-grey bg-white p-3 shadow-lg">
      <p class="text-typo pb-2 pl-1 text-lg font-semibold">Подтвердить</p>
      <div class="flex items-center justify-end gap-3">
        <v-btn :text="submitText" variant="flat" @click="$emit('submit')" />
        <v-btn class="cancel" text="Отменить" variant="outlined" :color="colors.grey.light" @click="$emit('cancel')" />
      </div>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
defineProps({
  submitText: {
    type: String,
    default: 'Удалить',
  },
  cancelText: {
    type: String,
    default: 'Отменить',
  },
});
const emit = defineEmits(['cancel', 'submit']);
</script>

<style>
.cancel .v-btn__content {
  @apply text-mainBlack;
}
</style>
