import React from 'react';
import { motion } from 'motion/react';
import { Flame, Calendar, Sparkles, Activity, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onExploreTopics: () => void;
  onShopProducts: () => void;
}

export default function Hero({ onExploreTopics, onShopProducts }: HeroProps) {
  const stats = [
    { value: '98%', label: 'User Satisfaction' },
    { value: '50K+', label: 'Women Empowered' },
    { value: '100%', label: 'Medically Reviewed' },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16" id="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-white to-brand-50/60 p-8 sm:p-12 lg:p-16 rounded-[40px] border border-white shadow-xl flex flex-col justify-center relative overflow-hidden">
          {/* Decorative Blur Orbs */}
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl"></div>
          <div className="absolute right-20 bottom-0 w-32 h-32 bg-brand-400/10 rounded-full blur-2xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
            
            {/* Text Content */}
            <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex self-center lg:self-start items-center space-x-2 bg-brand-50 text-brand-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs border border-brand-100"
              >
                <Sparkles className="h-4.5 w-4.5 text-brand-500 animate-pulse" />
                <span>Dedicated To Endocrine & Menstrual Wellness</span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col space-y-4"
              >
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6.5xl text-neutral-main leading-[1.1] tracking-tight">
                  Empowering Women Through{' '}
                  <span className="text-[#e84393]">
                    Health Awareness
                  </span>
                </h1>
                
                <p className="text-neutral-sub text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Understand your body, manage complex hormonal balances, and access trusted, medically checked wellness guidelines designed specifically for your life cycle.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row space-y-3.5 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
              >
                <button 
                  id="hero-cta-explore"
                  onClick={onExploreTopics}
                  className="group px-8 py-4 rounded-2xl bg-[#2D3436] hover:bg-black text-white font-bold shadow-xl shadow-neutral-900/10 transition-all duration-200 flex items-center justify-center space-x-2.5 active:scale-95 cursor-pointer"
                >
                  <span>Explore Health Topics</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-white/90" />
                </button>

                <button 
                  id="hero-cta-shop"
                  onClick={onShopProducts}
                  className="px-8 py-4 rounded-2xl bg-white border border-[#FF6B9D]/30 text-neutral-sub hover:text-brand-500 hover:border-brand-300 hover:bg-brand-50/20 font-semibold shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag className="h-5 w-5 text-[#FF6B9D]" />
                  <span>Shop Wellness Products</span>
                </button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="grid grid-cols-3 gap-4 border-t border-brand-100/60 pt-8 max-w-lg mx-auto lg:mx-0"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center lg:text-left">
                    <div className="text-xl sm:text-2xl font-extrabold text-neutral-main font-display">{stat.value}</div>
                    <div className="text-xs text-neutral-sub font-semibold mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Graphical/Interactive Column */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative w-full max-w-[420px] h-[440px] sm:h-[480px] bg-linear-to-tr from-brand-100/30 via-brand-200/20 to-accent-100/40 rounded-3xl overflow-visible shadow-xs flex items-center justify-center border border-white"
              >
                {/* Central Abstract Health-Tech Vector Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-64 w-64 bg-linear-to-br from-brand-300 to-accent-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  
                  {/* SVG Mandorla / Lotus of Harmony */}
                  <svg className="w-48 h-48 text-brand-500 opacity-90 animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
                    <path d="M50,10 C62,25 62,75 50,90" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M50,10 C38,25 38,75 50,90" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10,50 C25,62 75,62 90,50" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10,50 C25,38 75,38 90,50" stroke="currentColor" strokeWidth="1.5" />
                  </svg>

                  <div className="absolute flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center mb-2 animate-bounce">
                      <Activity className="h-7 w-7 text-brand-500" />
                    </div>
                    <span className="font-display font-bold text-sm text-neutral-main">BioSync Syncing</span>
                    <span className="text-[10px] text-neutral-sub mt-0.5">Hormone Health Engine</span>
                  </div>
                </div>

                {/* Floating Widget 1: Cycle Sync Tracker */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute top-8 -left-6 sm:-left-12 glass-effect p-4 rounded-2xl shadow-md border border-white max-w-[190px]"
                  id="floating-card-1"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
                      <Calendar className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xs text-neutral-main">Follicular Phase</h3>
                      <p className="text-[10px] text-brand-600 font-semibold mt-0.5">Day 8 • High Energy</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Widget 2: Symptom Meter */}
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-12 -right-4 sm:-right-8 glass-effect p-4 rounded-2xl shadow-md border border-white max-w-[170px]"
                  id="floating-card-2"
                >
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-accent-100 text-accent-600 rounded-lg">
                      <Flame className="h-5 w-5 text-[#FF6B9D]" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-xs text-neutral-main">Cramps Relief</h3>
                      <div className="w-16 bg-neutral-200 rounded-full h-1.5 mt-1.5">
                        <div className="bg-brand-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Secure Clinically Guarded Disclaimer Badge */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass-effect-dark px-4 py-2.5 rounded-full border border-neutral-700/50 text-white text-[10px] sm:text-xs flex items-center space-x-2 shadow-lg min-w-[280px] justify-center">
                  <ShieldCheck className="h-4.5 w-4.5 text-brand-300 flex-shrink-0" />
                  <span className="font-semibold tracking-wide">Medically Safe • Educational Awareness</span>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
