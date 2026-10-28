import { describe, expect, it } from "vitest";

import { getLastCommit } from "@/utils/github";

const PUSH = {
  type: "PushEvent",
  repo: { name: "maniacdi/portfolio" },
  created_at: "2026-10-27T10:00:00Z",
  payload: { head: "abc" },
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}

// Routes the two GitHub requests to canned responses.
function fakeFetcher(events: () => Response, commit: () => Response): typeof fetch {
  return (async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/events/public")) return events();
    if (url.includes("/commits/")) return commit();
    throw new Error(`unexpected ${url}`);
  }) as typeof fetch;
}

describe("getLastCommit", () => {
  it("returns the latest push with the first line of its message", async () => {
    const result = await getLastCommit(
      fakeFetcher(
        () => json([{ type: "WatchEvent" }, PUSH]),
        () => json({ commit: { message: "feat: x\n\nbody" } })
      )
    );
    expect(result).toEqual({
      repo: "portfolio",
      message: "feat: x",
      url: "https://github.com/maniacdi/portfolio/commit/abc",
      date: "2026-10-27T10:00:00Z",
    });
  });

  it("returns null when GitHub rate-limits the events request", async () => {
    const result = await getLastCommit(
      fakeFetcher(
        () => json({ message: "rate limited" }, 403),
        () => json({})
      )
    );
    expect(result).toBeNull();
  });

  it("returns null when there is no push event", async () => {
    const result = await getLastCommit(
      fakeFetcher(
        () => json([{ type: "WatchEvent" }]),
        () => json({})
      )
    );
    expect(result).toBeNull();
  });

  it("returns null when the network fails", async () => {
    const result = await getLastCommit((async () => {
      throw new Error("offline");
    }) as typeof fetch);
    expect(result).toBeNull();
  });

  it("keeps repo and date when the commit request fails", async () => {
    const result = await getLastCommit(
      fakeFetcher(
        () => json([PUSH]),
        () => json({}, 500)
      )
    );
    expect(result).toEqual({
      repo: "portfolio",
      message: null,
      url: "https://github.com/maniacdi/portfolio/commit/abc",
      date: "2026-10-27T10:00:00Z",
    });
  });
});
