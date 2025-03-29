
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: 'Is there a mobile app available?',
    answer: 'Yes, Syncwise is available on iOS and Android. Our mobile apps offer the same powerful features as the web version, allowing you to manage tasks on the go with real-time syncing across all your devices.'
  },
  {
    question: 'Can I import tasks from other platforms?',
    answer: 'Absolutely! Syncwise supports importing tasks from many popular task management tools including Todoist, Asana, Trello, and more. Our import wizard makes the transition seamless.'
  },
  {
    question: 'How does the AI task sorting work?',
    answer: 'Our AI analyzes factors like due dates, priority levels, and your past work patterns to intelligently sort and suggest tasks. It learns from your habits over time and becomes more accurate as you use the platform.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Security is our top priority. Syncwise uses industry-standard encryption for all data, both in transit and at rest. We employ regular security audits and follow best practices to ensure your information stays private and protected.'
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. If you cancel, you\'ll still have access to your paid features until the end of your billing cycle, after which you\'ll be downgraded to the free plan.'
  },
  {
    question: 'Do you offer discounts for nonprofits or educational institutions?',
    answer: 'Yes, we offer special pricing for qualified nonprofits, educational institutions, and student organizations. Please contact our sales team for more information about our discount programs.'
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about Syncwise
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-left text-lg font-medium text-slate-800 py-5 hover:text-indigo-600 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <a 
            href="#" 
            className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors underline"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
