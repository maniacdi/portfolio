/// <reference types="cypress" />

describe("Contact Modal", () => {
  beforeEach(() => {
    cy.visit("/en");
    cy.skipTerminalLoader();
  });

  it("opens contact modal when clicking header contact button", () => {
    cy.get(".header-actions .cta-btn").click();
    cy.get(".contact-modal-backdrop").should("be.visible");
    cy.get(".contact-modal").should("be.visible");
  });

  it("closes modal on backdrop click", () => {
    cy.get(".header-actions .cta-btn").click();
    cy.get(".contact-modal-backdrop").should("be.visible");
    cy.get(".contact-modal-backdrop").click("topLeft");
    cy.get(".contact-modal-backdrop").should("not.exist");
  });

  it("closes modal on ESC key", () => {
    cy.get(".header-actions .cta-btn").click();
    cy.get(".contact-modal-backdrop").should("be.visible");
    cy.get("body").type("{esc}");
    cy.get(".contact-modal-backdrop").should("not.exist");
  });

  it("validates required fields", () => {
    cy.get(".header-actions .cta-btn").click();
    cy.get(".contact-modal form").should("exist");
    cy.get(".contact-modal input[name='name']").should("exist");
    cy.get(".contact-modal input[name='email']").should("exist");
    cy.get(".contact-modal textarea[name='message']").should("exist");
  });
});
