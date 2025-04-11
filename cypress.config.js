//npx cypress run --record --key adbc781d-1e72-4019-9bd0-a01ef834246e
const { defineConfig } = require("cypress");
const dotenv = require('dotenv')

dotenv.config()

module.exports = defineConfig({
  projectId: "tqyggs",
  experimentalStudio: true,
  defaultCommandTimeout: 6000,
  //testIsolation: false,
  retries: 3,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Regression Testing Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env:{
    dev: process.env.DEV_URL,
    qa: process.env.QA_URL,
    uat: process.env.UAT_URL,
  },
  e2e: {
    //testIsolation: false,
    //baseUrl: "https://qa-practice.netlify.app",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
