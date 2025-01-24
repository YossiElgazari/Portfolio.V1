import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import GitHubIcon from './Icons/GitHubIcon';
import gsap from 'gsap';
import { fetchGithubData } from '../utils/GitHubUtils';

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

  const token = import.meta.env.VITE_GITHUB_TOKEN;

  // Function to animate numbers counting upwards
  const animateCount = (ref, value, duration = 2) => {
    gsap.fromTo(
      ref.current,
      { innerText: 0 },
      {
        innerText: value,
        duration,
        ease: 'power1.out',
        snap: { innerText: 1 },
        onUpdate: () => {
          ref.current.innerText = Math.floor(ref.current.innerText);
        },
      }
    );
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGithubData(token);
        setGithubStats(data);
      } catch {
        setError("Error Fetching Data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [token]);

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
    <div className="w-full bg-secondary 380px:py-8 ">
      <div className="stats relative flex justify-between ">
        <div className="github absolute font-montserrat flex justify-center font-bold items-center h-full w-full text-headline4 gap-2 md:gap-4 md:text-headline3 opacity-5 select-none">
          <span className="hidden 380px:inline">Courtesy of GitHub</span>
          <GitHubIcon className="w-48 h-48 380px:w-10 380px:h-10 xl:w-14 xl:h-14" />
        </div>
        <div className="repos  z-10 p-1 lg:p-6 text-center">
          <p ref={totalReposRef} className="text-5xl md:text-6xl xl:text-8xl font-bold text-lightgrey">0</p>
          <h3 className="text-body3 lg:text-body1 font-bold text-primary">Repositories</h3>
        </div>
        <div className="commits z-10 p-1 lg:p-6 text-center">
          <p ref={totalCommitsRef} className="text-5xl md:text-6xl xl:text-8xl font-bold text-lightgrey">0</p>
          <h3 className="text-body3 lg:text-body1 font-bold text-primary">Commits</h3>
        </div>
        <div className="langs z-10 p-1 lg:p-6 text-center">
          <p ref={languagesRef} className="text-5xl md:text-6xl xl:text-8xl font-bold text-lightgrey">0</p>
          <h3 className="text-body3 lg:text-body1 font-bold text-primary">Languages</h3>
        </div>
      </div>
    </div>
  );
};

GitHubStats.propTypes = {
  complete: PropTypes.bool,
};

export default GitHubStats;
