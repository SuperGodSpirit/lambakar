import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCourseAuth } from '../context/CourseAuthContext';
import { Trash2, ArrowLeft, Check, Info, Zap, Loader2, Lock, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const { unlockCourse, currentUser } = useCourseAuth();
  const [localCouponCode, setLocalCouponCode] = useState('');
  const [localError, setLocalError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discount = appliedCoupon ? appliedCoupon.saved : 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = () => {
    const result = applyCoupon(localCouponCode);
    if (!result.success) {
      setLocalError(result.error);
    } else {
      setLocalError('');
      setLocalCouponCode('');
    }
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      // Must be logged in to purchase
      navigate('/auth?redirect=/cart');
      return;
    }

    setIsCheckingOut(true);
    try {
      // Simulate payment delay and backend processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      await unlockCourse();
      navigate('/course');
    } catch (error) {
      console.error("Checkout failed:", error);
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-elite-dark">
      <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-indigo-400 font-semibold mb-8 transition-colors bg-white/5 px-4 py-2 rounded-full shadow-sm border border-white/10 hover-lift">
          <ArrowLeft className="w-5 h-5" /> Back to Course
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black mb-8 text-white tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Your <span className="text-gradient-primary">Cart</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-24 glass-card border-white/10 rounded-[2.5rem] animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>
            <TrendingUp className="w-16 h-16 text-indigo-400/50 mx-auto mb-6" />
            <div className="text-zinc-400 mb-8 text-lg font-medium">Your cart is feeling a bit empty.</div>
            <Link to="/" className="btn-cta inline-flex items-center gap-2 text-lg px-8 py-4">
              Explore Course <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-12 relative">
            
            {/* Overlay when checking out */}
            {isCheckingOut && (
               <div className="absolute inset-0 z-50 bg-zinc-950/80 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center animate-fade-in border border-indigo-500/30 shadow-glow-primary">
                  <div className="bg-indigo-500/20 p-4 rounded-full mb-6 relative border border-indigo-500/30">
                    <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <Zap className="w-8 h-8 text-indigo-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Processing Payment...</h3>
                  <p className="text-zinc-400 font-medium">Securing your spot in the masterclass.</p>
               </div>
            )}

            {/* Cart Items List */}
            <div className={`md:col-span-2 space-y-6 transition-all duration-500 ${isCheckingOut ? 'opacity-30 scale-[0.98] blur-sm' : ''}`}>
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="glass-card border-white/10 p-6 rounded-3xl flex items-start gap-6 animate-fade-in-right hover-lift group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-900/50 to-violet-900/50 rounded-2xl flex flex-col items-center justify-center border border-indigo-500/30 shrink-0 relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Zap className="w-8 h-8 text-indigo-400 mb-1 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                    <span className="text-[10px] font-black text-indigo-300 uppercase tracking-wider">100-Day</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.title}</h3>
                    <div className="text-xl font-black text-indigo-400">₹{item.price}</div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                    title="Remove Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className={`md:col-span-1 transition-all duration-500 ${isCheckingOut ? 'opacity-30 scale-[0.98] blur-sm' : ''}`}>
              <div className="bg-[#050505] text-white p-8 rounded-3xl shadow-xl sticky top-28 overflow-hidden border border-white/10">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] animate-pulse-glow"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-600/10 rounded-full blur-[60px]"></div>
                
                <h2 className="text-2xl font-black mb-6 relative z-10" style={{ fontFamily: 'Outfit, sans-serif' }}>Summary</h2>
                
                <div className="space-y-4 mb-6 text-zinc-400 font-medium relative z-10">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-bold">₹{subtotal}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-fuchsia-400 animate-fade-in bg-fuchsia-500/10 p-2 rounded-lg border border-fuchsia-500/20 -mx-2 px-2">
                      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Discount</span>
                      <span className="font-bold">-₹{appliedCoupon.saved}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-6 mb-8 relative z-10">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-zinc-300">Total</span>
                    <span className="text-4xl font-black text-white tracking-tighter" style={{ fontFamily: 'Outfit, sans-serif' }}>₹{total}</span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="relative z-10">
                  {!appliedCoupon ? (
                    <div className="mb-8">
                      <div className="flex flex-col gap-3">
                        <input 
                          type="text" 
                          placeholder="Coupon Code" 
                          className="bg-zinc-900 border border-white/10 text-white px-4 py-3.5 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors uppercase text-sm w-full backdrop-blur-sm placeholder:normal-case placeholder:text-zinc-600"
                          value={localCouponCode}
                          onChange={(e) => setLocalCouponCode(e.target.value)}
                        />
                        <button 
                          onClick={handleApplyCoupon}
                          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3.5 rounded-xl font-bold transition-all hover-lift text-sm"
                        >
                          Apply Code
                        </button>
                      </div>
                      {localError && <p className="text-rose-400 text-xs mt-3 flex items-center gap-1.5 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20 animate-fade-in"><Info className="w-3 h-3"/>{localError}</p>}
                    </div>
                  ) : (
                    <div className="mb-8 bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl flex items-center justify-between text-sm animate-fade-in backdrop-blur-sm">
                      <div className="text-indigo-400 font-bold flex items-center gap-2">
                        <Check className="w-4 h-4 bg-indigo-500/20 rounded-full p-0.5 border border-indigo-500/30" /> {appliedCoupon.code}
                      </div>
                      <button 
                        onClick={removeCoupon}
                        className="text-zinc-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full btn-cta py-4 text-lg flex items-center justify-center gap-2 group"
                  >
                    {isCheckingOut ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                    ) : (
                      <>
                        Checkout Now
                        {!currentUser && <span className="text-[10px] uppercase tracking-wider font-bold bg-black/20 px-2 py-1 rounded-full ml-1 group-hover:bg-black/30 transition-colors border border-white/10">Login Req.</span>}
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-zinc-500 text-xs mt-5 flex items-center justify-center gap-1.5 font-medium">
                    <Lock className="w-3 h-3" /> Secure 256-bit encrypted checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
