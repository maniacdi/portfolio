const GITHUB_USERNAME = "maniacdi";
const GITHUB_API_URL = "https://api.github.com";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalLanguages: number;
  yearsActive: number;
}

/**
 * Fetch all public repositories from GitHub
 */
export async function fetchAllRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repos = await response.json();
    return repos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

/**
 * Fetch GitHub stats (repos count, languages, years active)
 */
export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const repos = await fetchAllRepos();

    if (repos.length === 0) {
      return {
        totalRepos: 11,
        totalLanguages: 5,
        yearsActive: 3,
      };
    }

    const languages = new Set(
      repos
        .map((repo) => repo.language)
        .filter((lang): lang is string => lang !== null)
    );

    const dates = repos.map((repo) => new Date(repo.created_at).getTime());
    const oldestRepo = Math.min(...dates);
    const yearsActive = Math.ceil(
      (Date.now() - oldestRepo) / (1000 * 60 * 60 * 24 * 365)
    );

    return {
      totalRepos: repos.length,
      totalLanguages: languages.size,
      yearsActive,
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return {
      totalRepos: 11,
      totalLanguages: 5,
      yearsActive: 3,
    };
  }
}

/**
 * Fetch featured repositories by names
 */
export async function fetchFeaturedRepos(
  repoNames: string[]
): Promise<GitHubRepo[]> {
  try {
    const allRepos = await fetchAllRepos();

    const featuredRepos = repoNames
      .map((name) => allRepos.find((repo) => repo.name === name))
      .filter((repo): repo is GitHubRepo => repo !== undefined);

    return featuredRepos;
  } catch (error) {
    console.error("Error fetching featured repos:", error);
    return [];
  }
}

/**
 * Get primary languages used across all repos
 */
export async function fetchPrimaryLanguages(): Promise<string[]> {
  try {
    const repos = await fetchAllRepos();

    const languageCount: { [key: string]: number } = {};

    repos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] =
          (languageCount[repo.language] || 0) + 1;
      }
    });

    const sortedLanguages = Object.entries(languageCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([lang]) => lang);

    return sortedLanguages;
  } catch (error) {
    console.error("Error fetching primary languages:", error);
    return ["TypeScript", "JavaScript", "React"];
  }
}