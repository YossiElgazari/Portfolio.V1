import { useState } from 'react';
import PropTypes from 'prop-types';
import sklearnGreyLogo from '../../assets/scikit.svg';
import sklearnLogo from '../../assets/scikitog.svg';

const SklearnIcon = ({ className = '', ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      title="Scikit-Learn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={'w-9 h-9 md:w-12 md:h-12 relative' + className}
      {...props}
    >
      {/* Grey SVG */}
      <img
        src={sklearnGreyLogo}
        alt="Sklearn Grey Logo"
        className="absolute inset-0 w-9 h-9 md:w-12 md:h-12"
        style={{
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

      {/* Original Colored Logo */}
      <img
        src={sklearnLogo}
        alt="Sklearn Original Logo"
        className="absolute inset-0 w-9 h-9 md:w-12 md:h-12"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

SklearnIcon.propTypes = {
  className: PropTypes.string,
};

export default SklearnIcon;
