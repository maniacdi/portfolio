/// <reference types="cypress" />

describe("Theme Toggle", () => {
  beforeEach(() => {
    cy.visit("/en");
    cy.skipTerminalLoader();
  });

  it("renders the theme toggle button in header", () => {
    cy.get(".theme-toggle").first().should("be.visible");
  });

  it("defaults to dark theme", () => {
    cy.get("html").should("not.have.attr", "data-theme", "light");
  });

  it("switches to light theme on click", () => {
    cy.get(".theme-toggle").first().click();
    cy.get("html").should("have.attr", "data-theme", "light");
  });

  it("switches back to dark theme on second click", () => {
    cy.get(".theme-toggle").first().click();
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.get(".theme-toggle").first().click();
    cy.get("html").should("not.have.attr", "data-theme", "light");
  });

  it("persists theme across page navigation", () => {
    cy.get(".theme-toggle").first().click();
    cy.get("html").should("have.attr", "data-theme", "light");
    cy.visit("/en/about");
    cy.skipTerminalLoader();
    cy.get("html").should("have.attr", "data-theme", "light");
  });
});
