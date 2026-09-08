import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { ScorePage } from './pages/ScorePage';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/score" replace /> : <LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/score" element={<ScorePage />} />
      </Route>
      <Route path="/" element={<Navigate to={token ? '/score' : '/login'} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
