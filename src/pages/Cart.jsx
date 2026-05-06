import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowLeft, Check, Info, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [localCouponCode, setLocalCouponCode] = useState('');
  const [localError, setLocalError] = useState('');

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

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Course
      </Link>
      
      <h1 className="text-4xl font-black mb-8 text-slate-900 tracking-tight">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 mb-4">Your cart is empty.</div>
          <Link to="/" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors">
            Explore Course
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-6">
                <div className="w-24 h-24 bg-indigo-50 rounded-2xl flex flex-col items-center justify-center border border-indigo-100 shrink-0">
                  <Zap className="w-8 h-8 text-indigo-500 mb-1" />
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
          <div className="md:col-span-1">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl sticky top-28">
              <h2 className="text-2xl font-black mb-6">Summary</h2>
              
              <div className="space-y-4 mb-6 text-slate-300 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.saved}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-700 pt-6 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-4xl font-black text-white tracking-tighter">₹{total}</span>
                </div>
              </div>

              {/* Coupon Section inside Summary */}
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
                      className="bg-slate-700 hover:bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                  {localError && <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><Info className="w-3 h-3"/>{localError}</p>}
                </div>
              ) : (
                <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between text-sm">
                  <div className="text-emerald-400 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" /> {appliedCoupon.code}
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-white underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}

              <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg hover:bg-indigo-500 transition-all active:scale-95">
                Checkout Now
              </button>
              
              <p className="text-center text-slate-400 text-xs mt-4">Secure encrypted checkout.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
