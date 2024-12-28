import GoogleSignInPlugin from 'vue3-google-signin';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(GoogleSignInPlugin, {
    clientId: '140571781514-ocqnba00162s87skgn7v590mh30a65va.apps.googleusercontent.com',
  });
});
