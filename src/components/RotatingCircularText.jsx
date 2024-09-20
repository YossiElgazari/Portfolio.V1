import propTypes from "prop-types";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const RotatingCircularText = ({ introCompleted }) => {
  const email = "yossielg98@gmail.com";
  const circlingText = useRef(null);

  const handleMailTo = () => {
    window.location.href = `mailto:${email}`;
  };

  useEffect(() => {
    if (circlingText.current) {
      gsap.set(circlingText.current, { x: "100%", opacity: 0 });
      if (introCompleted) {
        gsap.to(circlingText.current, {
          x: 0,
          opacity: 1,
          duration: 3,
          delay: 3,
        });
      }
    }
  }, [introCompleted]);

  return (
    <div
      ref={circlingText}
      id="CircularText"
      className="hidden opacity-0 xl:block  fixed bottom-0 right-0 w-32 h-32 z-50"
    >
      <svg viewBox="0 0 100 100" className="animate-rotating-text">
        <defs>
          <path
            id="circlePath"
            d="M 50, 50
               m -30, 0
               a 30,30 0 1,1 60,0
               a 30,30 0 1,1 -60,0"
          />
        </defs>
        <text
          className={`text-xs tracking-widest font-light transition-colors duration-300 cursor-pointer fill-white hover:fill-primary`}
          onClick={handleMailTo}
        >
          <textPath href="#circlePath">{email}</textPath>
        </text>
      </svg>
    </div>
  );
};

RotatingCircularText.propTypes = {
  introCompleted: propTypes.bool.isRequired,
};

export default RotatingCircularText;
