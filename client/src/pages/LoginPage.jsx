import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      navigate('/chat');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 text-black">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-4 w-full max-w-sm">
        <h1 className="text-xl font-bold text-center">Enter Username</h1>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-100 outline-none"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 py-2 rounded hover:bg-blue-300">Join Chat</button>
      </form>
    </div>
  );
};

export default LoginPage;
