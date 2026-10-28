import { describe, expect, it } from "vitest";

import { buildSystemPrompt } from "@/app/api/chat/systemPrompt";
import { FEATURED_PROJECTS } from "@/app/data/projects";
import { profileData } from "@/utils/data/profileData";

describe("buildSystemPrompt", () => {
  const prompt = buildSystemPrompt("es");

  it("uses the role and experience from profileData", () => {
    expect(prompt).toContain(profileData.profile.job);
    expect(prompt).toContain(profileData.profile.experience);
  });

  it("mentions every project shown on the site", () => {
    for (const project of FEATURED_PROJECTS) {
      expect(prompt).toContain(project.title);
    }
  });

  it("includes every skill from profileData", () => {
    const skills = Object.values(profileData.skills).flat();
    for (const skill of skills) {
      expect(prompt).toContain(skill.name);
    }
  });

  it("never rates skills with percentages", () => {
    // "React (95%)" style self-ratings; real metrics like "un 40%" are fine.
    expect(prompt).not.toMatch(/\(\s*\d{1,3}\s*%\s*\)/);
  });

  it("keeps the CV figures", () => {
    expect(prompt).toContain("2014-2020");
    expect(prompt).toContain("40%");
    expect(prompt).not.toContain("60%)");
  });

  it("drops projects no longer featured", () => {
    expect(prompt).not.toContain("Insta Checker");
  });

  it("tells the model which locale the visitor is using", () => {
    expect(buildSystemPrompt("en")).toContain("inglés");
    expect(prompt).toContain("español");
  });
});

describe("buildSystemPrompt and unlaunched projects", () => {
  it("never gives the bot a link to a site that is not launched yet", () => {
    const prompt = buildSystemPrompt("es");
    expect(prompt).toContain("Ū Skin Store");
    expect(prompt).not.toContain("uskinstore.com");
  });
});
