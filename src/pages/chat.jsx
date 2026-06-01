import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import MessageBubble from "../components/MessageBubble";
import ChatInput from "../components/ChatInput";
import Navbar from "../components/Navbar";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const userName = localStorage.getItem("user_name");
  const conversationId = localStorage.getItem("conversation_id");

  // redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  // auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // welcome message on load
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `Hi ${userName}! I'm Nova, ShopAI's virtual support assistant. How can I help you today?`,
      },
    ]);
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // add user message immediately
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await client.post("/chat/", {
        message: text,
        conversation_id: conversationId,
      });

      const agentMsg = {
        role: "assistant",
        content: res.data.response,
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {/* typing indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span>Nova is typing...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="max-w-3xl mx-auto w-full px-4 pb-4">
        <ChatInput onSend={sendMessage} disabled={loading} />
      </div>

    </div>
  );
}