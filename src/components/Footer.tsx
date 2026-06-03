import React from 'react';
import { HeartHandshake, Instagram, Twitter, Heart, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateToTab: (tabId: string) => void;
}

export default function Footer({ onNavigateToTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const links = {
    topics: [
      { id: 'irregular-periods', lab: "Oligo & Timing" },
      { id: 'pcos', lab: "PCOS Science" },
      { id: 'thyroid-women', lab: "Thyroid & Women" },
      { id: 'fertility-awareness', lab: "FAM Ovulation" }
    ],
    shop: [
      { id: 'p1', lab: "Massage belts" },
      { id: 'p4', lab: "Myo-Inositol Kits" },
      { id: 'p6', lab: "Cycle Sync Planners" },
      { id: 'p7', lab: "Herbal Balancing Teas" }
    ],
    resources: [
      { id: 'home', lab: "General Hub" },
      { id: 'quiz', lab: "Assessment Test" },
      { id: 'services', lab: "OB-GYN Telehealth" },
      { id: 'blog', lab: "Resources Read" }
    ]
  };

  return (
    <footer className="bg-linear-to-b from-neutral-50 to-brand-50/30 border-t border-brand-100/50 pt-16 pb-8 text-[#2d3436]" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 mb-12 text-left" id="footer-sitemap-grid">
          
          {/* Logo brand info */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavigateToTab('home')}>
              <div className="p-2 bg-brand-500 rounded-full text-white shadow-xs">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <span className="font-display font-black text-xl bg-linear-to-r from-brand-500 to-accent-600 bg-clip-text text-transparent">
                  FemCare
                </span>
                <span className="text-[10px] uppercase font-bold text-neutral-sub tracking-widest block -mt-1">Wellness</span>
              </div>
            </div>

            <p className="text-xs text-neutral-sub leading-relaxed max-w-sm font-medium">
              A trusted, medically backed platform designed to boost physiological literacy, track biomarker synchronicity, and connect women with licensed clinical consultants.
            </p>

            {/* Social icons */}
            <div className="flex space-x-3.5 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-sub hover:text-brand-500 hover:border-brand-100 hover:bg-brand-50/50 transition">
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-sub hover:text-brand-500 hover:border-brand-100 hover:bg-brand-50/50 transition">
                <Twitter className="h-4.5 w-4.5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-sub hover:text-brand-500 hover:border-brand-100 hover:bg-brand-50/50 transition">
                <Mail className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick link sets */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-display font-extrabold text-[#2d3436] text-xs tracking-wider uppercase">Health Topics</h4>
            <div className="flex flex-col space-y-2">
              {links.topics.map(t => (
                <button
                  key={t.id}
                  onClick={() => onNavigateToTab('awareness')}
                  className="text-xs text-neutral-sub text-left hover:text-brand-500 hover:underline transition cursor-pointer font-medium"
                >
                  {t.lab}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2 space-y-3">
            <h4 className="font-display font-extrabold text-[#2d3436] text-xs tracking-wider uppercase">Wellness Store</h4>
            <div className="flex flex-col space-y-2">
              {links.shop.map(t => (
                <button
                  key={t.id}
                  onClick={() => onNavigateToTab('products')}
                  className="text-xs text-neutral-sub text-left hover:text-brand-500 hover:underline transition cursor-pointer font-medium"
                >
                  {t.lab}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-2 lg:col-span-4 space-y-3">
            <h4 className="font-display font-extrabold text-[#2d3436] text-xs tracking-wider uppercase">Educational Resources</h4>
            <div className="flex flex-col space-y-2">
              {links.resources.map(t => (
                <button
                  key={t.id}
                  onClick={() => onNavigateToTab(t.id)}
                  className="text-xs text-neutral-sub text-left hover:text-brand-500 hover:underline transition cursor-pointer font-medium"
                >
                  {t.lab}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Box */}
        <div className="border-t border-brand-100/60 pt-8 pb-8 flex flex-col md:flex-row gap-6 items-center justify-between text-[11px] sm:text-xs text-neutral-sub border-b border-dashed">
          <div className="flex items-start space-x-3 max-w-2xl text-left font-medium">
            <ShieldCheck className="h-5 w-5 text-[#ff6b9d] flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-extrabold text-neutral-main">Safe Use Notice:</span> FemCare Wellness operates strictly under educational parameters and Rotterdam medical consensus protocols. We never formulate prescriptions or active clinical recipes. Continued use of tracking services denotes agreement with our Service Terms.
            </p>
          </div>

          <div className="flex space-x-4 flex-shrink-0 font-semibold text-[#2d3436]">
            <a href="#" className="hover:underline hover:text-brand-500">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline hover:text-brand-500">Terms of Service</a>
          </div>
        </div>

        {/* Copys */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-wider text-neutral-sub font-bold gap-3">
          <span>© {currentYear} FemCare Wellness Inc. All rights reserved.</span>
          <span className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>for Women's Physiological Empowerment</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
