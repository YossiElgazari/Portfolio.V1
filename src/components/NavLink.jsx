import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';

const NavLink = ({ href, name, onClick }) => {
  const slashRef = useRef(null);

  useEffect(() => {
    // Initialize the GSAP animation for the slashes
    gsap.set(slashRef.current, { opacity: 0, x: -5 }); // Hide the slashes initially
  }, []);

  const handleMouseEnter = () => {
    // Trigger GSAP animation on hover
    gsap.to(slashRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    // Revert the GSAP animation on mouse leave
    gsap.to(slashRef.current, {
      opacity: 0,
      x: -5,
      duration: 0.5,
      ease: 'power2.in',
    });
  };

  return (
    <li className="relative">
      <a
        href={href}
        onClick={onClick}
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          ref={slashRef}
          className="text-primary absolute left-0 pointer-events-none"
        >
          {'//'}
        </span>
        {/* The link text */}
        <span className="relative pl-6">{name}</span>
      </a>
    </li>
  );
};

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default NavLink;
