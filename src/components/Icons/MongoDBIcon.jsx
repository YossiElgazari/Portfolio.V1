import { useState } from 'react';
import PropTypes from 'prop-types';
import useTailWindConfig from '../../hooks/useTailWindConfig';

const MongoIcon = ({ className = '', ...props }) => {
  const theme = useTailWindConfig();
  const lightGrey = theme.colors.lightgrey;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      title="MongoDB"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={'w-9 h-9 md:w-12 md:h-12 relative ' + className}
      {...props}
    >
      {/* Grey SVG */}
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-9 h-9 md:w-12 md:h-12"
        style={{
          fill: lightGrey,
          opacity: isHovered ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <path d="M16.62,30l-.751-.249s.1-3.8-1.275-4.067c-.9-1.048.133-44.741,3.423-.149a2.712,2.712,0,0,0-1.333,1.523A14.1,14.1,0,0,0,16.62,30Z" fill={lightGrey} />
        <path d="M17.026,26.329a13.223,13.223,0,0,0,5-13.225C20.556,6.619,17.075,4.487,16.7,3.673a9.792,9.792,0,0,1-.825-1.6l.277,18.069S15.578,25.664,17.026,26.329Z" fill={lightGrey} />
        <path d="M15.487,26.569S9.366,22.4,9.72,15.025A15.54,15.54,0,0,1,15.239,3.377,1.725,1.725,0,0,0,15.846,2c.381.82.319,12.243.359,13.579C16.36,20.776,15.916,25.588,15.487,26.569Z" fill={lightGrey} />
      </svg>

      {/* Original Colored Logo */}
      <svg
        width="800px"
        height="800px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-9 h-9 md:w-12 md:h-12"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        <defs>
          <linearGradient id="a" x1="-645.732" y1="839.188" x2="-654.59" y2="839.25">
            <stop offset="0.231" stopColor="#999875" />
            <stop offset="1" stopColor="#fbf9ef" />
          </linearGradient>
          <linearGradient id="b" x1="-644.287" y1="823.405" x2="-657.028" y2="845.476">
            <stop offset="0" stopColor="#48a547" />
            <stop offset="1" stopColor="#3f9143" />
          </linearGradient>
          <linearGradient id="c" x1="-643.386" y1="839.485" x2="-652.418" y2="833.417">
            <stop offset="0" stopColor="#41a247" />
            <stop offset="1" stopColor="#69b655" />
          </linearGradient>
        </defs>
        <path d="M16.62,30l-.751-.249s.1-3.8-1.275-4.067c-.9-1.048.133-44.741,3.423-.149a2.712,2.712,0,0,0-1.333,1.523A14.1,14.1,0,0,0,16.62,30Z" fill="url(#a)" />
        <path d="M17.026,26.329a13.223,13.223,0,0,0,5-13.225C20.556,6.619,17.075,4.487,16.7,3.673a9.792,9.792,0,0,1-.825-1.6l.277,18.069S15.578,25.664,17.026,26.329Z" fill="url(#b)" />
        <path d="M15.487,26.569S9.366,22.4,9.72,15.025A15.54,15.54,0,0,1,15.239,3.377,1.725,1.725,0,0,0,15.846,2c.381.82.319,12.243.359,13.579C16.36,20.776,15.916,25.588,15.487,26.569Z" fill="url(#c)" />
      </svg>
    </div>
  );
};

MongoIcon.propTypes = {
  className: PropTypes.string,
};

export default MongoIcon;
