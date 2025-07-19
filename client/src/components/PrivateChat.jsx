import { useState } from 'react';

const PrivateChat = ({ recipient, onSend, messages, onClose }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(recipient.id, text);
      setText('');
    }
  };

  const privateMessages = messages.filter(
    (msg) => msg.isPrivate &&
      ((msg.senderId === recipient.id) || (msg.sender === recipient.username))
  );

  return (
    <div className="fixed top-4 right-4 bg-white text-black p-4 rounded-xl w-80 shadow-lg z-50">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Private chat with {recipient.username}</h2>
        <button onClick={onClose} className="text-red-400 hover:text-red-600">X</button>
      </div>
      <div className="h-48 overflow-y-auto space-y-1 bg-slate-800 p-2 rounded">
        {privateMessages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-100"
          placeholder="Type message..."
        />
        <button onClick={handleSend} className="bg-purple-600 px-3 rounded hover:bg-blue-300">Send</button>
      </div>
    </div>
  );
};

export default PrivateChat;
