"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaBook, FaUserGraduate, FaChalkboardTeacher, FaUserTie, FaShieldAlt, FaUser, FaSignInAlt, FaVial } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const categories = [
  {
    title: "9th & 10th Class",
    desc: "Matric preparation with chapter-wise tests, MCQs, and past papers. Board-wise practice and smart analytics.",
    btn: "View Details",
    stats: "1200+ students cleared",
    details: "Board: Punjab, Sindh, KPK, Federal"
  },
  {
    title: "1st & 2nd Year",
    desc: "Intermediate board-wise syllabus, smart test tools, and solved past papers. Personalized progress tracking.",
    btn: "View Details",
    stats: "900+ students cleared",
    details: "Board: Punjab, Sindh, KPK, Federal"
  },
  {
    title: "MDCAT & ECAT",
    desc: "Entry test preparation for medical and engineering fields. Timed mock tests and expert guidance.",
    btn: "View Details",
    stats: "700+ students cleared",
    details: "Includes: UHS, NUST, GIKI, PIEAS"
  },
  {
    title: "CSS & PMS",
    desc: "Comprehensive test systems for competitive exams. Essay, GK, and interview preparation.",
    btn: "View Details",
    stats: "300+ students cleared",
    details: "Federal & Provincial"
  },
  {
    title: "ISSB",
    desc: "Psychological & physical tests for ISSB candidates. Interview and group task practice.",
    btn: "View Details",
    stats: "150+ students cleared",
    details: "Army, Navy, PAF"
  },
  {
    title: "Army / Navy / PAF",
    desc: "Test prep for military forces recruitment & selections. Physical, IQ, and interview modules.",
    btn: "View Details",
    stats: "200+ students cleared",
    details: "All branches"
  },
  {
    title: "Other Courses",
    desc: "Explore more: BBA, B.Com, Law, Aptitude, and more. Specialized modules for every field.",
    btn: "See All",
    stats: "New courses added monthly",
    details: "Contact us for details"
  }
];

const textVariations = [
  "Together, we prepare students for every test",
  "Together, we build academic excellence",
  "Together, we conquer all exams",
  "Together, we achieve success"
];

const Main = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);
  const [fadeState, setFadeState] = useState('fade-in');
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const router = useRouter();

  // Typewriter effect for hero headline
  useEffect(() => {
    const fullText = textVariations[currentTextIndex];
    if (!isDeleting && displayedText.length < fullText.length) {
      typingTimeout.current = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === fullText.length) {
      typingTimeout.current = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && displayedText.length > 0) {
      typingTimeout.current = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % textVariations.length);
    }
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [displayedText, isDeleting, currentTextIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'categories', 'contact'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Modern Glassmorphism Header */}
      <header className="backdrop-blur-md bg-white/70 shadow-lg fixed w-full z-20 top-0 left-0 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer select-none" onClick={() => scrollToSection('home')}>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 text-white p-2 rounded-xl mr-3 shadow-lg">
              <FaBook className="text-2xl" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-blue-800 drop-shadow-sm">ExamEagle</span>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className={`transition-all px-2 py-1 rounded-lg text-lg font-medium ${activeSection === 'home' ? 'bg-blue-100 text-blue-700 shadow' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className={`transition-all px-2 py-1 rounded-lg text-lg font-medium ${activeSection === 'features' ? 'bg-blue-100 text-blue-700 shadow' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('categories')} 
              className={`transition-all px-2 py-1 rounded-lg text-lg font-medium ${activeSection === 'categories' ? 'bg-blue-100 text-blue-700 shadow' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
            >
              Courses
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={`transition-all px-2 py-1 rounded-lg text-lg font-medium ${activeSection === 'contact' ? 'bg-blue-100 text-blue-700 shadow' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
            >
              Contact
            </button>
            <button
              onClick={() => setShowDemoModal(true)}
              className="transition-all px-2 py-1 rounded-lg text-lg font-medium flex items-center gap-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <FaVial className="text-blue-500" /> Demo Test
            </button>
          </nav>
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              className="px-5 py-2 text-blue-700 font-semibold rounded-lg border border-blue-600 bg-white hover:bg-blue-50 shadow-sm transition flex items-center gap-1"
              onClick={onRegisterClick}
            >
              <FaUser className="inline" /> Register
            </button>
            <button className="px-5 py-2 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-600 transition flex items-center gap-1">
              <FaSignInAlt className="inline" /> Login
            </button>
          </div>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-blue-700 focus:outline-none p-2 rounded-lg hover:bg-blue-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 py-4 px-6 shadow-lg border-t border-blue-100">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => { scrollToSection('home'); setIsMenuOpen(false); }} 
                className={`text-left px-4 py-2 rounded-lg text-lg font-medium ${activeSection === 'home' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { scrollToSection('features'); setIsMenuOpen(false); }} 
                className={`text-left px-4 py-2 rounded-lg text-lg font-medium ${activeSection === 'features' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`}
              >
                Features
              </button>
              <button 
                onClick={() => { scrollToSection('categories'); setIsMenuOpen(false); }} 
                className={`text-left px-4 py-2 rounded-lg text-lg font-medium ${activeSection === 'categories' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`}
              >
                Courses
              </button>
              <button 
                onClick={() => { scrollToSection('contact'); setIsMenuOpen(false); }} 
                className={`text-left px-4 py-2 rounded-lg text-lg font-medium ${activeSection === 'contact' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'}`}
              >
                Contact
              </button>
              <div className="flex space-x-2 pt-2">
                <button
                  className="flex-1 px-4 py-2 text-blue-700 font-semibold rounded-lg border border-blue-600 bg-white hover:bg-blue-50 shadow-sm"
                  onClick={() => { onRegisterClick(); setIsMenuOpen(false); }}
                >
                  <FaUser className="inline mr-1" /> Register
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-600">
                  <FaSignInAlt className="inline mr-1" /> Login
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Demo Test Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
              onClick={() => setShowDemoModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <FaVial className="text-blue-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-blue-800">Demo English Test</h2>
            </div>
            <p className="text-gray-700 mb-4">
              Experience how ExamEagle prepares you for English exams! This demo test gives you a glimpse of our smart test system, instant feedback, and detailed explanations.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-4 text-blue-900">
              <strong>How we prepare you:</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                <li>Chapter-wise MCQs and practice questions</li>
                <li>Instant result and answer explanations</li>
                <li>Progress tracking and weak area analysis</li>
                <li>Board-wise and competitive exam patterns</li>
                <li>Expert tips for time management and accuracy</li>
              </ul>
            </div>
            <p className="text-gray-600 mb-6">
              Our English demo covers grammar, vocabulary, comprehension, and more. Try it now to see how you can boost your preparation and confidence for real exams!
            </p>
            <button
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-600 transition shadow-md hover:shadow-lg"
              onClick={() => setShowDemoModal(false)}
            >
              Start Your Demo Quiz
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section with SVG Illustration */}
        <section id="home" className="py-16 px-2 sm:px-6 bg-gradient-to-r from-blue-50 to-indigo-50 w-full">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row items-center w-full">
              {/* Text Content */}
              <div className="lg:w-1/2 w-full lg:pr-12 text-center lg:text-left mb-10 lg:mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-6 leading-tight w-full min-h-[40px] sm:min-h-[50px] md:min-h-[60px] lg:min-h-[70px]">
                  <span className="typewriter-text">{displayedText}</span>
                  <span className="typewriter-cursor">|</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 w-full">
                  ExamEagle helps students from class 9 to competitive exams like MDCAT, CSS, ISSB, Army & more — with smart tools and online test systems.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 w-full">
                  <button
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
                    onClick={onRegisterClick}
                  >
                    Get Started
                  </button>
                  <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition shadow hover:shadow-md transform hover:scale-105 w-full sm:w-auto">
                    Learn More
                  </button>
                </div>
              </div>
              {/* SVG Illustration */}
              <div className="lg:w-1/2 w-full flex justify-center">
                <div className="relative w-full max-w-lg flex items-center justify-center">
                  <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-h-[340px]">
                    <ellipse cx="250" cy="350" rx="200" ry="30" fill="#E0E7FF" />
                    <rect x="120" y="120" width="260" height="140" rx="24" fill="#fff" stroke="#6366F1" strokeWidth="4" />
                    <rect x="170" y="160" width="60" height="40" rx="8" fill="#6366F1" />
                    <rect x="250" y="160" width="60" height="40" rx="8" fill="#818CF8" />
                    <rect x="200" y="210" width="100" height="20" rx="6" fill="#E0E7FF" />
                    <circle cx="370" cy="140" r="18" fill="#6366F1" />
                    <circle cx="370" cy="140" r="10" fill="#fff" />
                    <rect x="140" y="140" width="40" height="10" rx="5" fill="#E0E7FF" />
                    <rect x="320" y="140" width="40" height="10" rx="5" fill="#E0E7FF" />
                    <rect x="180" y="250" width="140" height="10" rx="5" fill="#E0E7FF" />
                    <rect x="220" y="270" width="60" height="10" rx="5" fill="#6366F1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 px-2 sm:px-6 bg-white w-full">
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Why Choose ExamEagle?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide the most comprehensive exam preparation platform in Pakistan with cutting-edge features.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 w-14 h-14 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <FaUserGraduate className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Expert Guidance</h3>
                <p className="text-gray-600">Learn from experienced educators who know exam patterns inside out.</p>
              </div>
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 w-14 h-14 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <FaShieldAlt className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Comprehensive Prep</h3>
                <p className="text-gray-600">All-in-one platform covering syllabus, practice tests, and performance analysis.</p>
              </div>
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 w-14 h-14 rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <FaChalkboardTeacher className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-800">Smart Learning</h3>
                <p className="text-gray-600">Adaptive technology that focuses on your weak areas for maximum improvement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-16 px-2 sm:px-6 bg-gray-50 w-full">
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Courses</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive preparation for all major academic and competitive exams in Pakistan.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {categories.map((cat, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 border border-blue-50 group relative overflow-hidden">
                  <div className="bg-gradient-to-tr from-blue-100 to-indigo-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {index % 3 === 0 && <FaBook className="text-blue-600 text-xl group-hover:animate-bounce" />}
                    {index % 3 === 1 && <FaUserTie className="text-blue-600 text-xl group-hover:animate-bounce" />}
                    {index % 3 === 2 && <FaShieldAlt className="text-blue-600 text-xl group-hover:animate-bounce" />}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">{cat.title}</h3>
                  <p className="text-gray-700 mb-3">{cat.desc}</p>
                  <div className="flex items-center text-sm text-blue-600 mb-2">
                    <span className="font-semibold mr-2">{cat.stats}</span>
                    <span className="text-gray-400">|</span>
                    <span className="ml-2">{cat.details}</span>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg hover:from-blue-700 hover:to-indigo-600 transition shadow hover:shadow-lg w-full mt-2 group-hover:scale-105 group-hover:shadow-2xl">
                    {cat.btn}
                  </button>
                  {cat.title === "Other Courses" && (
                    <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold shadow">More</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-2 sm:px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-full">
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center w-full">
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-blue-100">Students</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-blue-100">Courses</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Expert Teachers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-2 sm:px-6 bg-white w-full">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row gap-12 w-full">
              <div className="lg:w-1/2 w-full">
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have questions about our courses or platform? Reach out to us and our team will get back to you within 24 hours.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Phone</h4>
                      <p className="text-gray-600">+92 300 1234567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Email</h4>
                      <p className="text-gray-600">info@exameagle.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">Address</h4>
                      <p className="text-gray-600">123 Education St, Lahore, Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-gray-50 rounded-xl p-8 shadow-md border border-blue-100 w-full">
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Subject</label>
                      <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 mb-2">Message</label>
                      <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                    </div>
                    <button type="submit" className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-600 transition shadow-md hover:shadow-lg">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12 px-2 sm:px-6 w-full">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <div className="bg-white p-2 rounded-xl mr-3">
                  <FaBook className="text-blue-600 text-xl" />
                </div>
                ExamEagle
              </h3>
              <p className="text-blue-200 mb-4">Empowering students to achieve their academic and career goals through comprehensive test preparation.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-blue-200 hover:text-white">Home</button></li>
                <li><button onClick={() => scrollToSection('features')} className="text-blue-200 hover:text-white">Features</button></li>
                <li><button onClick={() => scrollToSection('categories')} className="text-blue-200 hover:text-white">Courses</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-blue-200 hover:text-white">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Courses</h4>
              <ul className="space-y-2">
                {categories.slice(0, 4).map((cat, index) => (
                  <li key={index}><button className="text-blue-200 hover:text-white">{cat.title}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              <p className="text-blue-200 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-gray-800" />
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 rounded-r-lg hover:from-blue-600 hover:to-indigo-600 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} ExamEagle. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add these styles for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .fade-in { opacity: 1; transition: opacity 0.5s ease-in; }
        .fade-out { opacity: 0; transition: opacity 0.5s ease-out; }
        .typewriter-text {
          display: inline-block;
          white-space: pre-wrap;
          word-wrap: break-word;
          min-width: 200px;
          max-width: 100%;
        }
        .typewriter-cursor {
          display: inline-block;
          color: #6366F1;
          font-weight: bold;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .typewriter-text {
            min-width: 150px;
            font-size: 1.875rem;
          }
        }
        @media (max-width: 480px) {
          .typewriter-text {
            min-width: 120px;
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Main;