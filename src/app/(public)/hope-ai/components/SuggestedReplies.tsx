import { SUGGESTED_REPLIES } from '../constants';

interface SuggestedRepliesProps {
  onSelect: (text: string) => void;
  disabled: boolean;
}

export function SuggestedReplies({
  onSelect,
  disabled,
}: SuggestedRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
      {SUGGESTED_REPLIES.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          disabled={disabled}
          className="px-4 py-2 rounded-full border text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:border-[#acc487] hover:text-[#acc487] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ borderColor: '#d4d4d8' }}
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
