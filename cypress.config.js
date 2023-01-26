const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiUrl: 'https://petstore.swagger.io/#/',
    apiKey: 'secret-key'
  },
  e2e: {
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
