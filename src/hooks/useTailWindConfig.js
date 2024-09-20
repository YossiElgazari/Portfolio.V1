import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js'; // Adjust this path as needed

const useTailWindConfig = () => {
  const fullConfig = resolveConfig(tailwindConfig);
  return fullConfig.theme;
};

export default useTailWindConfig;
