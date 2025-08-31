import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import TestTailwind from './TestTailwind';
import './App.css';

function App() {
  // Uncomment this to test if Tailwind is working
  // return <TestTailwind />;
  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/test" element={<TestTailwind />} />
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
