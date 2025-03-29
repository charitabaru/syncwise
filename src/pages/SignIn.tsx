import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="w-full max-w-[400px] text-center mb-8 px-4">
        <Link to="/" className="inline-block">
          <h1 className="text-3xl font-bold text-indigo-600">Syncwise</h1>
        </Link>
        <p className="mt-2 text-slate-600">Welcome back! Sign in to manage your tasks.</p>
      </div>
      
      <div className="w-full max-w-[400px] px-4">
        <SignIn 
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-sm border border-slate-200 bg-white rounded-xl p-6',
              headerTitle: 'text-center',
              headerSubtitle: 'text-center',
              formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
              footerActionLink: 'text-indigo-600 hover:text-indigo-800',
              formFieldInput: 'focus:ring-indigo-500 focus:border-indigo-500 border-slate-300',
              socialButtonsBlockButton: 'border-slate-200 hover:bg-slate-50'
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignInPage;