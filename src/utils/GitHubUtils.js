export const fetchGithubData = async (token) => {
    const cachedData = JSON.parse(localStorage.getItem('githubStats'));
  
    // Use cached data if it exists and is recent (e.g., within 1 hour)
    const cacheTimestamp = localStorage.getItem('githubStatsTimestamp');
    if (cachedData && cacheTimestamp && Date.now() - cacheTimestamp < 3600000) {
      return cachedData;
    }
  
    const headers = { Authorization: `token ${token}` };
    try {
      // Fetch Repositories (owned and contributed)
      const reposResponse = await fetch('https://api.github.com/user/repos?per_page=100&type=all', { headers });
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const repos = await reposResponse.json();
  
      const totalRepos = repos.length;
      let totalCommits = 0;
      let languageData = {};
  
      // Loop through each repository
      await Promise.all(
        repos.map(async (repo) => {
          try {
            // Fetch commits for the repo
            const commitsResponse = await fetch(
              `${repo.commits_url.replace('{/sha}', '')}?per_page=30`,
              { headers }
            );
  
            if (commitsResponse.ok) {
              const commits = await commitsResponse.json();
              if (Array.isArray(commits) && commits.length > 0) {
                totalCommits += commits.length;
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
            // Ignore fetch errors for individual repos
          }
        })
      );
  
      const data = { totalRepos, totalCommits, languages: languageData };
  
      // Cache the data in localStorage
      localStorage.setItem('githubStats', JSON.stringify(data));
      localStorage.setItem('githubStatsTimestamp', Date.now().toString());
  
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };