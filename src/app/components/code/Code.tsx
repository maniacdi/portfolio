"use client";

import { useTranslations } from "next-intl";
import CodeHero from "./CodeHero";
import GitHubRepos from "./GitHubRepos";
import TechCarousel from "../about/TechCarousel/TechCarousel";
import "./Code.scss";

export default function Code() {
  const t = useTranslations("code");

  return (
    <div className="code-page">
      <CodeHero />
      <TechCarousel />
      <GitHubRepos />
    </div>
  );
}