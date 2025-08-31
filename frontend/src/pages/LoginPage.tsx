import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
      <div className="min-h-screen flex">
        {/* Left side - Login Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-md w-full space-y-8">
            {/* Logo */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">HD Notes</h2>
            </div>

            {/* Sign up form */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Sign up</h3>
              <p className="text-gray-600 mb-8">Sign up to enjoy the features of HD Notes</p>

              {/* Google Sign In Button */}
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    console.error('Login Failed');
                  }}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                  width="300"
                />
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Decorative Image (Desktop only) */}
        <div className="hidden lg:block lg:flex-1 relative bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden">
          <div className="absolute inset-0">
            {/* Abstract wave pattern background */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="wave" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <path d="M0,100 Q50,50 100,100 T200,100" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" fill="none" />
                  <path d="M0,150 Q50,100 100,150 T200,150" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="2" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wave)" />
            </svg>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            
            {/* Decorative circles */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default LoginPage;