
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from '../assets/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const menuItems = [
    { label: 'Home', path: '/', anchorId: 'home' },
    { label: 'About', path: '/about', anchorId: 'about' },
    { label: 'Courses', path: '/courses', anchorId: 'courses' },
    { label: 'Features', path: '/features', anchorId: 'features' },
    { label: 'Staff', path: '/staff', anchorId: 'staff' },
  ];


  useEffect(() => {
    const onScroll = () => setIsCondensed(window.scrollY > 150);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  
  useEffect(() => {
    const setHeaderVar = () => {
      const h = headerRef.current?.offsetHeight ?? 200;
      document.documentElement.style.setProperty('--header-height', `${h}px`);
    };
    setHeaderVar();
    window.addEventListener('resize', setHeaderVar);
    return () => window.removeEventListener('resize', setHeaderVar);
  }, []);

  
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[data-section-id]'));
    if (!sections.length) return;

    const onScroll = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 200;
      let current = sections[0].dataset.sectionId || sections[0].id;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top - headerHeight <= 5) {
          current = section.dataset.sectionId || section.id;
        }
      }
      if (window.scrollY < 50) current = 'home';
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location]);

  const scrollToSection = (anchorId) => {
    const el = document.getElementById(anchorId);
    if (!el) return;
    const headerHeight = headerRef.current?.offsetHeight ?? 200;
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleItemClick = (e, item) => {
    if (location.pathname === '/' || location.pathname === '/home') {
      e.preventDefault();
      scrollToSection(item.anchorId);
      setIsOpen(false);
      return;
    }
    e.preventDefault();
    navigate(`/#${item.anchorId}`);
    setIsOpen(false);
  };

  return (
    <header ref={headerRef} className="w-full fixed top-0 left-0 z-50 bg-white shadow">
      {/* Top Maroon Bar */}
      <div className="bg-[#7c0000] text-white text-sm py-3 px-4 md:px-6 flex justify-between items-center font-bold">
        <div className="hidden md:flex space-x-6">
          <Link to="/events" className="hover:text-[#FFD700] transition">Events</Link>
          <Link to="/faq" className="hover:text-[#FFD700] transition">FAQs</Link>
          <Link to="/why-choose-us" className="hover:text-[#FFD700] transition">Why Choose Us</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition">Location</a>
          <Link to="/contact" className="hover:text-[#FFD700] transition">Contact</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-white">
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Middle Logo */}
      <div className="bg-white py-4 flex justify-center items-center border-b border-[#7c0000]">
        <img src={Logo} alt="AECA Logo" className="h-[80px] object-contain" />
      </div>

      {/* Desktop Nav */}
      <nav
        className={`bg-white px-4 md:px-6 border-b border-[#7c0000] hidden md:flex justify-center font-medium text-[#233651] text-sm transition-all ${isCondensed ? 'py-2' : 'py-3'}`}
      >
        <div className="flex items-center space-x-6">
          {menuItems.map((item) => {
            const isActive = activeSection === item.anchorId;
            return (
              <a
                key={item.anchorId}
                href={`#${item.anchorId}`}
                onClick={(e) => handleItemClick(e, item)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3 py-1 rounded-md transition ${
                  isActive
                    ? 'text-[#7c0000] bg-[#fbeaea] font-bold' // active: maroon text + light maroon background
                    : 'hover:text-[#7c0000] hover:bg-[#fdf2f2]' // inactive hover
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <Link
            to="/login"
            className="px-4 py-1 border border-[#7c0000] text-[#7c0000] hover:bg-[#7c0000] hover:text-white transition rounded"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-1 border border-[#7c0000] text-[#7c0000] hover:bg-[#7c0000] hover:text-white transition rounded"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="bg-white px-6 py-4 border-t border-[#7c0000] md:hidden space-y-4 text-sm text-[#233651] font-medium">
          {menuItems.map((item) => {
            const isActive = activeSection === item.anchorId;
            return (
              <a
                key={item.anchorId}
                href={`#${item.anchorId}`}
                onClick={(e) => handleItemClick(e, item)}
                className={`block px-3 py-2 rounded-md ${
                  isActive
                    ? 'text-[#7c0000] bg-[#fbeaea] font-bold'
                    : 'hover:text-[#7c0000] hover:bg-[#fdf2f2]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="flex space-x-4">
            <Link to="/login" className="inline-block border border-[#7c0000] text-[#7c0000] px-4 py-2 rounded hover:bg-[#7c0000] hover:text-white transition">Login</Link>
            <Link to="/register" className="inline-block border border-[#7c0000] text-[#7c0000] px-4 py-2 rounded hover:bg-[#7c0000] hover:text-white transition">Register</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
