import React, { useState } from 'react';
import { Menu, X, Heart, ShoppingBag, User, Shield, HelpCircle, FileText, HeartHandshake } from 'lucide-react';
import { UserProfile, CartItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  wishlistLength: number;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  setCurrentUser,
  cart,
  setIsCartOpen,
  wishlistLength,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'awareness', label: 'Health Awareness' },
    { id: 'symptoms', label: 'AI Symptom Guide' },
    { id: 'quiz', label: 'Health Quiz' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Wellness Shop' },
    { id: 'blog', label: 'Resources & Blogs' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleRole = () => {
    setCurrentUser(prev => ({
      ...prev,
      role: prev.role === 'user' ? 'admin' : 'user',
    }));
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 glass-effect border-b border-brand-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="nav-logo-container"
          >
            <div className="p-2.5 rounded-full bg-linear-to-r from-brand-400 to-brand-500 shadow-md group-hover:scale-105 transition-transform duration-200">
              <HeartHandshake className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight bg-linear-to-r from-brand-500 to-accent-600 bg-clip-text text-transparent">
                FemCare
              </span>
              <span className="font-sans font-semibold text-xs block text-neutral-sub tracking-widest uppercase -mt-0.5">
                Wellness
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1.5" id="desktop-links">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 shadow-xs font-semibold'
                      : 'text-neutral-sub hover:text-brand-500 hover:bg-brand-50/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* User Controls & Cart */}
          <div className="hidden lg:flex items-center space-x-4" id="nav-controls">
            {/* Role quick toggle */}
            <button
              id="role-quick-toggle"
              onClick={toggleRole}
              title={`Switch to ${currentUser.role === 'user' ? 'Admin View' : 'User View'}`}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 bg-accent-50 text-accent-600 hover:bg-accent-100 cursor-pointer"
            >
              {currentUser.role === 'admin' ? (
                <>
                  <Shield className="h-3.5 w-3.5" />
                  <span>Admin Mode</span>
                </>
              ) : (
                <>
                  <User className="h-3.5 w-3.5" />
                  <span>User Mode</span>
                </>
              )}
            </button>

            {/* Dashboards direct link */}
            <button
              id="dashboard-nav-btn"
              onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
              className={`p-2.5 rounded-xl border transition-all duration-200 relative ${
                activeTab === 'dashboard' || activeTab === 'admin'
                  ? 'bg-accent-600 text-white border-accent-600 shadow-sm'
                  : 'bg-white text-neutral-sub border-neutral-200 hover:text-accent-600 hover:border-accent-200 hover:bg-accent-50/50'
              }`}
            >
              <User className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              id="wishlist-nav-btn"
              onClick={() => {
                setActiveTab(currentUser.role === 'admin' ? 'admin' : 'dashboard');
                // Auto scroll or deep link to wishlist in dashboard
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-sub hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-200 relative"
            >
              <Heart className="h-5 w-5" />
              {wishlistLength > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white animate-pulse">
                  {wishlistLength}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="cart-nav-btn"
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-sub hover:text-brand-500 hover:border-brand-200 hover:bg-brand-50/50 transition-all duration-200 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-accent-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

          {/* Hamburger Menu Toggler (Mobile Only) */}
          <div className="flex items-center space-x-2.5 lg:hidden">
            {/* Quick Cart */}
            <button
              id="cart-nav-mobile"
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-sub relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-white border border-neutral-200 text-neutral-sub hover:text-brand-500 focus:outline-hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-brand-100 bg-white shadow-lg animate-fadeIn duration-200">
          <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-150 block ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 font-semibold'
                      : 'text-neutral-sub hover:text-brand-500 hover:bg-brand-50/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <div className="border-t border-dashed border-neutral-150 my-3 pt-3 px-2 flex flex-col space-y-2">
              <div className="flex justify-between items-center px-2 py-1 bg-neutral-50 rounded-lg">
                <span className="text-xs text-neutral-sub font-medium">Viewing Perspective:</span>
                <button
                  onClick={toggleRole}
                  className="px-2.5 py-1 text-xs font-bold rounded-md bg-accent-50 text-accent-600 hover:bg-accent-100 active:scale-95 transition-all"
                >
                  {currentUser.role === 'admin' ? 'Admin View' : 'User View'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick(currentUser.role === 'admin' ? 'admin' : 'dashboard')}
                  className="flex items-center justify-center space-x-1.5 px-3 py-3 rounded-xl border border-neutral-200 text-sm font-semibold bg-neutral-50 hover:bg-neutral-100"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    handleNavClick(currentUser.role === 'admin' ? 'admin' : 'dashboard');
                    window.scrollTo({ top: 1000, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center space-x-1.5 px-3 py-3 rounded-xl border border-neutral-200 text-sm font-semibold bg-neutral-50 hover:bg-neutral-100"
                >
                  <Heart className="h-4 w-4 text-brand-500" />
                  <span>Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
