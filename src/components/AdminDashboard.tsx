import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, DollarSign, ListOrdered, Mail, Check, Trash2, Edit2, Plus, 
  Sparkles, CheckCircle2, AlertCircle, ShoppingBag, BookOpen, Clock, 
  BarChart, Reply, X, Filter 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { Product, BlogArticle, ContactMessage } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (newProd: Product) => void;
  onDeleteProduct: (prodId: string) => void;
  blogs: BlogArticle[];
  onAddBlog: (newBlog: BlogArticle) => void;
  onDeleteBlog: (blogId: string) => void;
  messages: ContactMessage[];
  onReplyMessage: (msgId: string) => void;
}

export default function AdminDashboard({
  products,
  onAddProduct,
  onDeleteProduct,
  blogs,
  onAddBlog,
  onDeleteBlog,
  messages,
  onReplyMessage,
}: AdminDashboardProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'kpis' | 'crm' | 'catalog' | 'blogs'>('kpis');

  // New product form states
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Menstrual Care');
  const [newProdPrice, setNewProdPrice] = useState('24.99');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImg, setNewProdImg] = useState('https://images.unsplash.com/photo-1627572714441-3b749dff11cc?auto=format&fit=crop&q=80&w=350');
  const [productSuccess, setProductSuccess] = useState(false);

  // New blog form states
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Women\'s Health');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogImg, setNewBlogImg] = useState('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=350');
  const [blogSuccess, setBlogSuccess] = useState(false);

  // CRM Response drawer templates modal
  const [answeringMsg, setAnsweringMsg] = useState<ContactMessage | null>(null);
  const [draftResponse, setDraftResponse] = useState('');
  const [replySuccess, setReplySuccess] = useState(false);

  // Mock graph coordinates for Bar chart
  const salesByClassData = [
    { category: 'Hormonal', sales: 4200, orders: 125 },
    { category: 'Menstrual', sales: 5600, orders: 180 },
    { category: 'PCOS Support', sales: 6900, orders: 210 },
    { category: 'Fitness', sales: 3100, orders: 90 },
    { category: 'Self Care', sales: 2400, orders: 85 }
  ];

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdDesc) return;

    onAddProduct({
      id: 'p-' + Math.random().toString(36).substr(2, 5),
      name: newProdName,
      category: newProdCategory as any,
      price: parseFloat(newProdPrice),
      description: newProdDesc,
      image: newProdImg,
      rating: 4.8,
      inStock: true,
      reviews: [
        { name: 'Admin Verification Spec', rating: 5, comment: 'Internally certified laboratory compound metrics verified.', date: 'May 2026' }
      ]
    });

    setProductSuccess(true);
    setTimeout(() => {
      setProductSuccess(false);
      setNewProdName('');
      setNewProdPrice('24.99');
      setNewProdDesc('');
    }, 2500);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogExcerpt || !newBlogContent) return;

    onAddBlog({
      id: 'b-' + Math.random().toString(36).substr(2, 5),
      title: newBlogTitle,
      category: newBlogCategory,
      excerpt: newBlogExcerpt,
      content: newBlogContent,
      author: 'Clinical Advisory Board Leads',
      date: 'June 2026',
      readTime: '6 min read',
      image: newBlogImg,
      tags: [newBlogCategory.toLowerCase(), 'rebalance', 'vitality']
    });

    setBlogSuccess(true);
    setTimeout(() => {
      setBlogSuccess(false);
      setNewBlogTitle('');
      setNewBlogExcerpt('');
      setNewBlogContent('');
    }, 2500);
  };

  const handleSendDraftReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftResponse || !answeringMsg) return;

    onReplyMessage(answeringMsg.id);
    setReplySuccess(true);
    
    setTimeout(() => {
      setReplySuccess(false);
      setAnsweringMsg(null);
      setDraftResponse('');
    }, 2800);
  };

  const handleLoadTemplate = (tempType: 'pcos' | 'shipping' | 'dosage') => {
    if (tempType === 'pcos') {
      setDraftResponse("Dear User, Thank you for reaching our FemCare Care Desk regarding PCOS. While our Myo-Inositol supplements offer outstanding biochemical supports for cycle regulation and insulin sensitivy, we highly encourage consulting your gynecologist to check a full baseline LH/FSH hormone layout beforehand. Feel free to let us know if we can compile any scientific papers for you!");
    } else if (tempType === 'dosage') {
      setDraftResponse("Hello! For our organic balancing teas, we recommend brewing 1.5 teaspoons in filtered boiling water for 7-10 minutes. For optimal follicle tracking support, consume 1 cup daily during your late follicular and ovulatory cycle days. Let us know if we can offer further help!");
    } else {
      setDraftResponse("Hello! We apologize for any coordination delays in tracking your heating belts order. Our logistical team verified your package left our SF warehouse yesterday under Tracking ID #FEM-77348. Please expect delivery inside 2 business days.");
    }
  };

  const totalSalesRevenue = salesByClassData.reduce((acc, c) => acc + c.sales, 0);
  const totalOrdersCount = salesByClassData.reduce((acc, c) => acc + c.orders, 0);

  return (
    <section className="py-12 bg-linear-to-b from-white to-brand-50/5 text-left" id="admin-dashboard-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Intro Header Banner */}
        <div className="border-b border-neutral-100 pb-5 mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-linear-to-r from-accent-500 to-accent-600 text-white font-extrabold text-[9px] uppercase tracking-wider mb-1 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Operational Executive Suite</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-main">
              FemCare Management Console
            </h2>
            <p className="text-neutral-sub text-xs sm:text-sm mt-0.5">
              Review live shop receipts, update supplement inventory catalog databases, and response draft compliant templates to clients.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200" id="admin-category-tabs">
            {[
              { id: 'kpis', label: 'Overview Analytics', ico: <BarChart className="h-4 w-4" /> },
              { id: 'crm', label: `CRM Queries (${messages.length})`, ico: <Mail className="h-4 w-4" /> },
              { id: 'catalog', label: 'Products Master', ico: <ShoppingBag className="h-4 w-4" /> },
              { id: 'blogs', label: 'Resources Editor', ico: <BookOpen className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                id={`admin-tab-btn-${tab.id}`}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer ${
                  activeAdminTab === tab.id
                    ? 'bg-white text-neutral-main shadow-2xs'
                    : 'text-neutral-sub hover:text-neutral-main'
                }`}
              >
                {tab.ico}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Console active panel content */}
        <div className="bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            
            {/* Case KPIs overview panel */}
            {activeAdminTab === 'kpis' && (
              <motion.div
                key="kpis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* Visual grid numbers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="admin-stats-grid">
                  <div className="p-5.5 bg-neutral-50 rounded-2xl border border-neutral-150 flex items-center space-x-4">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-sub font-bold block uppercase">Cumulative Revenue</span>
                      <span className="font-display font-black text-xl text-neutral-main mt-0.5 block">${totalSalesRevenue.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="p-5.5 bg-neutral-50 rounded-2xl border border-neutral-150 flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                      <ListOrdered className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-sub font-bold block uppercase">Today's Order Lines</span>
                      <span className="font-display font-black text-xl text-neutral-main mt-0.5 block">{totalOrdersCount} Checked</span>
                    </div>
                  </div>

                  <div className="p-5.5 bg-neutral-50 rounded-2xl border border-neutral-150 flex items-center space-x-4">
                    <div className="p-3 bg-brand-50 rounded-xl text-brand-600 border border-brand-100">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-sub font-bold block uppercase">Operational Users</span>
                      <span className="font-display font-black text-xl text-neutral-main mt-0.5 block">14,850 Active</span>
                    </div>
                  </div>

                  <div className="p-5.5 bg-neutral-50 rounded-2xl border border-neutral-150 flex items-center space-x-4">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-sub font-bold block uppercase">Unreplied CRM Tickets</span>
                      <span className="font-display font-black text-xl text-[#e84393] mt-0.5 block">
                        {messages.filter(m => !m.replied).length} Unsolved
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sales categories Bar Chart with Recharts */}
                <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200/50" id="sales-barchart-container">
                  <h4 className="font-display font-bold text-xs uppercase text-neutral-main tracking-wider mb-4 flex items-center space-x-1.5 animate-fadeIn">
                    <BarChart className="h-4.5 w-4.5 text-[#ff6b9d]" />
                    <span>Real-Time E-Commerce Volume distribution</span>
                  </h4>

                  <div className="h-64 sm:h-72 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={salesByClassData}
                        margin={{ top: 10, right: 15, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                        <XAxis dataKey="category" stroke="#888888" fontSize={10} tickLine={false} />
                        <YAxis stroke="#888888" fontSize={10} tickLine={false} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                        <Bar dataKey="sales" name="Store Sales Revenue ($)" fill="#ff6b9d" radius={[6, 6, 0, 0]} barSize={40} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CRM Message Dashboard panel */}
            {activeAdminTab === 'crm' && (
              <motion.div
                key="crm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                  <h3 className="font-display font-extrabold text-base text-[#2d3436]">Active Client Support Inquiries</h3>
                  <span className="text-[10px] bg-brand-50 border border-brand-100 text-brand-600 px-2.5 py-0.5 rounded-full font-bold">
                    Total {messages.length} inquiries logged
                  </span>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-neutral-sub text-center py-12 font-medium">All support tickets solved!</p>
                ) : (
                  <div className="divide-y divide-neutral-100" id="admin-crm-messages-list">
                    {messages.map((msg) => (
                      <div key={msg.id} className="py-4.5 flex flex-col sm:flex-row justify-between gap-4 text-left">
                        <div className="space-y-1.5 max-w-2xl">
                          <div className="flex items-center space-x-2.5 flex-wrap">
                            <span className="font-bold text-xs text-neutral-main">{msg.name} ({msg.email})</span>
                            <span className="text-[9px] text-neutral-sub font-semibold">{msg.date}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                              msg.replied ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-850'
                            }`}>
                              {msg.replied ? 'Replied' : 'Pending Action'}
                            </span>
                          </div>
                          
                          <nav className="text-xs font-black text-neutral-main block">Subject: {msg.subject}</nav>
                          <p className="text-xs text-neutral-sub leading-normal font-medium italic">
                            "{msg.message}"
                          </p>
                        </div>

                        {!msg.replied && (
                          <div className="flex-shrink-0 flex items-start">
                            <button
                              id={`reply-ticket-${msg.id}`}
                              onClick={() => setAnsweringMsg(msg)}
                              className="px-3.5 py-2 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 hover:scale-[1.01] text-white text-[11px] font-bold flex items-center space-x-1.5 transition shadow-2xs cursor-pointer"
                            >
                              <Reply className="h-3.5 w-3.5" />
                              <span>Draft Reply</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Catalog database Master Panel */}
            {activeAdminTab === 'catalog' && (
              <motion.div
                key="catalog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Form to insert product column */}
                <div className="lg:col-span-5 bg-neutral-50/70 p-5.5 rounded-2xl border border-neutral-200/50">
                  <h4 className="font-display font-extrabold text-[#2d3436] text-sm mb-4 flex items-center space-x-1.5">
                    <Plus className="h-4 w-4 text-[#ff6b9d]" />
                    <span>Incorporate New Product</span>
                  </h4>

                  {productSuccess ? (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-xl text-xs font-semibold text-center mt-4">
                      Suppplements synced! Live index populated instantly on Shop.
                    </div>
                  ) : (
                    <form onSubmit={handleProductSubmit} className="space-y-4" id="add-product-admin-form">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Product Title</label>
                        <input
                          type="text"
                          required
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          placeholder="E.g. Spearmint Ovary Regulating Tea"
                          className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Cost Label ($ USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(e.target.value)}
                            className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Wellness Categorization</label>
                          <select
                            value={newProdCategory}
                            onChange={(e: any) => setNewProdCategory(e.target.value)}
                            className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400"
                          >
                            {['Menstrual Care', 'PCOS Support', 'Hormonal Wellness', 'Nutrition & Fitness', 'Self Care'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Product Description</label>
                        <textarea
                          required
                          rows={3}
                          value={newProdDesc}
                          onChange={(e) => setNewProdDesc(e.target.value)}
                          placeholder="Describe cellular support, doses parameters..."
                          className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-neutral-main hover:bg-[#e84393] hover:text-white transition text-white font-bold text-xs uppercase"
                      >
                        Publish Live to Shop Inventory
                      </button>

                    </form>
                  )}
                </div>

                {/* Live Products Catalog Database Table */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-display font-bold text-xs uppercase text-neutral-main tracking-wider mb-2.5">
                    Live Shop Database ({products.length} Products)
                  </h4>

                  <div className="max-h-[380px] overflow-y-auto border border-neutral-150 rounded-2xl divide-y divide-neutral-100" id="admin-catalog-table">
                    {products.map((p) => (
                      <div key={p.id} className="p-3 flex items-center justify-between text-left gap-4 hover:bg-neutral-50/40">
                        <div className="flex items-center space-x-3 max-w-[280px]">
                          <img src={p.image} alt={p.name} className="h-9 w-9 rounded-lg object-cover flex-shrink-0" />
                          <div>
                            <span className="text-[9px] text-[#9b59b6] font-bold uppercase block">{p.category}</span>
                            <span className="font-bold text-xs text-neutral-main block line-clamp-1">{p.name}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="text-xs font-extrabold text-neutral-main">${p.price}</span>
                          
                          <button
                            id={`delete-prod-${p.id}`}
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg border border-neutral-250 text-rose-500 hover:bg-rose-50 cursor-pointer"
                            title="Delete Supplement"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Resources Editor Panel */}
            {activeAdminTab === 'blogs' && (
              <motion.div
                key="blogs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Blog compose */}
                <div className="lg:col-span-5 bg-neutral-50/70 p-5.5 rounded-2xl border border-neutral-200/50">
                  <h4 className="font-display font-extrabold text-neutral-main text-sm mb-4 flex items-center space-x-1.5">
                    <Plus className="h-4 w-4 text-[#ff6b9d]" />
                    <span>Publish Medical Article</span>
                  </h4>

                  {blogSuccess ? (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-150 text-emerald-800 rounded-xl text-xs font-semibold text-center mt-4">
                      Article Published Succesfully! Lives inside the Resources tab.
                    </div>
                  ) : (
                    <form onSubmit={handleBlogSubmit} className="space-y-4" id="add-blog-admin-form">
                      <div>
                        <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Article Title</label>
                        <input
                          type="text"
                          required
                          value={newBlogTitle}
                          onChange={(e) => setNewBlogTitle(e.target.value)}
                          placeholder="E.g. The Science of Estradiol during Late Luteal Phases"
                          className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Image URL</label>
                          <input
                            type="text"
                            required
                            value={newBlogImg}
                            onChange={(e) => setNewBlogImg(e.target.value)}
                            className="w-full text-xs p-3 border border-neutral-200 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Physiological Tag</label>
                          <select
                            value={newBlogCategory}
                            onChange={(e: any) => setNewBlogCategory(e.target.value)}
                            className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400"
                          >
                            {['Women\'s Health', 'PCOS', 'Nutrition', 'Lifestyle', 'Mental Health', 'Fitness'].map(c => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Short Excerpt Summary</label>
                        <textarea
                          required
                          rows={2}
                          value={newBlogExcerpt}
                          onChange={(e) => setNewBlogExcerpt(e.target.value)}
                          placeholder="Write a brief scannable 2-sentence excerpt."
                          className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Full Article Markdown Content</label>
                        <textarea
                          required
                          rows={5}
                          value={newBlogContent}
                          onChange={(e) => setNewBlogContent(e.target.value)}
                          placeholder="Use simple paragraph splits..."
                          className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-brand-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-neutral-main hover:bg-[#ff6b9d] hover:text-white transition text-white font-bold text-xs uppercase"
                      >
                        Publish To Educational Library
                      </button>

                    </form>
                  )}
                </div>

                {/* Library Article list */}
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="font-display font-bold text-xs uppercase text-neutral-main tracking-wider mb-2.5">
                    Live Educational Database ({blogs.length} Articles)
                  </h4>

                  <div className="divide-y divide-neutral-100 max-h-[380px] overflow-y-auto border border-neutral-150 rounded-2xl" id="admin-blogs-table">
                    {blogs.map((b) => (
                      <div key={b.id} className="p-3 flex items-center justify-between text-left gap-4 hover:bg-neutral-50/40">
                        <div className="max-w-[320px]">
                          <span className="text-[9px] text-[#ff6b9d] font-bold uppercase block">{b.category}</span>
                          <span className="font-bold text-xs text-neutral-main block line-clamp-1 mt-0.5">{b.title}</span>
                          <span className="text-[10px] text-neutral-sub block mt-0.5 font-medium">{b.date} • {b.author}</span>
                        </div>

                        <button
                          id={`delete-blog-${b.id}`}
                          onClick={() => onDeleteBlog(b.id)}
                          className="p-1.5 rounded-lg border border-neutral-150 text-rose-500 hover:bg-rose-50 cursor-pointer flex-shrink-0"
                          title="Delete Reader Article"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* CRM Answer overlay popup modal */}
        <AnimatePresence>
          {answeringMsg && (
            <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setAnsweringMsg(null)}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 border border-brand-100"
                id="crm-answering-dialog"
              >
                {/* Header */}
                <div className="bg-[#2d3436] px-6 py-4.5 text-white flex justify-between items-center">
                  <div className="flex items-center space-x-2.5">
                    <Mail className="h-5 w-5 text-brand-200" />
                    <div>
                      <h3 className="font-display font-extrabold text-sm sm:text-base leading-tight">Draft Compliant Support Reply</h3>
                      <span className="text-[10px] text-zinc-300 font-medium">CRM Tickets Solvability</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAnsweringMsg(null)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/95"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Form or Success message */}
                <div className="p-6">
                  {replySuccess ? (
                    <div className="text-center py-8 space-y-4 animate-scaleUp">
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-full inline-block text-emerald-500 animate-bounce">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-lg text-neutral-main">Response Decided!</h4>
                        <p className="text-neutral-sub text-xs sm:text-sm mt-1 max-w-sm mx-auto leading-relaxed font-semibold">
                          Your medically checked reply was processed, dispatched to <span className="text-brand-500 font-bold">{answeringMsg.email}</span>, and marked as Replied!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSendDraftReply} className="space-y-4.5" id="crm-reply-form">
                      {/* Client original msg */}
                      <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-150 text-left">
                        <div className="flex justify-between items-center text-[10px] text-neutral-sub font-semibold">
                          <span>From: <strong className="text-neutral-main">{answeringMsg.name}</strong></span>
                          <span>{answeringMsg.date}</span>
                        </div>
                        <p className="text-xs text-neutral-sub font-medium leading-relaxed italic mt-1.5">
                          "{answeringMsg.message}"
                        </p>
                      </div>

                      {/* Load quick templates */}
                      <div>
                        <span className="text-[10px] font-bold text-neutral-sub block lowercase mb-2">Load Audited SLA Templates</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleLoadTemplate('pcos')}
                            className="px-2.5 py-1.5 border border-brand-100 bg-brand-50/40 text-brand-700 text-[10px] font-bold uppercase rounded-lg cursor-pointer"
                          >
                            PCOS Guidance
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLoadTemplate('dosage')}
                            className="px-2.5 py-1.5 border border-purple-100 bg-purple-50/40 text-[#6c5ce7] text-[10px] font-bold uppercase rounded-lg cursor-pointer"
                          >
                            Dose Brewing
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLoadTemplate('shipping')}
                            className="px-2.5 py-1.5 border border-zinc-200 bg-neutral-100 text-[#2d3436] text-[10px] font-bold uppercase rounded-lg cursor-pointer"
                          >
                            Belts Logistics
                          </button>
                        </div>
                      </div>

                      {/* Reply field text */}
                      <div>
                        <label className="text-[10px] font-bold text-neutral-sub block lowercase mb-1">Compose Reply</label>
                        <textarea
                          required
                          rows={5}
                          value={draftResponse}
                          onChange={(e) => setDraftResponse(e.target.value)}
                          placeholder="Answer here... Double audit that medication layouts or dosages are non-prescriptive."
                          className="w-full text-xs p-3.5 border border-neutral-200 rounded-xl focus:outline-hidden"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-2xl bg-linear-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-xs tracking-wide cursor-pointer transition active:scale-95 shadow-md shadow-brand-100"
                      >
                        Transmit Medically Compliant SLA Response
                      </button>

                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
