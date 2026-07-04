/// <reference types="cypress" />

describe("Navigation & Routes", () => {
  const locales = ["es", "en"];

  locales.forEach((locale) => {
    context(`[${locale.toUpperCase()}] Core pages load correctly`, () => {
      const routes = [
        { path: `/${locale}`, title: locale === "es" ? "Javi" : "Javi" },
        { path: `/${locale}/about`, title: locale === "es" ? "Sobre" : "About" },
        { path: `/${locale}/code`, title: locale === "es" ? "Código" : "Code" },
        { path: `/${locale}/hobbies`, title: locale === "es" ? "Hobbies" : "Hobbies" },
      ];

      routes.forEach(({ path, title }) => {
        it(`loads ${path} without errors`, () => {
          cy.visit(path);
          cy.skipTerminalLoader();
          cy.title().should("contain", title);
          cy.get("main.main-content").should("exist");
          cy.get(".header-container").should("be.visible");
          cy.get("footer").should("exist");
        });
      });
    });
  });

  it("serves root / in Spanish without redirect", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("html").should("have.attr", "lang", "es"); // o cualquier selector que confirme que es ES
  });

  it("shows 404 page for invalid routes", () => {
    cy.visit("/es/this-page-does-not-exist", { failOnStatusCode: false });
    cy.skipTerminalLoader();
    cy.get(".not-found-page", { timeout: 10000 }).should("exist");
    cy.contains("404").should("be.visible");
  });
});
