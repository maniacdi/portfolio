"use client";

import { MotionConfig } from "framer-motion";

import TechCarousel from "../about/TechCarousel/TechCarousel";

import CodeHero from "./CodeHero";
import GitHubRepos from "./GitHubRepos";

import "./Code.scss";

export default function Code() {
  return (
    // Hero and repo cards animate with framer-motion: honour reduced motion.
    <MotionConfig reducedMotion="user">
      <div className="code-page">
        <CodeHero />
        <TechCarousel />
        <GitHubRepos />
      </div>
    </MotionConfig>
  );
}
