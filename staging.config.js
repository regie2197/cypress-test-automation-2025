const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: "http://localhost:3000", // Staging URL or Preview URL
  },
  env: {
    projectName: "Staging API Testing",
    environment: "staging",
    authToken: "Bearer STATIC_TOKEN_123"
  }
});