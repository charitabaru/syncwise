
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const pricingPlans = [
  {
    name: 'Free',
    description: 'For individuals getting started',
    price: {
      monthly: 0,
      annually: 0,
    },
    features: [
      'Up to 10 projects',
      'Basic task management',
      'Calendar view',
      'Mobile app access',
      '5 GB storage',
    ],
    cta: 'Start for Free',
    popular: false,
  },
  {
    name: 'Pro',
    description: 'For professionals and small teams',
    price: {
      monthly: 12,
      annually: 10,
    },
    features: [
      'Unlimited projects',
      'Advanced task management',
      'Team collaboration',
      'Custom workflows',
      'Priority support',
      'AI task sorting',
      '50 GB storage',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For organizations with advanced needs',
    price: {
      monthly: 29,
      annually: 24,
    },
    features: [
      'Everything in Pro',
      'Admin controls',
      'Advanced security',
      'Custom integrations',
      'Dedicated account manager',
      'Training & onboarding',
      'Unlimited storage',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-600">
            Choose the plan that works best for you or your team
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`text-sm mr-3 ${!isAnnual ? 'font-medium text-slate-800' : 'text-slate-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-indigo-600"
            />
            <span className={`text-sm ml-3 ${isAnnual ? 'font-medium text-slate-800' : 'text-slate-500'}`}>
              Annually <span className="text-emerald-500 font-medium">Save 16%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-xl overflow-hidden shadow-sm border ${
                plan.popular 
                  ? 'border-indigo-200 shadow-indigo-100/20' 
                  : 'border-slate-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-indigo-600 text-white text-center text-sm font-medium py-1">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${plan.popular ? 'pt-10' : ''}`}>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                <p className="text-slate-500 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-800">
                    ${isAnnual ? plan.price.annually : plan.price.monthly}
                  </span>
                  <span className="text-slate-500">
                    {plan.price.monthly > 0 ? '/month' : ''}
                  </span>
                  
                  {isAnnual && plan.price.monthly > 0 && (
                    <div className="text-sm text-slate-500 mt-1">
                      Billed annually (${plan.price.annually * 12}/year)
                    </div>
                  )}
                </div>
                
                <Button 
                  className={`w-full py-6 ${
                    plan.popular 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
              
              <div className="border-t border-slate-100 p-8">
                <h4 className="font-medium text-slate-800 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
            Need a custom plan for your team?
          </h3>
          <p className="text-center text-slate-600 mb-6">
            Contact our sales team for a tailored solution that meets your specific requirements.
          </p>
          <div className="flex justify-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
