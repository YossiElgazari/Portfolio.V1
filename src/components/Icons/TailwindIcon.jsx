import { useState } from 'react';
import PropTypes from 'prop-types';
import useTailWindConfig from '../../hooks/useTailWindConfig';

const TailwindIcon = ({ className = '', ...props }) => {
  const theme = useTailWindConfig();
  const lightGrey = theme.colors.lightgrey; 
  const tailwindColor = theme.colors.tailwind;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      title="Tailwind CSS"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={'w-9 h-9 md:w-12 md:h-12 ' + className}
      {...props}
    >
      <svg
        fill={isHovered ? tailwindColor : lightGrey}
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className='w-9 h-9 md:w-12 md:h-12'
        style={{
          transition: 'fill 0.3s ease-in-out',
        }}
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z" />      </svg>
    </div>
  );
};

TailwindIcon.propTypes = {
  className: PropTypes.string,
};

export default TailwindIcon;
