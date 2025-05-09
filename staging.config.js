const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://datatables.net/", // Staging URL or Preview URL "http://localhost:3000"
  },
  env: {
    projectName: "Staging Data Tables Testing",
    environment: "staging",
    authToken: "Bearer STATIC_TOKEN_123"
  }
});