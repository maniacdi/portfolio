/// <reference types="cypress" />

describe("Language Switcher", () => {
  it("switches from Spanish to English", () => {
    cy.visit("/es");
    // Skip terminal loader
    cy.get("body").click();
    cy.wait(500);

    // Click the language switcher
    cy.get(".lang-switcher").first().click();
    cy.url().should("include", "/en");
    cy.contains("Welcome").should("exist");
  });

  it("switches from English to Spanish", () => {
    cy.visit("/en");
    cy.get("body").click();
    cy.wait(500);

    cy.get(".lang-switcher").first().click();
    cy.url().should("include", "/es");
    cy.contains("Bienvenido").should("exist");
  });

  it("preserves current page route when switching language", () => {
    cy.visit("/en/about");
    cy.get("body").click();
    cy.wait(500);

    cy.get(".lang-switcher").first().click();
    cy.url().should("include", "/es/about");
  });
});
