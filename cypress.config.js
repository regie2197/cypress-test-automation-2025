//npx cypress run --record --key adbc781d-1e72-4019-9bd0-a01ef834246e
const { defineConfig } = require("cypress");
const dotenv = require('dotenv')

dotenv.config()

module.exports = defineConfig({
  projectId: "tqyggs",
  experimentalStudio: true,
  defaultCommandTimeout: 120000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Regression Testing Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
