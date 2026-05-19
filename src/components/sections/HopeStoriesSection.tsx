'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  TestimonialCarousel,
  Testimonial,
} from '@/components/ui/testimonial-carousel';
import { SubmitHopeStoryModal } from '@/components/modals/SubmitHopeStoryModal';
import { Heart, Plus } from 'lucide-react';
import hopeStoryService from '@/services/hopeStoryService';

export function HopeStoriesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stories, setStories] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStories = async () => {
    try {
      const data = await hopeStoryService.getApprovedStories();
      if (data && data.length > 0) {
        const mappedStories: Testimonial[] = data.map((story: any) => ({
          id: story.id,
          content: story.testimonial,
          name: story.full_name,
          role: story.occupation || 'Hope Participant',
          avatar: story.photo || '', // Fallback handled in carousel or CSS
        }));
        setStories(mappedStories);
      }
    } catch (error) {
      console.error('Failed to fetch hope stories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <section className="px-6 pb-32">
      <div className="max-w-5xl mx-auto space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-rose-50 dark:bg-rose-900/20 rounded-2xl">
            <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold font-poppins text-zinc-900 dark:text-zinc-100 tracking-tight">
              Stories of Hope
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium max-w-lg mx-auto leading-relaxed">
              Real testimonies of how HopeBegins is transforming lives. See what
              others are saying about their journey with God.
            </p>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 rounded-2xl px-6 h-12 font-bold shadow-lg shadow-rose-500/20"
          >
            <Plus className="h-4 w-4 mr-2" />
            Submit Your Hope Story
          </Button>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="h-[500px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
            </div>
          ) : (
            <TestimonialCarousel
              testimonials={stories.length > 0 ? stories : undefined}
            />
          )}
        </div>
      </div>

      <SubmitHopeStoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
