import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';
import { LogIn } from './pages/LogIn';
import { Register } from './pages/Register';
import TServicios from './pages/TServicios';
import { Privacidad } from './pages/Privacidad';

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
        <Route path="*" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
