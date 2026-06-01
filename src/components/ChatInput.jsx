import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 bg-white rounded-2xl shadow-md p-3">
      <textarea
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 resize-none outline-none text-sm text-gray-700 max-h-32 overflow-y-auto"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="bg-blue-600 text-white rounded-xl px-4 py-2 text-sm hover:bg-blue-700 transition disabled:opacity-40"
      >
        Send
      </button>
    </div>
  );
}