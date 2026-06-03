import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, Shield, Calendar, Clock, Smile, Trash, BookOpen, 
  ShoppingBag, Plus, Sparkles, CheckCircle2, LineChart as ChartIcon, 
  Activity, Heart, AlertCircle, Droplets, Moon, Compass
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { UserProfile, CartItem, Product, BlogArticle, Order, SymptomLog } from '../types';

interface UserDashboardProps {
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onRemoveWishlistItem: (productId: string) => void;
  products: Product[];
  blogs: BlogArticle[];
  orders: Order[];
}

export default function UserDashboard({
  currentUser,
  setCurrentUser,
  onRemoveWishlistItem,
  products,
  blogs,
  orders,
}: UserDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'tracker' | 'orders' | 'favorites'>('tracker');
  
  // States for logging new tracker parameters
  const [waterOz, setWaterOz] = useState<number>(32);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [mood, setMood] = useState<'Energetic' | 'Balanced' | 'Tired' | 'Anxious' | 'Irritated' | 'Crampy'>('Balanced');
  const [stressLevel, setStressLevel] = useState<number>(5);
  const [isPeriodDay, setIsPeriodDay] = useState<boolean>(false);
  const [selectedLogSymptoms, setSelectedLogSymptoms] = useState<string[]>([]);
  
  const [logSuccess, setLogSuccess] = useState(false);

  // Initial dummy daily logs tracking sequence to feed Recharts
  const [trackerLogs, setTrackerLogs] = useState<SymptomLog[]>([
    { date: 'May 28', waterIntake: 1800, sleepHours: 6.5, mood: 'Tired', symptoms: ['Cramps'], stressLevel: 7, isPeriodDay: true },
    { date: 'May 29', waterIntake: 2100, sleepHours: 7.2, mood: 'Balanced', symptoms: ['Cramps'], stressLevel: 5, isPeriodDay: true },
    { date: 'May 30', waterIntake: 2500, sleepHours: 8.0, mood: 'Balanced', symptoms: [], stressLevel: 4, isPeriodDay: true },
    { date: 'May 31', waterIntake: 2200, sleepHours: 8.5, mood: 'Energetic', symptoms: [], stressLevel: 3, isPeriodDay: false },
    { date: 'June 01', waterIntake: 2400, sleepHours: 7.8, mood: 'Energetic', symptoms: [], stressLevel: 3, isPeriodDay: false },
    { date: 'June 02', waterIntake: 1900, sleepHours: 7.0, mood: 'Anxious', symptoms: ['Acne'], stressLevel: 6, isPeriodDay: false },
    { date: 'June 03', waterIntake: 2300, sleepHours: 7.5, mood: 'Balanced', symptoms: [], stressLevel: 4, isPeriodDay: false }
  ]);

  const symptomList = ['Cramps', 'Acne', 'Bloating', 'Headache', 'Insomnia', 'Brain Fog'];

  const handleToggleSymptom = (sym: string) => {
    setSelectedLogSymptoms(prev => 
      prev.includes(sym) ? prev.filter(item => item !== sym) : [...prev, sym]
    );
  };

  const handleAddSymptomLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: SymptomLog = {
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      waterIntake: Math.floor(waterOz * 29.57), // Convert Oz to mL
      sleepHours,
      mood,
      symptoms: selectedLogSymptoms,
      stressLevel,
      isPeriodDay
    };

    setTrackerLogs([...trackerLogs, newLog]);
    setLogSuccess(true);
    
    setTimeout(() => {
      setLogSuccess(false);
      setSelectedLogSymptoms([]);
      setIsPeriodDay(false);
    }, 3000);
  };

  // Find actual elements for wishlist & bookmarks
  const wishlistProducts = products.filter(p => currentUser.wishlist.includes(p.id));
  const bookmarkedBlogs = blogs.filter(b => currentUser.savedArticles.includes(b.id));

  return (
    <section className="py-12 bg-linear-to-b from-white to-brand-50/5 text-left" id="user-dashboard-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Headers */}
        <div className="bg-linear-to-tr from-brand-400 via-brand-500 to-accent-600 rounded-3xl p-6 sm:p-10 mb-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xs border border-white">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="flex items-center space-x-6 relative z-10 text-left">
            <img src={currentUser.avatar} alt={currentUser.name} className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-md" />
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-bold uppercase tracking-wider mb-1">
                <Compass className="h-3.5 w-3.5" />
                <span>Prime Cycle Member</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl leading-none">Welcome back, {currentUser.name}!</h2>
              <p className="text-brand-100 text-xs sm:text-sm mt-1">{currentUser.email} • Standard Subscriber Perspective</p>
            </div>
          </div>

          <div className="flex gap-2.5 relative z-10 flex-shrink-0">
            {/* Quick overview metric cards */}
            <div className="px-4 py-2 bg-white/15 rounded-2xl border border-white/25 text-center">
              <span className="text-[10px] text-brand-100 uppercase font-black block">Wellness Score</span>
              <span className="font-display font-extrabold text-[#fffbfd] text-base block mt-0.5">
                {currentUser.quizResults ? `${currentUser.quizResults.score}%` : 'N/A'}
              </span>
            </div>
            <div className="px-4 py-2 bg-white/15 rounded-2xl border border-white/25 text-center">
              <span className="text-[10px] text-brand-100 uppercase font-black block">Tracker Days</span>
              <span className="font-display font-extrabold text-[#fffbfd] text-base block mt-0.5">
                {trackerLogs.length} logged
              </span>
            </div>
          </div>
        </div>

        {/* Tracker layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sub menu controls */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0" id="dashboard-tab-selectors">
            {[
              { id: 'tracker', label: 'Cycle & Wellness Tracker', ico: <ChartIcon className="h-4.5 w-4.5" /> },
              { id: 'profile', label: 'Interactive Member Profile', ico: <User className="h-4.5 w-4.5" /> },
              { id: 'orders', label: 'Order History & Bookings', ico: <ShoppingBag className="h-4.5 w-4.5" /> },
              { id: 'favorites', label: 'Bookmarks & Wishlists', ico: <Heart className="h-4.5 w-4.5" /> }
            ].map(sub => (
              <button
                key={sub.id}
                id={`sub-tab-${sub.id}`}
                onClick={() => setActiveSubTab(sub.id as any)}
                className={`px-4.5 py-3.5 rounded-2xl text-xs font-bold transition flex items-center space-x-3.5 cursor-pointer flex-shrink-0 w-full ${
                  activeSubTab === sub.id
                    ? 'bg-neutral-main text-white shadow-xs font-bold border-l-4 border-brand-400'
                    : 'bg-white border border-neutral-150 text-neutral-sub hover:bg-neutral-50 hover:text-neutral-main'
                }`}
              >
                {sub.ico}
                <span>{sub.label}</span>
              </button>
            ))}
          </div>

          {/* Active section pane */}
          <div className="lg:col-span-9 bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 min-h-[500px] shadow-sm">
            <AnimatePresence mode="wait">
              
              {/* Tracker Panel */}
              {activeSubTab === 'tracker' && (
                <motion.div
                  key="tracker"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 text-left"
                >
                  <div className="border-b border-neutral-100 pb-4 flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-neutral-main">Active Cycle & Hormonal Logs</h3>
                      <p className="text-neutral-sub text-xs mt-0.5">Visually track your sleep cycles, hydration levels, daily stress logs, and symptoms.</p>
                    </div>
                  </div>

                  {/* Recharts Double Axis Area Graph */}
                  <div className="bg-neutral-50/70 p-4.5 rounded-2xl border border-neutral-200/50" id="tracker-chart-box">
                    <h4 className="font-display font-bold text-xs uppercase text-neutral-main tracking-wider mb-4 flex items-center space-x-1.5">
                      <ChartIcon className="h-4.5 w-4.5 text-[#ff6b9d]" />
                      <span>7-Day Endocrine Factors Analytics</span>
                    </h4>
                    
                    <div className="h-64 sm:h-72 w-full text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={trackerLogs}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ff6b9d" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#ff6b9d" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                          <XAxis dataKey="date" stroke="#888888" fontSize={10} tickLine={false} />
                          <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                          <Tooltip />
                          <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                          <Area type="monotone" name="Sleep Duration (hrs)" dataKey="sleepHours" stroke="#ff6b9d" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSleep)" />
                          <Area type="monotone" name="Stress Level (1-10)" dataKey="stressLevel" stroke="#6c5ce7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorStress)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Log new data inputs form */}
                  <div className="border-t border-neutral-100 pt-6">
                    <h4 className="font-display font-extrabold text-sm text-neutral-main mb-4 flex items-center space-x-2">
                      <Plus className="h-4.5 w-4.5 text-[#ff6b9d]" />
                      <span>Log Today's Vital Metrics</span>
                    </h4>

                    {logSuccess ? (
                      <div className="p-4 bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-2xl text-xs font-semibold text-center animate-scaleUp">
                        Biomarkers Syncing Complete! Core charts recalculated instantly.
                      </div>
                    ) : (
                      <form onSubmit={handleAddSymptomLog} className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="add-tracker-log-form">
                        
                        {/* Panel Left */}
                        <div className="space-y-4">
                          {/* Period Checkbox Toggle */}
                          <label className="flex items-center p-3.5 border border-neutral-200 rounded-2xl bg-[#fffbfd] cursor-pointer hover:border-brand-300">
                            <input
                              type="checkbox"
                              checked={isPeriodDay}
                              onChange={(e) => setIsPeriodDay(e.target.checked)}
                              className="rounded-md border-neutral-200 text-brand-500 h-4 w-4 mr-3 accent-brand-500"
                            />
                            <div>
                              <span className="text-xs sm:text-sm font-extrabold text-neutral-main block">Active Period Bleeding Day</span>
                              <span className="text-[10px] text-neutral-sub font-medium block">Logs prostaglandins & cycle calculations.</span>
                            </div>
                          </label>

                          {/* Hydration intake */}
                          <div>
                            <div className="flex justify-between items-center text-xs font-extrabold text-neutral-main mb-1.5 uppercase">
                              <span>Hydration Intake</span>
                              <span className="text-brand-500 font-bold">{waterOz} fl. oz. ({Math.floor(waterOz * 29.57)} ml)</span>
                            </div>
                            <input
                              type="range"
                              min={16}
                              max={128}
                              step={8}
                              value={waterOz}
                              onChange={(e) => setWaterOz(Number(e.target.value))}
                              className="w-full text-brand-500 my-2 accent-brand-500"
                            />
                            <div className="flex justify-between text-[9px] text-neutral-sub font-bold">
                              <span>Low (16 oz)</span>
                              <span>High (128 oz)</span>
                            </div>
                          </div>

                          {/* Sleep duration */}
                          <div>
                            <div className="flex justify-between items-center text-xs font-extrabold text-neutral-main mb-1.5 uppercase">
                              <span>Sleep Duration</span>
                              <span className="text-[#6c5ce7] font-bold">{sleepHours} Hours</span>
                            </div>
                            <input
                              type="range"
                              min={4}
                              max={12}
                              step={0.5}
                              value={sleepHours}
                              onChange={(e) => setSleepHours(Number(e.target.value))}
                              className="w-full text-accent-600 my-2 accent-accent-500"
                            />
                            <div className="flex justify-between text-[9px] text-neutral-sub font-bold">
                              <span>Minimal (4)</span>
                              <span>Excellent (12)</span>
                            </div>
                          </div>
                        </div>

                        {/* Panel Right */}
                        <div className="space-y-4">
                          {/* Stress & Mood */}
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] font-extrabold text-neutral-main block tracking-wide uppercase mb-1">State Mood</label>
                              <select
                                value={mood}
                                onChange={(e: any) => setMood(e.target.value)}
                                className="w-full text-xs p-3.5 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400 focus:outline-hidden"
                              >
                                {['Energetic', 'Balanced', 'Tired', 'Anxious', 'Irritated', 'Crampy'].map(m => (
                                  <option key={m} value={m}>{m}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] font-extrabold text-neutral-main block tracking-wide uppercase mb-1">Stress Level (1-10)</label>
                              <input
                                type="number"
                                min={1}
                                max={10}
                                value={stressLevel}
                                onChange={(e) => setStressLevel(Number(e.target.value))}
                                className="w-full text-xs p-3.5 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400 focus:outline-hidden"
                              />
                            </div>
                          </div>

                          {/* Symptoms togglers */}
                          <div>
                            <label className="text-[10px] font-extrabold text-neutral-main block tracking-wide uppercase mb-2">Today's Physical Indicators</label>
                            <div className="flex flex-wrap gap-1.5">
                              {symptomList.map(sym => {
                                const selected = selectedLogSymptoms.includes(sym);
                                return (
                                  <button
                                    key={sym}
                                    type="button"
                                    onClick={() => handleToggleSymptom(sym)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition border ${
                                      selected
                                        ? 'bg-brand-500 text-white border-brand-500 shadow-3xs'
                                        : 'bg-white text-neutral-sub border-neutral-200 hover:border-neutral-300'
                                    }`}
                                  >
                                    {sym}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Submit */}
                          <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-[#2d3436] hover:bg-brand-500 hover:text-white text-white font-bold text-xs tracking-wider uppercase transition shadow-xs cursor-pointer"
                          >
                            Update System Biomarkers Logs
                          </button>
                        </div>

                      </form>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Profile Panel */}
              {activeSubTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="font-display font-extrabold text-lg text-neutral-main pb-4 border-b border-neutral-100">
                    Interactive Member Profile Management
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-sub block uppercase mb-1">First & Last Name</span>
                        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-150 text-xs text-neutral-main font-semibold">
                          {currentUser.name}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-neutral-sub block uppercase mb-1">Email Coordinates</span>
                        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-150 text-xs text-neutral-sub font-medium">
                          {currentUser.email}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-neutral-sub block uppercase mb-1">Administrative Privilege Role</span>
                        <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-150 text-xs text-brand-600 font-bold flex items-center space-x-1.5 uppercase">
                          <Shield className="h-4 w-4" />
                          <span>{currentUser.role} Dashboard access</span>
                        </div>
                      </div>
                    </div>

                    {/* Quiz Result summary details */}
                    <div className="p-5.5 bg-brand-50/20 border border-brand-100/50 rounded-2xl flex flex-col justify-between">
                      {currentUser.quizResults ? (
                        <div className="space-y-3">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#e84393] bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100 inline-block">
                            Pinned Quiz Score
                          </span>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="font-display font-extrabold text-3xl text-brand-600 leading-none">{currentUser.quizResults.score}%</span>
                            <span className="text-xs text-neutral-sub font-semibold">Hormone Balance Score</span>
                          </div>
                          
                          <p className="text-xs text-neutral-main font-bold mt-1.5">Assigned profile: {currentUser.quizResults.wellnessLevel}</p>
                          <ul className="text-[11px] text-neutral-sub space-y-1 pl-4 list-disc font-medium leading-relaxed">
                            {currentUser.quizResults.tips.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-center py-8 space-y-3 flex-1 flex flex-col items-center justify-center">
                          <Sparkles className="h-7 w-7 text-brand-400 animate-bounce" />
                          <p className="text-xs text-neutral-sub font-semibold">No quiz scores synced yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders histories */}
              {activeSubTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="font-display font-extrabold text-lg text-neutral-main pb-4 border-b border-neutral-100">
                    Your Order Log & Active Bookings
                  </h3>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <ShoppingBag className="h-10 w-10 text-neutral-300 mx-auto" />
                      <p className="text-xs text-neutral-sub font-semibold">You haven't purchased any items or coordinated clinical sessions today.</p>
                    </div>
                  ) : (
                    <div className="space-y-5 pt-2" id="dashboard-orders-list">
                      {orders.map((ord) => (
                        <div key={ord.id} className="p-5 border border-neutral-150 rounded-2xl bg-neutral-50/50 flex flex-col justify-between gap-4">
                          <div className="flex justify-between items-center flex-wrap gap-2 text-xs">
                            <div>
                              <span className="font-bold text-neutral-main block">Order: #{ord.id}</span>
                              <span className="text-neutral-sub text-[10px] mt-0.5 block">Placed on {ord.date}</span>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                              ord.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {ord.status}
                            </span>
                          </div>

                          <div className="border-t border-dashed border-neutral-150 pt-3 text-xs space-y-1 text-left">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between text-neutral-sub font-medium">
                                <span>{it.product.name} (Qty x{it.quantity})</span>
                                <span className="font-bold text-neutral-main">${(it.product.price * it.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-neutral-150 pt-3 flex justify-between font-display font-black text-sm text-[#2d3436]">
                            <span>Final Transaction Bill</span>
                            <span>${ord.total.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Favorites Wishlists */}
              {activeSubTab === 'favorites' && (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="font-display font-extrabold text-lg text-neutral-main pb-4 border-b border-neutral-100">
                    Your Saved Articles & Wishlist Products
                  </h3>

                  {/* Bookmark Articles */}
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-xs text-[#9b59b6] uppercase tracking-wider flex items-center space-x-1.5">
                      <BookOpen className="h-4.5 w-4.5" />
                      <span>Bookmarked Health Guides ({bookmarkedBlogs.length})</span>
                    </h4>

                    {bookmarkedBlogs.length === 0 ? (
                      <p className="text-xs text-neutral-sub italic font-medium">No bookmarks pinned in library.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bookmarkedBlogs.map(b => (
                          <div key={b.id} className="p-3.5 bg-neutral-50/70 border border-neutral-150 rounded-xl flex items-center justify-between gap-3 text-left">
                            <div>
                              <span className="text-[10px] font-bold text-accent-700 block uppercase">{b.category}</span>
                              <h5 className="text-xs font-bold text-neutral-main line-clamp-1 leading-tight mt-0.5">{b.title}</h5>
                            </div>
                            
                            <button
                              id={`unsave-blog-${b.id}`}
                              onClick={() => {
                                setCurrentUser(prev => ({
                                  ...prev,
                                  savedArticles: prev.savedArticles.filter(id => id !== b.id)
                                }));
                              }}
                              className="p-2 bg-white text-rose-500 rounded-lg hover:bg-rose-50 border border-neutral-150 flex-shrink-0 cursor-pointer"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Wishlist Products */}
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <h4 className="font-display font-bold text-xs text-[#ff6b9d] uppercase tracking-wider flex items-center space-x-1.5">
                      <Heart className="h-4.5 w-4.5 fill-brand-400 text-brand-500" />
                      <span>Wishlists Products ({wishlistProducts.length})</span>
                    </h4>

                    {wishlistProducts.length === 0 ? (
                      <p className="text-xs text-neutral-sub italic font-medium">Your shopping wishlist is currently empty.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlistProducts.map(p => (
                          <div key={p.id} className="p-3.5 bg-neutral-50/70 border border-neutral-150 rounded-xl flex items-center justify-between gap-3 text-left">
                            <div className="flex items-center space-x-3">
                              <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover flex-shrink-0" />
                              <div>
                                <h5 className="text-xs font-bold text-neutral-main line-clamp-1 leading-snug">{p.name}</h5>
                                <span className="text-[10px] text-brand-500 font-extrabold mt-0.5 block">${p.price}</span>
                              </div>
                            </div>
                            
                            <button
                              id={`unwish-prod-${p.id}`}
                              onClick={() => onRemoveWishlistItem(p.id)}
                              className="p-2 bg-white text-rose-500 rounded-lg hover:bg-rose-50 border border-neutral-150 flex-shrink-0 cursor-pointer"
                            >
                              <Trash className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
