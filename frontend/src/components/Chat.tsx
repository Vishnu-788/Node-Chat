import { socket } from "../socket";
import React, { useEffect, useState } from "react";

interface Message {
  message: string;
}

const Chat: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    function onConnect(): void {
      setIsConnected(true);
    }

    function onDisconnect(): void {
      setIsConnected(false);
    }

    function messageEvent(message: string): void {
      setMessages((prev) => [...prev, { message }]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", messageEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", messageEvent);
    };
  }, []);

  const sendMessage = () => {
    if (inputValue.trim() === "") return; // Avoid sending empty messages

    socket.emit("message", inputValue); // Send message to server endpoint "message"
    setInputValue(""); // Clear the input field
  };

  return (
    <div className="message flex flex-col h-full bg-slate-900 text-white">
      {/* Message Field */}
      <div className="messagefield flex-1 p-4 overflow-y-auto bg-slate-800">
        {isConnected ? <p>User online</p> : <p>User offline</p>}
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.message}</li>
          ))}
        </ul>
      </div>

      {/* Input Field */}
      <div className="input flex p-4 items-center gap-2 bg-slate-700">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update input value
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage(); // Allow sending with Enter key
          }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
