/// <reference types="cypress" />

// The point of these tests is the legal guarantee, not the visuals: no
// analytics script may reach the page before the user opts in, and the
// decision must be revocable.

const GTAG_SELECTOR = 'script[src*="googletagmanager.com"]';

describe("Cookie consent", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/en");
    cy.skipTerminalLoader();
  });

  it("shows the banner on the first visit", () => {
    cy.get(".cookie-consent").should("be.visible");
    cy.get(".cookie-consent").contains("Reject all");
    cy.get(".cookie-consent").contains("Accept all");
  });

  it("does not load Google Analytics before a decision", () => {
    cy.get(".cookie-consent").should("be.visible");
    cy.get(GTAG_SELECTOR).should("not.exist");
  });

  it("keeps analytics out after rejecting, and hides the banner", () => {
    cy.contains(".cookie-consent button", "Reject all").click();
    cy.get(".cookie-consent").should("not.exist");
    cy.get(GTAG_SELECTOR).should("not.exist");

    cy.window().then((win) => {
      const stored = JSON.parse(win.localStorage.getItem("portfolio-consent") || "{}");
      expect(stored.state.decided).to.eq(true);
      expect(stored.state.analytics).to.eq("denied");
    });
  });

  it("stores granted consent when accepting", () => {
    cy.contains(".cookie-consent button", "Accept all").click();
    cy.get(".cookie-consent").should("not.exist");

    cy.window().then((win) => {
      const stored = JSON.parse(win.localStorage.getItem("portfolio-consent") || "{}");
      expect(stored.state.analytics).to.eq("granted");
      expect(stored.state.monitoring).to.eq("granted");
    });
  });

  it("saves a granular choice from the preferences panel", () => {
    cy.contains(".cookie-consent button", "Configure").click();
    cy.get(".cookie-consent__options input[type=checkbox]").first().check();
    cy.contains(".cookie-consent button", "Save preferences").click();

    cy.window().then((win) => {
      const stored = JSON.parse(win.localStorage.getItem("portfolio-consent") || "{}");
      expect(stored.state.analytics).to.eq("granted");
      expect(stored.state.monitoring).to.eq("denied");
    });
  });

  it("lets the user reopen the panel from the footer and withdraw consent", () => {
    cy.contains(".cookie-consent button", "Accept all").click();
    cy.get(".cookie-consent").should("not.exist");

    cy.get(".footer-legal-button").click({ force: true });
    cy.get(".cookie-consent").should("be.visible");

    cy.contains(".cookie-consent button", "Reject all").click();
    cy.window().then((win) => {
      const stored = JSON.parse(win.localStorage.getItem("portfolio-consent") || "{}");
      expect(stored.state.analytics).to.eq("denied");
    });
  });

  it("reaches the three legal documents from the footer", () => {
    cy.contains(".cookie-consent button", "Reject all").click();

    cy.get(".footer-legal").contains("Legal notice").click({ force: true });
    cy.location("pathname").should("eq", "/en/legal");
    cy.contains("h1", "Legal notice");

    cy.get(".legal-nav").contains("Privacy").click();
    cy.location("pathname").should("eq", "/en/privacy");
    cy.contains("h1", "Privacy policy");

    cy.get(".legal-nav").contains("Cookies").click();
    cy.location("pathname").should("eq", "/en/cookies");
    cy.contains("h1", "Cookie policy");
  });
});
