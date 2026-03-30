'use client';

import Link from 'next/link';
import { Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useHopeAI } from './hooks/useHopeAI';
import { ChatBubble } from './components/ChatBubble';
import { TypingIndicator } from './components/TypingIndicator';
import { SuggestedReplies } from './components/SuggestedReplies';

export default function HopeAIPage() {
  const {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    messagesContainerRef,
  } = useHopeAI();

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ── */}
      <section className="relative pt-20 pb-10 px-6 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 -z-10" />
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-100 font-poppins tracking-tight">
            I Need to Talk to Hope AI
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            A faith-filled conversation, anytime you need it.
          </p>
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#acc487]">
              Hope AI is currently on BETA Mode
            </p>
            <p className="text-[12px] text-zinc-400 font-medium">
              We are praying for more resources so we can deploy the full
              capabilities of the AI
            </p>
          </div>
        </div>
      </section>

      {/* ── Chat Window ── */}
      <section className="flex-1 px-6 pb-4 max-w-2xl w-full mx-auto flex flex-col">
        <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[380px] max-h-[480px]"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChatBubble message={msg} />
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TypingIndicator />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Suggested replies */}
          <SuggestedReplies onSelect={sendMessage} disabled={isTyping} />

          {/* Input bar */}
          <div className="flex items-center gap-3 px-4 py-4 border-t border-zinc-100 dark:border-zinc-800">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              disabled={isTyping}
              className="flex-1 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 px-5 text-sm font-medium text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-[#acc487]/30 transition-all disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isTyping || !input.trim()}
              className="h-12 w-12 rounded-full flex items-center justify-center text-white transition-all duration-200 disabled:opacity-40 hover:opacity-90 active:scale-95 shrink-0"
              style={{ backgroundColor: '#acc487' }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Prayer Request Link ── */}
      <div className="text-center pb-10 pt-4">
        <Link
          href="/prayers"
          className="text-sm font-medium underline underline-offset-4 text-zinc-400 hover:text-[#acc487] transition-colors"
        >
          I&apos;d rather talk to a real person — submit a prayer request
        </Link>
      </div>
    </div>
  );
}
