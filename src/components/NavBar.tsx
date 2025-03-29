
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Handle scroll event to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-2xl text-indigo-600">
            <Link to="/">Syncwise</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-700 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#testimonials" className="text-slate-700 hover:text-indigo-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-slate-700 hover:text-indigo-600 transition-colors">Pricing</a>
            <a href="#faq" className="text-slate-700 hover:text-indigo-600 transition-colors">FAQ</a>
            
            {isSignedIn ? (
              <>
                <Button 
                  variant="outline" 
                  className="ml-4 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="ml-4 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  onClick={handleSignIn}
                >
                  Login
                </Button>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleSignUp}
                >
                  Get Started
                </Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
            <div className="pt-4 pb-3 border-t border-slate-200">
              {isSignedIn ? (
                <>
                  <Button 
                    className="w-full mb-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => {
                      navigate('/dashboard');
                      setIsOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <div className="flex justify-center">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                    onClick={() => {
                      navigate('/sign-in');
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => {
                      navigate('/sign-up');
                      setIsOpen(false);
                    }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default NavBar;
