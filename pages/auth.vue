<template>
  <section class="bg-mainBlack flex h-dvh w-dvw flex-col items-center justify-center">
    <div class="flex h-full max-h-[400px] w-full max-w-[400px] flex-col items-center gap-14 rounded-[20px] bg-white sm:max-h-[470px] sm:max-w-[580px]">
      <img src="/public/logo.png" alt="Logo" draggable="false" class="mt-10 max-w-40" />
      <h1 class="text-2xl">Авторизация Password Manager</h1>
      <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { GoogleSignInButton } from 'vue3-google-signin';

const { $cookie } = useNuxtApp();
const store = useStore();
const toast = toaster();

const handleLoginSuccess = (response: Types.Auth.Response) => {
  if (response) {
    if (response.credential) {
      toast.add({ severity: 'success', summary: 'Успешная авторизация', life: 2000 });
      $cookie.token.set(response.credential);
      const decoded = decodeJwt(response.credential);
      if (decoded) {
        store.user.name = decoded.name;
        store.user.email = decoded.email;
        store.user.picture = decoded.picture;
        store.user.given_name = decoded.given_name;
        store.user.family_name = decoded.family_name;
      }
    }
    if (response.clientId) {
      $cookie.clientId.set(response.clientId);
      store.user.id = response.clientId;
      navigateTo({ name: 'index' });
    }
  }
};

const handleLoginError = () => {
  toast.add({ severity: 'error', summary: 'Ошибка при авторизации', life: 5000 });
};

definePageMeta({
  layout: 'clear',
});
</script>
