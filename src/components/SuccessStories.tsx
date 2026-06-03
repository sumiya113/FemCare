import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import { EXCEL_SUCCESS_STORIES } from '../data';

export default function SuccessStories() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % EXCEL_SUCCESS_STORIES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % EXCEL_SUCCESS_STORIES.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + EXCEL_SUCCESS_STORIES.length) % EXCEL_SUCCESS_STORIES.length);
  };

  const curr = EXCEL_SUCCESS_STORIES[index];

  return (
    <section className="py-20 bg-linear-to-b from-brand-50/10 to-white" id="success-stories-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-55 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="h-4 w-4 fill-brand-400 text-brand-500 animate-pulse" />
            <span>Inspiring Journeys</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-main font-display tracking-tight">
            Loved By Thousands of Women Worldwide
          </h2>
          <p className="text-neutral-sub text-sm sm:text-base mt-2">
            Read transparent, real-life success stories of women who transitioned from unpredictable timing exhaustion to vibrant hormonal consistency.
          </p>
        </div>

        {/* Carousel slide box */}
        <div className="bg-white rounded-3xl border border-neutral-100 p-8 sm:p-12 shadow-sm relative overflow-hidden" id="stories-carousel-container">
          
          {/* Decorative quote mark */}
          <div className="absolute top-6 right-8 text-brand-100 opacity-65 pointer-events-none">
            <Quote className="h-28 w-28 scale-x-[-1]" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            
            {/* User Avatar & Details */}
            <div className="w-full md:w-1/3 flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative"
                >
                  <img src={curr.avatar} alt={curr.name} className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-brand-100 shadow-md" />
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-500 text-white text-[9px] font-bold uppercase tracking-wider">
                    Age {curr.age}
                  </div>
                </motion.div>
              </AnimatePresence>

              <h4 className="font-display font-extrabold text-[#2d3436] text-base mt-5">{curr.name}</h4>
              <span className="text-[10px] font-bold text-accent-700 bg-accent-50 border border-accent-100 px-2.5 py-0.5 rounded-md mt-1 block">
                {curr.diagnosed}
              </span>
            </div>

            {/* Testimonial Story Text */}
            <div className="w-full md:w-2/3 space-y-4">
              <div className="flex text-amber-400 justify-center md:justify-start">
                {Array.from({ length: curr.rating }).map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-neutral-sub text-sm sm:text-base leading-relaxed italic"
                >
                  "{curr.story}"
                </motion.p>
              </AnimatePresence>

              {/* Slider Arrows */}
              <div className="flex justify-center md:justify-start space-x-3 pt-4">
                <button
                  id="story-prev-btn"
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-neutral-150 hover:bg-neutral-50 text-neutral-sub hover:text-neutral-main cursor-pointer transition active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  id="story-next-btn"
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-neutral-150 hover:bg-neutral-50 text-neutral-sub hover:text-neutral-main cursor-pointer transition active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
