import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dna, CalendarRange, Sparkles, Flame, RefreshCw, Activity, Apple, 
  Search, ShieldAlert, Heart, ChevronRight, X, AlertOctagon, HelpCircle 
} from 'lucide-react';

interface ConditionDetails {
  id: string;
  name: string;
  quickDesc: string;
  symptoms: string[];
  causes: string[];
  lifestyle: string[];
  docThreshold: string;
  medicalDets: string;
  icon: React.ReactNode;
}

export default function Awareness() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const conditions: ConditionDetails[] = [
    {
      id: 'irregular-periods',
      name: 'Irregular Periods & Amenorrhea',
      quickDesc: 'Cycle variations of less than 21 days or missing cycles for months, indicating underlying hypothalamus stress signals.',
      symptoms: [
        'Missing more than three periods consecutively',
        'Menstrual bleeding lasting longer than 8 continuous days',
        'Extreme flow variations from spotting to heavy hemorrhages'
      ],
      causes: [
        'Prolonged cortisol spikes due to high stress, disrupting hypothalamic GnRH signals',
        'Inadequate caloric intake or intense physical overtraining',
        'Rapid body weight shifts or hormonal transitions'
      ],
      lifestyle: [
        'Implement cycle-syncing foods: prioritize lean proteins, complex carbs, and clean iron',
        'Scale down excessive cardio workouts in favor of strength building and yin yoga',
        'Practice daily sleep grounding to reset cortisol systems'
      ],
      docThreshold: 'See a doctor if your cycles exceed 90 days of absence, occur more than every 21 days, or if you bleed heavily through multiple tampons an hour.',
      medicalDets: 'This condition is medically monitored as oligomenorrhea or hypothalamic amenorrhea. When ovulation is suspended, low progesterone levels can affect your bone density and cardiovascular biomarkers. An OB-GYN can evaluate hormone panels like LH, FSH, Prolactin, and Estradiol.',
      icon: <CalendarRange className="h-6 w-6 text-brand-500" />
    },
    {
      id: 'hormonal-imbalance',
      name: 'Hormonal Imbalance & Cortisol',
      quickDesc: 'Fluctuations in estrogen, progesterone, and androgens that lead to erratic energy states, adult acne, and metabolic blockages.',
      symptoms: [
        'Deep emotional waves or fatigue at specific cycle phases (luteal)',
        'Persistent adult jawline acne that resists topical cleansers',
        'Mid-section weight gain and constant brain fog'
      ],
      causes: [
        'Blood sugar instability due to excessive simple carbohydrate intake',
        'Chronic adrenal fatigue stimulating high cortisol at night',
        'Estrogen dominance from impaired liver detox pathways'
      ],
      lifestyle: [
        'Boost cruciferous vegetables (broccoli, cabbage) to help the liver process excess hormones',
        'Maintain a balanced blood sugar plate: Fiber + Fats + Quality Protein',
        'Avoid high caffeine drinks on an empty stomach'
      ],
      docThreshold: 'Consult an endocrinologist if fatigue persists after lifestyle adjustments, or if hormonal blood sugar levels remain high.',
      medicalDets: 'When progesterone does not match estrogen levels, it creates Estrogen Dominance, leading to intense PMS. Endocrine evaluations typically check salivary cortisol curves, free estrogen ratios, and liver biomarker enzymes.',
      icon: <RefreshCw className="h-6 w-6 text-accent-500" />
    },
    {
      id: 'pcos',
      name: 'PCOS (Polycystic Ovary Syndrome)',
      quickDesc: 'A comprehensive endocrine and metabolic condition driving multiple string-of-pearls follicles on the ovaries, insulin resistance, and cycle delays.',
      symptoms: [
        'Sparsely occurring cycles (oligomenorrhea) or complete cycle pauses',
        'Hirsutism (excess hair on face, back, or breast region)',
        'Difficulty processing sugar, leading to rapid weight gain and insulin resistance'
      ],
      causes: [
        'Insulin resistance driving secondary androgen release from the ovaries',
        'Genetic predispositions combined with systemic low-grade inflammation',
        'Adrenal androgen hyper-responsiveness'
      ],
      lifestyle: [
        'Incorporate medically sound Myo-Inositol/D-Chiro-Inositol in 40:1 ratio',
        'Engage in strength training to stimulate non-insulin glucose clearance in muscles',
        'Limit processed seed oils and add omega-3 rich fish to clear low-grade inflammation'
      ],
      docThreshold: 'Seek medical checking if you experience hirsutism, missing cycles alongside persistent weight gain, or have difficulties with fertility.',
      medicalDets: 'PCOS is diagnosed using the Rotterdam Criteria (which require 2 of 3 features: oligo/anovulation, clinical/biochemical hyperandrogenism, or polycystic ovaries on ultrasound). A full lipid panel and glucose tolerance test (OGTT) are highly recommended.',
      icon: <Dna className="h-6 w-6 text-pink-500" />
    },
    {
      id: 'pcod',
      name: 'PCOD (Polycystic Ovarian Disease)',
      quickDesc: 'A condition where the ovaries release immature eggs, turning into temporary functional cysts. Often controlled seamlessly with lifestyle adjustments.',
      symptoms: [
        'Mild abdominal bloating or lower pelvic heaviness during ovulation',
        'Mild menstrual cycle delay combined with high fluid retention',
        'Temporary hormonal acne spikes around period days'
      ],
      causes: [
        'High psychological stress affecting egg maturation rates',
        'Imbalanced nutritional habits with micro-nutrient deficits',
        'Poor sleep schedules disrupting ovulation hormones'
      ],
      lifestyle: [
        'Implement daily spearmint tea drinking to aid follicle quality',
        'Eat mineral-rich seed rotations (pumpkin, flax, sesame, sunflower)',
        'Sustain steady daily movement like walking 8,000 steps minimum'
      ],
      docThreshold: 'Check with a doctor if you experience intense unilateral pain (which could indicate a large functional cyst rupture) or prolonged cycles.',
      medicalDets: 'Unlike PCOS, PCOD is not classed as a comprehensive metabolic syndrome. It is highly manageable. Tracking cycles, reducing high stress, and drinking anti-inflammatory teas are standard, medically supported self-care tools.',
      icon: <Activity className="h-6 w-6 text-violet-500" />
    },
    {
      id: 'menstrual-health',
      name: 'Menstrual Cycle Optimization',
      quickDesc: 'Maximizing energy, flow levels, and cycle-syncing lifestyle choices across follicular, ovulatory, luteal, and bleeding phases.',
      symptoms: [
        'Extreme bloating, fatigue, or mood swings before bleeding',
        'Heavy cramping (dysmenorrhea) indicating excess prostaglandins',
        'Low stamina or high brain fog on bleeding days'
      ],
      causes: [
        'Excess prostaglandin release causing uterine muscle spasms',
        'Imbalanced copper-to-zinc ratios or iron losses during heavy cycles',
        'Lack of phase-appropriate workout and diet adjustments'
      ],
      lifestyle: [
        'Use magnesium and herbal heating therapies to ease local uterine spasms',
        'Eat warmth-inducing, slow-cooked soups and stews on bleeding days',
        'Sync high-intensity training with follicular/ovulatory phases; transition to soft yoga during luteal phase'
      ],
      docThreshold: 'Consult a gynecologist if cycle pain inhibits daily activities, or if you regularly suffer from high fever during bleeding (Toxic Shock risk).',
      medicalDets: 'Prostaglandins are hormone-like compounds that cause uterine contractions. High levels of specific prostaglandins trigger intense cramps. Support includes magnesium glycinate (which blocks spasms) and Omega-3 oils (which decrease inflammatory lipids).',
      icon: <Flame className="h-6 w-6 text-rose-500" />
    },
    {
      id: 'thyroid-women',
      name: 'Thyroid Care & Women\'s Health',
      quickDesc: 'Addressing cellular metabolism issues (Hypo/Hyper) that directly govern ovulation signals and energy limits.',
      symptoms: [
        'Chronic cold fingers, dry cracked heels, and hair thinning (Hypothyroid)',
        'Rapid heart, unexplained anxious heart flutters, or rapid heat sweating (Hyperthyroid)',
        'Very long cycles matching thyroid slowdowns'
      ],
      causes: [
        'Autoimmune interactions (such as Hashimoto\'s thyroiditis)',
        'Mineral deficiencies (low selenium, iodine, iron, or zinc)',
        'Chronic toxic overload or severe burnout syndrome'
      ],
      lifestyle: [
        'Include 2 Brazil nuts daily for bio-available selenium',
        'Avoid gluten and dairy triggers if dealing with high thyroid antibodies',
        'Support healthy liver function since thyroid hormone conversion (T4 to T3) happens there'
      ],
      docThreshold: 'Arrange immediate blood tests for TSH, Free T3, Free T4, and TPO antibodies if you have severe hair loss, rapid heart rhythms, or chronic freezing.',
      medicalDets: 'An underactive thyroid lowers your basal metabolic rate, which can stop ovulation or raise prolactin levels, both causing irregular cycles. Medical treatment focuses on thyroid hormone replacement, while natural support targets cellular nutrients.',
      icon: <HelpCircle className="h-6 w-6 text-brand-600" />
    },
    {
      id: 'fertility-awareness',
      name: 'Fertility Awareness & Ovulation',
      quickDesc: 'Learning to observe cervical mucus shifts and basal body temperature (BBT) parameters to evaluate ovulation quality.',
      symptoms: [
        'Changes in cervical fluid from creamy to stretchy, egg-white consistency',
        'A subtle temperature jump of 0.5°F immediately after ovulation occurs',
        'Mittelschmerz (localized ovulatory pain in Left/Right ovary)'
      ],
      causes: [
        'Estrogen surges near ovulation changing cervical mucus consistency',
        'Progesterone spikes post-ovulation raising basal body heat',
        'Adequate follicular growth triggering ovulation naturally'
      ],
      lifestyle: [
        'Check your basal temperature first thing in the morning with a sensitive 2-decimal thermometer',
        'Track and log daily cervical mucus patterns without stress',
        'Support egg health with antioxidant rich berries, leafy greens, and CoQ10 supplements'
      ],
      docThreshold: 'See a fertility specialist or physician if you have tracked cycles for over 12 months (or 6 months if over age 35) with steady timing but without conceiving.',
      medicalDets: 'Fertility Awareness Methods (such as the Marquette or Creighton model) are medically based tracking rules. Ovulation must occur to produce progesterone, which is critical for dynamic heart and breast health.',
      icon: <Sparkles className="h-6 w-6 text-pink-600" />
    },
    {
      id: 'menopause',
      name: 'Menopause & Perimenopause Support',
      quickDesc: 'Adapting to the natural retirement of ovarian reserve and shifts in estrogen, minimizing vasomotor flashes and mood swings.',
      symptoms: [
        'Frequent hot flashes, night sweating, and erratic sleep quality',
        'Sudden, unpredictable vaginal dryness or joint pain',
        'Unpredictable, highly prolonged or extremely short cycle spacing'
      ],
      causes: [
        'Natural depletion of healthy ovarian follicles',
        'Fluctuating, then declining estrogen and progesterone levels',
        'Elevated pituitary signals (high FSH) trying to stimulate ovulation'
      ],
      lifestyle: [
        'Support bone density with highly bio-available Vitamin D3 + K2 and calcium foods',
        'Consume moderate soy or flax seed isoflavones to ease vaginal or systemic dryness',
        'Adopt strength-training routines to preserve vital metabolic tissue'
      ],
      docThreshold: 'Seek medical consensus if you experience heavy bleeding after menopause (complete absence of periods for 12 months) as this requires prompt evaluation.',
      medicalDets: 'During perimenopause, Estrogen fluctuates wildly. Blood tests showing elevated FSH levels can confirm this transition. Medical solutions include custom hormone therapy, while lifestyle focus centers on bone, brain, and heart health.',
      icon: <Apple className="h-6 w-6 text-indigo-500" />
    }
  ];

  const filteredConditions = conditions.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.quickDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCondition = conditions.find(c => c.id === selectedId);

  return (
    <section className="py-20 bg-linear-to-b from-[#FFF9FB]/20 to-white" id="awareness-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-main font-display tracking-tight">
            Comprehensive Women's Health Education
          </h2>
          <p className="text-[#636E72] text-base sm:text-lg mt-3">
            Expand your physiological literacy. Lean into medically check educational reviews to identify symptoms, investigate common causes, and learn tailored self-care strategies.
          </p>

          {/* Search bar */}
          <div className="relative mt-8 max-w-md mx-auto" id="awareness-search-container">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              id="awareness-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conditions (e.g. PCOS, Thyroid)..."
              className="block w-full pl-11 pr-4 py-3 bg-white border border-[#FF6B9D]/30 focus:border-[#FF6B9D] rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF6B9D]/40 shadow-xs transition"
            />
          </div>
        </div>

        {/* Responsible Medical Warning Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#FFF0F5]/60 border border-[#FF6B9D]/20 text-[#2D3436] flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 max-w-4xl mx-auto">
          <ShieldAlert className="h-6 w-6 text-[#FF6B9D] flex-shrink-0 mt-0.5 animate-pulse" />
          <div className="text-center sm:text-left text-xs sm:text-sm leading-relaxed font-semibold">
            <span className="font-extrabold text-[#E84393] uppercase block sm:inline mr-1">Medical Disclaimer:</span>
            All contents on FemCare Wellness are engineered strictly for awareness and educational purposes. We are not a clinical service and do not provide diagnostics or medical recipes. Always consult an OB-GYN or licensed clinician regarding distinct symptoms.
          </div>
        </div>

        {/* Grid or Empty search response */}
        {filteredConditions.length === 0 ? (
          <div className="text-center py-12" id="awareness-empty-state">
            <AlertOctagon className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-sub font-medium">No guidelines found matching your terms.</p>
            <button 
              onClick={() => setSearchTerm('')} 
              className="text-[#FF6B9D] text-sm font-semibold mt-2 hover:underline"
            >
              Reset search criteria
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="awareness-grid">
            {filteredConditions.map((condition) => (
              <motion.div
                key={condition.id}
                id={`condition-card-${condition.id}`}
                layoutId={`card-container-${condition.id}`}
                onClick={() => setSelectedId(condition.id)}
                className="bg-white p-6 sm:p-7 rounded-[32px] border border-[#FF6B9D]/10 hover:border-[#FF6B9D]/35 shadow-xs hover:shadow-xl hover:shadow-pink-100/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#FFF0F5] text-[#FF6B9D] rounded-2xl group-hover:bg-[#FFF0F5]/80 transition-colors">
                      {condition.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#9b59b6] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100/40">
                      Educational
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg text-[#2D3436] group-hover:text-[#FF6B9D] transition-colors">
                    {condition.name}
                  </h3>
                  <p className="text-neutral-sub text-sm mt-2.5 leading-relaxed line-clamp-3">
                    {condition.quickDesc}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-[#FF6B9D] mt-6 group-hover:text-[#E84393] transition-colors">
                  <span>Explore Science & Care Guides</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal for Expanded Learn More */}
        <AnimatePresence>
          {selectedId && activeCondition && (
            <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
              {/* Overlay background */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md"
              ></motion.div>

              {/* Dynamic details drawer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white rounded-[32px] w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 border border-[#FF6B9D]/20"
                id="condition-detail-modal"
              >
                {/* Modal header branding */}
                <div className="sticky top-0 bg-[#2D3436] px-6 sm:px-8 py-5 text-white flex items-center justify-between shadow-xs border-b border-[#FF6B9D]/10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-white/10 rounded-xl border border-white/20 text-[#FF6B9D]">
                      {activeCondition.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl leading-tight text-white">
                        {activeCondition.name}
                      </h3>
                      <span className="text-[10px] text-pink-300 font-bold tracking-wider uppercase">
                        Medical Science & Self-Care Module
                      </span>
                    </div>
                  </div>
                  <button
                    id="modal-close-btn"
                    onClick={() => setSelectedId(null)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/25 text-white/90 transition-colors cursor-pointer"
                  >
                    <X className="h-5.5 w-5.5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 space-y-7">
                  
                  {/* Overview description */}
                  <div>
                    <h4 className="font-display font-bold text-xs text-[#FF6B9D] uppercase tracking-widest mb-1.5">Overview</h4>
                    <p className="text-[#2D3436] text-sm sm:text-base leading-relaxed font-normal">
                      {activeCondition.medicalDets}
                    </p>
                  </div>

                  {/* Symptoms & Causes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="bg-[#FFF0F5]/50 border border-[#FF6B9D]/20 p-5 rounded-2xl">
                      <div className="flex items-center space-x-2 text-[#FF6B9D] mb-3">
                        <Flame className="h-4.5 w-4.5" />
                        <h4 className="font-display font-bold text-sm tracking-wide text-[#2D3436]">Common Signs & Biomarkers</h4>
                      </div>
                      <ul className="space-y-2 text-xs leading-relaxed text-[#636E72] list-disc pl-4">
                        {activeCondition.symptoms.map((s, idx) => (
                          <li key={idx} className="font-medium text-[#2D3436]">{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#FFF0F5]/50 border border-[#FF6B9D]/20 p-5 rounded-2xl">
                      <div className="flex items-center space-x-2 text-[#E84393] mb-3">
                        <Dna className="h-4.5 w-4.5" />
                        <h4 className="font-display font-bold text-sm tracking-wide text-[#2D3436]">Root Physiology Triggers</h4>
                      </div>
                      <ul className="space-y-2 text-xs leading-relaxed text-[#636E72] list-disc pl-4">
                        {activeCondition.causes.map((c, idx) => (
                          <li key={idx} className="font-medium text-[#2D3436]">{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Lifestyle suggestions */}
                  <div className="border-t border-neutral-100 pt-5">
                    <div className="flex items-center space-x-2 text-[#2D3436] mb-3">
                      <Apple className="h-5 w-5 text-emerald-500" />
                      <h4 className="font-display font-extrabold text-sm uppercase tracking-wide">Supportive Self-Care Habits</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeCondition.lifestyle.map((l, index) => (
                        <div key={index} className="flex items-start space-x-2.5 bg-[#FFF9FB]/50 px-4 py-3 rounded-xl border border-[#FF6B9D]/10">
                          <CheckIcon />
                          <p className="text-xs sm:text-sm text-[#636E72] font-semibold leading-relaxed">
                            {l}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Medical Threshold Box */}
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-850">
                    <div className="flex items-center space-x-2 font-display font-bold text-xs uppercase tracking-wider mb-1.5 text-orange-950">
                      <ShieldAlert className="h-4.5 w-4.5 text-orange-600 flex-shrink-0" />
                      <span>When to Consult a Physician</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {activeCondition.docThreshold}
                    </p>
                  </div>

                </div>

                {/* Modal footer consult guidance */}
                <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-100 px-6 sm:px-8 py-4 text-center">
                  <p className="text-[10px] text-neutral-sub font-semibold tracking-wide uppercase">
                    Take this summary panel to your next checkup to coordinate treatment details.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// Inline Micro SVG Bullet
function CheckIcon() {
  return (
    <span className="p-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex-shrink-0 mt-0.5">
      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}
