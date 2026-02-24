
import { AboutSection } from "@/app/components/about/AboutMeSection/AboutMeSection";

import "@/styles/page.scss";

export default async function AboutPage() {

  return (
    <main className="page-container">
      <AboutSection className="about-page" />
    </main>
  );
}
