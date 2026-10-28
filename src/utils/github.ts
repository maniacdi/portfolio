export interface LastCommit {
  repo: string;
  // null when the second request (commit detail) fails.
  message: string | null;
  url: string;
  date: string;
}

export const GITHUB_USER = "maniacdi";

const API = "https://api.github.com";

interface PushEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { head: string };
}

// Unauthenticated (60 req/h per IP); revalidating hourly keeps it to ~2/h.
async function getJson<T>(fetcher: typeof fetch, url: string): Promise<T | null> {
  try {
    const res = await fetcher(url, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

// Latest public push. The events feed no longer carries commit messages, so
// the message comes from a second request; null means show the profile link.
export async function getLastCommit(fetcher: typeof fetch = fetch): Promise<LastCommit | null> {
  const events = await getJson<PushEvent[]>(fetcher, `${API}/users/${GITHUB_USER}/events/public`);
  const push = Array.isArray(events) ? events.find((e) => e.type === "PushEvent") : undefined;
  if (!push) return null;

  const { name } = push.repo;
  const { head } = push.payload;
  const detail = await getJson<{ commit?: { message?: string } }>(
    fetcher,
    `${API}/repos/${name}/commits/${head}`
  );

  return {
    repo: name.replace(`${GITHUB_USER}/`, ""),
    message: detail?.commit?.message?.split("\n")[0] ?? null,
    url: `https://github.com/${name}/commit/${head}`,
    date: push.created_at,
  };
}
