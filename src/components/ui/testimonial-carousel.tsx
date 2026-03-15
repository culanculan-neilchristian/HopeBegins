'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Testimonial {
  id: number | string;
  content: string;
  name: string;
  role: string;
  avatar: string; // URL for the avatar image
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    content:
      'I felt so alone before finding this community. Now I have a whole network of people who understand and support my journey.',
    name: 'Emily R.',
    role: 'Community Member',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    content:
      "The Daily Hope Drops are exactly what I need to start my morning. It's like a warm hug for my soul.",
    name: 'Marcus T.',
    role: 'Subscriber',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 3,
    content:
      "Talking to Hope AI when it's 3 AM and I can't sleep has been life-changing. It always knows just how to encourage me.",
    name: 'Jessica Jones',
    role: 'Web Designer',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 4,
    content:
      'Being a Hope Carrier gives me purpose. I love seeing the impact we can make when we come together.',
    name: 'David Chen',
    role: 'Hope Carrier',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
  {
    id: 5,
    content:
      "This platform is a safe harbor. It's so refreshing to find faith-driven mental health support that actually gets it.",
    name: 'Sarah Williams',
    role: 'Platform User',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
];

export function TestimonialCarousel({
  testimonials = defaultTestimonials,
  autoPlayInterval = 5000,
}: {
  testimonials?: Testimonial[];
  autoPlayInterval?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(testimonials.length / 2)
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [handleNext, autoPlayInterval, isHovered]);

  return (
    <div
      className="relative w-full max-w-5xl mx-auto py-16 px-4 flex flex-col items-center justify-center overflow-hidden h-[600px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute top-1/2 left-0 right-0 flex justify-center items-center h-[450px] -translate-y-1/2"
        style={{ perspective: '1000px' }}
      >
        {testimonials.map((testimonial, index) => {
          // Calculate relative distance from the center card
          let diff = index - currentIndex;

          // Handle cyclic wrap-around logic so it continuously loops seamlessly
          if (diff > Math.floor(testimonials.length / 2)) {
            diff -= testimonials.length;
          } else if (diff < -Math.floor(testimonials.length / 2)) {
            diff += testimonials.length;
          }

          const isCenter = diff === 0;
          const absDiff = Math.abs(diff);

          // Position logic to create a 3D Coverflow effect
          // Spacing gets tighter the further away from the center it is
          const xOffset = diff * (100 - absDiff * 10);
          const scale = isCenter ? 1 : 1 - absDiff * 0.15;
          const zIndex = 50 - absDiff;
          const opacity = isCenter ? 1 : Math.max(0.2, 1 - absDiff * 0.3);
          const blurAmount = isCenter ? 0 : absDiff * 2;

          // Darker/faded style for non-center items
          const cardBg = isCenter
            ? 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]'
            : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-transparent shadow-md';

          return (
            <motion.div
              key={testimonial.id}
              className={`absolute top-0 w-[280px] md:w-[380px] h-[380px] md:h-[400px] rounded-[2rem] border p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 ${cardBg}`}
              onClick={() => setCurrentIndex(index)}
              initial={false}
              animate={{
                x: xOffset,
                scale: scale,
                zIndex: zIndex,
                opacity: opacity,
                filter: `blur(${blurAmount}px)`,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1], // Custom snappy spring-like cubic bezier
              }}
            >
              <div className="relative w-24 h-24 mb-5 rounded-full border-[3px] border-emerald-100 dark:border-emerald-900/50 overflow-hidden shadow-sm flex-shrink-0">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="96px"
                  className={`object-cover transition-all duration-500 ${!isCenter && 'grayscale opacity-70'}`}
                />
              </div>

              <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base italic mb-6 line-clamp-5 leading-relaxed font-medium">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="mt-auto">
                <h4 className="font-bold text-zinc-900 dark:text-white font-poppins text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mt-1">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Buttons Container */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 hover:text-emerald-600 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          className="p-3 rounded-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 hover:text-emerald-600 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
