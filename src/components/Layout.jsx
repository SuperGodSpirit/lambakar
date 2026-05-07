import React from 'react';
import { Globe, ShoppingCart, PlayCircle, LogOut, User } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/50 animate-fade-in">
        <div className="flex justify-between items-center p-4 md:px-10 max-w-7xl mx-auto">
          <Link to="/" className="text-2xl tracking-tighter flex items-center">
            <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">LAMBA</span><span className="font-black text-slate-800">-KAR</span><span className="text-indigo-600 font-black">.</span>
          </Link>
          <div className="flex gap-4 items-center">
            <a href="https://www.instagram.com/amnx.fit" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors hidden sm:block">
              <Globe className="w-6 h-6" />
            </a>
            
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {hasPurchased ? (
              <Link 
                to="/course"
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white px-6 py-2 rounded-full text-sm font-bold hover:from-orange-600 hover:to-rose-600 transition-all shadow-lg hover:shadow-orange-500/30 active:scale-95"
              >
                <PlayCircle className="w-4 h-4" />
                <span className="hidden sm:inline">My Course</span>
                <span className="sm:hidden">Course</span>
              </Link>
            ) : (
              <button 
                onClick={handleEnrollClick}
                className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/30 active:scale-95"
              >
                Enroll Now
              </button>
            )}

            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link 
                to="/auth"
                className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                title="Login"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl tracking-tighter">
            <span className="font-black text-indigo-600">LAMBA</span><span className="font-black text-slate-900">-KAR</span><span className="text-indigo-600 font-black">.</span>
          </div>
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Lambakar Protocol. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link to="/terms" className="text-slate-400 hover:text-slate-900 font-medium text-sm transition-colors">Terms</Link>
            <Link to="/privacy" className="text-slate-400 hover:text-slate-900 font-medium text-sm transition-colors">Privacy</Link>
            <Link to="/refund" className="text-slate-400 hover:text-slate-900 font-medium text-sm transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
