import { useState } from 'react';

const MessageInput = ({ onSend, setTyping }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="p-4 bg-slate-800 flex gap-2">
      <input
        className="flex-1 p-2 rounded bg-slate-600 text-white"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setTyping(true);
          setTimeout(() => setTyping(false), 1000);
        }}
        placeholder="Type your message..."
      />
      <button className="bg-purple-500 px-4 py-2 rounded hover:bg-purple-600" onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
