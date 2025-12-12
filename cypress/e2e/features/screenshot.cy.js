describe("Take a screenshot of Home Page", () => {
    
  it("verify home page UI layout", () => {
    cy.visit("https://parabank.parasoft.com/parabank/index.htm");
    const screenshotFileName = `home_page${new Date()
      .toISOString()
      .replace(/[:.]/g, "-")}`;
    const screenshotFolderPath = "";
    cy.takeScreenshot(screenshotFolderPath, screenshotFileName);

  });
});
