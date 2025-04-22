const { defineConfig } = require("cypress");
const dayjs = require("dayjs");
const sendReportToDiscord = require("./cypress/support/send-report-to-discord");

require("dotenv").config();

module.exports = defineConfig({
  projectId: "tqyggs",
  experimentalStudio: true,
  defaultCommandTimeout: 15000,
  retries: 3,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportDir: "cypress/reports",
    overwrite: false, // Prevent overwriting reports
    reportPageTitle: "Regression Testing Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    html: true,
  },
  env: {
    projectName: process.env.PROJECT_NAME || "Cypress Test Automation",
    environment: process.env.ENVIRONMENT || "QA",
    API_KEY: process.env.API_KEY,
    API_BASE_URL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
  },
  e2e: {
    baseUrl: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {
      // Register cypress-mochawesome-reporter hooks
      require("cypress-mochawesome-reporter/plugin")(on);

      on("after:run", async (results) => {
        const date = dayjs().format("MMMM D, YYYY - h:mm A");
        const projectName = config.env.projectName;
        const environment = config.env.environment;

        // Extract spec file names and test case details
        const specDetails = results.runs.map((run) => {
          const specFileName = run.spec.name;
          const testCases = run.tests.map((test) => ({
            name: test.title.join(" > "),
            state: test.state,
          }));
          return { specFileName, testCases };
        });

        await sendReportToDiscord({
          projectName,
          environment,
          date,
          totalTests: results.totalTests,
          totalPassed: results.totalPassed,
          totalFailed: results.totalFailed,
          totalSkipped: results.totalSkipped,
          specDetails,
        });
      });

      return config;
    },
  },
});