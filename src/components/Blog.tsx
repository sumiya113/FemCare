import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, BookOpen, Clock, User, Bookmark, X, ArrowLeft, 
  Sparkles, Hash, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { BlogArticle, UserProfile } from '../types';

interface BlogProps {
  blogs: BlogArticle[];
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export default function Blog({ blogs, currentUser, setCurrentUser }: BlogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);
  const [savedNews, setSavedNews] = useState<string | null>(null);

  // Filter lists
  const categories = ['All', 'Women\'s Health', 'PCOS', 'Nutrition', 'Lifestyle', 'Mental Health', 'Fitness'];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = blogs[0];

  const handleToggleSave = (blogId: string) => {
    const isSavedAlready = currentUser.savedArticles.includes(blogId);
    
    setCurrentUser(prev => ({
      ...prev,
      savedArticles: isSavedAlready 
        ? prev.savedArticles.filter(id => id !== blogId)
        : [...prev.savedArticles, blogId]
    }));

    setSavedNews(isSavedAlready ? 'Article Removed' : 'Article Saved to Profile');
    setTimeout(() => setSavedNews(null), 2500);
  };

  return (
    <section className="py-16 bg-linear-to-b from-white to-[#fff9fb]" id="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-accent-50 text-[#6c5ce7] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="h-4 w-4" />
            <span>Medically Checked Library</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2d3436] font-display tracking-tight">
            Latest Medical Insights & Wellness Practices
          </h2>
          <p className="text-neutral-sub text-sm sm:text-base mt-2">
            Expand your cycle physiology literacy with guides written by gynecologists, coaching experts, and metabolic thyroid specialists.
          </p>
        </div>

        {/* Featured blog card */}
        {blogs.length > 0 && searchTerm === '' && selectedCategory === 'All' && (
          <div className="relative bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center mb-16 shadow-xs overflow-hidden" id="featured-article-card">
            {/* Spotlight tag */}
            <div className="absolute top-4 left-4 bg-brand-500 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-md z-10 shadow-xs">
              Spotlight Read
            </div>

            {/* Photo column */}
            <div className="w-full lg:w-1/2 h-64 sm:h-80 rounded-2xl overflow-hidden relative shadow-inner">
              <img src={featuredBlog.image} alt={featuredBlog.title} className="h-full w-full object-cover" />
            </div>

            {/* Texts */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-4">
              <div className="space-y-3 text-left">
                <span className="text-[10px] sm:text-xs text-brand-500 font-extrabold tracking-widest block uppercase">
                  Category: {featuredBlog.category} • {featuredBlog.readTime}
                </span>

                <h3 className="font-display font-black text-xl sm:text-2xl text-neutral-main hover:text-brand-500 transition cursor-pointer" onClick={() => setSelectedBlog(featuredBlog)}>
                  {featuredBlog.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-sub leading-relaxed">
                  {featuredBlog.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-dashed border-neutral-150">
                <div className="flex items-center space-x-2.5">
                  <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-extrabold text-xs">
                    OB
                  </div>
                  <div>
                    <span className="text-xs text-neutral-main font-bold block leading-tight">{featuredBlog.author}</span>
                    <span className="text-[10px] text-neutral-sub block mt-0.5">{featuredBlog.date}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleSave(featuredBlog.id)}
                    className="p-2.5 rounded-xl border border-neutral-200 text-neutral-sub hover:text-brand-500 hover:border-brand-100 cursor-pointer"
                    title="Bookmark Article"
                  >
                    <Bookmark 
                      className={`h-4.5 w-4.5 ${
                        currentUser.savedArticles.includes(featuredBlog.id) ? 'fill-brand-500 text-brand-500' : ''
                      }`} 
                    />
                  </button>

                  <button
                    onClick={() => setSelectedBlog(featuredBlog)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-main hover:bg-brand-500 hover:text-white text-white text-xs font-bold transition flex items-center space-x-2 cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search controls */}
        <div className="border-t border-neutral-100 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8" id="blog-inputs-container">
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 scrollbar-none">
            {categories.map(c => (
              <button
                key={c}
                id={`blog-filter-${c.replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition border flex-shrink-0 cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-linear-to-r from-brand-400 to-brand-500 text-white border-brand-400'
                    : 'bg-white text-neutral-sub border-neutral-200 hover:border-brand-200 hover:text-brand-500'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guides or tags..."
              className="block w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-brand-400"
            />
          </div>
        </div>

        {/* Regular list columns */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16" id="blogs-empty-state">
            <span className="text-neutral-sub font-semibold">No medical articles found matching selection.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs-grid">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                id={`blog-card-${blog.id}`}
                className="bg-white rounded-3xl border border-neutral-100 hover:border-brand-200/50 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="h-48 relative overflow-hidden bg-neutral-100">
                  <img src={blog.image} alt={blog.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[9px] font-extrabold uppercase text-[#9b59b6] border border-accent-100">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-left">
                    <div className="flex items-center space-x-2 text-[10px] text-neutral-sub font-bold">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{blog.readTime}</span>
                    </div>

                    <h4 
                      onClick={() => setSelectedBlog(blog)}
                      className="font-display font-extrabold text-base text-neutral-main hover:text-brand-500 transition cursor-pointer line-clamp-2"
                    >
                      {blog.title}
                    </h4>
                    <p className="text-xs text-neutral-sub leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-5 border-t border-neutral-100">
                    <span className="text-[10px] text-neutral-sub font-bold block">{blog.date}</span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleSave(blog.id)}
                        className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-sub hover:text-brand-500"
                      >
                        <Bookmark 
                          className={`h-4 w-4 ${
                            currentUser.savedArticles.includes(blog.id) ? 'fill-brand-500 text-brand-500' : ''
                          }`} 
                        />
                      </button>
                      
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="px-3.5 py-2 rounded-lg bg-neutral-main hover:bg-brand-500 hover:text-white text-white text-[10px] font-extrabold transition cursor-pointer"
                      >
                        <span>Read</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Modal Blog Detail Reader */}
        <AnimatePresence>
          {selectedBlog && (
            <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBlog(null)}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 border border-brand-100 text-left"
                id="blog-reading-modal"
              >
                {/* Header photo */}
                <div className="h-56 relative overflow-hidden bg-neutral-100">
                  <img src={selectedBlog.image} alt={selectedBlog.title} className="h-full w-full object-cover" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] text-brand-300 font-extrabold uppercase tracking-widest">
                      {selectedBlog.category} • {selectedBlog.readTime}
                    </span>
                    <h3 className="font-display font-extrabold text-white text-lg sm:text-xl mt-1 leading-snug">
                      {selectedBlog.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/40 text-white/90 hover:bg-black/60 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body article content */}
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-100 text-xs text-neutral-sub font-semibold">
                    <div className="flex items-center space-x-2">
                      <User className="h-3.5 w-3.5 text-brand-500" />
                      <span>{selectedBlog.author}</span>
                    </div>
                    <span>{selectedBlog.date}</span>
                  </div>

                  {/* Rich Content Render (Using clean div markup for mock parsing since react-markdown removes class) */}
                  <div className="prose prose-pink max-w-none text-xs sm:text-sm text-neutral-main leading-relaxed space-y-4">
                    {selectedBlog.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('###')) {
                        return <h4 key={index} className="font-display font-extrabold text-base text-neutral-main mt-5 pb-1 border-b border-neutral-100 text-brand-600">{paragraph.replace('###', '').trim()}</h4>;
                      }
                      if (paragraph.startsWith('*')) {
                        return <p key={index} className="p-3 bg-neutral-50 rounded-xl border border-neutral-150 text-xs text-neutral-sub font-semibold italic">{paragraph.replace('*', '').trim()}</p>;
                      }
                      if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
                        return <div key={index} className="pl-4 border-l-2 border-brand-300 my-2 py-1 font-medium">{paragraph}</div>;
                      }
                      return <p key={index} className="font-normal">{paragraph}</p>;
                    })}
                  </div>

                  {/* Tags */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBlog.tags.map(t => (
                        <span key={t} className="text-[10px] font-bold text-neutral-sub bg-neutral-50 px-2.5 py-1 rounded-lg border border-neutral-150">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleToggleSave(selectedBlog.id)}
                      className="px-3.5 py-2 rounded-xl bg-linear-to-r from-brand-400 to-brand-500 hover:from-brand-500 hover:to-brand-600 inline-flex items-center space-x-1.5 text-xs text-white font-bold cursor-pointer"
                    >
                      <Bookmark className="h-3.5 w-3.5 fill-white/10" />
                      <span>
                        {currentUser.savedArticles.includes(selectedBlog.id) ? 'Saved' : 'Save Read'}
                      </span>
                    </button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Saved Toast Status */}
        <AnimatePresence>
          {savedNews && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-100 glass-effect-dark text-white p-4 rounded-2xl border border-neutral-750 shadow-xl flex items-center space-x-3.5 max-w-[280px]"
              id="toast-blog-success"
            >
              <div className="p-1 rounded-full bg-brand-500 text-white">
                <CheckCircle2 className="h-4 w-4 stroke-[3]" />
              </div>
              <span className="text-xs font-bold block">{savedNews}</span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
