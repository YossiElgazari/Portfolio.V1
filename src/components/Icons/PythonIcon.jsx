import { useState } from 'react';
import PropTypes from 'prop-types';
import pythonGreyLogo from '../../assets/python.svg';
import pythonLogo from '../../assets/pythonog.svg';

const PythonIcon = ({ className = '', ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      title="Python"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={'w-9 h-9 md:w-11 md:h-11 relative ' + className}
      {...props}
    >
      {/* Grey SVG */}
      <img
        src={pythonGreyLogo}
        alt="Python Grey Logo"
        className="absolute inset-0 w-9 h-9 md:w-12 md:h-12"
        style={{
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />

      {/* Original Colored Logo */}
      <img
        src={pythonLogo}
        alt="Python Original Logo"
        className="absolute inset-0 w-9 h-9 md:w-12 md:h-12"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      />
    </div>
  );
};

PythonIcon.propTypes = {
  className: PropTypes.string,
};

export default PythonIcon;
