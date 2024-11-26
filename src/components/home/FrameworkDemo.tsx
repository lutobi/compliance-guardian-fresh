import { useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function FrameworkDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const frameworks = [
    {
      name: 'SOC 2',
      controls: [
        'Security Policies',
        'Access Controls',
        'System Operations',
        'Risk Management',
        'Change Management',
      ],
    },
    {
      name: 'ISO 27001',
      controls: [
        'Information Security',
        'Asset Management',
        'Cryptography',
        'Physical Security',
        'Operations Security',
      ],
    },
    {
      name: 'HIPAA',
      controls: [
        'Privacy Rules',
        'Security Rules',
        'Patient Rights',
        'Data Protection',
        'Breach Notification',
      ],
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % frameworks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
      <div className="relative">
        {frameworks.map((framework, index) => (
          <div
            key={framework.name}
            className={`absolute inset-0 transition-all duration-500 ${
              index === activeIndex
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="card p-6 bg-surface/80 backdrop-blur">
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {framework.name}
              </h3>
              <div className="space-y-3">
                {framework.controls.map((control, i) => (
                  <div
                    key={control}
                    className={`flex items-center space-x-3 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                    <span className="text-text-secondary">{control}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
