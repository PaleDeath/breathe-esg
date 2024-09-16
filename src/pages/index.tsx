import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logoAnimation = gsap.timeline();

    logoAnimation.to(logoRef.current, {
      top: '3rem',
      scale: 0.35,
      duration: 1.5,
      ease: 'power2.inOut',
      onComplete: () => {
        setScrollEnabled(true); 
      }
    });

    logoAnimation.to(contentRef.current, { opacity: 1, duration: 1, ease: 'power2.inOut', delay: 0.3 });

    logoAnimation.to(navbarRef.current, { scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.5 });
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let scrolling = false;

    const handleScroll = (event: WheelEvent) => {
      if (!scrolling && sections.length > 0) {
        scrolling = true;
        const direction = event.deltaY > 0 ? 'next' : 'prev';

        if (direction === 'next') {
          currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        } else {
          currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
        }

        const nextSection = sections[currentSectionIndex];
        nextSection.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          scrolling = false;
        }, 1000);
      }
    };

    if (scrollEnabled) {
      containerRef.current?.addEventListener('wheel', handleScroll);
    }

    return () => {
      containerRef.current?.removeEventListener('wheel', handleScroll);
    };
  }, [scrollEnabled]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div
        ref={logoRef}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all w-16 h-16"
        style={{ transformOrigin: 'center center' }}
      >
        <img src="/logo.svg" alt="Company Logo" className="w-full h-full" />
      </div>
      <div ref={contentRef} className="opacity-0">
        <div className="flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden">
          <section id="home" className="flex-none flex items-center justify-center h-full w-full bg-white snap-start">
            <h1 className="text-5xl font-Inter text-center font-thin">Streamline Sustainability</h1>
          </section>

          <section id="about" className="flex-none flex items-center justify-center h-full w-full bg-white snap-start">
            <h1 className="text-5xl font-Inter text-center font-thin">
              Need a sentence here that describes <br /> what we do and also sounds cool
            </h1>
          </section>

          <section id="services" className="flex-none flex items-center justify-center h-full w-full bg-white snap-start">
            <h1 className="text-3xl font-Inter font-thin">Our Services Section</h1>
          </section>
        </div>

        <div className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden">
          <section id="vertical" className="flex-none flex items-center justify-center h-screen w-full bg-white snap-start">
            <h1 className="text-3xl font-inter font-thin">Vertical Scroll Section</h1>
          </section>

          <section id="vertical-2" className="flex-none flex items-center justify-center h-screen w-full bg-white snap-start">
            <h1 className="text-3xl font-thin">Vertical Section 2</h1>
          </section>
        </div>

        <div className="flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden">
          <section id="horizontal-1" className="flex-none flex items-center justify-center h-full w-full bg-white snap-start">
            <h1 className="text-3xl font-thin">Horizontal Section 1</h1>
          </section>

          <section id="horizontal-2" className="flex-none flex items-center justify-center h-full w-full bg-white snap-start">
            <h1 className="text-3xl font-thin">Horizontal Section 2</h1>
          </section>
        </div>
      </div>

      <nav
        ref={navbarRef}
        className="fixed text-center bottom-8 left-1/2 transform -translate-x-1/2 bg-black rounded-md px-6 py-2 w-64 scale-0"
      >
        <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </button>
        <div
          className={`${
            menuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden absolute bottom-9 left-0 bg-black w-full rounded-md text-white duration-300 ease-in-out`}
        >
          <ul className="text-center">
            <li className={`py-2 ${activeSection === 'home' ? 'text-yellow-400' : ''}`}>
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            </li>
            <li className={`py-2 ${activeSection === 'about' ? 'text-yellow-400' : ''}`}>
              <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            </li>
            <li className={`py-2 ${activeSection === 'services' ? 'text-yellow-400' : ''}`}>
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            </li>
            <li className={`py-2 ${activeSection === 'vertical' ? 'text-yellow-400' : ''}`}>
              <a href="#vertical" onClick={() => setMenuOpen(false)}>Vertical</a>
            </li>
            <li className={`py-2 ${activeSection === 'horizontal-1' ? 'text-yellow-400' : ''}`}>
              <a href="#horizontal-1" onClick={() => setMenuOpen(false)}>Horizontal 1</a>
            </li>
            <li className={`py-2 ${activeSection === 'horizontal-2' ? 'text-yellow-400' : ''}`}>
              <a href="#horizontal-2" onClick={() => setMenuOpen(false)}>Horizontal 2</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
