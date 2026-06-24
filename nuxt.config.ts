export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module'
  ],
  future: {
    compatibilityVersion: 4
  },
  css: [
    '~~/app/assets/scss/resume.scss'
  ], 
  vuetify: {
    vuetifyOptions: {
      ssr: true
    }
  },
  compatibilityDate: '2026-06-16'
})
