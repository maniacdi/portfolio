import { ImageResponse } from "next/og";

import { getPost } from "@/utils/blog";

// Share card per post, in the site's look: dark background, solid ink, 1px
// borders and the blinking-cursor underscore as the brand mark.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Javi García Magaldi — Blog";

const COLORS = {
  bg: "#0a0a12",
  text: "#ecebf5",
  muted: "#a3a3bd",
  neon: "#6f00ff",
  neonMid: "#a259ff",
};

// Space Grotesk 700, the heading face of the site. Satori needs the raw font
// file (TTF), which next/font doesn't expose, so it's fetched from Google Fonts
// and cached. If that fails the card still renders with the default font.
async function loadHeadingFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700", {
      next: { revalidate: 60 * 60 * 24 * 30 },
    }).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } });
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const headingFont = await loadHeadingFont();
  const meta = getPost(slug, locale)?.meta;
  const title = meta?.title ?? "Blog";
  const readingLabel = meta
    ? locale === "en"
      ? `${meta.readingMinutes} min read`
      : `${meta.readingMinutes} min de lectura`
    : "";
  const dateLabel = meta?.date
    ? new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(meta.date))
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: COLORS.bg,
          borderLeft: `12px solid ${COLORS.neon}`,
          color: COLORS.text,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: COLORS.neonMid, letterSpacing: 1 }}>
          javimagaldi.com/blog
        </div>

        {/* One span per word so the cursor wraps with the last word. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 1040,
            fontFamily: headingFont ? "Space Grotesk" : undefined,
            fontSize: title.length > 70 ? 56 : 68,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title.split(" ").map((word, i) => (
            <span key={i} style={{ marginRight: "0.25em" }}>
              {word}
            </span>
          ))}
          <span style={{ color: COLORS.neonMid }}>_</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {(meta?.tags ?? []).slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "6px 16px",
                  border: `1px solid ${COLORS.neon}`,
                  color: COLORS.neonMid,
                  fontSize: 24,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 24, color: COLORS.muted }}>
            {dateLabel && <span>{dateLabel}</span>}
            {readingLabel && <span>{readingLabel}</span>}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: headingFont
        ? [{ name: "Space Grotesk", data: headingFont, weight: 700, style: "normal" }]
        : undefined,
    }
  );
}
