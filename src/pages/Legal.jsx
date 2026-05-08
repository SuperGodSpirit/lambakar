import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Legal() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const renderContent = () => {
    if (path === '/terms') {
      return (
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-black mb-8 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Terms & Conditions</h1>
          <p className="text-zinc-400 mb-6 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" style={{ fontFamily: 'Outfit, sans-serif' }}>1. Introduction</h2>
          <p className="text-zinc-300">Welcome to Lambakar. By accessing our website and purchasing our course, you agree to be bound by these Terms & Conditions.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" style={{ fontFamily: 'Outfit, sans-serif' }}>2. Medical Disclaimer & Results Guarantee</h2>
          <p className="text-zinc-300">The information provided in the Lambakar Protocol is for educational purposes only and is not intended as medical advice. You should consult with a healthcare professional before starting any new diet or exercise program.</p>
          <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-6 rounded-r-xl my-6 backdrop-blur-sm">
            <h3 className="font-bold text-indigo-300 mb-2">Results Expectation</h3>
            <p className="text-indigo-200/80 italic text-sm leading-relaxed">
              While we cannot legally guarantee specific height gains due to individual genetic limitations, age, and lifestyle factors, our protocol is meticulously engineered based on proven biomechanical principles. Almost all disciplined students who strictly follow the 100-day system experience noticeable, structural improvements in their stature and posture.
            </p>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" style={{ fontFamily: 'Outfit, sans-serif' }}>3. Intellectual Property</h2>
          <p className="text-zinc-300">All content included in the course (videos, text, graphics, logos) is the property of Lambakar and Aman Nishad and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without explicit permission.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" style={{ fontFamily: 'Outfit, sans-serif' }}>4. Account Sharing</h2>
          <p className="text-zinc-300">Your account is strictly for your personal use. Sharing login credentials with others is prohibited and may result in immediate termination of your access without a refund.</p>
        </div>
      );
    } else if (path === '/privacy') {
      return (
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-black mb-8 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Privacy Policy</h1>
          <p className="text-zinc-400 mb-6 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" style={{ fontFamily: 'Outfit, sans-serif' }}>1. Information We Collect</h2>
          <p className="text-zinc-300">We collect information you provide directly to us, such as when you create an account, purchase a course, or communicate with us. This may include your name, email address, and payment information.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" style={{ fontFamily: 'Outfit, sans-serif' }}>2. How We Use Your Information</h2>
          <p className="text-zinc-300">We use the information we collect to deliver our course to you, process your transactions securely, and send you technical notices and support messages.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" style={{ fontFamily: 'Outfit, sans-serif' }}>3. Security</h2>
          <p className="text-zinc-300">We implement robust security measures, including 256-bit encryption for payments and secure Firebase authentication, to protect your personal information.</p>
        </div>
      );
    } else if (path === '/refund') {
      return (
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-black mb-8 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Refund Policy</h1>
          <p className="text-zinc-400 mb-6 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-zinc-100" style={{ fontFamily: 'Outfit, sans-serif' }}>30-Day Action-Based Guarantee</h2>
          <p className="text-zinc-300">We are confident in the Lambakar Protocol. If you complete the required modules, track your progress for 30 days using our action plan, and see absolutely zero structural improvement, you are eligible for a refund.</p>

          <div className="glass-dark border border-fuchsia-500/30 p-8 rounded-2xl my-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/20 blur-[50px] pointer-events-none"></div>
            <h3 className="text-xl font-bold text-fuchsia-400 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>How to Request a Refund</h3>
            <p className="text-zinc-300 mb-6 relative z-10">
              To initiate a refund request, you must directly contact the creator, Aman Nishad.
            </p>
            <a 
              href="https://www.instagram.com/amnx.fit" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] transition-all hover-lift relative z-10"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              DM @amnx.fit on Instagram
            </a>
          </div>
        </div>
      );
    }
    return <div className="text-white text-center py-20 text-xl font-bold">Page not found</div>;
  };

  return (
    <div className="min-h-screen bg-elite-dark pt-24 pb-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto px-6 relative z-10 animate-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-indigo-400 font-semibold mb-8 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover-lift">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <div className="glass-card border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
