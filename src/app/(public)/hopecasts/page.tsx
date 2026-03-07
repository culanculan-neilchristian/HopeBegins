'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { hopecastService } from '@/services/hopecastService';
import { CategoryFilter } from './_components/category-filter';
import { HopecastCard } from './_components/hopecast-card';
import { Category, Hopecast, HopecastListResponse } from '@/types/hopecast';

export default function HopecastsPage() {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string | null
  >(null);
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  // Audio Playback State
  const [playingHopecast, setPlayingHopecast] = React.useState<Hopecast | null>(
    null
  );
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Fetch categories
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ['hopecast-categories'],
    queryFn: () => hopecastService.getCategories(),
  });

  // Fetch hopecasts
  const { data: hopecastsData, isLoading: isLoadingHopecasts } =
    useQuery<HopecastListResponse>({
      queryKey: ['hopecasts', selectedCategoryId, page],
      queryFn: () =>
        hopecastService.getHopecasts(selectedCategoryId, page, pageSize),
    });

  const hopecasts = hopecastsData?.results || [];

  // Reset page and stop audio when category changes
  React.useEffect(() => {
    setPage(1);

    // Stop audio playback on category change
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlayingHopecast(null);
      setIsPlaying(false);
      setProgress(0);
    }
  }, [selectedCategoryId]);

  // Cleanup audio on unmount
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handlePlay = async (hopecast: Hopecast) => {
    // If it's already the same hopecast, toggle play/pause
    if (playingHopecast?.id === hopecast.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    // New hopecast to play
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(hopecast.mp4_link);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });

    try {
      setPlayingHopecast(hopecast);
      setIsPlaying(true);
      setProgress(0);

      // Play the audio
      await audio.play();

      // Call API to increment play count
      await hopecastService.playHopecast(hopecast.id);
    } catch (error) {
      console.error('Error playing hopecast:', error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7]/50 pt-24 pb-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6b634d] font-poppins leading-[1.2] tracking-tight">
            I Need to Hear Hope Today
          </h1>
          <p className="text-zinc-500 font-medium text-lg max-w-xl mx-auto leading-relaxed opacity-80">
            Listen to a HopeCast that speaks to where you are.
          </p>
        </div>

        {/* Category Filter Section */}
        <div className="mb-12">
          {isLoadingCategories ? (
            <div className="flex flex-wrap justify-center gap-2 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 w-24 bg-zinc-100 rounded-full" />
              ))}
            </div>
          ) : (
            <CategoryFilter
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
            />
          )}
        </div>

        {/* Hopecast List Section */}
        <div className="space-y-6">
          {isLoadingHopecasts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-zinc-100 shadow-sm p-6 flex flex-col gap-6 h-[140px]"
                >
                  <div className="flex items-center justify-between gap-6 w-full">
                    <div className="flex-1 space-y-4">
                      <div className="h-2 w-20 bg-zinc-100 rounded-full" />
                      <div className="h-4 w-3/4 bg-zinc-100 rounded-full" />
                      <div className="h-3 w-1/2 bg-zinc-100/60 rounded-full" />
                    </div>
                    <div className="w-14 h-14 rounded-full bg-zinc-100 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          ) : hopecasts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hopecasts.map((hopecast) => (
                  <HopecastCard
                    key={hopecast.id}
                    hopecast={hopecast}
                    onPlay={handlePlay}
                    isPlaying={playingHopecast?.id === hopecast.id && isPlaying}
                    progress={
                      playingHopecast?.id === hopecast.id ? progress : 0
                    }
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {hopecastsData && hopecastsData.count > pageSize && (
                <div className="flex justify-center items-center gap-4 pt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-6 py-2 rounded-full border border-zinc-200 text-[#6b634d] font-bold disabled:opacity-30 hover:bg-zinc-50 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-[#6b634d] font-bold opacity-60">
                    Page {page} of {Math.ceil(hopecastsData.count / pageSize)}
                  </span>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= Math.ceil(hopecastsData.count / pageSize)}
                    className="px-6 py-2 rounded-full border border-zinc-200 text-[#6b634d] font-bold disabled:opacity-30 hover:bg-zinc-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-zinc-50 shadow-sm">
              <p className="text-zinc-400 font-medium font-poppins">
                No HopeCasts found for this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
