import { Noir } from './configs/primevue';
import { colors } from './utils/styles';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/icon', '@primevue/nuxt-module', '@nuxtjs/google-fonts', 'vuetify-nuxt-module'],

  plugins: ['~/plugins/cookie', '~/plugins/google'],

  experimental: { viewTransition: true },
  router: { options: { scrollBehaviorType: 'smooth' } },
  components: [{ path: './components', pathPrefix: false }],
  imports: { dirs: ['./types/enums', './types/types', './stores'] },
  build: { transpile: ['vuetify', 'jwt-decode', 'maska/vue'] },

  icon: {
    mode: 'svg',
    clientBundle: { scan: true },
  },

  googleFonts: { families: { Inter: true } },

  vuetify: {
    moduleOptions: {
      prefixComposables: true,
    },
    vuetifyOptions: {
      locale: {
        locale: 'ru',
        fallback: 'en',
      },
      defaults: {
        VBtn: {
          rounded: 'lg',
          size: 'large',
          color: colors.mainBlack.DEFAULT,
          style: [{ textTransform: 'none', letterSpacing: 'unset' }],
        },
        VTextField: {
          rounded: 'lg',
          variant: 'outlined',
          color: colors.primaryYellow.DEFAULT,
          baseColor: colors.primaryYellow.DEFAULT,
        },
        VSelect: {
          rounded: 'lg',
          variant: 'outlined',
          color: colors.primaryYellow.DEFAULT,
          baseColor: colors.primaryYellow.DEFAULT,
        },
        VAutocomplete: {
          rounded: 'lg',
          variant: 'outlined',
          color: colors.primaryYellow.DEFAULT,
          baseColor: colors.primaryYellow.DEFAULT,
        },
        VTextarea: {
          rounded: 'lg',
          variant: 'outlined',
          color: colors.primaryYellow.DEFAULT,
          baseColor: colors.primaryYellow.DEFAULT,
        },
        VTabs: { color: colors.primaryYellow.DEFAULT },
        VCard: { rounded: 'lg' },
        VLabel: { style: [{ opacity: 1 }] },
        VStepperWindow: { style: [{ margin: 'unset', marginTop: '1.5rem', marginBottom: '1.5rem' }] },
        VExpansionPanels: { rounded: 'lg', variant: 'accordion' },
      },
    },
  },
  primevue: {
    autoImport: true,
    options: {
      ripple: true,
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: 'dark',
        },
      },
    },
  },
});
