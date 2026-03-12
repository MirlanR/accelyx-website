"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

type Message = {
  id: number;
  from: "user" | "support";
  text: string;
  time: string;
};

const AUTO_REPLIES: Record<string, string> = {
  default:
    "Thanks for reaching out to CATCH! Our team will get back to you within a few hours. You can also email us at support@catchbrand.com.",
  size:
    "For sizing, we recommend checking the size guide on each product page. Our pieces run true to size with a relaxed, oversized fit. Still unsure? Reply with your height and weight and we'll advise.",
  shipping:
    "We offer free standard shipping on orders over $200. Standard delivery takes 3–5 business days. Express (1–2 days) is available at checkout.",
  return:
    "We accept returns within 30 days of delivery. Items must be unworn and in original packaging. Email returns@catchbrand.com to start a return.",
  order:
    "To track your order, check your confirmation email for the tracking link. If you need help, share your order number here and we'll look into it.",
  payment:
    "We accept all major credit/debit cards, Apple Pay, Google Pay, and Shop Pay. All transactions are secure and encrypted.",
};

const QUICK_QUESTIONS = [
  "What sizes do you carry?",
  "Shipping & delivery info",
  "How do I return an item?",
  "Track my order",
];

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("size") || lower.includes("fit")) return AUTO_REPLIES.size;
  if (lower.includes("ship") || lower.includes("deliver")) return AUTO_REPLIES.shipping;
  if (lower.includes("return") || lower.includes("refund")) return AUTO_REPLIES.return;
  if (lower.includes("order") || lower.includes("track")) return AUTO_REPLIES.order;
  if (lower.includes("pay") || lower.includes("card") || lower.includes("apple pay")) return AUTO_REPLIES.payment;
  return AUTO_REPLIES.default;
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "support",
      text: "Hey there 👋 Welcome to CATCH. How can we help you today?",
      time: now(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      from: "user",
      text: text.trim(),
      time: now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: Date.now() + 1,
        from: "support",
        text: getAutoReply(text),
        time: now(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* ── Chat Panel ─────────────────────────────────── */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-4 md:right-6 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-catch-dark border border-catch-mid shadow-2xl flex flex-col transition-all duration-300 ${
            isMinimized ? "h-14 overflow-hidden" : "h-[480px]"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-catch-mid bg-catch-gray flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-catch-white rounded-full flex items-center justify-center">
                  <span className="font-display text-catch-black text-xs font-bold">C</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-catch-gray" />
              </div>
              <div>
                <p className="text-catch-white text-xs font-medium">CATCH Support</p>
                <p className="text-[10px] text-green-400 tracking-wide">Online · 24/7</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-catch-muted hover:text-catch-white transition-colors"
                aria-label="Minimize"
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-catch-muted hover:text-catch-white transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed ${
                        msg.from === "user"
                          ? "bg-catch-white text-catch-black"
                          : "bg-catch-mid text-catch-light"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-catch-muted mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-catch-mid px-4 py-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-catch-muted rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-catch-muted rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-catch-muted rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[11px] border border-catch-mid text-catch-muted hover:border-catch-muted hover:text-catch-light px-2.5 py-1 transition-colors duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 px-4 py-3 border-t border-catch-mid"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-catch-gray border border-catch-mid text-catch-white placeholder:text-catch-muted text-xs px-3 py-2 focus:outline-none focus:border-catch-muted transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="text-catch-muted hover:text-catch-white transition-colors disabled:opacity-30"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-[10px] text-catch-muted py-2 border-t border-catch-mid">
                Avg. reply time: under 2 hours · support@catchbrand.com
              </p>
            </>
          )}
        </div>
      )}

      {/* ── Floating Button ─────────────────────────────── */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        aria-label="Open chat"
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 bg-catch-white text-catch-black flex items-center justify-center shadow-lg hover:bg-catch-light transition-colors duration-200 active:scale-95"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}

        {/* Online dot */}
        {!isOpen && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-catch-black" />
        )}
      </button>
    </>
  );
}
