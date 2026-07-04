import { describe, expect,it } from "vitest";

import { profileData } from "@/utils/data/profileData";

describe("profileData", () => {
  // ---- Profile ----
  describe("profile", () => {
    it("has all required fields", () => {
      expect(profileData.profile.name).toBeTruthy();
      expect(profileData.profile.job).toBeTruthy();
      expect(profileData.profile.location).toBeTruthy();
      expect(profileData.profile.email).toBeTruthy();
      expect(profileData.profile.experience).toBeTruthy();
      expect(profileData.profile.bio).toBeTruthy();
      expect(profileData.profile.status).toBeTruthy();
    });

    it("has a valid email format", () => {
      expect(profileData.profile.email).toMatch(/^[\w.-]+@[\w.-]+\.\w+$/);
    });

    it("name matches expected value", () => {
      expect(profileData.profile.name).toBe("Javi García Magaldi");
    });
  });

  // ---- Skills ----
  describe("skills", () => {
    const categories = ["frontend", "backend", "tools", "languages"] as const;

    categories.forEach((category) => {
      it(`${category} has at least 1 skill`, () => {
        expect(profileData.skills[category].length).toBeGreaterThan(0);
      });

      it(`${category} skills have valid structure`, () => {
        profileData.skills[category].forEach((skill) => {
          expect(skill.name).toBeTruthy();
          expect(skill.years).toBeGreaterThanOrEqual(0);
          expect(skill.years).toBeLessThanOrEqual(15);
        });
      });
    });

    it("TypeScript is in languages with 5+ years", () => {
      const ts = profileData.skills.languages.find((s) => s.name === "TypeScript");
      expect(ts).toBeDefined();
      expect(ts!.years).toBeGreaterThanOrEqual(5);
    });

    it("React is in frontend with 5+ years", () => {
      const react = profileData.skills.frontend.find((s) => s.name === "React");
      expect(react).toBeDefined();
      expect(react!.years).toBeGreaterThanOrEqual(5);
    });
  });

  // ---- Contact ----
  describe("contact", () => {
    it("has email, github, and linkedin", () => {
      expect(profileData.contact.email).toBeTruthy();
      expect(profileData.contact.github).toBeTruthy();
      expect(profileData.contact.linkedin).toBeTruthy();
    });

    it("github URL contains maniacdi", () => {
      expect(profileData.contact.github).toContain("maniacdi");
    });

    it("linkedin URL contains javimagaldi", () => {
      expect(profileData.contact.linkedin).toContain("javimagaldi");
    });
  });
});
