'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '../constants';
import { HOPE_RESPONSES } from '../constants';

const INITIAL_MESSAGE: Message = {
  role: 'bot',
  content:
    "Hi, I'm Hope — a faith-based companion here to listen and encourage you.\n\nHow are you feeling today?",
};

let responseIndex = 0;

export function useHopeAI() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // Ref on the scrollable messages container — NOT a bottom sentinel
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
      setInput('');
      setIsTyping(true);

      const responseText = HOPE_RESPONSES[responseIndex % HOPE_RESPONSES.length];
      responseIndex += 1;

      const delay = 1800 + Math.random() * 400;
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'bot', content: responseText }]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping]
  );

  return {
    messages,
    input,
    setInput,
    isTyping,
    sendMessage,
    messagesContainerRef,
  };
}
