import { useState, useEffect } from 'react'
import './App.css'
import { API_ENDPOINTS, fetchAPI } from './config/api'

interface HealthCheck {
  status: string;
  timestamp: string;
  environment: string;
}

function App() {
  const [healthStatus, setHealthStatus] = useState<HealthCheck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  const fetchHealthStatus = async () => {
    try {
      const data = await fetchAPI(API_ENDPOINTS.health);
      setHealthStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Full-Stack Application
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Tech Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Frontend</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• React + TypeScript</li>
                    <li>• Vite</li>
                    <li>• Tailwind CSS</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Backend</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Node.js + Express</li>
                    <li>• TypeScript</li>
                    <li>• Supabase (PostgreSQL)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4">
                API Health Check
              </h2>
              {loading && (
                <p className="text-gray-600">Checking API status...</p>
              )}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p className="font-medium">Error connecting to API:</p>
                  <p className="text-sm">{error}</p>
                  <p className="text-sm mt-2">Make sure the backend is running on port 5000</p>
                </div>
              )}
              {healthStatus && (
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span>{' '}
                    <span className="text-green-600 font-semibold">
                      {healthStatus.status.toUpperCase()}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Environment:</span>{' '}
                    {healthStatus.environment}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Timestamp:</span>{' '}
                    {new Date(healthStatus.timestamp).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Next Steps
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Configure your Supabase database credentials in backend/.env</li>
                <li>Create your database schema in Supabase</li>
                <li>Start building your application features!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
