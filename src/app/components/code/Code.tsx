"use client";

import { useTranslations } from "next-intl";

import TechCarousel from "../about/TechCarousel/TechCarousel";

import CodeHero from "./CodeHero";
import GitHubRepos from "./GitHubRepos";

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
