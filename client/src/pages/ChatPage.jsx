import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../socket/socket';
import ChatBox from '../components/ChatBox';
import MessageInput from '../components/MessageInput';
import UserList from '../components/UserList';
import PrivateChat from '../components/PrivateChat'; 

const ChatPage = () => {
  const { username, logout } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
  } = useSocket();

  useEffect(() => {
    connect(username);
    return () => disconnect();
  }, []);

  const handleSend = (msg) => {
    if (selectedUser) {
      sendPrivateMessage(selectedUser.id, msg);
    } else {
      sendMessage(msg);
    }
  };

  return (
    <div className="flex h-screen">
      <UserList
        users={users.filter((u) => u.username !== username)}
        onSelect={setSelectedUser}
      />
      <div className="flex flex-col flex-1 bg-gray-100 text-black">
        <div className="flex justify-between items-center p-4 bg-slate-900">
          <h1 className="text-xl font-bold">Welcome, {username}</h1>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <ChatBox messages={messages} username={username} />

        {typingUsers.length > 0 && (
          <div className="px-4 text-sm italic text-purple-300">
            {typingUsers.join(', ')} typing...
          </div>
        )}

        {selectedUser && (
          <PrivateChat
            recipient={selectedUser}
            onSend={sendPrivateMessage}
            messages={messages}
            onClose={() => setSelectedUser(null)}
          />
        )}

        <MessageInput onSend={handleSend} setTyping={setTyping} />
      </div>
    </div>
  );
};

export default ChatPage;
