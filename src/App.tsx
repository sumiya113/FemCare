import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, Heart, X, Trash2, Check, ArrowRight, ArrowLeft, 
  HelpCircle, Sparkles, Smile, ShieldCheck, AlertCircle, ShoppingBag, 
  CreditCard 
} from 'lucide-react';

// Subcomponents
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Awareness from './components/Awareness';
import SymptomChecker from './components/SymptomChecker';
import AssessmentQuiz from './components/AssessmentQuiz';
import Services from './components/Services';
import Ecommerce from './components/Ecommerce';
import Blog from './components/Blog';
import SuccessStories from './components/SuccessStories';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

// Shared Mock databases
import { 
  INITIAL_USER_PROFILE, 
  INITIAL_PRODUCTS, 
  INITIAL_BLOGS, 
  SYSTEM_CONTACT_MESSAGES, 
  INITIAL_ORDERS 
} from './data';
import { UserProfile, Product, BlogArticle, ContactMessage, Order, CartItem } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [blogs, setBlogs] = useState<BlogArticle[]>(INITIAL_BLOGS);
  const [messages, setMessages] = useState<ContactMessage[]>(SYSTEM_CONTACT_MESSAGES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Navigator tabs
  const [activeTab, setActiveTab] = useState<string>('home'); // 'home' | 'awareness' | 'quiz' | 'services' | 'products' | 'blog' | 'dashboard' | 'admin'

  // Shopping cart Drawer States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  
  // Checkout particulars
  const [coupon, setCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [cardDetails, setCardDetails] = useState('');

  // Cart helper quantities
  const cartItemCount = cart.reduce((acc, match) => acc + match.quantity, 0);
  const cartSubtotal = cart.reduce((acc, match) => acc + (match.product.price * match.quantity), 0);
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + 6.99); // Subtotal - promo + flat shipping fee

  const handleApplyPromo = () => {
    if (coupon.toUpperCase() === 'FEMCARE10') {
      setDiscountAmount(10.00);
    } else if (coupon.toUpperCase() === 'BIOSYNC') {
      setDiscountAmount(Math.floor(cartSubtotal * 0.15)); // 15% discount
    } else {
      alert("Promo code not recognized or expired.");
    }
  };

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Simulate final step success
    setIsCheckingOut(true);
    setTimeout(() => {
      // Build a simulated active historical Order
      const newOrder: Order = {
        id: 'ord-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        items: [...cart],
        total: finalTotal,
        status: 'Pending'
      };

      setOrders([newOrder, ...orders]);
      setCheckoutSuccess(true);
      
      setTimeout(() => {
        setCart([]);
        setCartOpen(false);
        setIsCheckingOut(false);
        setCheckoutSuccess(false);
        setCoupon('');
        setDiscountAmount(0);
        setShippingAddress('');
        setCardDetails('');
        // Push user automatically to Dash tab to monitor orders
        setActiveTab('dashboard');
      }, 3500);

    }, 2000);
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart(prev => prev.filter(it => it.id !== itemId));
  };

  const handleAddProductAdmin = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const handleDeleteProductAdmin = (prodId: string) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  const handleAddBlogAdmin = (newBlog: BlogArticle) => {
    setBlogs(prev => [newBlog, ...prev]);
  };

  const handleDeleteBlogAdmin = (blogId: string) => {
    setBlogs(prev => prev.filter(b => b.id !== blogId));
  };

  const handleReplyMessageAdmin = (msgId: string) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, replied: true } : m));
  };

  const handleAddContactMessage = (newMsg: Omit<ContactMessage, 'id' | 'date' | 'replied'>) => {
    setMessages(prev => [
      {
        ...newMsg,
        id: 'msg-' + Math.random().toString(36).substr(2, 5),
        date: 'Today',
        replied: false
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-[#fff9fb] font-sans antialiased selection:bg-brand-100 selection:text-brand-900 flex flex-col justify-between" id="app-viewport">
      
      {/* Top Special Announcement Banner */}
      <div className="bg-linear-to-r from-brand-500 to-accent-600 text-white text-[11px] font-bold py-2 px-4 text-center flex items-center justify-center space-x-1.5" id="promo-banner">
        <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
        <span>Use Promo code <strong className="underline text-brand-100 font-black">BIOSYNC</strong> to fetch 15% off site-wide supplements today. Free shipping over $45. • Safe, Medically Backed Platform</span>
      </div>

      {/* Primary Sticky Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser}
        cart={cart}
        setIsCartOpen={setCartOpen}
        wishlistLength={wishlist.length}
      />

      {/* Render Pages based on Tabs */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* Home Landing Page comprising Hero, Awareness overview, Symptom checker */}
          {activeTab === 'home' && (
            <motion.div
              key="home-pane"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-0"
            >
              <Hero 
                onExploreTopics={() => setActiveTab('awareness')} 
                onShopProducts={() => setActiveTab('products')} 
              />
              
              {/* Dynamic scroll anchor sections */}
              <Awareness />
              <SymptomChecker />
              <SuccessStories />
              <FAQs />
              <Contact onAddMessage={handleAddContactMessage} />
            </motion.div>
          )}

          {/* Dedicated check sections */}
          {activeTab === 'awareness' && (
            <motion.div
              key="awareness-pane"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Awareness />
              <SymptomChecker />
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz-pane"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <AssessmentQuiz 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                onNavigateToTab={setActiveTab}
                allProducts={products}
                allBlogs={blogs}
              />
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              key="services-pane"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Services />
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products-pane"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Ecommerce 
                products={products}
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            </motion.div>
          )}

          {activeTab === 'blog' && (
            <motion.div
              key="blog-pane"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Blog 
                blogs={blogs} 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
              />
            </motion.div>
          )}

          {/* Member Profile/Tracker panel */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard-pane"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <UserDashboard 
                currentUser={{ ...currentUser, wishlist }} 
                setCurrentUser={setCurrentUser}
                onRemoveWishlistItem={(pId) => setWishlist(prev => prev.filter(id => id !== pId))}
                products={products}
                blogs={blogs}
                orders={orders}
              />
            </motion.div>
          )}

          {/* Operations Executive Control Suite */}
          {activeTab === 'admin' && (
            <motion.div
              key="admin-pane"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <AdminDashboard 
                products={products}
                onAddProduct={handleAddProductAdmin}
                onDeleteProduct={handleDeleteProductAdmin}
                blogs={blogs}
                onAddBlog={handleAddBlogAdmin}
                onDeleteBlog={handleDeleteBlogAdmin}
                messages={messages}
                onReplyMessage={handleReplyMessageAdmin}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Clean Aesthetic Footer */}
      <Footer onNavigateToTab={setActiveTab} />

      {/* Shopping Cart Slider Drawer popup right */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-100 overflow-hidden" id="cart-drawer-root">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-neutral-900/35 backdrop-blur-md"
            ></motion.div>

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
                id="cart-panel"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
                  <h3 className="font-display font-extrabold text-[#2d3436] text-base flex items-center space-x-2.5">
                    <ShoppingCart className="h-4.5 w-4.5 text-brand-500" />
                    <span>Your Health & Wellness Cart</span>
                  </h3>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-1.5 rounded-lg border border-neutral-200 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Body scroll items or Success checkout */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {checkoutSuccess ? (
                    <div className="text-center py-16 space-y-4 text-left">
                      <div className="p-4 bg-emerald-50 rounded-full text-emerald-500 inline-block border border-emerald-100 animate-bounce">
                        <Check className="h-10 w-10 stroke-[3]" />
                      </div>
                      <div>
                        <h4 className="font-display font-extrabold text-lg text-neutral-main">Transaction Dispatched!</h4>
                        <p className="text-neutral-sub text-xs sm:text-sm mt-1 max-w-sm mx-auto leading-relaxed font-semibold">
                          Your order with <span className="text-[#e24292] font-extrabold">Final value ${finalTotal.toFixed(2)}</span> has sailed through our secure billing nodes correctly. Check your Dashboard for shipment.
                        </p>
                      </div>
                    </div>
                  ) : isCheckingOut ? (
                    <div className="text-center py-10 space-y-6">
                      {/* Shipping info loading skeleton */}
                      <div className="space-y-4 text-left p-4 bg-neutral-50 rounded-2xl border border-neutral-100 animate-pulse">
                        <span className="text-[10px] font-extrabold text-neutral-main uppercase tracking-wide block">Broadcasting SSL Shipment data</span>
                        <div className="h-8 bg-neutral-200/60 rounded-xl"></div>
                        <div className="h-8 bg-neutral-200/60 rounded-xl"></div>
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="h-10 w-10 border-4 border-neutral-150 border-t-[#FF6B9D] animate-spin rounded-full"></div>
                        <p className="text-xs text-[#636E72] font-semibold">Verifying secure multi-node tokenization...</p>
                      </div>
                    </div>
                  ) : cart.length === 0 ? (
                    <div className="text-center py-20 space-y-4" id="cart-empty-prompt">
                      <div className="p-4 bg-brand-50 inline-block rounded-full text-brand-500">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                      <h4 className="font-display font-bold text-neutral-main text-sm">Your Basket is Clean</h4>
                      <p className="text-xs text-neutral-sub max-w-xs mx-auto font-medium">Explore cycle synchrony kits, teas, or menstrual heating blankets inside the shop tab.</p>
                      <button
                        onClick={() => {
                          setCartOpen(false);
                          setActiveTab('products');
                        }}
                        className="px-4.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-sub hover:bg-neutral-50 cursor-pointer"
                      >
                        Explore Wellness Catalog
                      </button>
                    </div>
                  ) : (
                    /* Render Cart items list */
                    <div className="space-y-4" id="cart-checkout-form-container text-left">
                      {/* Items loop with motion transitions */}
                      <div className="divide-y divide-neutral-150" id="cart-items-scroller">
                        <AnimatePresence initial={false}>
                          {cart.map((item) => (
                            <motion.div 
                              key={item.id}
                              initial={{ opacity: 0, height: 0, y: 15 }}
                              animate={{ opacity: 1, height: 'auto', y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -15 }}
                              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
                              className="py-3 flex sm:items-center justify-between gap-3 text-left overflow-hidden"
                            >
                              <div className="flex items-center space-x-3">
                                <img src={item.product.image} alt={item.product.name} className="h-11 w-11 rounded-lg object-cover flex-shrink-0" />
                                <div>
                                  <span className="text-[10px] text-[#9b59b6] font-bold uppercase">{item.product.category}</span>
                                  <h4 className="text-xs font-bold text-neutral-main line-clamp-1 leading-tight">{item.product.name}</h4>
                                  <span className="text-[10px] text-neutral-sub font-semibold mt-0.5 block">${item.product.price} (Qty x{item.quantity})</span>
                                </div>
                              </div>

                              <button
                                id={`remove-cart-item-${item.product.id}`}
                                onClick={() => handleRemoveCartItem(item.id)}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Promotion parameters codes */}
                      <div className="border-t border-dashed border-neutral-150 pt-4 space-y-2 text-left bg-neutral-50/50 p-4 rounded-2xl border">
                        <span className="text-[10px] font-extrabold text-neutral-main uppercase tracking-wide">Enter Promo Coupon</span>
                        <div className="flex gap-2.5">
                          <input
                            type="text"
                            placeholder="E.g. BIOSYNC"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="bg-white border text-xs border-neutral-200 rounded-lg p-2.5 flex-1 focus:ring-1 focus:ring-brand-400 capitalize"
                          />
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            className="text-white bg-[#2d3436] hover:bg-black rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                        <div className="text-[9px] text-neutral-sub leading-snug">
                          Tip: Use code <strong className="text-neutral-main uppercase font-bold">BIOSYNC</strong> or <strong className="text-neutral-main font-bold">FEMCARE10</strong>
                        </div>
                      </div>

                      {/* Simple transactional details form */}
                      <form onSubmit={handleProcessCheckout} className="border-t border-dashed border-neutral-150 pt-4 space-y-3 text-left">
                        <span className="text-[10px] font-extrabold text-neutral-main uppercase tracking-wide block">Shipment & Card Details</span>
                        
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Full shipping address"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Credit Card number (Simulated SSL)"
                            value={cardDetails}
                            onChange={(e) => setCardDetails(e.target.value)}
                            className="w-full text-xs p-3 border border-neutral-200 rounded-xl focus:outline-hidden"
                          />
                        </div>

                        <div className="py-2.5 bg-neutral-50 px-3 rounded-xl flex items-center space-x-2.5 text-[10px] text-neutral-sub border border-neutral-200/50">
                          <CreditCard className="h-4.5 w-4.5 text-[#ff6b9d]" />
                          <span>We support standard VISA/Mastercard processing logs anonymously.</span>
                        </div>

                        {/* Hidden button trigger */}
                        <button type="submit" id="trigger-cart-checkout-hidden-btn" className="hidden" />
                      </form>

                    </div>
                  )}
                </div>

                {/* Right Bottom checkout block */}
                {!checkoutSuccess && cart.length > 0 && (
                  <div className="p-6 border-t border-neutral-100 bg-neutral-50 space-y-4" id="cart-footer">
                    <div className="space-y-1.5 text-xs text-neutral-sub font-semibold">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="text-neutral-main font-bold">${cartSubtotal.toFixed(2)}</span>
                      </div>
                      
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-brand-600 font-bold">
                          <span>Special Copay Saved</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Flat Carbon Neutral Shipping</span>
                        <span className="text-neutral-main font-bold">$6.99</span>
                      </div>

                      <div className="border-t border-neutral-200 pt-2 flex justify-between font-display font-black text-sm text-neutral-main">
                        <span>Estimated Total Summary</span>
                        <span>${finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {isCheckingOut ? (
                      <div 
                        id="checkout-loading-skeleton"
                        className="w-full py-4 text-center rounded-2xl bg-neutral-200 text-neutral-400 font-bold font-display text-xs tracking-wider flex items-center justify-center space-x-2.5 shadow-xs relative overflow-hidden animate-pulse"
                      >
                        <div className="h-4 w-4 border-2 border-neutral-400/30 border-t-neutral-500 animate-spin rounded-full"></div>
                        <span>Processing Secure Checkout...</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          // Triggers HTML form check
                          const formBtn = document.getElementById('trigger-cart-checkout-hidden-btn');
                          if (formBtn) formBtn.click();
                        }}
                        className="w-full py-4 text-center rounded-2xl bg-linear-to-r from-[#FF6B9D] to-[#E84393] hover:scale-[1.01] active:scale-95 transition-all text-white font-bold font-display text-xs tracking-wider flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer"
                      >
                        <span>Complete Secure Purchase • ${finalTotal.toFixed(2)}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
