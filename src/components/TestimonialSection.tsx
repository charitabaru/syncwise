
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote 
} from 'lucide-react';

// Sample testimonial data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    content: 'Syncwise completely transformed how our marketing team manages projects. The AI prioritization is a game-changer for meeting our deadlines and the collaboration features keep everyone on the same page.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Product Manager',
    company: 'InnovateCo',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    content: 'As someone who juggles multiple projects simultaneously, Syncwise has been invaluable. The cross-platform sync means I can check tasks on my phone during meetings and update from my laptop later.',
    rating: 5,
  },
  {
    name: 'Jessica Williams',
    role: 'Freelance Designer',
    company: 'Self-employed',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    content: 'The customizable workflows fit perfectly with my creative process. I can organize tasks my way and the clean interface helps me focus on what matters. Would highly recommend for fellow freelancers!',
    rating: 4,
  },
  {
    name: 'David Rodriguez',
    role: 'Team Lead',
    company: 'CloudSystems',
    image: 'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    content: 'Managing a remote team became much easier with Syncwise. We can assign tasks, track progress, and collaborate seamlessly. The onboarding was quick and my team adapted to it within days.',
    rating: 5,
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Loved by professionals worldwide
          </h2>
          <p className="text-xl text-slate-600">
            See what our users have to say about Syncwise
          </p>
        </div>

        {/* Desktop Testimonial Grid */}
        <div className="hidden lg:grid grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-indigo-100" />
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                  <p className="text-slate-500 text-sm">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              <p className="text-slate-700 mb-6">{testimonial.content}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Testimonial Carousel */}
        <div className="lg:hidden relative">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 relative">
            <Quote className="absolute top-6 right-6 w-10 h-10 text-indigo-100" />
            <div className="flex items-center mb-6">
              <img 
                src={testimonials[activeIndex].image} 
                alt={testimonials[activeIndex].name} 
                className="w-14 h-14 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-slate-800">{testimonials[activeIndex].name}</h4>
                <p className="text-slate-500 text-sm">
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </p>
              </div>
            </div>
            <p className="text-slate-700 mb-6">{testimonials[activeIndex].content}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} 
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-indigo-600' : 'bg-slate-300'}`}
                ></div>
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Logos */}
        <div className="mt-20">
          <p className="text-center text-slate-500 mb-8">Trusted by teams at leading companies</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {['Adobe', 'Spotify', 'Slack', 'Netflix', 'Airbnb', 'Shopify'].map((company) => (
              <div key={company} className="text-slate-400 font-semibold text-xl">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
