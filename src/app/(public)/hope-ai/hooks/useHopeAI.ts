'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { Message } from '../constants';
import {
  QA_DATABASE,
  FALLBACK_RESPONSES,
  SMART_FOLLOW_UPS,
} from '../constants';

const INITIAL_MESSAGE: Message = {
  role: 'bot',
  content:
    "Hi, I'm Hope — a faith-based companion here to listen and encourage you.\n\nHow are you feeling today?",
};

let responseIndex = 0;

function generateBotResponse(input: string, messagesCount: number): Message {
  const lowerInput = input.toLowerCase();

  const escalationMatch = QA_DATABASE.find(
    (qa) =>
      qa.response === 'ESCALATION' &&
      qa.keywords.some((k) => lowerInput.includes(k))
  );
  if (escalationMatch) {
    return { role: 'escalation', content: 'ESCALATION' };
  }

  for (const qa of QA_DATABASE) {
    if (qa.response === 'ESCALATION') continue;
    if (qa.keywords.some((k) => lowerInput.includes(k))) {
      let response = qa.response;
      if (!qa.keywords.includes("today's hope")) {
        const followUp =
          SMART_FOLLOW_UPS[messagesCount % SMART_FOLLOW_UPS.length];
        response += `\n\n**What's next?**\n${followUp}`;
      }
      return { role: 'bot', content: response };
    }
  }

  const fallback =
    FALLBACK_RESPONSES[responseIndex % FALLBACK_RESPONSES.length];
  responseIndex += 1;
  const followUp = SMART_FOLLOW_UPS[messagesCount % SMART_FOLLOW_UPS.length];
  return {
    role: 'bot',
    content: `${fallback}\n\n**What's next?**\n${followUp}`,
  };
}

export function useHopeAI() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

      const delay = 1800 + Math.random() * 400;
      setTimeout(() => {
        setMessages((prev) => {
          const botMessage = generateBotResponse(trimmed, prev.length);
          return [...prev, botMessage];
        });
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
