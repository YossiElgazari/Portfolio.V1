import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { FaLink } from 'react-icons/fa';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ExpressIcon from './Icons/ExpressIcon';
import ReactIcon from './Icons/ReactIcon';
import TypescriptIcon from './Icons/TypescriptIcon';
import TailwindIcon from './Icons/TailwindIcon';
import NodejsIcon from './Icons/NodejsIcon';
import PythonIcon from './Icons/PythonIcon';
import ScikitLearnIcon from './Icons/ScikitLearnIcon';
import PandasIcon from './Icons/PandasIcon';
import NumpyIcon from './Icons/NumpyIcon';
import VueIcon from './Icons/VueIcon';
import MongoIcon from './Icons/MongoDBIcon';
import JavascriptIcon from './Icons/JavascriptIcon';
import GsapIcon from './Icons/GsapIcon';
import ExpoIcon from './Icons/ExpoIcon';
import MyButton from './MyButton';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  react: <ReactIcon />,
  typescript: <TypescriptIcon />,
  tailwind: <TailwindIcon />,
  node: <NodejsIcon />,
  express: <ExpressIcon />,
  python: <PythonIcon />,
  scikit: <ScikitLearnIcon />,
  pandas: <PandasIcon />,
  numpy: <NumpyIcon />,
  vue: <VueIcon />,
  mongodb: <MongoIcon />,
  javascript: <JavascriptIcon />,
  gsap: <GsapIcon />,
  expo: <ExpoIcon />,
};

const projects = [
  {
    title: "Hangman Game",
    description: "A modern take on the classic Hangman game with responsive design.",
    technologies: ['React', 'TypeScript', 'Gsap', 'Tailwind', 'Node', 'Express', 'MongoDB'],
    image: "/hangman.png",
    link: "https://hangman-ftuw.onrender.com/",
    text: "Watch Demo"
  },
  {
    title: "AI Model for Detecting Code Obfuscation",
    description: "An AI model aimed at detecting file obfuscation and identifying the obfuscator used.",
    technologies: ["Python", "Scikit", "Pandas", "Numpy"],
    image: "/aimodel.png",
    link: "https://github.com/TomerRaitsis/ML-Based-Detection-of-Code-Obfuscation",
    text: "View on GitHub"
  },
  {
    title: "Bump - Web Social Network",
    description: "A social networking web application built with agile methodology.",
    technologies: ["Vue", "Javascript", "Node", "Express", "MongoDB"],
    image: "/bump.png",
    link: "https://frontend-project-bl4f.onrender.com/",
    text: "Watch Demo"
  },
  {
    title: "PixelPals - Gamers Social App",
    description: "A social app for gamers to connect and share their gaming experiences.",
    technologies: ["React", "Expo", "Node", "Express", "MongoDB"],
    image: "/pixelpals.jpeg",
    link: "https://github.com/YossiElgazari/PixelPals",
    text: "View on GitHub"
  }
];

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#projects',
        start: '-40% top',
        end: 'bottom bottom',
        scrub: 1,
        once: true,
      },
    });

    tl.fromTo(
      ".projects-heading",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, ease: "power2.out", duration: 1 }
    );

    projects.slice(0, visibleProjects).forEach((_, index) => {
      tl.fromTo(
        `.project-card-${index}`,
        { y: -50, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          duration: 1,
        },
        '-=0.1' 
      );
    });

    tl.fromTo(
      ".mybutton",
      { opacity: 0, y: -50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, [visibleProjects]);




  const handleToggleProjects = () => {
    if (isExpanded) {
      setVisibleProjects(3);
      setIsExpanded(false);
    } else {
      setLoading(true);
      setTimeout(() => {
        setVisibleProjects(projects.length);
        setIsExpanded(true);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <section id="projects" className="relative py-8 md:py-12 xl:py-16 bg-secondary">
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2k:px-16 4k:px-24">
        <h1 className="projects-heading text-headline2 font-bold text-white mb-2 lg:mb-0 uppercase">
          <span className="text-primary ">{'//'}</span> Projects
        </h1>
        <div className="mt-4 lg:mt-8 space-y-10 md:space-y-20">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={index}
              className={`project-card-${index} overflow-y-hidden group flex flex-col min-h-[20rem] md:flex-row shadow-md shadow-black rounded-2xl transition-all duration-300 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="md:w-1/2 flex flex-col justify-between p-4 md:p-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl xl:text-4xl 2k:text-5xl font-bold text-lightgrey transition-colors duration-300 group-hover:text-white">{project.title}</h2>
                  <p className="text-body3 font-light text-lightgrey transition-colors duration-300 group-hover:text-white mt-4">{project.description}</p>
                </div>
                {/* Icons */}
                <div className="flex flex-wrap items-center justify-around">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={`z-20 md:z-0 flex justify-center items-center translate-y-6 md:translate-y-0 overflow-hidden transition-colors duration-300 w-9 h-9 md:w-12 md:h-12`}>
                      {iconMap[tech.toLowerCase()] || tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Image and Hover Overlay */}
              <div className={`h-[16rem] md:h-[22rem] relative md:w-1/2 flex justify-center items-center overflow-hidden rounded-2xl rounded-tl-none rounded-tr-none  ${index % 2 === 0 ? 'md:rounded-tl-none md:rounded-bl-none md:rounded-tr-2xl' : 'md:rounded-tr-none md:rounded-br-none md:rounded-tl-2xl'} `}>

                {/* Gradient for Desktop */}
                <div className={`hidden md:block absolute z-10 bg-gradient-to-l from-secondary to-transparent ${index % 2 === 0 ? 'bg-gradient-to-r' : ''} w-full h-full`}></div>

                {/* Gradient for Mobile */}
                <div className={`block md:hidden absolute z-10 bg-gradient-to-b from-secondary from-10% to-transparent to-85%  w-full h-full`}></div>

                {/* Hover Overlay for Desktop */}
                <div className="hidden absolute z-20 inset-0 bg-secondary bg-opacity-50 md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-white text-3xl font-bold hover:text-primary transition-colors duration-300">
                    {project.text}
                  </a>
                </div>

                {/* Mobile Link Icon */}
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <div className="z-10 md:hidden absolute bottom-4 right-4 border border-lightgrey active:border-primary2 bg-secondary p-3 rounded-full shadow-lg">
                    <FaLink className="w-6 h-6 fill-lightgrey active:fill-primary" />
                  </div>
                </a>

                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full opacity-100 object-cover shadow-lg transform transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mybutton flex justify-center mt-12">
          <MyButton onClick={handleToggleProjects}>
            {loading ? 'Loading...' : isExpanded ? 'Less Projects' : 'More Projects?'}
          </MyButton>
        </div>
      </div>
    </section>
  );
};

export default Projects;
