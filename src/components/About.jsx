import { useEffect, useState } from 'react';
import GitHubStats from './GitHubStats';
import { HiAnnotation } from "react-icons/hi";
import { HiFlag } from "react-icons/hi2";
import { BiSolidJoystick } from "react-icons/bi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "-50% top",
        end: "bottom bottom",
        scrub: 1,
        once: true,
      }
    });

    // About heading animation
    tl.fromTo(".about-heading", {
      opacity: 0,
      x: -50,
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out"
    })

      // Title1 and Paragraph1 come from the left
      .fromTo([".title1", ".para1"], {
        opacity: 0,
        x: -50,
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      })

      // Title2 and Paragraph2 come from the left, staggered
      .fromTo([".title2", ".para2"], {
        opacity: 0,
        x: -50,
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.7") 

      // Title3 and Paragraph3 come from the left, staggered
      .fromTo([".title3", ".para3"], {
        opacity: 0,
        x: -50,
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.7")

      // Profile picture comes in with opacity but without moving it horizontally
      .fromTo(".pic", {
        x: 50,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setComplete(true)
        }
      }, "-=1")

      // GitHub Stats animation
      .fromTo(".stats", {
        opacity: 0,
        y: -20,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.5");
  }, []);

  return (
    <section id="about" className="relative py-4 md:py-6 xl:py-12">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2k:px-16 4k:px-24 pb-6 max-lg:overflow-x-hidden">
        {/* About Heading */}
        <h1 className="about-heading text-headline2 font-bold text-white mb-6 lg:mb-0 uppercase">
          <span className="text-primary">{'//'}</span> ABOUT
        </h1>

        <div className="grid grid-cols-12 gap-6 xl:gap-8">

          {/* Left Column */}
          <div className="col-span-12 xl:col-span-8 flex flex-col gap-4">
            <span className="title1 text-body1 leading-3 md:leading-normal font-bold text-white flex items-center gap-2">Quick Recap <HiAnnotation /></span>
            <p className="para1 text-body3 text-lightgrey">
              From an early age, I’ve had a natural affinity for technology — always curious, always exploring.
              My journey into the world of software development began with a drive for gaming, which soon expanded into programming.
              This blend of early interests ignited my passion to build, create, and innovate within the tech space, transforming ideas into real-life solutions.
            </p>
            <span className="title2 text-body1 leading-3 md:leading-normal font-bold text-white flex items-center gap-2 ">My Ambitions <HiFlag /></span>
            <p className="para2 text-body3 text-lightgrey">
              Throughout my journey, I’ve built a strong foundation in software engineering principles, with a focus on object-oriented programming, data structures, and design patterns.
              My experience spans complex projects that require innovative thinking and creative problem-solving.
              I’m always pursuing opportunities to learn more and push the boundaries of my knowledge.
            </p>
            <span className="title3 text-body1 leading-3 md:leading-normal font-bold text-white flex items-center gap-2">Beyond The Screen <BiSolidJoystick /></span>
            <p className="para3 text-body3 text-lightgrey">
              My interests revolve around the world of gaming and software development. Besides that, I enjoy bicycling, playing football, hanging out with friends, going on trips and traveling a lot.
            </p>
          </div>

          {/* Right Column - Profile Image */}
          <div className="col-span-12 xl:col-span-4 flex justify-center xl:justify-end 2k:justify-center ">
            <img
              src="/profile.png"
              alt="profile"
              className="pic sticky top-24 w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 p-1 rounded-3xl"
              draggable="false"
            />
          </div>
        </div>
      </div>
      {/* GitHub Stats */}
      <div className="stats">
        <GitHubStats complete={complete} />
      </div>
    </section>
  );
};

export default About;
