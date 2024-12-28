const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;

const createCookie = <T>(key: string) => {
  const cookie = () => useCookie<T | undefined>(key, { maxAge: week });
  return {
    get: () => cookie().value,
    set: (value: T) => (cookie().value = value),
    reset: () => (cookie().value = undefined),
  };
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      cookie: {
        token: createCookie<string>('token'),
        clientId: createCookie<string>('clientId'),
      },
    },
  };
});
