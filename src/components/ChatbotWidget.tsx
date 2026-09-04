"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  text: string;
  sender: "user" | "assistant";
  isTyping?: boolean;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I assist you with your AI, ML, or data engineering needs today?",
      sender: "assistant",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length > 1 || isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val || isSending) return;

    // Add user message
    setMessages((prev) => [...prev, { text: val, sender: "user" }]);
    setInputValue("");
    setIsSending(true);

    // Add thinking bubble
    setMessages((prev) => [...prev, { text: "...", sender: "assistant", isTyping: true }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: val,
          conversation_id: conversationId,
        }),
      });

      // Remove typing bubble
      setMessages((prev) => prev.filter((m) => !m.isTyping));

      if (response.ok) {
        const data = await response.json();
        setConversationId(data.conversation_id);
        setMessages((prev) => [...prev, { text: data.reply, sender: "assistant" }]);
      } else {
        setMessages((prev) => [...prev, { text: "Sorry, I encountered an error. Please try again.", sender: "assistant" }]);
      }
    } catch (err) {
      setMessages((prev) => prev.filter((m) => !m.isTyping));
      setMessages((prev) => [...prev, { text: "Connection error. Please check your internet connectivity.", sender: "assistant" }]);
    } finally {
      setIsSending(false);
    }
  };

  const formatMessageText = (text: string) => {
    // Escape HTML first
    let formatted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Replace **bold** with <strong>bold</strong>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
    // Replace newlines with <br>
    formatted = formatted.replace(/\n/g, "<br>");
    
    return formatted;
  };

  return (
    <div className="chat-widget">
      {/* Tooltip (only when closed) */}
      {!isOpen && (
        <div className="chat-tooltip glass-panel">
          <span>💬 Ask Buildlyst AI Assistant</span>
        </div>
      )}

      {/* Trigger Button */}
      <button onClick={toggleChat} className="chat-toggle pulse-anim" aria-label="Open Chatbot Assistant">
        <svg
          className="float-bubble"
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ background: "transparent" }}
        >
          {/* Black Speech Bubble with Dual Skyblue Cyan & Violet Gradient Stroke */}
          <path
            d="M8 12C8 9.7 9.7 8 12 8H36C38.2 8 40 9.7 40 12V28C40 30.2 38.2 32 36 32H20L12 40V32H12C9.7 32 8 30.2 8 28V12Z"
            fill="#000000"
            stroke="url(#sb-g1)"
            strokeWidth="2"
          />

          {/* Continuous Blinking Eyes */}
          <g className="bubble-eye-blink">
            <circle cx="18" cy="20" r="4" fill="#00ffff" />
            <circle cx="18" cy="20" r="2" fill="#000000" />
            <circle cx="19" cy="19" r="0.8" fill="#00ffff" />

            <circle cx="30" cy="20" r="4" fill="#00ffff" />
            <circle cx="30" cy="20" r="2" fill="#000000" />
            <circle cx="31" cy="19" r="0.8" fill="#00ffff" />
          </g>

          {/* Smile Curve */}
          <path d="M20 26C22 28 26 28 28 26" stroke="#c084fc" strokeWidth="1.8" strokeLinecap="round" />

          <defs>
            <linearGradient id="sb-g1" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00d2ff" />
              <stop offset="1" stopColor="#8a2387" />
            </linearGradient>
          </defs>
        </svg>
      </button>

      {/* Chat Panel */}
      <div className={`chat-panel glass-panel glow-border ${isOpen ? "active" : ""}`}>
        <div className="chat-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#27c93f",
                boxShadow: "0 0 8px #27c93f",
              }}
            ></span>
            <span style={{ fontWeight: 700, fontSize: "14px", color: "#fff" }}>Buildlyst AI Assistant</span>
          </div>
          <button onClick={toggleChat} className="chat-close" aria-label="Close Chat">
            &times;
          </button>
        </div>

        <div className="chat-messages" id="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <div className="message-content">
                {msg.isTyping ? (
                  <div className="typing-indicator" style={{ display: "inline-flex" }}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : msg.sender === "user" ? (
                  msg.text
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: formatMessageText(msg.text) }} />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="chat-input-area">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about our services..."
            required
            autoComplete="off"
            className="glass-input"
            style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }}
            aria-label="Chat input field"
          />
          <button type="submit" className="chat-send" disabled={isSending}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
