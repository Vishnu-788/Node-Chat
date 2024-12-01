import { socket } from "../socket";
import React, { useEffect, useState } from "react";

const Chat: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    function onConnect(): void {
      setIsConnected(true);
    }

    function onDisconnect(): void {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const sendMessage = () => {
    console.log("Message sent!");
  };

  return (
    <div className="message flex flex-col h-full bg-slate-900 text-white">
      {/* Message Field */}
      <div className="messagefield flex-1 p-4 overflow-y-auto bg-slate-800">
        {isConnected ? <p>User online</p> : <p>User offline</p>}
        <p>Messages...</p>
      </div>

      {/* Input Field */}
      <div className="input flex p-4 items-center gap-2 bg-slate-700">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-500"
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
