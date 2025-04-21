const axios = require("axios"); // Import axios
require("dotenv").config(); // Load environment variables

const sendReportToDiscord = async ({
  projectName,
  environment,
  date,
  totalTests,
  totalPassed,
  totalFailed,
  totalSkipped,
  specDetails,
}) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL; // Use Discord webhook URL

  if (!webhookUrl) {
    console.error("DISCORD_WEBHOOK_URL is not defined in the .env file.");
    return;
  }

  // Prepare the Discord payload
  const messagePayload = {
    content: `📊 **${projectName} - Test Report**`,
    embeds: [
      {
        title: "Test Execution Summary",
        description: `**Environment:** ${environment}\n**Date:** ${date}`,
        color: totalFailed > 0 ? 15158332 : 3066993, // Red for failures, green for success
        fields: [
          { name: "🧪 Total Tests", value: totalTests.toString(), inline: true },
          { name: "✅ Passed", value: totalPassed.toString(), inline: true },
          { name: "❌ Failed", value: totalFailed.toString(), inline: true },
          { name: "⚠️ Skipped", value: totalSkipped.toString(), inline: true },
        ],
        footer: {
          text: "Cypress Test Automation",
          icon_url: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", // Optional: Add a footer icon
        },
        timestamp: new Date().toISOString(),
      },
      {
        title: "Spec Files and Test Cases",
        description: specDetails
          .map(
            (spec) =>
              `**📂 Spec File:** ${spec.specFileName}\n` +
              spec.testCases
                .map(
                  (test) =>
                    `- ${test.name}: ${
                      test.state === "passed"
                        ? "✅ Passed"
                        : test.state === "failed"
                        ? "❌ Failed"
                        : "⚠️ Skipped"
                    }`
                )
                .join("\n")
          )
          .join("\n\n"),
        color: 3447003, // Blue for details
      },
    ],
  };

  try {
    const response = await axios.post(webhookUrl, messagePayload); // Send the payload to Discord
    console.log("Report sent to Discord successfully:", response.status);
  } catch (error) {
    console.error("Failed to send report to Discord:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data); // Log error response data
    }
  }
};

module.exports = sendReportToDiscord;