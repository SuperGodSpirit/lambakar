import React, { useState } from 'react';
import { Globe, ChevronDown, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [openModule, setOpenModule] = useState(1);

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
        { id: 5, title: "Module 05: Diet & Nutrition Blueprint", details: "Lessons • 55 min. The exact macros for bone density." }
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

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans selection:bg-blue-200">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-10 max-w-7xl mx-auto">
        <div className="font-black text-2xl tracking-tighter">
          LAMBA<span className="text-blue-600">KAR.</span>
        </div>
        <div className="flex gap-4 items-center">
          <a href="https://www.instagram.com/amnx.fit" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <Globe className="w-6 h-6" />
          </a>
          <button 
            onClick={() => document.getElementById('enroll').scrollIntoView({ behavior: 'smooth' })}
            className="bg-zinc-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-colors"
          >
            Buy Course
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center pt-10">
          <div className="lg:col-span-7">
            <p className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4">The 100-Day Protocol</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8">
              अपनी Maximum Height <br className="hidden md:block"/> Achieve करो।
            </h1>
            <p className="text-xl text-zinc-600 mb-10 max-w-2xl leading-relaxed">
              कड़वा सच तो यही है: ये Magic Pills सिर्फ एक scam हैं। Real growth के लिए biology, mechanical tension और discipline की ज़रूरत होती है। फालतू के शॉर्टकट्स में अपना टाइम वेस्ट करना बंद करें। अपने tallest self को unlock करने के लिए फॉलो करें यह step-by-step scientific blueprint। आज ही अपना सफर शुरू करें और असली नतीजे देखें!
            </p>
            
            <div className="flex items-center gap-6">
              <button 
                onClick={() => document.getElementById('enroll').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-blue-700 transition-transform hover:scale-105"
              >
                Start Now - ₹499 <ArrowRight className="w-5 h-5" />
              </button>
              <div className="text-sm font-semibold text-zinc-500">
                <span className="block text-zinc-900">42 Video Lessons</span>
                Lifetime Access
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img 
              src="/main.jpg" 
              alt="Dynamic Stretching" 
              className="rounded-[2rem] shadow-2xl object-contain bg-zinc-100 w-full h-[600px] border-4 border-white"
            />
          </div>
        </div>
      </main> 

      {/* Curriculum Accordion */}
      <section className="bg-white py-24 border-t border-zinc-200 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 tracking-tight">The Complete Blueprint.</h2>
          
          <div className="space-y-12">
            {curriculum.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-6 border-b border-zinc-100 pb-2">
                  {section.phase}
                </h3>
                <div className="space-y-4">
                  {section.modules.map((mod) => (
                    <div 
                      key={mod.id} 
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openModule === mod.id ? 'border-blue-600 bg-blue-50/30' : 'border-zinc-200 hover:border-zinc-300'}`}
                    >
                      <button 
                        onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                        className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-lg"
                      >
                        {mod.title}
                        <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform ${openModule === mod.id ? 'rotate-180 text-blue-600' : ''}`} />
                      </button>
                      {openModule === mod.id && (
                        <div className="px-6 pb-5 text-zinc-600 leading-relaxed">
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

      {/* Checkout Section */}
      <section id="enroll" className="py-24 px-6 md:px-10 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-4">Invest in your foundation.</h2>
            <p className="text-zinc-400 text-lg mb-8">Access the complete 100-day system. No recurring fees, keep the knowledge forever.</p>
            <ul className="space-y-4">
              {[
                "All 7 Modules & 42 Video Lessons",
                "PDF Guides & Action Plans",
                "Morning vs Evening Height Tracker",
                "Diet & Nutrition Blueprint",
                "3 Exclusive Bonus Items",
                "30-Day Money Back Guarantee"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-medium">
                  <Check className="w-6 h-6 text-blue-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white text-zinc-900 p-8 rounded-3xl shadow-xl">
            <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Full Access</div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-6xl font-black tracking-tighter">₹499</span>
              <span className="text-zinc-500 font-medium">one-time</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
              Coming Soon!!
            </button>
            <p className="text-center text-zinc-400 text-xs mt-4">Secure checkout. Instant access.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
