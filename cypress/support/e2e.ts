/// <reference types="cypress" />

// ────────────────────────────────────────
// Custom command: skip TerminalLoader
// ────────────────────────────────────────
// The TerminalLoader is a full-screen overlay that blocks all
// interactions. In CI (headless Chrome) timing varies, so we
// need to reliably dismiss it before any test runs.

Cypress.Commands.add("skipTerminalLoader", () => {
  // Wait for the loader to appear, then dismiss it
  cy.get("body").then(($body) => {
    if ($body.find(".terminal-loader").length > 0) {
      cy.get(".terminal-loader").click({ force: true });
      // Wait for exit animation to complete
      cy.get(".terminal-loader", { timeout: 5000 }).should("not.exist");
    }
  });
});

declare global {
  // Cypress requires namespace augmentation for custom commands
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      skipTerminalLoader(): Chainable<void>;
    }
  }
}

// ────────────────────────────────────────
// Global hooks
// ────────────────────────────────────────
beforeEach(() => {
  // Suppress known harmless exceptions
  cy.on("uncaught:exception", (err) => {
    if (
      err.message.includes("Hydration") ||
      err.message.includes("ChunkLoadError") ||
      err.message.includes("Loading chunk") ||
      err.message.includes("ResizeObserver")
    ) {
      return false;
    }
    return true;
  });
});
