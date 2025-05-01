import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';
import useTailWindConfig from '../hooks/useTailWindConfig';
import Logo from './Logo';

const Intro = ({ onIntroComplete }) => {
  const theme = useTailWindConfig();
  const bgColor = theme.colors.secondary;
  const primaryColor = theme.colors.primary;
  const [shouldShowIntro, setShouldShowIntro] = useState(true);

  useEffect(() => {
    // Check if we should show the intro animation
    const checkIntroDisplay = () => {
      const lastShownDate = localStorage.getItem('intro_last_shown');
      const currentDate = new Date().toDateString();

      if (lastShownDate === currentDate) {
        // Already shown today, skip animation
        setShouldShowIntro(false);
        onIntroComplete();
        document.body.classList.add('overflow-y-auto');
        return false;
      }

      // Store current date as last shown
      localStorage.setItem('intro_last_shown', currentDate);
      return true;
    };

    const shouldProceed = checkIntroDisplay();
    if (!shouldProceed) return;

    const paths = gsap.utils.toArray('#welcome path');
    const logo = document.getElementById('logoz');
    if (logo) logo.style.opacity = 1;

    const tl = gsap.timeline({ defaults: { ease: 'ease.in', duration: 0.4, stagger: 0.1 } });

    tl.fromTo(paths[0], { x: 800, y: -800, opacity: 0 }, { x: 0, y: 0, opacity: 1 })
      .fromTo(paths[1], { x: 300, y: -300, opacity: 0 }, { x: 0, y: 0, opacity: 1 })
      .fromTo([paths[2]], { y: 300, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo([paths[3]], { y: 300, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo([paths[4]], { x: -300, y: -300, opacity: 0 }, { x: 0, y: 0, opacity: 1 })
      .fromTo([paths[5]], { x: -300, y: -300, opacity: 0 }, { x: 0, y: 0, opacity: 1 })
      .to(paths, { fill: primaryColor });

    tl.then(() => {
      gsap.to('#welcome', {
        opacity: 0,
        duration: 0.5,
        ease: 'ease',
        onComplete: () => {
          const heroElement = document.querySelector('#home');
          if (heroElement) {
            heroElement.scrollIntoView({ behavior: 'smooth' });
          }
          onIntroComplete();
        },
      });
      gsap.to('#welcome', {
        display: 'none',
        delay: 0.1,
        onComplete: () => {
          document.getElementById('welcome').style.display = 'none';
          gsap.killTweensOf(paths);
          document.body.classList.add('overflow-y-auto');
        },
      });
    });

  }, [onIntroComplete, bgColor, primaryColor]);

  if (!shouldShowIntro) {
    return null;
  }

  return (
    <section
      id="welcome"
      className="z-30 fixed inset-0 h-full bg-secondary flex items-center justify-center"
      aria-hidden="true"
    >
      <Logo id="logoz" className="opacity-0 w-60 h-60 xl:h-[20rem] xl:[20rem]" strokeOnly={true} />
    </section>
  );
};

Intro.propTypes = {
  onIntroComplete: PropTypes.func.isRequired,
};

export default Intro;