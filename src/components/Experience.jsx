import gsap from 'gsap';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    date: 'October 2024 - Present',
    role: 'Full Stack Developer',
    company: 'IVTechLTD',
    details:
      'As a Full Stack Developer at IVTechLTD, I work on a variety of projects, from front-end development to back-end services. I collaborate with cross-functional teams to design, develop, and maintain web applications. I also ensure that the applications are responsive, user-friendly, and meet the client’s requirements.',

  },
  {
    date: 'August 2023 – October 2023',
    role: 'Backend Engineer Intern',
    company: 'Bridgify',
    details:
      'During my time at Bridgify, I maintained and improved backend systems using Python. I focused on API integration and data processing, ensuring systems ran efficiently. I also wrote clean, efficient, and well-documented code, which contributed to the overall success of our projects.',
  },
];

const Experience = () => {
  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#experience',
          start: '-50% top',
          end: 'bottom bottom',
          scrub: 1,
          once: true,
        }
      });

      // Animation for the heading, arrow, bodyline, timeline, and tail
      tl.fromTo(".exp-heading", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out" })
        .fromTo(".arrowhead", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, '-=0.8')
        .fromTo(".bodyline", { height: 0 }, { height: '100%', duration: 0.5, ease: "power2.out" }, '-=0.5')
        .fromTo(".timeline", { height: 0 }, { height: '100%', duration: 1, ease: 'power3.out' })
        .fromTo(".tail", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, '-=0.8');

      // Animate the timeline cards one by one
      timelineData.forEach((_, index) => {
        const directionClass = index % 2 === 0 ? '.timeline-card-left' : '.timeline-card-right';
        tl.fromTo(
          `${directionClass}-${index}`,
          { opacity: 0, xPercent: index % 2 === 0 ? 30 : -80 },
          { opacity: 1, xPercent: index % 2 === 0 ? 0 : -50, duration: 1, ease: 'power3.out' },
          '-=0.7'
        );
      });

      // Hover effect for the timeline cards
      timelineData.forEach((_, index) => {
        const directionClass = index % 2 === 0 ? `.timeline-card-left-${index}` : `.timeline-card-right-${index}`;
        const hoverDirection = index % 2 === 0 ? 20 : -70; // Translate 60% based on left or right

        const element = document.querySelector(directionClass);

        element.addEventListener('mouseenter', () => {
          gsap.to(element, { xPercent: hoverDirection, duration: 0.3, ease: 'power2.out' });
        });

        element.addEventListener('mouseleave', () => {
          gsap.to(element, { xPercent: index % 2 === 0 ? 0 : -50, duration: 0.3, ease: 'power2.out' });
        });
      });


      return () => {

      };
    });

    // Mobile (less than 1024px) animation with slightly different settings
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#experience',
          start: '-50% top',
          end: 'bottom bottom',
          scrub: 1,
          once: true,
        }
      });

      tl.fromTo(".exp-heading", { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out" })
        .fromTo(".arrowhead", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, '-=0.8')
        .fromTo(".bodyline", { height: 0 }, { height: '100%', duration: 0.5, ease: "power2.out" }, '-=0.5')
        .fromTo(".timeline", { height: 0 }, { height: '100%', duration: 1, ease: 'power3.out' },)
        .fromTo(".tail", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, '-=0.8');

      timelineData.forEach((_, index) => {
        const directionClass = index % 2 === 0 ? '.timeline-card-left' : '.timeline-card-right';
        tl.fromTo(
          `${directionClass}-${index}`,
          { opacity: 0, xPercent: -10 },
          { opacity: 1, xPercent: 0, duration: 1, ease: 'power1.out' },
          '-=0.7'
        );
      });

      return () => { };
    });

    // Cleanup function to revert the animations and ScrollTriggers
    return () => mm.revert();
  }, []);

  return (
    <section id="experience" className="relative py-8 md:py-12 xl:py-16">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2k:px-16 4k:px-24">
        <h1 className="exp-heading text-headline2 font-bold text-white mb-12 md:mb-20 uppercase">
          <span className="text-primary">{'//'}</span> Experience
        </h1>
        <div className="relative flex justify-center">
          {/* Top and Bottom Arrows */}
          <div className="bodyline absolute transform -translate-y-8 h-8 w-1 bg-darkgrey"></div>
          <div className="arrowhead absolute transform -translate-y-8 w-4 h-4 border-4 border-darkgrey border-b-0 border-r-0 rotate-45 bg-transparent"></div>
          <div className="tail timeline absolute bottom-0 transform translate-y-4 h-4 w-1 bg-darkgrey"></div>

          {/* Timeline */}
          <div className="timeline absolute h-full w-1 bg-darkgrey"></div>

          {/* Timeline Content */}
          <div className="space-y-12 max-lg:overflow-x-hidden">
            {timelineData.map((item, index) => (
              <div key={index} className="relative flex">
                {/* Timeline Card */}
                <div
                  className={`group bg-secondary lg:bg-transparent border-4 rounded-xl border-darkgrey text-lightgrey p-6 transition-all duration-300 hover:rounded-xl hover:border-primary2 lg:hover:scale-110 shadow-lg
                  ${index % 2 === 0
                      ? `timeline-card-left-${index} lg:rounded-tl-none lg:border-l-0 lg:rounded-bl-none translate-x-0 lg:translate-x-1/2 lg:hover:border-l-4`
                      : `timeline-card-right-${index} lg:rounded-tr-none lg:border-r-0 lg:rounded-br-none translate-x-0 lg:-translate-x-1/2 lg:hover:border-r-4`
                    }
                  mx-auto w-full sm:w-[28rem] md:w-[30rem] lg:w-[32rem]`}
                >
                  <p className="text-xs text-lightgrey mb-2">{item.date}</p>
                  <h2 className="text-body1 font-semibold text-white transition-colors duration-300 group-hover:text-primary">
                    {item.role}
                  </h2>
                  <p className="text-sm text-grey mb-4 transition-colors duration-300 group-hover:text-white">
                    {item.company}
                  </p>
                  <p className="text-sm text-lightgrey transition-colors duration-300 group-hover:text-white">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
