const { defineConfig } = require("cypress");
const dayjs = require("dayjs");
const sendReportToDiscord = require("./cypress/support/send-report-to-discord");
const { tr } = require("@faker-js/faker");

require("dotenv").config();

module.exports = defineConfig({
  projectId: "tqyggs",
  experimentalStudio: true,
  defaultCommandTimeout: 15000,
  retries: 3,
  watchForFileChanges: false,
  e2e: {
    trashAssetsBeforeRuns: true,
    excludeSpecPattern: [
      "**/features/automation-exercise/*.cy.js",
      "**/cypress-lighthouse/*.cy.js",
      "**/api-testing/*.cy.js",
    ],
    setupNodeEvents(on, config) {
      on("after:run", async (results) => {
        const date = dayjs().format("MMMM D, YYYY - h:mm A");
        const projectName = config.env.projectName || "Test Automation Demo";
        const environment = config.env.environment || "Web App Demo Environment";

        // Log full results for debugging
        console.log("Test results summary:", {
          totalTests: results.totalTests,
          totalPassed: results.totalPassed,
          totalFailed: results.totalFailed,
          totalSkipped: results.totalSkipped,
          totalPending: results.totalPending
        });

        // Calculate correct counts manually
        let manualTotalTests = 0;
        let manualTotalPassed = 0;
        let manualTotalFailed = 0;
        let manualTotalSkipped = 0;

        // Extract spec file names and test case details
        const specDetails = results.runs.map((run) => {
          const specFileName = run.spec.name;
          const testCases = run.tests.map((test) => {
            manualTotalTests++;
            
            if (test.state === "passed") {
              manualTotalPassed++;
            } else if (test.state === "failed") {
              manualTotalFailed++;
            } else if (test.state === "pending" || test.state === "skipped") {
              manualTotalSkipped++;
            }
            
            return {
              name: test.title.join(" > "),
              state: test.state,
            };
          });
          return { specFileName, testCases };
        });

        console.log("Manually calculated counts:", {
          totalTests: manualTotalTests,
          totalPassed: manualTotalPassed,
          totalFailed: manualTotalFailed,
          totalSkipped: manualTotalSkipped
        });

        // Use manually calculated values if skipped tests are missing
        const totalSkipped = results.totalSkipped || manualTotalSkipped;

        await sendReportToDiscord({
          projectName,
          environment,
          date,
          totalTests: results.totalTests,
          totalPassed: results.totalPassed,
          totalFailed: results.totalFailed,
          totalSkipped: totalSkipped,
          specDetails,
        });
      });

      return config;
    },
  },
});