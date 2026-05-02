/// <reference types="cypress" />

describe("Featured Projects Section", () => {
  beforeEach(() => {
    cy.visit("/en");
    // Skip terminal loader
    cy.get("body").click();
    cy.wait(500);
  });

  it("displays the featured projects section", () => {
    cy.get(".featured-projects").should("exist");
    cy.get(".projects-grid").should("exist");
  });

  it("shows Compras App as featured project", () => {
    cy.get(".project-card.featured").should("exist");
    cy.get(".project-card.featured").contains("Compras App");
  });

  it("displays 3 project cards total", () => {
    cy.get(".project-card").should("have.length", 3);
  });

  it("each project card has title, description, and tags", () => {
    cy.get(".project-card").each(($card) => {
      cy.wrap($card).find(".project-title").should("not.be.empty");
      cy.wrap($card).find(".project-description").should("not.be.empty");
      cy.wrap($card).find(".project-tags .tag").should("have.length.at.least", 1);
    });
  });

  it("project links point to correct GitHub repos", () => {
    cy.get(".project-card.featured .project-link.code")
      .should("have.attr", "href")
      .and("include", "github.com/maniacdi/compras-app");
  });
});
