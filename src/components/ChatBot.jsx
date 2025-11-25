import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll xuống dưới khi có tin nhắn mới
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      setMessages([...newMessages, { role: "ai", content: data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: "ai", content: "Có lỗi xảy ra" }]);
    }
  };

  return (
    <>
      {/* Nút Chat nổi bật */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-8 right-8 w-20 h-20 rounded-full text-5xl flex items-center justify-center
          text-white shadow-2xl animate-shake animate-pulseColor z-50 hover:scale-110 transition-transform`}
      >
        🤖
      </button>

      {/* Khung Chat */}
      <div
        className={`fixed bottom-32 right-8 w-90 h-[300px] bg-white rounded-2xl shadow-2xl border flex flex-col z-50
          transform transition-all duration-300 ease-in-out
          ${open ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}`}
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-[#F7D9A7] text-white rounded-t-2xl">
          <h2 className="font-semibold text-lg">Chat AI</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-white w-10 font-bold hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Nội dung chat */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-xl break-words ${
                  m.role === "user"
                    ? "bg-[#b77c25] text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2 bg-gray-50 rounded-b-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nhập tin nhắn..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
          >
            Gửi
          </button>
        </div>
      </div>
    </>
  );
}
