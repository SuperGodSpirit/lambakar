import React from 'react';
import { Globe, ShoppingCart, PlayCircle, LogOut, User, Zap } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCourseAuth } from '../context/CourseAuthContext';

export default function Layout({ children }) {
  const { cartItems } = useCart();
  const { hasPurchased, currentUser, logout } = useCourseAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    if (location.pathname !== '/') {
      navigate('/#enroll');
    } else {
      const enrollElement = document.getElementById('enroll');
      if (enrollElement) {
        enrollElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-elite-dark text-zinc-100 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 animate-fade-in">
        {/* Frosted glass bar */}
        <div
          className="absolute inset-0 bg-zinc-950/70 backdrop-blur-xl border-b border-white/5"
          style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)' }}
        />
        <div className="relative flex justify-between items-center px-5 md:px-10 h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <span
              className="text-xl tracking-tight font-black"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <span className="text-white">LAMBA</span>
              <span className="text-zinc-500">-KAR</span>
              <span className="text-indigo-500">.</span>
            </span>
          </Link>

          {/* Right side actions */}
          <div className="flex gap-3 items-center">
            <a
              href="https://www.instagram.com/amnx.fit"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-indigo-400 transition-colors hidden sm:block p-2 rounded-lg hover:bg-zinc-800/50"
              title="Instagram"
            >
              <Globe className="w-5 h-5" />
            </a>

            <Link
              to="/cart"
              className="relative p-2 text-zinc-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-zinc-800/50"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center rounded-full animate-scale-in shadow-md border border-indigo-400">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {hasPurchased ? (
              <Link
                to="/course"
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:from-violet-500 hover:to-indigo-500 transition-all shadow-glow-primary active:scale-95"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <PlayCircle className="w-4 h-4" />
                <span className="hidden sm:inline">My Course</span>
                <span className="sm:hidden">Course</span>
              </Link>
            ) : (
              <button
                onClick={handleEnrollClick}
                className="btn-cta text-sm py-2 px-5 flex items-center gap-2"
                style={{ fontFamily: 'Outfit, sans-serif', fontSize: '0.875rem' }}
              >
                Enroll Now
              </button>
            )}

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="p-2 text-zinc-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-zinc-800/50"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/auth"
                className="p-2 text-zinc-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-zinc-800/50"
                title="Login"
              >
                <User className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-16">{children}</main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-zinc-950 text-white pt-16 pb-8 px-6 border-t border-white/5">
        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-10">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-glow-primary">
                  <Zap className="w-4 h-4 text-white fill-white" />
                </div>
                <span
                  className="text-xl font-black tracking-tight"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <span className="text-white">LAMBA</span>
                  <span className="text-zinc-500">-KAR</span>
                  <span className="text-indigo-500">.</span>
                </span>
              </div>
              <p className="text-zinc-400 text-sm max-w-xs text-center md:text-left">
                The science-backed height growth protocol for the elite.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-zinc-500 hover:text-zinc-300 font-medium transition-colors">Terms</Link>
              <Link to="/privacy" className="text-zinc-500 hover:text-zinc-300 font-medium transition-colors">Privacy</Link>
              <Link to="/refund" className="text-zinc-500 hover:text-zinc-300 font-medium transition-colors">Refund Policy</Link>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 text-center text-zinc-600 text-xs font-medium">
            © {new Date().getFullYear()} Lambakar Protocol by Aman Nishad. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
