
import { useEffect, useState, useRef } from 'react';
import GitHubIcon from './Icons/GitHubIcon';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const GitHubStats = ({ complete }) => {
  const totalReposRef = useRef(null);
  const totalCommitsRef = useRef(null);
  const languagesRef = useRef(null);
  const [githubStats, setGithubStats] = useState({
    totalRepos: 0,
    totalCommits: 0,
    languages: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  let token = null;

  token = import.meta.env.VITE_GITHUB_TOKEN;

  // Function to animate numbers counting upwards
  const animateCount = (ref, value, duration = 2) => {
    gsap.fromTo(
      ref.current,
      { innerText: 0 },
      {
        innerText: value,
        duration,
        ease: 'power1.out',
        snap: { innerText: 1 }, // Rounds to the nearest integer
        onUpdate: function () {
          ref.current.innerText = Math.floor(ref.current.innerText);
        }
      }
    );
  };

  // Fetch GitHub data
  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const headers = { Authorization: `token ${token}` };

        // Fetch Repositories (owned and contributed)
        const reposResponse = await fetch('https://api.github.com/user/repos?per_page=100&type=all', { headers });
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const repos = await reposResponse.json();
        const totalRepos = repos.length;

        let totalCommits = 0;
        let languageData = {};

        // Loop through each repository
        for (let repo of repos) {
          try {
            // Fetch commits for the repo
            const commitsResponse = await fetch(`${repo.commits_url.replace('{/sha}', '')}?per_page=30`, { headers });

            // Skip over repositories that return a 409 conflict status
            if (commitsResponse.status === 409) {
              continue; // Skip this repo silently without logging or erroring
            }

            if (commitsResponse.ok) {
              const commits = await commitsResponse.json();
              if (Array.isArray(commits) && commits.length > 0) {
                totalCommits += commits.length; // Increment commits
              }
            }

            // Fetch languages used in the repository
            const languagesResponse = await fetch(repo.languages_url, { headers });
            if (languagesResponse.ok) {
              const repoLanguages = await languagesResponse.json();
              for (let language in repoLanguages) {
                languageData[language] = (languageData[language] || 0) + 1;
              }
            }
          } catch {
            // Silently ignore errors, no console logs, and continue
          }
        }

        // Set the fetched data into state
        setGithubStats({ totalRepos, totalCommits, languages: languageData });
      } catch (error) {
        setError(error.message); // Critical error handling
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [token]);




  // Animate Dots while loading
  useEffect(() => {
    if (loading) {
      const dots = document.querySelectorAll('.dot');
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(dots, { duration: 0.5, scale: 1.5, stagger: 0.2 })
        .to(dots, { duration: 0.5, scale: 1, stagger: 0.2 });
      return () => tl.kill();
    }
  }, [loading]);

  // Trigger animations after data is loaded
  useEffect(() => {
    if (!loading && complete) {
      animateCount(totalReposRef, githubStats.totalRepos, 2);
      animateCount(totalCommitsRef, githubStats.totalCommits, 2);
      animateCount(languagesRef, Object.keys(githubStats.languages).length, 2);
    }
  }, [loading, githubStats, complete]);

  if (loading) {
    return (
      <div className="w-full bg-secondary my-4">
        <div className="container mx-auto text-center px-2 py-2 lg:px-8 xl:px-12 lg:py-8 xl:my-12">
          <div className="text-body1 font-bold text-lightgrey lg:mb-0 uppercase">
            Fetching From GitHub
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-secondary my-4">
        <div className="container mx-auto text-center px-2 py-2 lg:px-8 xl:px-12 lg:py-8 xl:my-12">
          <div className="text-body1 font-bold text-lightgrey lg:mb-0 uppercase">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-secondary">
      <div className="relative container mx-auto px-6 lg:px-8 xl:px-12">

        {/* GitHub Stats Cards */}
        <div className="stats relative grid grid-cols-1 py-2 380px:py-0 380px:grid-cols-3">
          {/* Low Opacity Background */}
          <div className="github absolute font-montserrat flex justify-center font-bold items-center h-full w-full text-headline4 gap-2 md:gap-4 md:text-headline3 opacity-5 select-none">
            <span className="hidden 380px:inline">Courtesy of GitHub</span>
            <GitHubIcon className="w-48 h-48 380px:w-10 380px:h-10 xl:w-14 xl:h-14" />
          </div>

          {/* Total Repositories */}
          <div className="repos z-10 p-1 lg:p-6 text-center">
            <p ref={totalReposRef} className="text-5xl md:text-6xl xl:text-8xl font-bold text-lightgrey">0</p>
            <h3 className="text-body3 lg:text-body1 font-bold text-primary">Repositories</h3>
          </div>

          {/* Total Commits */}
          <div className="commits z-10 p-1 lg:p-6 text-center">
            <p ref={totalCommitsRef} className="text-5xl md:text-6xl xl:text-8xl font-bold text-lightgrey">0</p>
            <h3 className="text-body3 lg:text-body1 font-bold text-primary">Commits</h3>
          </div>

          {/* Languages Used */}
          <div className="langs z-10 p-1 lg:p-6 text-center">
            <p ref={languagesRef} className="text-5xl md:text-6xl xl:text-8xl font-bold text-lightgrey">0</p>
            <h3 className="text-body3 lg:text-body1 font-bold text-primary">Languages</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

GitHubStats.propTypes = {
  complete: PropTypes.bool,
};

export default GitHubStats;