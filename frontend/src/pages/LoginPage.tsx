import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await login(credentialResponse.credential);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="min-h-screen flex bg-gray-50">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-[460px] flex flex-col justify-center lg:justify-start lg:pt-[15%] px-6 sm:px-10 lg:px-14 bg-white">
          <div className="w-full max-w-[368px] mx-auto lg:ml-auto lg:mr-4">
            {/* Logo */}
            <div className="mb-6 sm:mb-8 flex justify-center lg:justify-start">
              <img 
                src="/src/assets/top.svg" 
                alt="HD Logo"
                className="h-10 sm:h-12"
              />
            </div>

            {/* Sign up heading */}
            <div className="mb-6 sm:mb-8 text-center lg:text-left lg:pl-[10%]">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {isSignIn ? 'Sign in' : 'Sign up'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {isSignIn 
                  ? 'Sign in to continue to HD' 
                  : 'Sign up to enjoy the feature of HD'}
              </p>
            </div>


            {/* Google Sign In Button */}
            <div className="mb-6 flex justify-center lg:justify-start lg:pl-[10%]">
              <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.error('Login Failed');
                  }}
                  theme="outline"
                  size="large"
                  text={isSignIn ? "signin_with" : "continue_with"}
                  shape="rectangular"
                  width={280}
                />
              </div>
            </div>

            {/* Sign in link */}
            <p className="text-center lg:text-left text-xs sm:text-sm text-gray-500 lg:pl-[10%]">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isSignIn ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Right side - 3D Wave Background */}
        <div className="hidden lg:block flex-1 relative overflow-hidden">
          {/* Background with rounded corner - 80% width, 92% height, positioned right-center */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[80%] h-[92%] bg-[#1a1a2e] rounded-3xl overflow-hidden">
            <img 
              src="/src/assets/right-column.png" 
              alt="3D Wave Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;