'use client';

import { useState, useEffect } from 'react';
import { InlineWidget } from 'react-calendly';

const ConsultationPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-[70vh] flex items-center justify-center py-20 sm:py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-stone-charcoal/70 via-stone-charcoal/60 to-transparent" />
        </div>
        <div
          className={`relative container mx-auto px-4 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-stone-marble mb-6 hero-text-shadow">
            Schedule a Consultation
          </h1>
          <p className="text-lg sm:text-xl text-stone-marble/90 max-w-3xl mx-auto">
            Let&apos;s discuss your vision and create something extraordinary
            together
          </p>
        </div>
      </section>

      {/* Calendly Integration Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 marble-pattern" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <div className="decorative-frame glass-effect rounded-2xl p-8 md:p-12">
              <div className="min-h-[700px]">
                <InlineWidget
                  url="https://calendly.com/saadmarwan16/30min"
                  styles={{
                    height: '700px',
                    width: '100%',
                  }}
                  prefill={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    name: '',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConsultationPage;
