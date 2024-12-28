<template>
  <v-app>
    <v-navigation-drawer v-model:rail="rail" :width="300" class="bg-mainBlack">
      <v-list nav class="flex h-screen flex-col">
        <v-list-item key="logo" height="60" class="pt-2" :to="{ name: 'index' }">
          <template #prepend>
            <img src="/public/logo.png" class="h-6" alt="Nav logo" draggable="false" />
          </template>
          <template #title> <span class="ml-4 text-white">Password Manager | Crypto AES</span> </template>
        </v-list-item>
        <v-divider class="my-2" />
        <v-list-item
          v-for="each of menuItems.filter((i) => (typeof i.show === 'boolean' ? i.show : true))"
          :key="each.title"
          class="h-12 text-grey-light transition-all hover:text-white"
          :to="{ name: each.route }"
        >
          <template #prepend>
            <v-tooltip :text="each.title">
              <template #activator="{ props }">
                <Icon v-bind="rail ? props : undefined" :name="each.icon" class="text-2xl" />
              </template>
            </v-tooltip>
          </template>
          <template #title>
            <span class="ml-2 text-sm">
              {{ each.title }}
            </span>
          </template>
        </v-list-item>
        <v-divider class="mb-2 mt-auto" />
        <v-list-item key="profile" height="60" class="text-grey-light" @click="store.logout">
          <template #prepend>
            <v-tooltip text="Выйти">
              <template #activator="{ props }">
                <Icon v-bind="rail ? props : undefined" name="mdi-logout" class="text-2xl" />
              </template>
            </v-tooltip>
          </template>
          <template #title>
            <div class="ml-2 flex items-center justify-between">
              <span class="text-sm">Выйти</span>
              <v-btn rounded="sm" size="x-small" icon="mdi-chevron-double-right" variant="tonal"> </v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list>
      <v-btn
        icon="mdi-chevron-left"
        rounded="full"
        class="absolute right-[-24px] top-2/3 hidden text-xl transition-all duration-500 lg:block"
        :class="{ 'rotate-180': rail }"
        :color="colors.grey.DEFAULT"
        size="default"
        variant="flat"
        @click="rail = !rail"
      />
    </v-navigation-drawer>
    <v-main class="bg-grey-lighter">
      <div class="mx-auto max-w-[100rem] p-10">
        <slot></slot>
      </div>
      <Loading />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core';

const store = useStore();

const rail = useStorage<boolean>('navOpen', true);
const menuItems = ref<Types.Utils.MenuItem[]>([
  {
    title: 'Пароли',
    icon: 'mdi-lock-outline',
    route: 'passwords',
  },
]);
</script>
