// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", "nuxt-countdown"],
  css: ["./asset/css/font.css"],
  runtimeConfig: {
    public: {
      baseURL: "http://localhost:4004/api",
      // baseURL: "https://fakestoreapi.com",
    },
  },
});
