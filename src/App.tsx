import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  function decodeExp(token: string): number | null {
    try {
      const payload = JSON.parse(
        atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
      );
      return typeof payload?.exp === 'number' ? payload.exp * 1000 : null; // ms
    } catch {
      return null;
    }
  }

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const loc = useLocation();

    const isTokenOk = () => {
      const t = localStorage.getItem('token');
      if (!t) return false;
      const expMs = decodeExp(t);
      if (expMs == null) return false; // si no hay exp, trátalo como inválido
      return Date.now() < expMs; // válido si no ha expirado
    };

    const [ok, setOk] = useState<boolean>(isTokenOk);

    useEffect(() => {
      const check = () => setOk(isTokenOk());

      // chequea al montar, al cambiar de ruta, y periódicamente
      check();
      const id = setInterval(check, 30_000); // cada 30s

      // si cambian el token en otra pestaña o la pestaña gana foco
      const onStorage = (e: StorageEvent) => {
        if (e.key === 'token') check();
      };
      const onFocus = () => check();
      const onVisible = () => {
        if (document.visibilityState === 'visible') check();
      };

      window.addEventListener('storage', onStorage);
      window.addEventListener('focus', onFocus);
      document.addEventListener('visibilitychange', onVisible);

      return () => {
        clearInterval(id);
        window.removeEventListener('storage', onStorage);
        window.removeEventListener('focus', onFocus);
        document.removeEventListener('visibilitychange', onVisible);
      };
      // también revalida al cambiar de pathname
    }, [loc.pathname]);

    if (!ok) return <Navigate to="/login" replace />;
    return <>{children}</>;
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
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
