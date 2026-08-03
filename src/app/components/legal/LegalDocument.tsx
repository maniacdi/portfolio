import type { LegalDoc, Locale } from "@/app/data/legalContent";

import "./LegalDocument.scss";

/**
 * Renderer for the legal documents in src/app/data/legalContent.ts.
 * Server component on purpose: these texts never need to reach the client
 * bundle, and none of them is interactive.
 */
export default function LegalDocument({ doc, locale }: { doc: LegalDoc; locale: Locale }) {
  const updatedLabel = locale === "es" ? "Última actualización" : "Last updated";

  return (
    <article className="legal-doc">
      <header className="legal-doc__header">
        <h1 className="page-title">{doc.title}</h1>
        <p className="legal-doc__updated">
          {updatedLabel}: {doc.updated}
        </p>
        <p className="legal-doc__intro">{doc.intro}</p>
      </header>

      {doc.sections.map((section) => (
        <section key={section.heading} className="legal-doc__section">
          <h2>{section.heading}</h2>

          {section.blocks.map((block, i) => {
            if (block.type === "p") {
              return <p key={i}>{block.text}</p>;
            }

            if (block.type === "ul") {
              return (
                <ul key={i}>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            return (
              <div key={i} className="legal-doc__table-wrap">
                <table>
                  <thead>
                    <tr>
                      {block.headers.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </section>
      ))}
    </article>
  );
}
