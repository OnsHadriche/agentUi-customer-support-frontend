export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-2 mt-1 shrink-0">
          N
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap
          ${isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : message.error
            ? "bg-red-100 text-red-700 rounded-bl-none"
            : "bg-white text-gray-800 shadow-sm rounded-bl-none"
          }`}
      >
        {message.content}
      </div>
    </div>
  );
}