import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Starfield from '../Starfield.jsx';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Hero = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const greetRef = useRef(null);
  const fullnameRef = useRef(null);
  const firstsenRef = useRef(null);
  const scrolltext = useRef(null);
  const fallingball = useRef(null);
  const [introWasShown] = useState(() => {
    const lastShownDate = localStorage.getItem('intro_last_shown');
    const currentDate = new Date().toDateString();
    return lastShownDate === currentDate;
  });

  const scrollOnClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    const vars = [greetRef.current, fullnameRef.current, firstsenRef.current];
    const text = "One Line at a Time";

    gsap.set(vars, { yPercent: 150, opacity: 1 });
    gsap.set(fallingball.current, { opacity: 0 });
    gsap.set(scrolltext.current, { opacity: 0, x: 5 });

    const tl = gsap.timeline({
      delay: introWasShown ? 0 : 3.5,
    });

    const tl2 = gsap.timeline();

    tl.to(vars, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.5,
      ease: "power2.Out",
    });

    tl.then(() => {
      tl2.to(cursorRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.Out",
        onStart: () => {
          cursorRef.current.style.visibility = "visible";
          cursorRef.current.classList.add('animate-blink');
        },
      })
        .to(textRef.current, {
          text: {
            value: text,
            newClass: "typing",
            oldClass: "typed",
          },
          duration: 3,
          ease: "power2.Out",
          onComplete: () => {
            cursorRef.current.style.display = "none";
            cursorRef.current.classList.remove('animate-blink');
          }
        }).to(fallingball.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.Out",
        }, '-=1.5').to(scrolltext.current, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power1.Out",
        }, '-=1.5')
    });
  }, [introWasShown]);

  return (

    <section id="home" className="relative z-10 hero h-[100svh] flex items-center justify-center border-b-2 border-white/10 ">
      <Starfield />
      <div className="font-chakraPetch	px-4 lg:px-6 relative">
        <div className="overflow-hidden">
          <div ref={greetRef} className="text-body1 font-light">
            <strong className="font-bold">Hi,</strong> my name is
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={fullnameRef} className="text-headline2">Yossi Elgazari</div>
        </div>
        <div className="overflow-hidden">
          <div ref={firstsenRef} className="text-headline2 text-primary">I Craft Digital Solutions,</div>
        </div>
        <div className="text-headline2 tracking-widest">
          <span ref={textRef}></span>
          <span className='invisible' ref={cursorRef}>|</span>
        </div>

        <div className="absolute -bottom-24 380px:-bottom-36 sm:-bottom-32 md:-bottom-36 xl:-bottom-1/3 2k:-bottom-1/2 left-1/2 transform -translate-x-1/2 cursor-pointer flex items-center " onClick={scrollOnClick}>
          {/* Scroll Text */}
          <div ref={scrolltext} className="absolute right-5 tracking-widest md:tracking-wide">
            <span className=" transform -rotate-90 text-lightgrey text-body5 font-montserrat inline-block">Scroll</span>
          </div>
          {/* Scroll Indicator */}
          <div ref={fallingball} className="scroll-indicator w-8 h-16 border-2 border-shade4 rounded-full flex justify-center items-center" >
            <div className="circle absolute top-2 w-3 h-3 bg-shade1 rounded-full animate-fall"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
