const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiUrl: 'https://petstore.swagger.io/v2/pet',
    apiKey: 'secret-key'
  },
  e2e: {
    baseUrl: "https://petstore.swagger.io/#/",
    specPattern: 'cypress/tests/**/*.spec.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
