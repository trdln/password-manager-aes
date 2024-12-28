export default defineNuxtRouteMiddleware((to) => {
  const { $cookie } = useNuxtApp();
  if (to.meta.auth === true) {
    if ($cookie.clientId.get()) {
      if (to.name === 'auth') return navigateTo({ name: 'index' });
    } else {
      return navigateTo({ name: 'auth' });
    }
  }
});
