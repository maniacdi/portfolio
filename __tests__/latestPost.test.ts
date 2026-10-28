import { describe, expect, it } from "vitest";

import { latestPostIn, type PostMeta } from "@/utils/blog";

const post = (slug: string, locale: string, date: string) =>
  ({ slug, locale, date, title: slug, excerpt: "", tags: [], readingMinutes: 1 }) as PostMeta;

describe("latestPostIn", () => {
  it("skips posts that only exist in the other language", () => {
    const posts = [post("solo-es", "es", "2026-10-20"), post("both", "en", "2026-09-09")];
    expect(latestPostIn(posts, "en")?.slug).toBe("both");
  });

  it("returns undefined when nothing is written in that language", () => {
    expect(latestPostIn([post("solo-es", "es", "2026-10-20")], "en")).toBeUndefined();
  });
});
