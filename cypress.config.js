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
    reportDir: "cypress/reports/individual", // Directory for individual reports
    overwrite: false, // Prevent overwriting reports
    reportPageTitle: "Regression Testing Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    html: true,
  },
  env: {
    dev: process.env.DEV_URL,
    qa: process.env.QA_URL,
    uat: process.env.UAT_URL,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Register cypress-mochawesome-reporter hooks
      require("cypress-mochawesome-reporter/plugin")(on);

      // Custom hooks for before and after run
      
      on("before:run", async (details) => {
        console.log("override before:run");
        await beforeRunHook(details);
      });

      on("after:run", async () => {
        console.log("override after:run");
        await afterRunHook();
      });

      return config;
    },
  },
});