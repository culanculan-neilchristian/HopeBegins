import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Hopecast } from '@/types/hopecast';
import 'react-quill-new/dist/quill.snow.css';

const HopecastContent = React.memo(({ verse }: { verse: string }) => {
  if (!verse) return null;

  // Replace all non-breaking spaces (HTML entities or raw characters) with normal spaces
  // This prevents weird word breaking (like 'ide a:') when text is pasted from other sources
  const cleanVerse = verse.replace(/&nbsp;|\u00A0/g, ' ');

  return (
    <div className="bg-[#f2f6ee] p-6 rounded-2xl border border-[#9dbd7b]/10 ql-snow">
      <div
        className="ql-editor !p-0 font-medium text-zinc-700 [&_p:empty]:min-h-[1.42em]"
        dangerouslySetInnerHTML={{
          __html: cleanVerse,
        }}
      />
    </div>
  );
});
HopecastContent.displayName = 'HopecastContent';

interface HopecastCardProps {
  hopecast: Hopecast;
  onPlay?: (hopecast: Hopecast) => void;
  isPlaying?: boolean;
  progress?: number;
}

export function HopecastCard({
  hopecast,
  onPlay,
  isPlaying = false,
  progress = 0,
}: HopecastCardProps) {
  const categoryName = hopecast.category_details?.[0]?.name || 'GENERAL';

  return (
    <Card
      className={`group transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-10px_rgba(157,189,123,0.15)] bg-white rounded-3xl overflow-hidden border-0 shadow-sm ${
        isPlaying ? 'ring-1 ring-[#9dbd7b]/30' : 'border-zinc-50'
      }`}
    >
      <CardContent className="px-6 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-6 w-full">
          <div className="flex-1 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#9dbd7b]/80 font-poppins">
              {categoryName}
            </p>
            <h3 className="text-2xl font-bold text-[#6b634d] font-poppins leading-tight group-hover:text-[#5a5341] transition-colors">
              {hopecast.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-[#9b9482] font-medium">
              <span>{hopecast.name || 'Anonymous'}</span>
              <span className="text-zinc-300 font-bold">·</span>
              <span>{hopecast.duration || 'Daily Hope'}</span>
            </div>
          </div>

          <button
            onClick={() => onPlay?.(hopecast)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm shrink-0 ${
              isPlaying
                ? 'bg-[#9dbd7b] text-white shadow-[#9dbd7b]/20 shadow-lg'
                : 'bg-[#ecf4e6] text-[#9dbd7b] hover:bg-[#9dbd7b] hover:text-white'
            }`}
            aria-label={
              isPlaying ? `Pause ${hopecast.title}` : `Play ${hopecast.title}`
            }
          >
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-current rounded-full" />
                <div className="w-1 h-4 bg-current rounded-full" />
              </div>
            ) : (
              <Play className="w-5 h-5 ml-1 fill-current" />
            )}
          </button>
        </div>

        {/* Player Controls & Quote Section */}
        {isPlaying && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-500">
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9dbd7b] transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Content Box */}
            <HopecastContent verse={hopecast.verse || ''} />

            <div className="pt-2">
              <Link
                href="/prayers"
                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-xl font-bold text-[#9dbd7b] bg-[#ecf4e6] hover:bg-[#9dbd7b] hover:text-white transition-all duration-300 text-sm"
              >
                Submit A Prayer Request
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
