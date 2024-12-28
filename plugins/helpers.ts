import ToastService from 'primevue/toastservice';
import { vMaska } from 'maska/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.directive('maska', vMaska);
});
