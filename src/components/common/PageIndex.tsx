'use client';

import { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

interface Section {
  id: string;
  title: string;
}

interface PageIndexProps {
  sections: Section[];
}

export default function PageIndex({ sections }: PageIndexProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 500);

      // Update active section
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust based on your header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <nav className="flex flex-col items-end space-y-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`group flex items-center space-x-2 transition-all duration-300 ${
              activeSection === section.id
                ? 'text-primary'
                : 'text-text-secondary hover:text-white'
            }`}
          >
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {section.title}
            </span>
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary w-3'
                  : 'bg-text-secondary group-hover:bg-white'
              }`}
            />
          </button>
        ))}
      </nav>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="mt-8 p-2 rounded-full bg-surface/80 backdrop-blur-sm border border-white/10 shadow-lg hover:bg-surface transition-colors group"
        >
          <ChevronUpIcon className="w-5 h-5 text-text-secondary group-hover:text-white transition-colors" />
        </button>
      )}
    </div>
  );
}
