// Animated "..." typing indicator bubble
export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="rounded-2xl rounded-tl-none px-5 py-4 text-sm max-w-[75%]"
        style={{ backgroundColor: '#eff3e8' }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium mr-1" style={{ color: '#acc487' }}>
            Hope is typing
          </span>
          <span
            className="h-1.5 w-1.5 rounded-full animate-bounce"
            style={{ backgroundColor: '#acc487', animationDelay: '0ms' }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full animate-bounce"
            style={{ backgroundColor: '#acc487', animationDelay: '150ms' }}
          />
          <span
            className="h-1.5 w-1.5 rounded-full animate-bounce"
            style={{ backgroundColor: '#acc487', animationDelay: '300ms' }}
          />
        </div>
      </div>
    </div>
  );
}
