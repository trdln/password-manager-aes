<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Password Manager | AES',
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css',
    },
  ],
});
</script>

<style>
html {
  overflow: auto;
}

* {
  font-family: 'Inter';
}

svg:focus {
  outline: unset !important;
}

.v-expansion-panel-text__wrapper {
  padding: 12px !important;
}

::-moz-selection {
  background: #daa14c88;
}

::selection {
  background: #daa14c88;
}

@supports (scrollbar-color: auto) {
  * {
    scrollbar-color: #daa14c;
    scrollbar-width: 6px;
  }
}

@supports selector(::-webkit-scrollbar) {
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #daa14c;
    border-radius: 8px;
  }
}
</style>
