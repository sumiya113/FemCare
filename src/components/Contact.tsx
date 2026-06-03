import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactProps {
  onAddMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'replied'>) => void;
}

export default function Contact({ onAddMessage }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Newsletter state
  const [newsName, setNewsName] = useState('');
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    onAddMessage({ name, email, subject, message });
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;

    setNewsSuccess(true);
    setTimeout(() => {
      setNewsSuccess(false);
      setNewsName('');
      setNewsEmail('');
    }, 4500);
  };

  return (
    <section className="py-20 bg-linear-to-b from-[#fffcfd] to-white" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-main font-display tracking-tight">
            Get In Touch & Join Our Community
          </h2>
          <p className="text-neutral-sub text-sm sm:text-base mt-2">
            Have questions about specialized programs or wellness trackers? Reach our member care desk, or join our community newsletter.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-core-grid">
          
          {/* Column A: Contact card details */}
          <div className="lg:col-span-5 space-y-8" id="contact-details-panel">
            <div className="bg-linear-to-tr from-brand-500 to-accent-600 p-8 rounded-3xl text-white shadow-md relative overflow-hidden">
              {/* Abs blur */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
              
              <h3 className="font-display font-extrabold text-xl mb-6">Contact Information</h3>
              
              <div className="space-y-6 text-xs sm:text-sm">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-brand-200 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-white/95">FemCare Headquarters</span>
                    <p className="text-white/80 mt-0.5">85 Pine Aesthetics Blvd, Suite 410, San Francisco, CA</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-brand-200 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-white/95">Educational Support Desk</span>
                    <span className="text-white/80 mt-0.5 hover:underline cursor-pointer block">care@femcarewellness.com</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-brand-200 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-white/95">Toll-Free Healthline</span>
                    <span className="text-white/80 mt-0.5 hover:underline cursor-pointer block">1-800-FEM-WELL (336-9355)</span>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-8 pt-6 border-t border-white/20 text-xs text-brand-100 flex items-center space-x-2.5">
                <AlertCircle className="h-4.5 w-4.5" />
                <span>Healthline support operates Mon-Fri 8:00 AM - 6:00 PM PST.</span>
              </div>
            </div>

            {/* Newsletter element */}
            <div className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-xs text-left" id="newsletter-box">
              <h4 className="font-display font-extrabold text-base text-neutral-main flex items-center space-x-2">
                <Sparkles className="h-4.5 w-4.5 text-brand-500" />
                <span>Join Our Women's Wellness Community</span>
              </h4>
              <p className="text-xs text-neutral-sub mt-2 leading-relaxed font-medium">
                Sustain biological literacy. Subscribe with your email to obtain weekly cycle-syncing cooking recipes, expert hormonal checks, and shop flash deals directly in your inbox.
              </p>

              <AnimatePresence mode="wait">
                {newsSuccess ? (
                  <motion.div
                    key="news-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-center text-xs font-semibold mt-4"
                  >
                    Welcome aboard! Check your inbox for our 12-page Cycle Synced Guidebook.
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-3 mt-5" id="newsletter-form">
                    <div className="grid grid-cols-1 gap-2.5">
                      <input
                        type="text"
                        placeholder="Your First Name (Optional)"
                        value={newsName}
                        onChange={(e) => setNewsName(e.target.value)}
                        className="w-full text-xs p-3.5 bg-neutral-50/70 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400 focus:outline-hidden transition"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email Address"
                        value={newsEmail}
                        onChange={(e) => setNewsEmail(e.target.value)}
                        className="w-full text-xs p-3.5 bg-neutral-50/70 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400 focus:outline-hidden transition"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-xs tracking-wider transition cursor-pointer active:scale-95 shadow-2xs"
                    >
                      Subscribe & Receive Guidebook
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Column B: Interactive Contact form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-xs" id="contact-form-panel">
            <h3 className="font-display font-extrabold text-lg text-neutral-main mb-2">Leave Our Care Desk A Message</h3>
            <p className="text-xs text-neutral-sub mb-6 leading-relaxed font-medium">To collaborate on specialized corporate plans or solve shopping delays, please fill out this multi-field form:</p>

            <AnimatePresence>
              {success ? (
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-full inline-block text-emerald-500 animate-bounce">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-lg text-neutral-main">Submission Cleared!</h4>
                    <p className="text-neutral-sub text-xs sm:text-sm mt-1 max-w-sm mx-auto leading-relaxed font-semibold">
                      Your query has been logged securely in our shared CRM list. We will reply back inside 24 business hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" id="support-contact-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-neutral-sub block mb-1.5 tracking-wide uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="E.g. Chloe Bennett"
                        className="w-full text-xs sm:text-sm p-3.5 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-brand-400 focus:border-brand-400 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-sub block mb-1.5 tracking-wide uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E.g. chloe@domain.com"
                        className="w-full text-xs sm:text-sm p-3.5 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-brand-400 focus:border-brand-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-sub block mb-1.5 tracking-wide uppercase">Subject Topic</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="E.g. Query on PCOS supplement bundle details"
                      className="w-full text-xs sm:text-sm p-3.5 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-brand-400 focus:border-brand-400 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-sub block mb-1.5 tracking-wide uppercase">Detailed Message</label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your concerns here. Mention cycles parameters if tracking support is needed..."
                      className="w-full text-xs sm:text-sm p-3.5 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-brand-400 focus:border-brand-400 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-linear-to-r from-brand-500 to-brand-600 text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:shadow-brand-300/40 cursor-pointer flex items-center justify-center space-x-2 transition-all active:scale-95"
                  >
                    <Send className="h-4.5 w-4.5" />
                    <span>Send Message Securely</span>
                  </button>

                </form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
