// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      title: "Manuel Verweyen Website",
      htmlAttrs: {
        lang: "de",
      },
      meta: [
        // viewport and charset don't needed, nuxt will add width=device-width, initial-scale=1.0 and UTF-8 as default.
        {
          name: "description",
          content: "Private Website of Manuel Verweyen",
        },
        {
          name: "author",
          content: "Manuel Verweyen",
        },
      ],
    },
  },

  css: ["~/assets/css/fonts.css", "~/assets/css/main.css"],
});
