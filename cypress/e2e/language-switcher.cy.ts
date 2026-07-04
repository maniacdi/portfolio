/// <reference types="cypress" />

describe("Language Switcher", () => {
  it("switches from Spanish to English", () => {
    cy.visit("/");
    cy.skipTerminalLoader();
    cy.get(".lang-switcher").first().click();
    cy.url().should("include", "/en");
    cy.contains("HEY, I'M JAVI").should("exist");
  });

  it("switches from English to Spanish", () => {
    cy.visit("/en");
    cy.skipTerminalLoader();
    cy.get(".lang-switcher").first().click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.contains("HOLA, SOY JAVI").should("exist");
  });

  it("preserves current page route when switching language", () => {
    cy.visit("/en/about");
    cy.skipTerminalLoader();
    cy.get(".lang-switcher").first().click();
    cy.url().should("eq", "http://localhost:3000/about");
  });
});