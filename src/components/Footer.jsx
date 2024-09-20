
import { useEffect, useState } from 'react';

const Footer = () => {
    const [stars, setStars] = useState(0);
    const [forks, setForks] = useState(0);
    const [error, setError] = useState(null);

    let token = null;

    token = import.meta.env.VITE_GITHUB_TOKEN;

    useEffect(() => {
        // Fetch GitHub data (stars and forks)
        const fetchGitHubData = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/YossiElgazari/Hangman', {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch repository data');
                }

                const data = await response.json();
                setStars(data.stargazers_count);
                setForks(data.forks_count);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchGitHubData();
    }, [token]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <footer className="py-6 px-4 flex flex-col items-center justify-center bg-secondary">
            <a
                href="https://github.com/YossiElgazari/Portfolio.V1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center group relative top-2"
            >
                <p className="text-sm text-lightgrey group-hover:text-shade4 transition-colors duration-300 ease ">
                    2024 © Yossi Elgazari
                </p>
                <div className="flex justify-center items-center mt-2 space-x-4">
                    <div className="flex items-center space-x-1">
                        <img
                            src="/star.svg"
                            alt="Star Icon"
                            title="Git Star"
                            className="w-3 h-3"
                        />
                        <span className="text-xs w-6 text-lightgrey group-hover:text-shade4 transition-colors duration-300 ease">
                            {stars}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <img
                            src="/git-fork.svg"
                            alt="Fork Icon"
                            title="Git Fork"
                            className="h-3"
                        />
                        <span className="text-xs w-6 text-lightgrey group-hover:text-shade4 transition-colors duration-300 ease">
                            {forks}
                        </span>
                    </div>
                </div>
            </a>
        </footer>
    );
};

export default Footer;