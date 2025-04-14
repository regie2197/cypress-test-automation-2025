//npx cypress run --record --key adbc781d-1e72-4019-9bd0-a01ef834246e
const { defineConfig } = require("cypress");
const dotenv = require('dotenv')
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

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
    reportFilename: 'regression-test-report',
    reportDir: 'cypress/downloads',
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
      on('before:run', async (details) => {
        console.log('override before:run');
        console.log('Running tests');
        await beforeRunHook(details);
      });
      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    },
  },
});
