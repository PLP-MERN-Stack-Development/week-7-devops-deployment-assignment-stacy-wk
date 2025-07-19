import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { username, logout } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 text-black">
      <h1 className="text-xl font-bold">Welcome, {username}</h1>
      <button onClick={logout} className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-300">
        Log Out
      </button>
    </div>
  );
};

export default Header;
