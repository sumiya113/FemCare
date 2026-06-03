import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { HOME_FAQS } from '../data';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-linear-to-b from-white to-brand-50/5" id="faqs-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-14 animate-fadeIn">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="h-4 w-4" />
            <span>Faqs Desk</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-main font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-sub text-sm sm:text-base mt-2">
            Unravel essential cycle mechanics, insulin connections, and professional doctor triggers.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faqs-accordion-list">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white rounded-2xl border border-neutral-100 shadow-3xs overflow-hidden transition"
              >
                {/* Trigger */}
                <button
                  id={`faq-trigger-${idx}`}
                  onClick={() => toggleIndex(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between text-[#2d3436] font-display font-extrabold text-sm sm:text-base gap-4 cursor-pointer focus:outline-hidden hover:bg-neutral-50/40"
                >
                  <span className="leading-tight">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-brand-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-400 flex-shrink-0" />
                  )}
                </button>

                {/* Body details */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-sub leading-relaxed font-normal border-t border-neutral-100/40" id={`faq-answer-${idx}`}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Quick Helper */}
        <div className="mt-8 text-center text-xs text-neutral-sub font-semibold">
          Don’t find what you are looking for? Send us a swift message via the{' '}
          <span className="text-brand-500 cursor-pointer hover:underline">Contact section</span>.
        </div>

      </div>
    </section>
  );
}
