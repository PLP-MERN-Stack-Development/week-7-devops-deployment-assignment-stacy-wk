import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

function App() {
  const { username } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          username ? <ChatPage /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={
          username ? <Navigate to="/" /> : <LoginPage />
        }
      />
    </Routes>
  );
}

export default App;
