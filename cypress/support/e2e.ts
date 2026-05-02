/// <reference types="cypress" />

// Global before each: suppress terminal loader animation delays
beforeEach(() => {
  // Suppress uncaught exceptions from third-party scripts
  cy.on("uncaught:exception", (err) => {
    // Ignore hydration errors and chunk loading errors
    if (
      err.message.includes("Hydration") ||
      err.message.includes("ChunkLoadError") ||
      err.message.includes("Loading chunk")
    ) {
      return false;
    }
    // Let other errors fail the test
    return true;
  });
});
