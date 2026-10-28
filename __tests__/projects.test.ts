import { describe, expect, it } from "vitest";

import {
  CLIENT_PROJECTS,
  getProjectBySlug,
  liveUrl,
  projectLink,
  SERVICE_PROOF,
} from "@/app/data/projects";

describe("client projects", () => {
  it("lists the two client sites with a full-page capture", () => {
    expect(CLIENT_PROJECTS.map((p) => p.slug)).toEqual(["umedicinaestetica", "uskinstore"]);
    for (const p of CLIENT_PROJECTS) {
      expect(p.fullImage).toMatch(/^\/images\/projects\/.+\/full\.webp$/);
    }
  });

  it("maps every service to an existing project", () => {
    for (const slug of Object.values(SERVICE_PROOF)) {
      expect(getProjectBySlug(slug)).toBeDefined();
    }
  });

  it("links an unlaunched project to its case study, never the live site", () => {
    expect(projectLink(getProjectBySlug("uskinstore")!)).toEqual({
      href: "/projects/uskinstore",
      external: false,
    });
  });

  it("links a launched project with a demo to the live site", () => {
    expect(projectLink(getProjectBySlug("umedicinaestetica")!)).toEqual({
      href: "https://umedicinaestetica.com",
      external: true,
    });
  });
});

describe("liveUrl", () => {
  it("hides the live site of an unlaunched project from the case study", () => {
    expect(liveUrl("uskinstore", "https://uskinstore.com")).toBeUndefined();
  });

  it("keeps the live site of launched or unknown projects", () => {
    expect(liveUrl("umedicinaestetica", "https://umedicinaestetica.com")).toBe(
      "https://umedicinaestetica.com",
    );
    expect(liveUrl("otro", "https://x.dev")).toBe("https://x.dev");
  });
});
