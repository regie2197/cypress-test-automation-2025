const { defineConfig } = require("cypress");
const dayjs = require("dayjs");
const sendReportToDiscord = require("./cypress/support/send-report-to-discord");

require("dotenv").config();

module.exports = defineConfig({
  projectId: "tqyggs",
  experimentalStudio: true,
  defaultCommandTimeout: 15000,
   //requestTimeout: 15000,    // This will work with cy.request() and cy.intercept() - di ko sure kay cy.api() haha
  //responseTimeout: 40000,
  //video: true,
  retries: 3,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      on("after:run", async (results) => {
        const date = dayjs().format("MMMM D, YYYY - h:mm A");
        const projectName = config.env.projectName || "Test Automation Demo";
        const environment = config.env.environment || "Web App Demo Environment";

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