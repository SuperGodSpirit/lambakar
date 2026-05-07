import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Check, ArrowRight, Star, Shield, Zap, Info, Quote, PlayCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [openModule, setOpenModule] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);
  const [localCouponCode, setLocalCouponCode] = useState('');
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { appliedCoupon, applyCoupon, removeCoupon, addToCart, cartItems } = useCart();
  const [isAnimatingPrice, setIsAnimatingPrice] = useState(false);

  useEffect(() => {
    if (location.hash === '#enroll') {
      const element = document.getElementById('enroll');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleApplyLocalCoupon = () => {
    setIsAnimatingPrice(true);
    const result = applyCoupon(localCouponCode);
    if (!result.success) {
      setLocalError(result.error);
    } else {
      setLocalError('');
      setLocalCouponCode('');
    }
    setTimeout(() => setIsAnimatingPrice(false), 500); // Remove animation class after 500ms
  };

  const handleRemoveCoupon = () => {
    setIsAnimatingPrice(true);
    removeCoupon();
    setTimeout(() => setIsAnimatingPrice(false), 500);
  };

  const handleAddToCart = () => {
    addToCart({
      id: 'lambakar-100-day',
      title: 'Lambakar Protocol 100-Day System',
      price: 499,
    });
    navigate('/cart');
  };

  const curriculum = [
    {
      phase: "Phase 1: Weeks 1-2 (नींव रखो)",
      modules: [
        { id: 1, title: "Module 01: Height का असली Science", details: "5 Lessons • 45 min. Biology, growth plates, HGH, and realistic expectations." },
        { id: 2, title: "Module 02: Posture Fix", details: "7 Lessons • 60 min. Decompress your spine for an instant 2-3cm gain." }
      ]
    },
    {
      phase: "Phase 2: Weeks 3-8 (असली काम)",
      modules: [
        { id: 3, title: "Module 03: Stretching & Decompression", details: "8 Lessons • 90 min. Targeted routines for spine and legs." },
        { id: 4, title: "Module 04: Sleep Protocol", details: "5 Lessons • 40 min. Maximize HGH release during deep sleep." },
        { id: 5, title: "Module 05: Diet & Nutrition Blueprint", details: "6 Lessons • 55 min. The exact macros for bone density." }
      ]
    },
    {
      phase: "Phase 3: Weeks 9-12 (Double Down)",
      modules: [
        { id: 6, title: "Module 06: Exercise & Sports", details: "7 Lessons • 75 min. High-impact movements to trigger micro-fractures." },
        { id: 7, title: "Module 07: 100-Day Master Action Plan", details: "4 Lessons • 30 min. Daily tracker to enforce discipline." }
      ]
    }
  ];

  const faqs = [
    { id: 1, q: "मेरी उम्र 21 साल है, क्या मेरी height बढ़ सकती है?", a: "हाँ! 21 की उम्र के बाद भी posture correction और spine decompression के ज़रिये आप 2-4 cm तक height gain कर सकते हैं।" },
    { id: 2, q: "मुझे results देखने में कितना समय लगेगा?", a: "शुरुआती results (posture fixes) आपको 2-3 हफ़्तों में ही दिखने लगेंगे। असली structural changes के लिए 100-day protocol को strictly follow करना होगा।" },
    { id: 3, q: "क्या इसके लिए किसी special equipment की ज़रूरत है?", a: "नहीं, ज़्यादातर exercises bodyweight हैं या घर के सामान (जैसे pull-up bar या bed) का इस्तेमाल करके की जा सकती हैं।" },
    { id: 4, q: "क्या यह course lifetime के लिए है?", a: "हाँ! एक बार enroll करने पर आपको सारी videos और updates का lifetime access मिलेगा।" }
  ];

  const testimonials = [
    { id: 1, name: "Rahul S.", text: "Aman bhai's protocol is crazy! Sirf posture correction se main 1.5 inch taller lagne laga hu in just 3 weeks.", rating: 5 },
    { id: 2, name: "Vikash P.", text: "The sleep and diet module changed my life. Not just height, my overall energy is amazing now. Highly recommended.", rating: 5 },
    { id: 3, name: "Deepak K.", text: "No magic pills, just pure science. Finally someone is telling the truth about height growth in India.", rating: 5 }
  ];

  const currentPrice = appliedCoupon ? appliedCoupon.finalPrice : 499;

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pt-12 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold tracking-widest text-xs uppercase mb-6 shadow-sm opacity-0 animate-fade-in-up">
              <Zap className="w-4 h-4" /> The 100-Day Protocol
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 text-slate-900 opacity-0 animate-fade-in-up animation-delay-100">
              अपनी <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Maximum Height</span> <br className="hidden md:block" /> Achieve करो।
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
              कड़वा सच तो यही है: ये Magic Pills सिर्फ एक scam हैं। Real growth के लिए biology, mechanical tension और discipline की ज़रूरत होती है। फालतू के शॉर्टकट्स में अपना टाइम वेस्ट करना बंद करें और फॉलो करें यह step-by-step scientific blueprint.
            </p>

            <div className="flex flex-wrap items-center gap-6 opacity-0 animate-fade-in-up animation-delay-300">
              <button
                onClick={() => document.getElementById('enroll').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:from-indigo-700 hover:to-blue-700 transition-all shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 active:scale-95"
              >
                Start Now <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/course')}
                className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 active:scale-95"
              >
                Free Preview <PlayCircle className="w-5 h-5" />
              </button>

              <div className="flex -space-x-3 mt-4 sm:mt-0">
                <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm">
                  1k+
                </div>
              </div>
              <div className="text-sm font-semibold text-slate-500">
                <span className="block text-slate-900">Trusted by students</span>
                across India.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative opacity-0 animate-fade-in animation-delay-400">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent blur-3xl -z-10 rounded-[3rem]"></div>
            <img
              src="/main.jpg"
              alt="Height Difference"
              className="rounded-[2rem] shadow-2xl object-contain bg-slate-100 w-full h-[400px] md:h-[600px] border-[4px] md:border-[8px] border-white ring-1 ring-slate-200 hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* About Creator Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-indigo-50/50 to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative mx-4 md:mx-0 opacity-0 animate-fade-in-right">
              <div className="absolute inset-0 bg-indigo-600/10 blur-3xl rounded-full transform translate-x-10 translate-y-10"></div>
              <img src="/aman01.PNG" alt="Aman Nishad" className="rounded-3xl shadow-2xl relative z-10 object-cover w-full max-w-md mx-auto aspect-[4/5]" />
              <a href="https://www.instagram.com/amnx.fit" target="_blank" rel="noreferrer" className="absolute -bottom-4 right-2 md:-bottom-6 md:-right-6 bg-white p-3 md:p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 hover:scale-105 transition-transform group">
                <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Globe className="w-6 h-6" /></div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Creator</div>
                  <div className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors">@amnx.fit</div>
                </div>
              </a>
            </div>
            <div className="opacity-0 animate-fade-in-up animation-delay-200">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">Meet your instructor,<br /><span className="text-indigo-600">Aman Nishad.</span></h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                As a 20-year-old fitness creator, I've seen countless people struggle with their height and confidence. The internet is full of fake supplements and impossible promises.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                That's why I created the <strong>Lambakar Protocol</strong>. It's built on raw, proven science—focusing on spine decompression, hormonal optimization, and correct biomechanics to help you unlock those hidden inches.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 font-semibold text-slate-800">
                  <Check className="w-6 h-6 text-indigo-500 shrink-0" /> Certified Fitness Expert
                </li>
                <li className="flex items-center gap-3 font-semibold text-slate-800">
                  <Check className="w-6 h-6 text-indigo-500 shrink-0" /> Helped over 1,000 students increase their height
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Accordion */}
      <section className="bg-slate-50 py-24 border-y border-slate-200 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">The Complete Blueprint.</h2>
            <p className="text-lg text-slate-500">Everything you need to maximize your genetic potential.</p>
          </div>

          <div className="space-y-12">
            {curriculum.map((section, idx) => (
              <div key={idx} className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 -z-10"></div>
                <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-6 flex items-center gap-4 bg-slate-50 pr-4 w-fit">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center border-4 border-slate-50">{idx + 1}</div>
                  {section.phase}
                </h3>
                <div className="space-y-4 pl-12">
                  {section.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${openModule === mod.id ? 'border-indigo-300 bg-white shadow-md ring-1 ring-indigo-100' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                    >
                      <button
                        onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                        className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-lg text-slate-800 hover:text-indigo-600 transition-colors"
                      >
                        {mod.title}
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openModule === mod.id ? 'rotate-180 text-indigo-600' : ''}`} />
                      </button>
                      {openModule === mod.id && (
                        <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                          {mod.details}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Real Results.</h2>
            <p className="text-lg text-slate-500">Don't just take my word for it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.id} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-200" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 mb-6 italic leading-relaxed">"{t.text}"</p>
                <div className="font-bold text-slate-900">- {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section id="enroll" className="py-24 px-6 md:px-10 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Invest in your <br /><span className="text-indigo-400">foundation.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">Access the complete 100-day system. No recurring fees, keep the knowledge forever.</p>
            <ul className="space-y-4 mb-8">
              {[
                "All 7 Modules & 42 Video Lessons",
                "PDF Guides & Action Plans",
                "Morning vs Evening Height Tracker",
                "Diet & Nutrition Blueprint",
                "3 Exclusive Bonus Items",
                "30-Day Money Back Guarantee"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 font-medium text-slate-300">
                  <Check className="w-6 h-6 text-indigo-400 shrink-0 bg-indigo-400/10 rounded-full p-1" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <Shield className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="font-bold text-white">100% Secure Checkout</div>
                <div className="text-sm text-slate-400">256-bit encryption</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
            {appliedCoupon && (
              <div className="absolute -top-4 -right-2 md:-top-5 md:-right-5 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-4 md:px-6 py-2 rounded-full font-black text-xs md:text-sm shadow-xl transform rotate-3 flex items-center gap-2 animate-bounce">
                <Zap className="w-4 h-4 fill-white" /> {appliedCoupon.label}
              </div>
            )}

            <div className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-4">Lifetime Access</div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className={`text-5xl md:text-6xl font-black tracking-tighter text-white inline-block transition-transform duration-500 ${isAnimatingPrice ? '-translate-y-2 scale-110 text-emerald-400' : ''}`}>
                ₹{currentPrice}
              </span>
              {appliedCoupon && (
                <span className="text-xl md:text-2xl font-bold text-slate-500 line-through">₹499</span>
              )}
            </div>
            <div className="text-slate-400 font-medium mb-8">One-time payment</div>

            {!appliedCoupon && (
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    className="flex-1 bg-slate-800/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors uppercase placeholder:normal-case placeholder:text-slate-500 w-full"
                    value={localCouponCode}
                    onChange={(e) => setLocalCouponCode(e.target.value)}
                  />
                  <button
                    onClick={handleApplyLocalCoupon}
                    className="bg-slate-700 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold transition-colors w-full sm:w-auto"
                  >
                    Apply
                  </button>
                </div>
                {localError && <p className="text-red-400 text-sm mt-2 flex items-center gap-1"><Info className="w-4 h-4" />{localError}</p>}
              </div>
            )}

            {appliedCoupon && (
              <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-emerald-400 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" /> Code '{appliedCoupon.code}' Applied
                  </div>
                  <div className="text-sm text-slate-400">You saved ₹{appliedCoupon.saved}!</div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-slate-400 hover:text-white text-sm underline"
                >
                  Remove
                </button>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/50 active:scale-95 flex items-center justify-center gap-2"
            >
              Add to Cart <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-slate-400 text-xs mt-6 font-medium">By enrolling, you agree to our Terms of Service.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50 px-6 md:px-10 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Frequently Asked Questions.</h2>
            <p className="text-lg text-slate-500">Got doubts? We have answers.</p>
          </div>
          <div className="space-y-4">
            {faqs.map(faq => (
              <div key={faq.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-slate-800"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === faq.id ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-5 text-slate-600 border-t border-slate-100 pt-4 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
