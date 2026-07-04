/// <reference types="cypress" />

describe("Language Switcher", () => {
  it("switches from Spanish to English", () => {
    cy.visit("/es");
    cy.skipTerminalLoader();
    cy.get(".lang-switcher").first().click();
    cy.url().should("include", "/en");
    // Hero title is uppercase in i18n
    cy.contains("WELCOME").should("exist");
  });

  it("switches from English to Spanish", () => {
    cy.visit("/en");
    cy.skipTerminalLoader();
    cy.get(".lang-switcher").first().click();
    cy.url().should("include", "/es");
    // Hero title is uppercase in i18n
    cy.contains("BIENVENIDO").should("exist");
  });

  it("preserves current page route when switching language", () => {
    cy.visit("/en/about");
    cy.skipTerminalLoader();
    cy.get(".lang-switcher").first().click();
    cy.url().should("eq", "http://localhost:3000/about");
  });
});
