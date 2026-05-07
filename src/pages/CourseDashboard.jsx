import React, { useState, useEffect } from 'react';
import { useCourseAuth } from '../context/CourseAuthContext';
import { courseData } from '../data/courseData';
import VideoPlayer from '../components/VideoPlayer';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Trophy } from 'lucide-react';

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
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 font-sans selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent">
              Lambakar Masterclass
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              {hasPurchased ? "Welcome back, Student!" : "Free Preview Mode - Unlock full course to access all modules"}
            </p>
          </div>
          
          {!hasPurchased && (
            <Link to="/cart" className="bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 px-6 py-2 rounded-full font-bold text-white shadow-lg shadow-orange-500/20 transition-all hidden sm:block">
              Unlock Full Course
            </Link>
          )}

          {/* Mobile Sidebar Toggle */}
          <button 
            className="sm:hidden p-2 bg-white/5 rounded-lg border border-white/10"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Video Area (Left / Top) */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer 
              videoId={activeLesson?.videoId} 
              title={activeLesson?.title} 
              onVideoEnd={handleVideoEnd}
            />
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h2 className="text-2xl font-bold text-white mb-2">{activeLesson?.title}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {activeLesson?.duration}
                </span>
                {activeModuleId === 0 && !hasPurchased && (
                  <span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded text-xs font-semibold">Free Preview</span>
                )}
              </div>
              
              {!hasPurchased && activeModuleId !== 0 && (
                <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-rose-400">Content Locked</h3>
                    <p className="text-sm text-gray-300 mt-1">This lesson is part of the premium course. Purchase now to unlock all 42 lessons and the master action plan.</p>
                  </div>
                  <Link to="/cart" className="whitespace-nowrap bg-rose-500 hover:bg-rose-600 px-6 py-2 rounded-full font-bold transition-all shadow-lg shadow-rose-500/20">
                    Buy Course
                  </Link>
                </div>
              )}

              {showMotivation && (
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-4 animate-fade-in-up">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-400">Great Job! 🎉</h3>
                    <p className="text-sm text-emerald-100/70 mt-1">Lesson completed. You're one step closer to your maximum height potential. Keep going!</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Playlist (Right / Bottom) */}
          <div className={`lg:col-span-1 space-y-4 ${isSidebarOpen ? 'block' : 'hidden sm:block'}`}>
            <h3 className="text-xl font-bold mb-4">Course Content</h3>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
              
              {/* Free Preview Module */}
              <div className="border-b border-white/5">
                <div className="p-4 bg-orange-500/10">
                  <h4 className="font-bold text-orange-400">{courseData.freePreview.title}</h4>
                </div>
                <div className="bg-black/20">
                  {courseData.freePreview.lessons.map((lesson) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson, courseData.freePreview.id)}
                        className={`w-full text-left p-4 hover:bg-white/5 transition-colors border-l-2 ${activeLesson?.id === lesson.id ? 'border-orange-500 bg-white/5' : 'border-transparent'} flex justify-between items-center group`}
                      >
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${activeLesson?.id === lesson.id ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-400 group-hover:bg-white/20'}`}>
                              ▶
                            </div>
                          )}
                          <span className={`text-sm ${activeLesson?.id === lesson.id ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-600 shrink-0 ml-2">{lesson.duration}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Paid Modules */}
              {courseData.modules.map((module) => (
                <div key={module.id} className="border-b border-white/5">
                  <div className="p-4 bg-white/5 flex justify-between items-center">
                    <h4 className="font-bold text-gray-200 text-sm">{module.title}</h4>
                    {!hasPurchased && (
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    )}
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
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                              handleLessonSelect(lesson, module.id);
                            }
                          }}
                          className={`w-full text-left p-4 hover:bg-white/5 transition-colors border-l-2 ${isActive ? 'border-rose-500 bg-white/5' : 'border-transparent'} flex justify-between items-center group`}
                        >
                          <div className="flex items-center gap-3 truncate pr-2">
                            {isCompleted && !isLocked ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                            ) : (
                              <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[10px] ${isActive ? 'bg-rose-500 text-white' : 'bg-white/10 text-gray-400 group-hover:bg-white/20'}`}>
                                {isLocked ? (
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                ) : '▶'}
                              </div>
                            )}
                            <span className={`text-sm truncate ${isActive ? 'text-white font-medium' : isLocked ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-200'}`}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-600 shrink-0 ml-2">{lesson.duration}</span>
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
