import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SignUpButton, SignInButton, useAuth } from '@clerk/clerk-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleDemoClick = () => {
    navigate('/dashboard');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Organize Tasks, <span className="text-indigo-600">Boost Productivity</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The smart way to manage your work and personal tasks. Syncwise helps you focus on what matters most.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isSignedIn ? (
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2 group"
                  onClick={handleDashboardClick}
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              ) : (
                <SignUpButton mode="modal">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2 group">
                    Get Started for Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </SignUpButton>
              )}
              <Button 
                variant="outline" 
                className="border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-6 text-lg rounded-lg flex items-center gap-2"
                onClick={handleDemoClick}
              >
                <Play className="w-5 h-5 text-indigo-600" />
                See Demo
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-10 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-indigo-${i * 100} flex items-center justify-center text-white text-xs font-bold`}>
                    {['JD', 'KW', 'LP', '+'][(i - 1) % 4]}
                  </div>
                ))}
              </div>
              <p className="text-slate-600">
                <span className="font-semibold">5,000+</span> professionals trust us
              </p>
            </motion.div>
          </div>
          
          {/* App Mockup/Illustration */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full filter blur-3xl opacity-50"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full filter blur-3xl opacity-50"></div>
              
              <div className="relative z-10 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden">
                <div className="h-10 bg-slate-100 flex items-center px-4 border-b border-slate-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">My Tasks</h3>
                      <p className="text-sm text-slate-500">Thursday, 14 October</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                      + Add Task
                    </Button>
                  </div>
                  
                  {/* Task Items */}
                  {[
                    { title: "Finalize project proposal", priority: "High", complete: true },
                    { title: "Review marketing strategy", priority: "Medium", complete: false },
                    { title: "Set up team meeting", priority: "Low", complete: false },
                    { title: "Update client dashboard", priority: "Medium", complete: false },
                  ].map((task, i) => (
                    <div key={i} className="mb-3 p-3 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${task.complete ? 'bg-emerald-100 text-emerald-600' : 'border border-slate-300'}`}>
                          {task.complete && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className={`ml-3 flex-1 ${task.complete ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                          {task.title}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          task.priority === "High" ? "bg-red-100 text-red-700" :
                          task.priority === "Medium" ? "bg-orange-100 text-orange-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;