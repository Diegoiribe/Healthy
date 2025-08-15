import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { useEffect } from 'react';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';
import { LogIn } from './pages/LogIn';
import { Register } from './pages/Register';
import TServicios from './pages/TServicios';
import { Privacidad } from './pages/Privacidad';
import { Success } from './pages/Success';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terminos-y-servicios" element={<TServicios />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
