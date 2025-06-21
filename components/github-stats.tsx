"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star, GitFork, ExternalLink, Loader2 } from "lucide-react";

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export function GitHubStats() {
  const [repo, setRepo] = useState<GitHubRepo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_REPO = "swayamDev/contrast-checker";

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repository data");
        }
        const data = await response.json();
        setRepo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled
          className="bg-white/50 dark:bg-slate-800/50"
        >
          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          Loading...
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled
          className="bg-white/50 dark:bg-slate-800/50"
        >
          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          Loading...
        </Button>
      </div>
    );
  }

  if (error || !repo) {
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled
          className="bg-white/50 dark:bg-slate-800/50"
        >
          <Star className="h-4 w-4 mr-1" />
          Error
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled
          className="bg-white/50 dark:bg-slate-800/50"
        >
          <GitFork className="h-4 w-4 mr-1" />
          Error
        </Button>
      </div>
    );
  }

  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        asChild
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/50 hover:bg-yellow-50 hover:border-yellow-300 dark:hover:bg-yellow-950 transition-all duration-200"
      >
        <a
          href={`${repo.html_url}/stargazers`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Star this repository (${repo.stargazers_count} stars)`}
          title={`Star this repository (${repo.stargazers_count} stars)`}
        >
          <Star className="h-4 w-4 mr-1" />
          Star {formatCount(repo.stargazers_count)}
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="sm"
        asChild
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/50 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950 transition-all duration-200"
      >
        <a
          href={`${repo.html_url}/fork`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Fork this repository (${repo.forks_count} forks)`}
          title={`Fork this repository (${repo.forks_count} forks)`}
        >
          <GitFork className="h-4 w-4 mr-1" />
          Fork {formatCount(repo.forks_count)}
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </Button>
    </div>
  );
}
