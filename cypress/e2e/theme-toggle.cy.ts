/// <reference types="cypress" />

describe("Theme Toggle", () => {
  beforeEach(() => {
    cy.visit("/en");
    // Skip terminal loader if present
    cy.get("body").click();
    cy.wait(500);
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
    cy.get("html").should("have.attr", "data-theme", "light");
  });
});
