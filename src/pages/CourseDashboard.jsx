import React, { useState, useEffect } from 'react';
import { useCourseAuth } from '../context/CourseAuthContext';
import { courseData } from '../data/courseData';
import VideoPlayer from '../components/VideoPlayer';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Trophy, Menu, X, PlayCircle, Lock, Unlock } from 'lucide-react';

const CourseDashboard = () => {
  const { hasPurchased, completedLessons, markLessonComplete } = useCourseAuth();
  const navigate = useNavigate();
  
  // Default to the first free lesson
  const [activeLesson, setActiveLesson] = useState(courseData.freePreview.lessons[0]);
  const [activeModuleId, setActiveModuleId] = useState(courseData.freePreview.id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);

  // Close sidebar on lesson select on mobile
  const handleLessonSelect = (lesson, moduleId) => {
    setActiveLesson(lesson);
    setActiveModuleId(moduleId);
    setIsSidebarOpen(false);
    setShowMotivation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVideoEnd = async () => {
    if (activeLesson) {
      await markLessonComplete(activeLesson.id);
      setShowMotivation(true);
      setTimeout(() => setShowMotivation(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-elite-dark text-white pt-24 pb-12 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Lambakar <span className="text-gradient-primary">Masterclass</span>
            </h1>
            <p className="text-zinc-400 mt-1 text-sm font-medium">
              {hasPurchased ? "Welcome back, Student!" : "Free Preview Mode - Unlock full course to access all modules"}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {!hasPurchased && (
              <Link to="/cart" className="btn-cta text-sm px-6 py-2 hidden sm:block">
                Unlock Full Course
              </Link>
            )}

            {/* Mobile Sidebar Toggle Button */}
            <button 
              className="sm:hidden flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-300 rounded-xl border border-indigo-500/30 font-bold active:scale-95 transition-transform"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              {isSidebarOpen ? "Close Menu" : "Course Menu"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          
          {/* Main Video Area (Left / Top) */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer 
              videoId={activeLesson?.videoId} 
              title={activeLesson?.title} 
              onVideoEnd={handleVideoEnd}
            />
            
            <div className="glass-card border-white/10 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{activeLesson?.title}</h2>
              <div className="flex items-center gap-4 text-sm text-zinc-400 font-medium">
                <span className="flex items-center gap-1">
                  <PlayCircle className="w-4 h-4" />
                  {activeLesson?.duration}
                </span>
                {activeModuleId === 0 && !hasPurchased && (
                  <span className="bg-fuchsia-500/20 text-fuchsia-300 px-2 py-0.5 rounded text-xs font-bold border border-fuchsia-500/30">Free Preview</span>
                )}
              </div>
              
              {!hasPurchased && activeModuleId !== 0 && (
                <div className="mt-6 p-5 bg-zinc-900/80 border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30 shrink-0">
                      <Lock className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Premium Content Locked</h3>
                      <p className="text-sm text-zinc-400 mt-1">This lesson is part of the premium course. Purchase now to unlock all 42 lessons and the master action plan.</p>
                    </div>
                  </div>
                  <Link to="/cart" className="whitespace-nowrap btn-cta px-6 py-2.5">
                    Unlock Now
                  </Link>
                </div>
              )}

              {showMotivation && (
                <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center gap-4 animate-fade-in-up">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <Trophy className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-indigo-300">Great Job! 🎉</h3>
                    <p className="text-sm text-indigo-200/70 mt-1">Lesson completed. You're one step closer to your maximum height potential. Keep going!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Overlay for mobile menu */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar / Playlist (Right / Bottom) */}
          <div className={`
            lg:col-span-1 
            fixed sm:relative top-0 right-0 h-full sm:h-auto 
            w-[85vw] sm:w-auto max-w-sm sm:max-w-none 
            bg-zinc-950 sm:bg-transparent border-l border-white/10 sm:border-none 
            z-50 sm:z-auto p-6 sm:p-0
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full sm:translate-x-0'}
            sm:block
          `}>
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Course Content</h3>
              <button className="sm:hidden text-zinc-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="glass-card border-white/10 rounded-2xl overflow-hidden h-[calc(100vh-120px)] sm:h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
              
              {/* === FREE PREVIEW SECTION === */}
              <div className="border-b border-white/5">
                <div className="p-4 bg-fuchsia-500/10 border-b border-fuchsia-500/20 flex items-center gap-2">
                  <Unlock className="w-4 h-4 text-fuchsia-400" />
                  <h4 className="font-bold text-fuchsia-400 uppercase tracking-wider text-xs">Free Preview</h4>
                </div>
                <div className="bg-black/20">
                  {courseData.freePreview.lessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson, courseData.freePreview.id)}
                        className={`w-full text-left p-4 hover:bg-white/5 transition-colors border-l-2 ${activeLesson?.id === lesson.id ? 'border-fuchsia-500 bg-fuchsia-500/5' : 'border-transparent'} flex justify-between items-center group`}
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-fuchsia-500 shrink-0" />
                          ) : (
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 border ${activeLesson?.id === lesson.id ? 'bg-fuchsia-500 border-fuchsia-500 text-white shadow-[0_0_8px_rgba(217,70,239,0.5)]' : 'bg-transparent border-white/20 text-zinc-500 group-hover:border-fuchsia-500/50 group-hover:text-fuchsia-400'}`}>
                              ▶
                            </div>
                          )}
                          <span className={`text-sm font-medium transition-colors ${activeLesson?.id === lesson.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-600 shrink-0 ml-2">{lesson.duration}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* === PREMIUM COURSE SECTION === */}
              <div className="p-4 bg-zinc-900 border-b border-white/5 flex items-center gap-2">
                {!hasPurchased ? <Lock className="w-4 h-4 text-indigo-400" /> : <Unlock className="w-4 h-4 text-indigo-400" />}
                <h4 className="font-bold text-indigo-400 uppercase tracking-wider text-xs">Premium Masterclass</h4>
              </div>

              {courseData.modules.map((module) => (
                <div key={module.id} className="border-b border-white/5">
                  <div className="p-3 px-4 bg-white/5 flex justify-between items-center">
                    <h4 className="font-bold text-zinc-300 text-sm">{module.title}</h4>
                  </div>
                  <div className="bg-black/20">
                    {module.lessons.map((lesson) => {
                      const isLocked = !hasPurchased;
                      const isActive = activeLesson?.id === lesson.id;
                      const isCompleted = completedLessons.includes(lesson.id);
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            if (isLocked) {
                              setActiveLesson({...lesson, videoId: null}); // No video
                              setActiveModuleId(module.id);
                              if(window.innerWidth < 640) setIsSidebarOpen(false);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                              handleLessonSelect(lesson, module.id);
                            }
                          }}
                          className={`w-full text-left p-4 hover:bg-white/5 transition-colors border-l-2 ${isActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-transparent'} flex justify-between items-center group`}
                        >
                          <div className="flex items-center gap-3 truncate pr-2">
                            {isCompleted && !isLocked ? (
                              <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                            ) : (
                              <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[10px] border ${isActive ? 'bg-indigo-500 border-indigo-500 text-white shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-transparent border-white/20 text-zinc-500 group-hover:border-indigo-500/50 group-hover:text-indigo-400'}`}>
                                {isLocked ? (
                                  <Lock className="w-3 h-3 text-zinc-500 group-hover:text-indigo-400" />
                                ) : '▶'}
                              </div>
                            )}
                            <span className={`text-sm font-medium truncate transition-colors ${isActive ? 'text-white' : isLocked ? 'text-zinc-600' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-zinc-600 shrink-0 ml-2">{lesson.duration}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
};

export default CourseDashboard;
