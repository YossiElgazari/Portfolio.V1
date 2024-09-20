import { useState } from 'react';
import PropTypes from 'prop-types';
import useTailWindConfig from '../../hooks/useTailWindConfig';

const NumpyIcon = ({ className = '', ...props }) => {
  const theme = useTailWindConfig();
  const lightGrey = theme.colors.lightgrey;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      title="Numpy"
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
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
        <g id="SVGRepo_iconCarrier">
          <polygon points="14.048 7.689 9.405 5.327 4.309 7.89 9.078 10.303 14.048 7.689" fill="#B9B9B9" />
          <polygon points="16.177 8.771 21.045 11.247 15.994 13.803 11.218 11.386 16.177 8.771" fill="#B9B9B9" />
          <polygon points="22.678 5.363 27.679 7.89 23.207 10.153 18.328 7.674 22.678 5.363" fill="#B9B9B9" />
          <polygon points="20.526 4.274 16.023 2 11.57 4.239 16.209 6.597 20.526 4.274" fill="#B9B9B9" />
          <polygon points="17.006 23.809 17.006 30 22.46 27.258 22.454 21.064 17.006 23.809" fill="#B9B9B9" />
          <polygon points="22.452 18.903 22.446 12.774 17.006 15.499 17.006 21.63 22.452 18.903" fill="#B9B9B9" />
          <polygon points="29 17.754 29 23.969 24.348 26.308 24.345 20.122 29 17.754" fill="#B9B9B9" />
          <polygon points="29 15.581 29 9.491 24.339 11.826 24.343 17.967 29 15.581" fill="#B9B9B9" />
          <path d="M15.08,15.5l-3.674-1.861v8.045S6.913,12.05,6.5,11.185a.9.9,0,0,0-.331-.264C5.361,10.5,3,9.29,3,9.29V23.5L6.266,25.26V17.832s4.445,8.607,4.49,8.7a4.026,4.026,0,0,0,.968,1.32c.635.423,3.357,2.073,3.357,2.073Z" fill="#B9B9B9" />
        </g>
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
        <polygon points="14.048 7.689 9.405 5.327 4.309 7.89 9.078 10.303 14.048 7.689" fill="#4dabcf" />
        <polygon points="16.177 8.771 21.045 11.247 15.994 13.803 11.218 11.386 16.177 8.771" fill="#4dabcf" />
        <polygon points="22.678 5.363 27.679 7.89 23.207 10.153 18.328 7.674 22.678 5.363" fill="#4dabcf" />
        <polygon points="20.526 4.274 16.023 2 11.57 4.239 16.209 6.597 20.526 4.274" fill="#4dabcf" />
        <polygon points="17.006 23.809 17.006 30 22.46 27.258 22.454 21.064 17.006 23.809" fill="#4dabcf" />
        <polygon points="22.452 18.903 22.446 12.774 17.006 15.499 17.006 21.63 22.452 18.903" fill="#4dabcf" />
        <polygon points="29 17.754 29 23.969 24.348 26.308 24.345 20.122 29 17.754" fill="#4dabcf" />
        <polygon points="29 15.581 29 9.491 24.339 11.826 24.343 17.967 29 15.581" fill="#4dabcf" />
        <path d="M15.08,15.5l-3.674-1.861v8.045S6.913,12.05,6.5,11.185a.9.9,0,0,0-.331-.264C5.361,10.5,3,9.29,3,9.29V23.5L6.266,25.26V17.832s4.445,8.607,4.49,8.7a4.026,4.026,0,0,0,.968,1.32c.635.423,3.357,2.073,3.357,2.073Z" fill="#4d77cf" />
      </svg>
    </div>
  );
};

NumpyIcon.propTypes = {
  className: PropTypes.string,
};

export default NumpyIcon;
