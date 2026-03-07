import { ReactNode } from 'react';

interface StorySectionProps {
  title: string;
  children: ReactNode;
}

export function StorySection({ title, children }: StorySectionProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2
        className="text-xl font-bold font-poppins mb-3"
        style={{ color: '#acc487' }}
      >
        {title}
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
        {children}
      </p>
    </div>
  );
}
