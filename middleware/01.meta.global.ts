import { noAuthPages } from '~/configs';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (noAuthPages.includes(String(to.name)) === false) to.meta.auth = true;
});
