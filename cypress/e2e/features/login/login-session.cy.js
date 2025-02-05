describe("Login session", () => {
  it("should be able to login and assert cookies", () => {
    cy.visit("http://localhost:3000", { failOnStatusCode: false }); // localhost:3000
    //cy.contains("Log in").click();
    cy.get("[type=password]").type("securepassword");
    
    cy.get('[data-testid="login-button"]').click();
    cy.url().should("include", "profile");
    cy.getCookies()
      .should("have.length", 2)
      .then((cookies) => {
        expect(cookies[0]).to.have.property("name", "session_id");
        expect(cookies[1]).to.have.property("name", "identity_session_id");
      });
  });
});
