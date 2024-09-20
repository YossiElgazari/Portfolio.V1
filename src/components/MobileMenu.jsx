import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import XButton from './XButton';
import ResumeButton from './ResumeButton';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const MobileMenu = ({ isOpen, navLinks, toggleMenu }) => {
  const [isFullyClosed, setIsFullyClosed] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let timeout;

    if (isOpen) {
      setIsMounted(true);
      setIsFullyClosed(false);
      document.body.style.overflowY = 'hidden';
    } else if (isMounted) {
      timeout = setTimeout(() => {
        setIsFullyClosed(true);
        document.body.style.overflowY = 'auto';
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [isOpen, isMounted]);

  useEffect(() => {
    const handleScroll = () => {
      navLinks.forEach(link => {
        const section = document.getElementById(link.href.slice(1));
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(link.href);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navLinks]);


  return (
    <div
      className={`fixed z-30 top-0 right-0 h-full w-full backdrop-blur-lg transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'
        } ${isFullyClosed ? 'invisible' : 'visible'}`}
      onClick={toggleMenu}
    >
      <div
        className={`fixed top-0 right-0 h-full w-[80%] bg-secondary backdrop-blur-lg transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } flex flex-col justify-center items-center`}
        onClick={(e) => e.stopPropagation()}
      >
        <XButton onClick={toggleMenu} strokeOnly={true} />

        <div className="grid grid-rows-3 w-full h-screen">
          {/* Row 1: Logo centered at the top */}
          <div className="row-span-1 flex items-center justify-center relative">
            <Logo className="w-20 h-20" width="555" height="562" viewBox="-10 -10 565 572" strokeOnly={true} />
          </div>

          {/* Row 2: Menu centered in the middle */}
          <div className="row-span-1 flex flex-col items-center justify-center">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={toggleMenu}
                className={`navLink ${activeSection === link.href ? 'active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Row 3: Social links centered at the bottom */}
          <div className="row-span-1 flex flex-col items-center justify-center">
            <a className="mx-2">
              <ResumeButton />
            </a>
            {/* Links GitHub, Linkedin */}
            <div className="flex justify-center mt-8 lg:mt-12">
              <a href="https://github.com/YossiElgazari" target="_blank" rel="noopener noreferrer" className="mx-4">
                <FaGithub className="w-8 h-8 fill-white hover:fill-lightgrey transition-colors duration-300" />
              </a>
              <a href="https://www.linkedin.com/in/yossielgazari/" target="_blank" rel="noopener noreferrer" className="mx-4">
                <FaLinkedin className="w-8 h-8 fill-white hover:fill-lightgrey transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
