
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 bg-indigo-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who trust Syncwise to manage their tasks efficiently and boost their productivity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-6 text-lg rounded-lg flex items-center gap-2 group">
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-indigo-200 text-white hover:bg-indigo-700 px-8 py-6 text-lg rounded-lg">
              Schedule a Demo
            </Button>
          </div>
          
          <p className="mt-8 text-indigo-200 text-sm">
            No credit card required. 14-day free trial of Pro features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
