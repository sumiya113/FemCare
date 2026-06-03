import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, Apple, Sparkles, BrainCircuit, Heart, Calendar, Clock, 
  User, CheckCircle, ArrowRight, X, PhoneCall, AlertCircle 
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  specialist: string;
  price: string;
  desc: string;
  image: string;
  bullets: string[];
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Form elements
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [notes, setNotes] = useState('');

  const services: ServiceItem[] = [
    {
      id: 's1',
      title: 'Online Video OB-GYN Consultation',
      specialist: 'Dr. Rebecca Sterling, OB-GYN',
      price: '$75.00 / Session',
      desc: 'Connect with a certified OB-GYN from the comfort of your home. Focuses on period irregularity reviews, hormone biomarker diagnostics, and guidance.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=350',
      bullets: [
        '30-minute high-definition private stream',
        'Review of menstrual logs, BBT grids, or blood reports',
        'Tailored recommendations & questions checklist'
      ]
    },
    {
      id: 's2',
      title: 'Nutrition & Cycle-Syncing Guidance',
      specialist: 'Sarah Jenkins, Certified Clinical Nutritionist',
      price: '$50.00 / Session',
      desc: 'Restructure your meal plans around follicular, ovulatory, and luteal energy limits to resolve insulin resistance and high androgen activity.',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=350',
      bullets: [
        'Personal insulin resistance dietary blueprint',
        'Fats & fibers rotations schedule (seed rotation guides)',
        'Grocery checklist for clearing system inflammation'
      ]
    },
    {
      id: 's3',
      title: 'Women\'s Metabolic Wellness Programs',
      specialist: 'Dr. Evelyn Thomas, Endocrinologist & Fitness lead',
      price: '$120.00 / Month',
      desc: 'A comprehensive 30-day program of bio-syncing fitness, micro-nutrition, and rest structures to reset thyroid cellular metabolism.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=350',
      bullets: [
        'Tailored low-impact strength exercise routine',
        'Selenium & mineral cofactor supplement checkup support',
        'Weekly video monitoring check-ins'
      ]
    },
    {
      id: 's4',
      title: 'Hormonal Health & Mindset Coaching',
      specialist: 'Chloe Vance, Adrenal Rejuvenation Specialist',
      price: '$45.00 / Session',
      desc: 'Investigate how your lifestyle affects stress, adrenal exhaustion, and progesterone levels. Build coping strategies for anxiety swings.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=350',
      bullets: [
        'Vagus nerve recovery & deep breathing templates',
        'Luteal mood wave management blueprints',
        '90-day cycle journal integration'
      ]
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot) return;

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedService(null);
      setSelectedDate('');
      setSelectedTimeSlot('');
      setNotes('');
    }, 4500);
  };

  const datesList = [
    { day: 'Tomorrow', date: 'June 4, 2026' },
    { day: 'Friday', date: 'June 5, 2026' },
    { day: 'Monday', date: 'June 8, 2026' },
    { day: 'Tuesday', date: 'June 9, 2026' }
  ];

  const timeSlots = ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM'];

  return (
    <section className="py-20 bg-linear-to-b from-brand-50/10 to-white" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <PhoneCall className="h-4.5 w-4.5" />
            <span>Premium Virtual Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-main font-display tracking-tight">
            Certified Specialized Clinical & Coaching Services
          </h2>
          <p className="text-neutral-sub text-base sm:text-lg mt-3">
            Coordinate digital telehealth consultations with board-certified gynecologists, metabolic endocrinologists, and cycle nutrition experts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
          {services.map((srv) => (
            <div
              key={srv.id}
              id={`service-card-${srv.id}`}
              className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-brand-200/50 hover:shadow-md transition-all duration-300"
            >
              {/* Photo */}
              <div className="w-full sm:w-1/3 flex-shrink-0 relative rounded-2xl overflow-hidden h-40 sm:h-auto">
                <img src={srv.image} alt={srv.title} className="h-full w-full object-cover" />
                <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded bg-white/95 text-[9px] font-bold text-neutral-main tracking-wide">
                  Virtual Session
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col justify-between" id={`service-text-${srv.id}`}>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6c5ce7]">{srv.specialist}</span>
                  <h3 className="font-display font-extrabold text-lg text-neutral-main mt-1 leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-neutral-sub font-semibold mt-1 bg-neutral-50 px-2 py-0.5 rounded inline-block">
                    {srv.price}
                  </p>
                  
                  <p className="text-xs text-neutral-sub mt-2.5 leading-relaxed">
                    {srv.desc}
                  </p>

                  {/* Bullet perks */}
                  <ul className="mt-3.5 space-y-1.5 list-none">
                    {srv.bullets.map((b, idx) => (
                      <li key={idx} className="text-[10px] sm:text-xs text-neutral-sub font-medium flex items-center space-x-2">
                        <span className="h-1 w-1 rounded-full bg-brand-400 flex-shrink-0"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  id={`book-service-${srv.id}`}
                  onClick={() => setSelectedService(srv)}
                  className="mt-6 w-full py-3 px-4 rounded-xl bg-linear-to-r from-brand-400 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer active:scale-95 transition-all"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Book Consultation Stream</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal booking */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 border border-brand-100"
                id="booking-modal-panel"
              >
                {/* Header */}
                <div className="bg-linear-to-r from-brand-500 to-brand-600 px-6 py-4.5 text-white flex justify-between items-center">
                  <div className="flex items-center space-x-2.5">
                    <Clock className="h-5 w-5" />
                    <div>
                      <h3 className="font-display font-extrabold text-sm sm:text-base leading-tight">Schedule Appt</h3>
                      <span className="text-[10px] text-brand-100 font-medium">Virtual Booking Desk</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-1.5 rounded-lg bg-black/10 hover:bg-black/20 text-white/95"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Form or Success message */}
                <div className="p-6">
                  {bookingSuccess ? (
                    <div className="text-center py-8 space-y-4 animate-scaleUp">
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-full inline-block text-emerald-500 animate-bounce">
                        <CheckCircle className="h-10 w-10" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-lg text-neutral-main">Appointment Pinned!</h4>
                        <p className="text-neutral-sub text-xs sm:text-sm mt-1 max-w-sm mx-auto leading-relaxed font-semibold">
                          Your slot on <span className="text-brand-500 font-bold">{selectedDate}</span> at <span className="text-brand-500 font-bold">{selectedTimeSlot}</span> with <span className="text-neutral-main font-bold">{selectedService.specialist}</span> has been scheduled successfully.
                        </p>
                      </div>
                      <div className="pt-4 text-[10px] text-neutral-sub font-bold uppercase tracking-wider">
                        Virtual meeting details have been compiled in your Orders dashboard & email.
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4.5" id="booking-form">
                      <div className="p-3.5 bg-brand-50 rounded-2xl border border-brand-100 flex items-start space-x-3">
                        <img src={selectedService.image} alt={selectedService.title} className="h-12 w-12 rounded-lg object-cover flex-shrink-0" />
                        <div>
                          <h4 className="font-display font-bold text-xs text-neutral-sub">{selectedService.specialist}</h4>
                          <span className="font-display font-extrabold text-sm text-neutral-main block leading-tight">{selectedService.title}</span>
                          <span className="text-[10px] text-brand-500 font-bold mt-0.5 block">{selectedService.price}</span>
                        </div>
                      </div>

                      {/* Choose Date */}
                      <div>
                        <label className="text-xs font-extrabold text-neutral-main block mb-2 tracking-wide uppercase">
                          Choose Consultation Date
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {datesList.map((d, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedDate(d.date)}
                              className={`p-2.5 rounded-xl text-xs text-left border transition ${
                                selectedDate === d.date
                                  ? 'border-brand-400 bg-brand-50/40 text-brand-700 font-bold'
                                  : 'border-neutral-150 bg-white hover:bg-neutral-50 text-neutral-sub'
                              }`}
                            >
                              <span className="block font-bold text-neutral-main">{d.day}</span>
                              <span className="block text-[10px] mt-0.5">{d.date}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Choose Time slot */}
                      <div>
                        <label className="text-xs font-extrabold text-neutral-main block mb-2 tracking-wide uppercase">
                          Select Specific Hour Slot
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((ts, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedTimeSlot(ts)}
                              className={`p-2 py-2.5 rounded-lg text-[10px] font-bold border text-center transition ${
                                selectedTimeSlot === ts
                                  ? 'border-brand-400 bg-brand-50 text-brand-700 font-bold'
                                  : 'border-neutral-150 bg-white hover:bg-neutral-50 text-neutral-sub'
                              }`}
                            >
                              {ts}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Brief Notes */}
                      <div>
                        <label className="text-xs font-extrabold text-neutral-main block mb-1.5 tracking-wide uppercase">
                          Describe Symptoms/Notes (Optional)
                        </label>
                        <textarea
                          placeholder="E.g. Persistent cycle timing variations, hair thinning signs..."
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-brand-400 transition"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={!selectedDate || !selectedTimeSlot}
                        className={`w-full py-3.5 rounded-2xl font-bold font-display text-xs flex items-center justify-center space-x-2 tracking-wide transition-all ${
                          selectedDate && selectedTimeSlot
                            ? 'bg-linear-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-350 cursor-not-allowed'
                        }`}
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>Confirm Telehealth Booking • Zero Copay</span>
                      </button>

                    </form>
                  )}
                </div>

                <div className="px-6 py-3 bg-neutral-50 border-t border-dashed border-neutral-150 text-center flex items-center space-x-2 text-[10px] text-neutral-sub">
                  <AlertCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  <span>Cancellations/rescheduling allowed free up to 24 hours prior to appointment.</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
