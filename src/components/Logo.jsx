import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useTailWindConfig from '../hooks/useTailWindConfig';

const Logo = ({ className = '', strokeOnly = false, animateOnHover = false, ...props }) => {
    const theme = useTailWindConfig();
    const primaryColor = theme.colors.primary;
    const strokeColor = strokeOnly ? primaryColor : 'none';
    const fillColor = strokeOnly ? 'transparent' : primaryColor;
    const dropShadow = strokeOnly ? `drop-shadow(0 0 5px ${primaryColor})` : 'none';

    const logoRef = useRef(null);

    useEffect(() => {
        if (!animateOnHover) return;

        const x = [25, 25, 0, 0, -25, -25];
        const y = [-25, -25, 25, 25, -25, -25];


        // Hover animation
        const paths = gsap.utils.toArray('.navbar #logo path');
        const handleMouseEnter = () => {
            gsap.to(paths, {
                x: (i) => x[i],
                y: (i) => y[i],
                duration: 0.2,
                ease: 'power1.inOut',
            })
        };

        const handleMouseLeave = () => {
            gsap.to(paths, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power1.inOut',
            });
        };

        const logoElement = logoRef.current;

        logoElement.addEventListener('mouseenter', handleMouseEnter);
        logoElement.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners on component unmount
        return () => {
            logoElement.removeEventListener('mouseenter', handleMouseEnter);
            logoElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [animateOnHover]);
    ;


    return (
        <svg
            ref={logoRef}
            id="logo" width="300" height="300" viewBox="-250 -250 1055 1061.5"
            fill={fillColor}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
            style={{
                transition: 'transform 0.3s ease, fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease',
                transform: 'scale(1)',
                stroke: strokeColor,
                filter: dropShadow,
            }}
        >
            <path id="path-1" d="M555 0H498L286.5 203.5V264L555 0Z" strokeWidth="5" />
            <path id="path-2" d="M550 31.5V102.5L330 321L292 284L550 31.5Z" strokeWidth="5" />
            <path id="path-3" d="M286.5 303.5C286.5 404.255 286.5 460.745 286.5 561.5L331 529L330 344.5L286.5 303.5Z" strokeWidth="5" />
            <path id="path-4" d="M268.5 303.5C268.5 404.255 268.5 460.745 268.5 561.5L224 529L225 344.5L268.5 303.5Z" strokeWidth="5" />
            <path id="path-5" d="M5 31.5V102.5L225 321L263 284L5 31.5Z" strokeWidth="5" />
            <path id="path-6" d="M0 0H57L268.5 203.5V264L0 0Z" strokeWidth="5" />
        </svg>
    );
};

Logo.propTypes = {
    className: PropTypes.string,
    strokeOnly: PropTypes.bool,
    animateOnHover: PropTypes.bool,
};

export default Logo;
