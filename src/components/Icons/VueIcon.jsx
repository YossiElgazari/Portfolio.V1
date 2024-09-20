import { useState } from 'react';
import PropTypes from 'prop-types';
import useTailWindConfig from '../../hooks/useTailWindConfig';

const VueIcon = ({ className = '', ...props }) => {
  const theme = useTailWindConfig();
  const lightGrey = theme.colors.lightgrey; 
  const vueColor1 = theme.colors.vue1; 
  const vueColor2 = theme.colors.vue2; 
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      title="Vue.js"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={'w-9 h-9 md:w-12 md:h-12 ' + className}
      {...props}
    >
      <svg
        width="800px"
        height="800px"
        viewBox="0 -17.5 256 256"
        className="w-9 h-9 md:w-12 md:h-12"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Green Path */}
          <path
            d="M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z"
            fill={vueColor1}
            style={{
              transition: 'opacity 0.5s ease',
              opacity: isHovered ? 1 : 0,
            }}
          />
          {/* Green Path */}
          <path
            d="M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z"
            fill={vueColor1}
            style={{
              transition: 'opacity 0.5s ease',
              opacity: isHovered ? 1 : 0,
            }}
          />
          {/* Dark Blue Path */}
          <path
            d="M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z"
            fill={vueColor2}
            style={{
              transition: 'opacity 0.5s ease',
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Grey paths for non-hover state */}
          <path
            d="M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z"
            fill={lightGrey}
            style={{
              transition: 'opacity 0.5s ease',
              opacity: isHovered ? 0 : 1,
            }}
          />
          <path
            d="M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z"
            fill={lightGrey}
            style={{
              transition: 'opacity 0.5s ease',
              opacity: isHovered ? 0 : 1,
            }}
          />
          <path
            d="M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z"
            fill={lightGrey}
            style={{
              transition: 'opacity 0.5s ease',
              opacity: isHovered ? 0 : 1,
            }}
          />
        </g>
      </svg>
    </div>
  );
};

VueIcon.propTypes = {
  className: PropTypes.string,
};

export default VueIcon;
