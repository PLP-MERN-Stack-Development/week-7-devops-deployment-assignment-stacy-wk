const ChatBox = ({ messages, username }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}>
          <div className={`p-2 rounded-lg max-w-md ${msg.system ? 'bg-gray-500' : msg.isPrivate ? 'bg-pink-500' : 'bg-purple-500'} text-white`}>
            <p className="text-sm font-bold">{msg.system ? 'System' : msg.sender}</p>
            <p>{msg.message}</p>
            <p className="text-xs opacity-70 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
