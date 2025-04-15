const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
const {
  beforeRunHook,
  afterRunHook,
} = require("cypress-mochawesome-reporter/lib");

dotenv.config();

module.exports = defineConfig({
  projectId: "tqyggs",
  experimentalStudio: true,
  defaultCommandTimeout: 6000,
  retries: 3,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportFilename: "regression-test-report", // Static fallback name
    reportDir: "cypress/reports/individual",
    overwrite: false,
    reportPageTitle: "Regression Testing Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    json: true,
    html: false,
  },
  env: {
    dev: process.env.DEV_URL,
    qa: process.env.QA_URL,
    uat: process.env.UAT_URL,
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });

      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });
    },
  },
});
