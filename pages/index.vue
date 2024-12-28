<template>
  <PageSection>
    <PageBlock>
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl">
          Добро пожаловать в Password Manager, <span class="underline">{{ `${store.user.family_name ?? ''} ${store.user.given_name ?? ''}` }}</span
          >!
        </h1>
        <h2 class="text-2xl">Сохраняйте ваши пароли безопасно</h2>
        <v-btn text="Перейти к паролям" :to="{ name: 'passwords' }"></v-btn>
      </div>
    </PageBlock>
  </PageSection>
</template>

<script setup lang="ts">
const store = useStore();
</script>
