import GitHub from '../../assets/github.svg';
import PropTypes from 'prop-types';

const GitHubIcon = ({ className }) => {
  return (
    <img src={GitHub} alt="GitHub Logo" className={className} />
  );
};

GitHubIcon.propTypes = {
  className: PropTypes.string,
};

export default GitHubIcon;
