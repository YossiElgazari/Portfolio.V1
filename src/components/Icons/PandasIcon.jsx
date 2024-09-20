import { useState } from 'react';
import PropTypes from 'prop-types';
import pandasGreyLogo from '../../assets/pandas.svg';
import pandasLogo from '../../assets/pandasog.svg';

const PandasIcon = ({ className = '', ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      title="Pandas"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={'w-9 h-9 md:w-12 md:h-12 relative ' + className}
      {...props}
    >
      {/* Grey SVG */}
      <img
        src={pandasGreyLogo}
        alt="Pandas Grey Logo"
        className="absolute inset-0 w-9 h-9 md:w-12 md:h-12"
        style={{
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

      {/* Original Colored Logo */}
      <img
        src={pandasLogo}
        alt="Pandas Original Logo"
        className="absolute inset-0 w-9 h-9 md:w-12 md:h-12"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

PandasIcon.propTypes = {
  className: PropTypes.string,
};

export default PandasIcon;
