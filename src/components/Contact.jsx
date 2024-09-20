import { useState, useEffect } from 'react';
import MyButton from './MyButton';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: '-30% top',
        end: 'bottom bottom',
        scrub: 1,
        once: true,
      },
    });

    // Title animation: slide in from the left
    tl.fromTo(".contact-heading",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, ease: 'power2.out', duration: 1 }
    );

    // Subtitle and text animation: appear from the top
    tl.fromTo(".contact-text",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 1 },
    );

    // Form elements animation: scale in
    tl.fromTo(".form",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, ease: 'power2.out', duration: 1 },
    );

    // Social media icons animation: appear from the bottom
    tl.fromTo(".icons",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 1 },
    );

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;

    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    emailjs.send(serviceId, templateId, {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Yossi Elgazari',
      reply_to: formData.email
    }, userId)
      .then(() => {
        setLoading(false);
        setSuccessMessage('Your message has been sent successfully!');
        setErrorMessage('');
        setFormData({
          name: '',
          email: '',
          message: ''
        });

        // Reset success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage('Something went wrong. Please try again.');
        setSuccessMessage('');
      });
  };

  return (
    <section id="contact" className="relative pt-8 md:pt-12 xl:pt-16">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 xl:px-12">
        <h1 className="contact-heading text-headline2 font-bold text-white mb-4 md:mb-12 uppercase">
          <span className="text-primary">{'//'}</span> Contact
        </h1>
        <div className="contact-text mx-auto max-w-5xl text-body2 font-light text-center text-lightgrey overflow-y-hidden">
          <h2 className='font-bold text-body1'>Let’s Connect!</h2>
          <p>Whether you’re interested in collaborating, have a job offer, or just want to chat about technology, I’d love to hear from you.</p>
        </div>

        <div className="mt-8 lg:mt-12 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="form w-full max-w-xl border-4 border-darkgrey p-6 rounded-xl bg-secondary group hover:border-primary2 transition-colors duration-300 shadow-lg"
          >
            <div className="mb-4 contact-input-wrapper">
              <label className="block text-lightgrey text-body3 mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="contact-input w-full px-3 py-2 text-body5 bg-secondary focus:bg-darkgrey text-white border-2 border-darkgrey rounded focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4 contact-input-wrapper">
              <label className="block text-lightgrey text-body3 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="contact-input w-full px-3 py-2 text-body5 bg-secondary focus:bg-darkgrey text-white border-2 border-darkgrey rounded focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lightgrey text-body3 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                className="contact-textarea w-full px-3 py-2 text-body5 bg-secondary focus:bg-darkgrey text-white border-2 border-darkgrey rounded focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <div className="flex justify-center">
              <MyButton>
                {loading ? 'Sending...' : successMessage ? 'Sent!' : 'Send Message'}
              </MyButton>
              {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            </div>
          </form>
        </div>

        {/* Links GitHub, Linkedin */}
        <div className="icons flex justify-center mt-8 lg:mt-12">
          <a href="https://github.com/YossiElgazari" target="_blank" rel="noopener noreferrer" className="mx-4">
            <FaGithub className="w-8 h-8 md:w-10 md:h-10 fill-white hover:fill-lightgrey transition-colors duration-300" />
          </a>
          <a href="https://www.linkedin.com/in/yossielgazari/" target="_blank" rel="noopener noreferrer" className="mx-4">
            <FaLinkedin className="w-8 h-8 md:w-10 md:h-10 fill-white hover:fill-lightgrey transition-colors duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
