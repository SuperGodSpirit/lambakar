import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCourseAuth } from '../context/CourseAuthContext';
import { Trash2, ArrowLeft, Check, Info, Zap, Loader2, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { track } from '@vercel/analytics';

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
      track('coupon_applied', { code: localCouponCode });
    }
  };

  const handleCheckout = async () => {
    if (!currentUser) {
      // Must be logged in to purchase
      navigate('/auth?redirect=/cart');
      return;
    }

    track('checkout_initiated', { total, items: cartItems.length });
    setIsCheckingOut(true);
    try {
      // Simulate payment delay and backend processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      await unlockCourse();
      track('purchase_complete', { total, coupon: appliedCoupon?.code });
      navigate('/course');
    } catch (error) {
      console.error("Checkout failed:", error);
      track('checkout_failed', { error: error.message });
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}} />

      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Course
      </Link>
      
      <h1 className="text-4xl font-black mb-8 text-slate-900 tracking-tight">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm animate-fade-in">
          <div className="text-slate-400 mb-4">Your cart is empty.</div>
          <Link to="/" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20">
            Explore Course
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12 relative">
          
          {/* Overlay when checking out */}
          {isCheckingOut && (
             <div className="absolute inset-0 z-50 bg-slate-50/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center animate-fade-in">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold text-slate-900">Processing Payment...</h3>
                <p className="text-slate-500">Securing your spot in the masterclass.</p>
             </div>
          )}

          {/* Cart Items List */}
          <div className={`md:col-span-2 space-y-6 transition-all duration-500 ${isCheckingOut ? 'opacity-50 scale-95 blur-sm' : ''}`}>
            {cartItems.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-6 animate-fade-in hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center border border-indigo-100 shrink-0 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Zap className="w-8 h-8 text-indigo-500 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-indigo-700 uppercase">100-Day</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <div className="text-lg font-black text-slate-700">₹{item.price}</div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  title="Remove Item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={`md:col-span-1 transition-all duration-500 ${isCheckingOut ? 'opacity-50 scale-95 blur-sm' : ''}`}>
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-28 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
              
              <h2 className="text-2xl font-black mb-6 relative z-10">Summary</h2>
              
              <div className="space-y-4 mb-6 text-slate-300 font-medium relative z-10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400 animate-fade-in">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.saved}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-700 pt-6 mb-8 relative z-10">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-4xl font-black text-white tracking-tighter">₹{total}</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="relative z-10">
                {!appliedCoupon ? (
                  <div className="mb-6">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Coupon Code" 
                        className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors uppercase text-sm w-full"
                        value={localCouponCode}
                        onChange={(e) => setLocalCouponCode(e.target.value)}
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        className="bg-slate-700 hover:bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 text-sm"
                      >
                        Apply
                      </button>
                    </div>
                    {localError && <p className="text-red-400 text-xs mt-2 flex items-center gap-1 animate-fade-in"><Info className="w-3 h-3"/>{localError}</p>}
                  </div>
                ) : (
                  <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between text-sm animate-fade-in">
                    <div className="text-emerald-400 font-bold flex items-center gap-2">
                      <Check className="w-4 h-4" /> {appliedCoupon.code}
                    </div>
                    <button 
                      onClick={removeCoupon}
                      className="text-slate-400 hover:text-white underline text-xs transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4 rounded-xl font-black text-lg hover:from-indigo-500 hover:to-indigo-400 transition-all active:scale-95 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group"
                >
                  {isCheckingOut ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <>
                      Checkout Now
                      {!currentUser && <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded ml-2 group-hover:bg-white/30 transition-colors">Requires Login</span>}
                    </>
                  )}
                </button>
                
                <p className="text-center text-slate-400 text-xs mt-4 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Secure encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
