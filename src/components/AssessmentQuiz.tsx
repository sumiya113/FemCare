import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Award, RotateCcw, ShieldCheck, ArrowRight, CheckCircle, 
  BookOpen, ShoppingBag, HeartHandshake, AlertCircle, BookmarkCheck
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data';
import { UserProfile, Product, BlogArticle } from '../types';

interface AssessmentQuizProps {
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onNavigateToTab: (tabId: string) => void;
  allProducts: Product[];
  allBlogs: BlogArticle[];
}

export default function AssessmentQuiz({
  currentUser,
  setCurrentUser,
  onNavigateToTab,
  allProducts,
  allBlogs,
}: AssessmentQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    wellnessLevel: string;
    tips: string[];
    articles: BlogArticle[];
    products: Product[];
  } | null>(null);

  const totalSteps = QUIZ_QUESTIONS.length;

  const handleSelectOption = (score: number) => {
    const updatedScores = [...scores, score];
    setScores(updatedScores);

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate full outcome
      const totalSum = updatedScores.reduce((sum, s) => sum + s, 0);
      const percentageScore = Math.floor((totalSum / (totalSteps * 10)) * 100);

      // Determine Wellness Profile
      let level = 'Developing Wellness (Focus Required)';
      let tips: string[] = [];
      let catTheme: string[] = [];

      if (percentageScore >= 85) {
        level = 'Thriving Balance (Vibrant Harmony)';
        tips = [
          'Continue cycle-syncing calorie allocations and intense strength workouts during your follicular phase.',
          'Supplement with spearmint or red raspberry teas to protect natural follicle counts.',
          'Maintain your robust 8-hour sleep sync schedule.'
        ];
        catTheme = ['Hormonal Wellness', 'Nutrition & Fitness'];
      } else if (percentageScore >= 60) {
        level = 'Moderate Balance (Refinement Recommended)';
        tips = [
          'Address minor cycle delays by removing high caffeine intakes during your early luteal phase.',
          'Adopt low-impact workouts like rowing, brisk walks, or pilates to bring cortisol down.',
          'Balance daily plates with fats, fiber, and clean complex cards to prevent insulin swings.'
        ];
        catTheme = ['Menstrual Care', 'Self Care'];
      } else {
        level = 'Hormonal Stress Wave (Rejuvenation Required)';
        tips = [
          'Establish a reliable daily cycle tracker or journal to pinpoint stress fluctuations.',
          'Immediately consult your OB-GYN regarding persistent missing period timelines.',
          'Swap aggressive workouts for restorative sleep protocols.'
        ];
        catTheme = ['PCOS Support', 'Menstrual Care', 'Self Care'];
      }

      // Find appropriate recomms
      const recommendedBlogs = allBlogs.slice(0, 2);
      const recommendedProducts = allProducts.filter(p => catTheme.includes(p.category)).slice(0, 2);

      // Update current user results
      const res = {
        date: new Date().toLocaleDateString(),
        score: percentageScore,
        wellnessLevel: level,
        tips
      };

      setCurrentUser(prevProfile => ({
        ...prevProfile,
        quizResults: res
      }));

      setQuizResults({
        score: percentageScore,
        wellnessLevel: level,
        tips,
        articles: recommendedBlogs,
        products: recommendedProducts,
      });

      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores([]);
    setCompleted(false);
    setQuizResults(null);
  };

  return (
    <section className="py-20 bg-linear-to-b from-white to-brand-50/10" id="quiz-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="h-4 w-4" />
            <span>Interactive Multi-Step Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-main font-display tracking-tight">
            Take Your Wellness Assessment
          </h2>
          <p className="text-neutral-sub text-sm sm:text-base mt-2">
            Calculate your personalized Wellness Score. This 5-step checklist maps menstrual patterns, circadian rest, stress markers, and fitness layouts to formulate a custom rebalancing roadmap.
          </p>
        </div>

        {/* Card Component */}
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden p-6 sm:p-10 min-h-[400px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!completed ? (
              /* Quiz Loading Steps */
              <motion.div
                key="step"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="space-y-8 h-full flex flex-col justify-between"
              >
                <div>
                  {/* Progress Line */}
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
                      Step {currentStep + 1} of {totalSteps}
                    </span>
                    <span className="text-xs font-extrabold text-neutral-sub">
                      {Math.floor(((currentStep) / totalSteps) * 100)}% Complete
                    </span>
                  </div>

                  <div className="w-full bg-neutral-100 rounded-full h-2 mb-8 overflow-hidden">
                    <div 
                      className="bg-brand-400 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    ></div>
                  </div>

                  {/* Question */}
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-neutral-main leading-snug mb-6" id={`quiz-question-${QUIZ_QUESTIONS[currentStep].id}`}>
                    {QUIZ_QUESTIONS[currentStep].text}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3.5">
                    {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
                      <button
                        key={i}
                        id={`quiz-option-${currentStep}-${i}`}
                        onClick={() => handleSelectOption(opt.score)}
                        className="w-full text-left p-4 rounded-2xl border border-neutral-200 hover:border-brand-400 hover:bg-brand-50/20 transition-all duration-200 active:scale-[0.99] text-sm font-semibold text-neutral-sub hover:text-brand-900 shadow-2xs cursor-pointer flex items-center justify-between group"
                      >
                        <span>{opt.text}</span>
                        <ArrowRight className="h-4 w-4 bg-neutral-100 group-hover:bg-brand-100 p-0.5 rounded-full text-neutral-400 group-hover:text-brand-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-dashed border-neutral-100 mt-8 text-center sm:text-left text-xs text-neutral-sub flex items-center space-x-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Your selections are processed entirely in-browser. Standard non-diagnostic education protocols apply.</span>
                </div>
              </motion.div>
            ) : (
              /* Results Screen */
              quizResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Score circle */}
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-8 border-b border-neutral-100 pb-6">
                    <div className="relative h-28 w-28 flex items-center justify-center bg-linear-to-br from-brand-100/50 to-brand-50/30 rounded-full border-4 border-brand-200 mb-4 sm:mb-0 shadow-inner">
                      <div className="text-center">
                        <span className="font-display font-black text-3xl text-brand-600 tracking-tight">
                          {quizResults.score}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-brand-500 block -mt-1">
                          Score
                        </span>
                      </div>
                    </div>

                    <div className="text-center sm:text-left">
                      <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-accent-50 text-accent-600 text-[10px] font-extrabold uppercase border border-accent-100 mb-1.5">
                        <BookmarkCheck className="h-3 w-3" />
                        <span>Hormonal Profile Level</span>
                      </div>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-main">
                        {quizResults.wellnessLevel}
                      </h3>
                      <p className="text-neutral-sub text-xs mt-1 font-medium">
                        Based on your menstrual consistency, sleep hours, stress loads, and balanced fueling.
                      </p>
                    </div>
                  </div>

                  {/* Bullet points Action Tips */}
                  <div>
                    <h4 className="font-display font-bold text-xs text-brand-500 uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span>Custom Clinical Self-Care Hacks</span>
                    </h4>
                    <div className="space-y-2.5">
                      {quizResults.tips.map((tip, idx) => (
                        <div key={idx} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-150 flex items-start space-x-3 text-xs sm:text-sm text-neutral-sub font-medium leading-relaxed">
                          <span className="p-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations blogs & products */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
                    
                    {/* Recommended Resource */}
                    <div>
                      <h4 className="font-display font-bold text-xs text-neutral-sub uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                        <BookOpen className="h-4 w-4 text-accent-500" />
                        <span>Recommended Resource</span>
                      </h4>
                      <div className="space-y-3">
                        {quizResults.articles.map(blog => (
                          <div 
                            key={blog.id} 
                            onClick={() => onNavigateToTab('blog')}
                            className="p-3 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-150 cursor-pointer transition text-left flex items-start space-x-3"
                          >
                            <img src={blog.image} alt={blog.title} className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover flex-shrink-0" />
                            <div>
                              <h5 className="text-xs font-bold text-neutral-main line-clamp-2 leading-snug">{blog.title}</h5>
                              <span className="text-[9px] text-[#9b59b6] font-semibold mt-1 block">{blog.category}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highly Relevant Items */}
                    <div>
                      <h4 className="font-display font-bold text-xs text-neutral-sub uppercase tracking-widest mb-3 flex items-center space-x-1.5">
                        <ShoppingBag className="h-4 w-4 text-brand-500" />
                        <span>Hormone Supporting Kit</span>
                      </h4>
                      <div className="space-y-3">
                        {quizResults.products.map(prod => (
                          <div 
                            key={prod.id} 
                            onClick={() => onNavigateToTab('products')}
                            className="p-3 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-150 cursor-pointer transition text-left flex items-start space-x-3"
                          >
                            <img src={prod.image} alt={prod.name} className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover flex-shrink-0" />
                            <div>
                              <h5 className="text-xs font-bold text-neutral-main line-clamp-1 leading-snug">{prod.name}</h5>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[10px] font-semibold text-neutral-sub">${prod.price}</span>
                                <span className="text-[9px] text-brand-500 font-bold">Category: {prod.category}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Reset trigger */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-neutral-150 gap-4">
                    <div className="flex items-center space-x-2 text-neutral-sub text-[10px] sm:text-xs">
                      <AlertCircle className="h-4.5 w-4.5 text-[#ff6b9d]" />
                      <span>These quiz logs are pinned inside your personal member dashboard.</span>
                    </div>

                    <button
                      id="reset-quiz-btn"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-sub hover:bg-neutral-50 hover:text-neutral-main transition flex items-center space-x-1.5 cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Retake Assessment</span>
                    </button>
                  </div>

                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
