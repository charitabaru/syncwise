
import React from 'react';
import { 
  Brain, 
  Smartphone, 
  Users, 
  ArrowRightLeft 
} from 'lucide-react';

const features = [
  {
    title: 'AI-powered task sorting',
    description: 'Our smart algorithm prioritizes your tasks based on deadlines, importance, and your work patterns.',
    icon: Brain,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    title: 'Cross-platform sync',
    description: 'Access your tasks from anywhere - web, mobile, or desktop. Changes sync instantly across all devices.',
    icon: Smartphone,
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    title: 'Team collaboration',
    description: 'Share projects, assign tasks, and track progress with your team in real-time.',
    icon: Users,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Customizable workflows',
    description: 'Create your own task boards and workflows to match exactly how you and your team work.',
    icon: ArrowRightLeft,
    color: 'bg-blue-100 text-blue-600'
  }
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Everything you need to stay organized
          </h2>
          <p className="text-xl text-slate-600">
            Powerful features that help you manage tasks effortlessly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-lg ${feature.color} flex items-center justify-center mb-6`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=3270')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to become more productive?
              </h3>
              <p className="text-indigo-100 text-lg">
                Join thousands of professionals who trust Syncwise for their task management needs.
              </p>
            </div>
            <a 
              href="#pricing" 
              className="px-8 py-4 bg-white text-indigo-600 hover:bg-indigo-50 font-semibold rounded-lg shadow-md transition-colors"
            >
              Try For Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
