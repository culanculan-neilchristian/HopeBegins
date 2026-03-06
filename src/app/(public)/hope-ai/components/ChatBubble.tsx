import type { Message } from '../constants';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-5 py-4 text-sm leading-relaxed max-w-[80%] whitespace-pre-line ${
          isUser
            ? 'rounded-tr-none bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200'
            : 'rounded-tl-none text-zinc-700 dark:text-zinc-200'
        }`}
        style={!isUser ? { backgroundColor: '#eff3e8' } : {}}
      >
        {message.content}
      </div>
    </div>
  );
}
