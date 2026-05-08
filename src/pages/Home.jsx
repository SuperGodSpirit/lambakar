import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Check, ArrowRight, Star, Shield, Zap, Info, Quote, PlayCircle, TrendingUp } from 'lucide-react';
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
    setTimeout(() => setIsAnimatingPrice(false), 500);
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
    <div className="bg-elite-dark">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-24 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] animate-float" />

        <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="stat-pill mb-6 opacity-0 animate-fade-in-up">
              <Zap className="w-4 h-4 text-violet-400 fill-violet-400" />
              <span className="text-zinc-200 text-xs tracking-widest uppercase">The 100-Day Protocol</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 text-white opacity-0 animate-fade-in-up animation-delay-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
              अपनी <span className="text-gradient-hero drop-shadow-[0_0_15px_rgba(129,140,248,0.4)]">Maximum Height</span> <br className="hidden md:block" /> Achieve करो।
            </h1>
            
            <p className="text-xl text-zinc-400 mb-10 max-w-2xl leading-relaxed opacity-0 animate-fade-in-up animation-delay-200 font-medium">
              कड़वा सच तो यही है: ये Magic Pills सिर्फ एक scam हैं। Real growth के लिए biology, mechanical tension और discipline की ज़रूरत होती है। फालतू के शॉर्टकट्स में अपना टाइम वेस्ट करना बंद करें और फॉलो करें यह step-by-step scientific blueprint.
            </p>

            <div className="flex flex-wrap items-center gap-6 opacity-0 animate-fade-in-up animation-delay-300">
              <button
                onClick={() => document.getElementById('enroll').scrollIntoView({ behavior: 'smooth' })}
                className="btn-cta flex items-center gap-3 text-lg"
              >
                Start Now <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/course')}
                className="glass-dark border-white/10 text-zinc-300 px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-white/5 transition-all hover-lift active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Free Preview <PlayCircle className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mt-4 sm:mt-0 glass-dark border-white/5 px-4 py-2 rounded-full">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=11" alt="User" className="w-10 h-10 rounded-full border-2 border-zinc-900 shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=33" alt="User" className="w-10 h-10 rounded-full border-2 border-zinc-900 shadow-sm" />
                  <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-10 h-10 rounded-full border-2 border-zinc-900 shadow-sm" />
                  <div className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-indigo-900/50 flex items-center justify-center text-xs font-bold text-indigo-300 shadow-sm">
                    1k+
                  </div>
                </div>
                <div className="text-xs font-semibold text-zinc-500 leading-tight">
                  <span className="block text-zinc-200 font-bold">Trusted by students</span>
                  across India.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative opacity-0 animate-fade-in animation-delay-400">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent blur-3xl -z-10 rounded-[3rem]"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-glow-primary border-[1px] border-white/10 glass-card group">
              <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
              <img
                src="/main.jpg"
                alt="Height Difference"
                className="w-full h-[400px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="glass-dark border-white/10 p-4 rounded-xl flex items-center gap-4">
                  <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-lg shadow-inner">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">100% Scientific Approach</div>
                    <div className="text-xs text-indigo-200/70">No supplements required</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Creator Section */}
      <section className="py-24 relative overflow-hidden glass-dark border-y border-white/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-indigo-900/20 to-transparent -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative mx-4 md:mx-0 opacity-0 animate-fade-in-right">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full transform translate-x-10 translate-y-10 animate-pulse-glow"></div>
              <img src="/aman01.PNG" alt="Aman Nishad" className="rounded-3xl shadow-2xl relative z-10 object-cover w-full max-w-md mx-auto aspect-[4/5] border border-white/10" />
              <a href="https://www.instagram.com/amnx.fit" target="_blank" rel="noreferrer" className="absolute -bottom-4 right-2 md:-bottom-6 md:-right-6 glass-card border-white/10 p-4 rounded-2xl z-20 flex items-center gap-3 hover-lift group">
                <div className="bg-white/5 p-2 rounded-xl text-indigo-400 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-violet-600 group-hover:text-white transition-colors border border-white/10">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Creator</div>
                  <div className="font-black text-white group-hover:text-indigo-400 transition-colors">@amnx.fit</div>
                </div>
              </a>
            </div>
            <div className="opacity-0 animate-fade-in-up animation-delay-200">
              <div className="divider-neon mx-0 mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Meet your instructor,<br /><span className="text-gradient-primary">Aman Nishad.</span>
              </h2>
              <p className="text-lg text-zinc-400 mb-6 leading-relaxed font-medium">
                As a 20-year-old fitness creator, I've seen countless people struggle with their height and confidence. The internet is full of fake supplements and impossible promises.
              </p>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-medium">
                That's why I created the <strong className="text-indigo-400 font-bold">Lambakar Protocol</strong>. It's built on raw, proven science—focusing on spine decompression, hormonal optimization, and correct biomechanics to help you unlock those hidden inches.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 font-bold text-zinc-200 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-sm">
                  <div className="bg-indigo-500/20 p-1.5 rounded-lg shrink-0 border border-indigo-500/30">
                    <Check className="w-5 h-5 text-indigo-400" />
                  </div>
                  Certified Fitness Expert
                </li>
                <li className="flex items-center gap-3 font-bold text-zinc-200 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-sm">
                  <div className="bg-indigo-500/20 p-1.5 rounded-lg shrink-0 border border-indigo-500/30">
                    <Check className="w-5 h-5 text-indigo-400" />
                  </div>
                  Helped over 1,000 students increase their height
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Accordion */}
      <section className="py-24 px-6 md:px-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-indigo-900/20 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <div className="divider-neon"></div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              The Complete <span className="text-gradient-primary">Blueprint.</span>
            </h2>
            <p className="text-lg text-zinc-400 font-medium">Everything you need to maximize your genetic potential.</p>
          </div>

          <div className="space-y-12">
            {curriculum.map((section, idx) => (
              <div key={idx} className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="absolute left-6 top-10 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/50 to-transparent -z-10"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-indigo-500/50 text-indigo-400 flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(99,102,241,0.3)] z-10" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-widest bg-zinc-900/80 backdrop-blur-sm px-4 py-1.5 rounded-lg border border-white/5 shadow-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {section.phase}
                  </h3>
                </div>

                <div className="space-y-4 pl-16">
                  {section.modules.map((mod) => (
                    <div
                      key={mod.id}
                      className={`glass-dark rounded-2xl overflow-hidden transition-all duration-300 card-hover-glow cursor-pointer ${openModule === mod.id ? 'border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)] bg-zinc-800/80' : 'hover:border-white/20'}`}
                    >
                      <button
                        onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                        className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-lg text-zinc-200 hover:text-indigo-300 transition-colors"
                      >
                        {mod.title}
                        <div className={`p-2 rounded-full transition-colors border border-transparent ${openModule === mod.id ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-zinc-500'}`}>
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openModule === mod.id ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                      <div className={`accordion-content ${openModule === mod.id ? 'open' : ''}`} style={{ maxHeight: openModule === mod.id ? '200px' : '0' }}>
                        <div className="px-6 pb-5 text-zinc-400 leading-relaxed border-t border-white/5 pt-4 font-medium">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-violet-400 mt-0.5 shrink-0" />
                            {mod.details}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-zinc-900/50 backdrop-blur-md px-6 md:px-10 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="divider-neon"></div>
            <h2 className="text-4xl font-black mb-4 tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Real <span className="text-gradient-primary">Results.</span></h2>
            <p className="text-lg text-zinc-400 font-medium">Don't just take my word for it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={t.id} className="glass-card border-white/10 p-8 rounded-3xl relative hover-lift opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-indigo-400 text-indigo-400 drop-shadow-[0_0_5px_rgba(129,140,248,0.5)]" />)}
                </div>
                <p className="text-zinc-300 mb-8 italic leading-relaxed font-medium">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900 to-violet-900 flex items-center justify-center font-bold text-indigo-200 border border-indigo-500/30">
                    {t.name.charAt(0)}
                  </div>
                  <div className="font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section id="enroll" className="py-24 px-6 md:px-10 bg-[#050505] text-white relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.2]"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="opacity-0 animate-fade-in-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold tracking-widest text-xs uppercase mb-6 backdrop-blur-md">
              <Shield className="w-4 h-4" /> Lifetime Access
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Invest in your <br /><span className="text-gradient-hero drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]">foundation.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed font-medium">Access the complete 100-day system. No recurring fees, keep the knowledge forever.</p>
            <ul className="space-y-5 mb-10">
              {[
                "All 7 Modules & 42 Video Lessons",
                "PDF Guides & Action Plans",
                "Morning vs Evening Height Tracker",
                "Diet & Nutrition Blueprint",
                "3 Exclusive Bonus Items",
                "30-Day Money Back Guarantee"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 font-medium text-zinc-200">
                  <div className="bg-indigo-500/20 p-1.5 rounded-lg border border-indigo-500/30 shrink-0">
                    <Check className="w-5 h-5 text-indigo-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-5 glass-dark border-white/5 p-5 rounded-2xl">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-3 rounded-xl shadow-glow-primary">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="font-black text-white text-lg">100% Secure Checkout</div>
                <div className="text-sm text-zinc-400">256-bit encryption • Safe & Secure</div>
              </div>
            </div>
          </div>

          <div className="glass-card border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative opacity-0 animate-fade-in-left animation-delay-200">
            {appliedCoupon && (
              <div className="absolute -top-4 -right-2 md:-top-5 md:-right-5 bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white px-5 md:px-6 py-2.5 rounded-full font-black text-xs md:text-sm shadow-glow-accent transform rotate-3 flex items-center gap-2 animate-bounce-gentle">
                <Zap className="w-4 h-4 fill-white" /> {appliedCoupon.label}
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-2">
              <span className={`text-5xl md:text-6xl font-black tracking-tighter text-white inline-block transition-transform duration-500 ${isAnimatingPrice ? '-translate-y-2 scale-110 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]' : ''}`} style={{ fontFamily: 'Outfit, sans-serif' }}>
                ₹{currentPrice}
              </span>
              {appliedCoupon && (
                <span className="text-xl md:text-2xl font-bold text-zinc-600 line-through">₹499</span>
              )}
            </div>
            <div className="text-zinc-400 font-medium mb-8 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
              One-time payment
            </div>

            {!appliedCoupon && (
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    className="flex-1 bg-black/40 border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors uppercase placeholder:normal-case placeholder:text-zinc-600 w-full backdrop-blur-sm"
                    value={localCouponCode}
                    onChange={(e) => setLocalCouponCode(e.target.value)}
                  />
                  <button
                    onClick={handleApplyLocalCoupon}
                    className="bg-zinc-800 hover:bg-zinc-700 border border-white/10 text-white px-8 py-4 rounded-xl font-bold transition-colors w-full sm:w-auto"
                  >
                    Apply
                  </button>
                </div>
                {localError && <p className="text-rose-400 text-sm mt-3 flex items-center gap-1.5 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20"><Info className="w-4 h-4" />{localError}</p>}
              </div>
            )}

            {appliedCoupon && (
              <div className="mb-8 bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl flex items-center justify-between backdrop-blur-md">
                <div>
                  <div className="text-indigo-400 font-bold flex items-center gap-2">
                    <Check className="w-5 h-5 bg-indigo-500/20 rounded-full p-0.5 border border-indigo-500/30" /> Code '{appliedCoupon.code}' Applied
                  </div>
                  <div className="text-sm text-zinc-400 mt-1">You saved ₹{appliedCoupon.saved}!</div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-zinc-500 hover:text-white text-sm font-medium transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg"
                >
                  Remove
                </button>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full btn-cta py-5 rounded-2xl text-xl flex items-center justify-center gap-3 group"
            >
              Add to Cart <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-zinc-500 text-xs mt-6 font-medium">By enrolling, you agree to our Terms of Service & Privacy Policy.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden glass-dark border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center mb-16">
            <div className="divider-neon"></div>
            <h2 className="text-4xl font-black mb-4 tracking-tight text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Got <span className="text-gradient-primary">Questions?</span></h2>
            <p className="text-lg text-zinc-400 font-medium">Clear your doubts before starting.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={faq.id} className="glass-card border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-colors opacity-0 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-zinc-200 hover:text-indigo-400 transition-colors"
                >
                  {faq.q}
                  <div className={`p-2 rounded-full transition-colors border border-transparent ${openFaq === faq.id ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-white/5 text-zinc-500'}`}>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <div className={`accordion-content ${openFaq === faq.id ? 'open' : ''}`} style={{ maxHeight: openFaq === faq.id ? '200px' : '0' }}>
                  <div className="px-6 pb-5 text-zinc-400 border-t border-white/5 pt-4 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
