import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useScrollDirection from "../hooks/useScrollDirection";
import NavLink from "./NavLink";
import MobileMenu from "./MobileMenu";
import ResumeButton from "./ResumeButton";
import Logo from "./Logo";
import MenuButton from "./MenuButton";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = ({ introCompleted }) => {
  const scrollDirection = useScrollDirection({ thresholdPixels: 50 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setHasScrolled(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const smoothScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", smoothScroll);
    });

    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", smoothScroll);
      });
    };
  }, []);

  useEffect(() => {
    if (introCompleted) {
      const delayTimeout = setTimeout(() => {
        setShowNavbar(true);
      }, 2500);

      return () => clearTimeout(delayTimeout);
    }
  }, [introCompleted]);

  return (
    <>
      <nav
        className={`navbar z-30 w-full fixed py-1 lg:py-2 transition-all duration-300 
          ${showNavbar ? (scrollDirection === "down" ? "-translate-y-full" : "translate-y-0") : "-translate-y-full"}
          ${hasScrolled ? "bg-gradient-to-b from-transparent to-secondary shadow-lg backdrop-blur-md" : "bg-transparent pt-4 "}`}
      >
        <div className="flex justify-between items-center md:pt-0 py-2 mx-4 lg:py-3 lg:mx-20">
          <a href={navLinks[0].href} name={navLinks[0].name} className="cursor-pointer">
            <Logo className="w-10 h-10" width="555" height="562" viewBox="-10 -10 565 572" strokeOnly={false} animateOnHover={true} />
          </a>

          <ul className="hidden lg:flex space-x-20 uppercase text-lg">
            {navLinks.slice(1).map((link, index) => (
              <NavLink key={index} href={link.href} name={link.name} />
            ))}
          </ul>

          <div className="flex justify-end lg:hidden">
            <MenuButton onClick={toggleMenu} strokeOnly={true} />
          </div>

          <div className="hidden lg:flex justify-end cursor-pointer">
            <ResumeButton />
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        navLinks={navLinks}
        toggleMenu={toggleMenu}
      />
    </>
  );
};

Navbar.propTypes = {
  introCompleted: PropTypes.bool.isRequired,
};

export default Navbar;
