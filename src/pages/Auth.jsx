import React, { useState } from 'react';
import { useCourseAuth } from '../context/CourseAuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, loginWithGoogle, resetPassword } = useCourseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from state, or default to course/cart
  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/course';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setMessage('Check your inbox for further instructions.');
      } else if (isLogin) {
        await login(email, password);
        navigate(redirectPath, { replace: true });
      } else {
        await signup(email, password);
        navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-indigo-200">
      <div className="max-w-md w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-rose-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 mb-8">
              {isForgotPassword 
                ? 'Enter your email and we will send you a reset link.' 
                : isLogin ? 'Enter your details to access your course.' : 'Join the Lambakar protocol today.'}
            </p>

            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 text-sm animate-fade-in-up">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {message && (
              <div className="mb-6 bg-emerald-50 text-emerald-600 p-4 rounded-xl flex items-start gap-3 text-sm animate-fade-in-up">
                <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-12 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {!isForgotPassword && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-bold text-slate-700">Password</label>
                    {isLogin && (
                      <button 
                        type="button" 
                        onClick={() => { setIsForgotPassword(true); setError(''); setMessage(''); }}
                        className="text-xs text-indigo-600 font-bold hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-12 py-3 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Processing...' : isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            {isForgotPassword ? (
              <div className="mt-6 text-center">
                <button 
                  onClick={() => { setIsForgotPassword(false); setError(''); setMessage(''); }}
                  className="text-slate-500 font-bold hover:text-indigo-600 transition-colors text-sm"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <div className="my-6 flex items-center gap-4">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <span className="text-slate-400 text-sm font-medium">OR</span>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    <path fill="none" d="M1 1h22v22H1z" />
                  </svg>
                  Continue with Google
                </button>

                <p className="text-center text-slate-500 text-sm mt-8">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    {isLogin ? 'Sign up' : 'Log in'}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
