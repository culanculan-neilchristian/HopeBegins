import type { Message } from '../constants';
import Link from 'next/link';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';
  const isEscalation = message.role === 'escalation';

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong
                  key={j}
                  className="font-bold text-zinc-900 dark:text-zinc-100"
                >
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
          {i !== text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  if (isEscalation) {
    return (
      <div className="flex justify-start">
        <div className="rounded-2xl rounded-tl-none bg-rose-50 dark:bg-rose-950/30 text-zinc-700 dark:text-zinc-200 px-5 py-4 text-sm leading-relaxed max-w-[85%] border border-rose-100 dark:border-rose-900/50">
          <p className="mb-4 text-rose-800 dark:text-rose-300 font-medium">
            I&apos;m really glad you told me how you&apos;re feeling. You
            don&apos;t have to face this alone. It might help to talk to someone
            you trust or a trained counselor.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/get-started"
              className="block text-center bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 px-4 rounded-xl transition-colors"
            >
              Get Immediate Help
            </Link>
            <Link
              href="/prayers"
              className="block text-center bg-white dark:bg-zinc-800 text-rose-600 dark:text-rose-400 font-bold py-2 px-4 rounded-xl border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
            >
              Submit Prayer Request
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-5 py-4 text-sm leading-relaxed max-w-[85%] ${
          isUser
            ? 'rounded-tr-none bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200'
            : 'rounded-tl-none text-zinc-700 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-800'
        }`}
        style={!isUser ? { backgroundColor: '#f5f7f2' } : {}}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}
