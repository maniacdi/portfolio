/// <reference types="cypress" />

describe("Contact Modal", () => {
  beforeEach(() => {
    cy.visit("/en");
    cy.skipTerminalLoader();
  });

  it("opens contact modal when clicking header contact button", () => {
    cy.get(".header-actions .cta-btn").should("be.visible").click();
    // AnimatePresence renders with initial opacity:0, wait for element to exist
    cy.get(".contact-modal-backdrop", { timeout: 10000 }).should("exist");
    cy.get(".contact-modal").should("exist");
  });

  it("closes modal on backdrop click", () => {
    cy.get(".header-actions .cta-btn").should("be.visible").click();
    cy.get(".contact-modal-backdrop", { timeout: 10000 }).should("exist");
    // Click top-left corner of backdrop (outside the modal)
    cy.get(".contact-modal-backdrop").click("topLeft", { force: true });
    cy.get(".contact-modal-backdrop", { timeout: 10000 }).should("not.exist");
  });

  it("closes modal on ESC key", () => {
    cy.get(".header-actions .cta-btn").should("be.visible").click();
    cy.get(".contact-modal-backdrop", { timeout: 10000 }).should("exist");
    // Use trigger instead of type — the modal listens on window keydown
    cy.get("body").trigger("keydown", { key: "Escape" });
    cy.get(".contact-modal-backdrop", { timeout: 10000 }).should("not.exist");
  });

  it("has required form fields", () => {
    cy.get(".header-actions .cta-btn").should("be.visible").click();
    cy.get(".contact-modal", { timeout: 10000 }).should("exist");
    cy.get(".modal-form").should("exist");
    cy.get("#modal-name").should("exist");
    cy.get("#modal-email").should("exist");
    cy.get("#modal-message").should("exist");
  });
});
