// nuxt.config.ts
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

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  },

  compatibilityDate: '2026-06-16',
  
  app: {
    head: {
      script: [
        { 
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', 
          defer: true 
        },
        { 
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', 
          defer: true 
        }
      ]
    }
  }

})
