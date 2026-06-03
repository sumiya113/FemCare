import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, ShoppingCart, Star, Search, Filter, Sparkles, X, 
  ArrowLeft, ArrowRight, Eye, Check, ShoppingBag, BookmarkCheck 
} from 'lucide-react';
import { Product, CartItem } from '../types';

interface EcommerceProps {
  products: Product[];
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  wishlist: string[];
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Ecommerce({
  products,
  cart,
  setCart,
  wishlist,
  setWishlist,
}: EcommerceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [successItemName, setSuccessItemName] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Filter products
  const categories = ['All', 'Menstrual Care', 'PCOS Support', 'Hormonal Wellness', 'Nutrition & Fitness', 'Self Care'];

  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Automated Featured Slider (Auto-scrolls every 4 seconds)
  const bestSellers = products.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % bestSellers.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [bestSellers.length]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: Math.random().toString(), product, quantity: 1 }];
    });

    setSuccessItemName(product.name);
    setTimeout(() => setSuccessItemName(null), 3000);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 bg-linear-to-b from-white to-brand-50/10" id="ecommerce-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Headers */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4 text-brand-500" />
            <span>Featured Best-Sellers</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-main font-display tracking-tight">
            Explore Curated Hormone Supporting Essentials
          </h2>
        </div>

        {/* Dynamic Featured Products Carousel */}
        <div className="relative bg-linear-to-r from-brand-100/50 to-accent-100/40 rounded-3xl p-6 sm:p-10 mb-16 border border-white shadow-xs overflow-hidden" id="best-seller-carousel">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Slider Images */}
            <div className="md:col-span-5 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-64 sm:h-80 w-full max-w-[280px] rounded-2xl overflow-hidden shadow-lg border border-white"
                >
                  <img 
                    src={bestSellers[carouselIndex].image} 
                    alt={bestSellers[carouselIndex].name} 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-brand-500 text-white text-[9px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                    Trend Leader
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Texts */}
            <div className="md:col-span-7 flex flex-col space-y-4 text-center md:text-left">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent-600">
                Category: {bestSellers[carouselIndex].category}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-main">
                    {bestSellers[carouselIndex].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-sub mt-2 leading-relaxed max-w-xl">
                    {bestSellers[carouselIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center md:justify-start space-x-2">
                <div className="flex text-amber-400">
                  <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  <Star className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs text-neutral-sub font-semibold">({bestSellers[carouselIndex].rating} / 5.0)</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-brand-200/50 max-w-xl">
                <span className="font-display font-black text-xl sm:text-2xl text-[#e84393]">
                  ${bestSellers[carouselIndex].price}
                </span>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleToggleWishlist(bestSellers[carouselIndex].id)}
                    className="p-3 bg-white border border-neutral-200 rounded-xl hover:text-brand-500 transition cursor-pointer"
                  >
                    <Heart 
                      className={`h-4.5 w-4.5 ${
                        wishlist.includes(bestSellers[carouselIndex].id) ? 'fill-brand-500 text-brand-500' : 'text-neutral-sub'
                      }`} 
                    />
                  </button>

                  <button
                    onClick={() => handleAddToCart(bestSellers[carouselIndex])}
                    className="px-5 py-2.5 rounded-xl bg-linear-to-r from-brand-500 to-brand-600 hover:scale-[1.02] text-white text-xs font-bold flex items-center space-x-2 cursor-pointer shadow-xs active:scale-95 transition"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex space-x-1.5 justify-center md:justify-start pt-2">
                {bestSellers.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      carouselIndex === idx ? 'w-6 bg-[#e84393]' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Shop Segment Title */}
        <div className="border-t border-neutral-100 pt-16 flex flex-col md:flex-row items-center justify-between gap-4 mb-8" id="shop-controls">
          <div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-neutral-main">
              Filter By Lifecycle Support
            </h3>
            <p className="text-neutral-sub text-xs sm:text-sm mt-0.5 font-medium">
              Explore dynamic nutraceuticals, cycle planners, and muscle relaxation aids.
            </p>
          </div>

          <div className="flex items-center space-x-2.5 w-full md:w-auto" id="shop-inputs">
            {/* Search */}
            <div className="relative flex-1 md:flex-initial">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-brand-400 focus:border-brand-400"
              />
            </div>
          </div>
        </div>

        {/* Category horizontal bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none" id="categories-scroll">
          <span className="p-2 bg-neutral-100 border border-neutral-150 rounded-xl text-xs text-neutral-sub font-bold flex items-center space-x-1.5 flex-shrink-0">
            <Filter className="h-3.5 w-3.5" />
            <span>Refine</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-filter-${cat.replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition border flex-shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-linear-to-r from-accent-500 to-accent-600 text-white border-[#6c5ce7]'
                  : 'bg-white text-neutral-sub border-neutral-200 hover:border-accent-200 hover:text-accent-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toast Add Success Notification */}
        <AnimatePresence>
          {successItemName && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-6 right-6 z-100 glass-effect-dark text-white p-4 rounded-2xl border border-neutral-700 shadow-xl flex items-center space-x-3.5 max-w-[340px]"
              id="toast-cart-success"
            >
              <div className="p-1 rounded-full bg-emerald-500 text-white">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div>
                <span className="text-xs font-bold block">Added to Cart!</span>
                <span className="text-[10px] text-neutral-300 block line-clamp-1 leading-snug">
                  {successItemName} has been successfully added.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16" id="products-empty-state">
            <p className="text-neutral-sub font-semibold">No wellness supplements found matching the description.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6" id="products-grid">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                id={`product-card-${prod.id}`}
                className="bg-white rounded-3xl border border-neutral-100 hover:border-brand-200/50 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Image panel */}
                <div className="h-56 relative overflow-hidden bg-neutral-50 border-b border-neutral-50">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    id={`toggle-wishlist-${prod.id}`}
                    onClick={() => handleToggleWishlist(prod.id)}
                    className="absolute top-3 right-3 p-2.5 rounded-xl bg-white/80 hover:bg-white text-neutral-sub hover:text-brand-500 transition shadow-xs z-10 cursor-pointer"
                  >
                    <Heart 
                      className={`h-4.5 w-4.5 ${
                        wishlist.includes(prod.id) ? 'fill-brand-500 text-brand-500' : 'text-neutral-sub'
                      }`} 
                    />
                  </button>

                  <span className="absolute bottom-3 left-3 bg-accent-50/90 border border-accent-100 text-accent-700 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full backdrop-blur-xs tracking-wider">
                    {prod.category}
                  </span>
                </div>

                {/* Content info */}
                <div className="p-5.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-neutral-main">({prod.rating} rating)</span>
                    </div>

                    <h4 className="font-display font-extrabold text-base text-neutral-main group-hover:text-brand-500 transition">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-neutral-sub leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>
                  </div>

                  {/* Actions footer block */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-100">
                    <span className="font-display font-black text-lg text-neutral-main">
                      ${prod.price}
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        id={`view-details-${prod.id}`}
                        onClick={() => setSelectedProduct(prod)}
                        title="View details & reviews"
                        className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-sub hover:text-neutral-main transition cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button
                        id={`add-to-cart-${prod.id}`}
                        onClick={() => handleAddToCart(prod)}
                        className="px-4 py-2.5 rounded-xl bg-neutral-main hover:bg-brand-500 hover:text-white text-white text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-xs active:scale-95"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>Add To Cart</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Modal product details / reviews */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-100 overflow-y-auto flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md"
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative z-10 border border-brand-100"
                id="product-details-modal"
              >
                {/* Header photo */}
                <div className="h-48 relative overflow-hidden bg-neutral-100">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-cover" />
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/40 text-white/90 hover:bg-black/60 transition cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Body details */}
                <div className="p-6 space-y-5">
                  <div>
                    <span className="text-[10px] bg-accent-50 text-accent-700 font-extrabold border border-accent-100 px-2 py-0.5 rounded-full">
                      {selectedProduct.category}
                    </span>
                    <h3 className="font-display font-extrabold text-[#2d3436] text-lg sm:text-xl mt-1.5 leading-tight">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-sm font-black text-brand-500 mt-1">${selectedProduct.price}</p>
                    <p className="text-xs text-neutral-sub leading-relaxed mt-2.5">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Customer reviews section */}
                  <div className="border-t border-neutral-100 pt-4.5">
                    <h4 className="font-display font-bold text-xs uppercase text-neutral-main tracking-wider mb-2.5 flex items-center justify-between">
                      <span>Verified Client Reviews</span>
                      <span className="text-[10px] text-brand-500 font-semibold flex items-center space-x-0.5">
                        <Star className="h-3 w-3 fill-brand-400 text-brand-400" />
                        <span>{selectedProduct.rating} / 5.0 Rating</span>
                      </span>
                    </h4>

                    <div className="space-y-3.5 max-h-[140px] overflow-y-auto pr-1">
                      {selectedProduct.reviews.map((rev, idx) => (
                        <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/50 flex flex-col text-left">
                          <div className="flex justify-between items-center text-[10px] text-neutral-sub font-semibold">
                            <span className="text-neutral-main font-bold flex items-center space-x-1.5">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span>{rev.name}</span>
                            </span>
                            <span>{rev.date}</span>
                          </div>
                          <p className="text-[11px] text-neutral-sub leading-relaxed mt-1 font-medium italic">
                            "{rev.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-3 border-t border-neutral-100">
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Incorporate In Cart ({selectedProduct.price})</span>
                    </button>
                    <button
                      onClick={() => handleToggleWishlist(selectedProduct.id)}
                      className="px-4 border border-neutral-200 text-neutral-sub hover:bg-neutral-50 rounded-xl flex items-center justify-center transition cursor-pointer"
                    >
                      <Heart 
                        className={`h-4.5 w-4.5 ${
                          wishlist.includes(selectedProduct.id) ? 'fill-brand-500 text-brand-500' : 'text-neutral-sub'
                        }`} 
                      />
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
