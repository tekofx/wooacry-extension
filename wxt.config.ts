import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",

  manifest: {
    name: "Wooacry Extension",
    version: "1.0.0",
    description: "Extensión for splitting payment between people",
    homepage_url: "https://github.com/tekofx/wooacry-extension",
    browser_specific_settings: {
      gecko: {
        id: "wooacry-extension@tekofx",
        data_collection_permissions: {
          required: ["none"],
        },
        update_url:
          "https://raw.githubusercontent.com/tekofx/wooacry-extension/main/updates.json",
      },
    },
  },
});
