'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import LyzaImg from '../../assets/images/Testimonial/Lyza.jpg';
import IsabelleImg from '../../assets/images/Testimonial/Isabelle.jpg';
import JeremyImg from '../../assets/images/Testimonial/Jeremy.jpg';

export interface Testimonial {
  id: number | string;
  content: string;
  name: string;
  role?: string;
  avatar: string | StaticImageData; // URL for the avatar image
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    content:
      'Through this program, I learned how to properly audit my thoughts, be more mindful of the lies I convince myself with and replace them with what’s true. Crucially, this time, the truth is not just based on what I know but based on the ultimate truth from what the Word of God says. Coach Hope reminded me of the verse Philippians 2:13, which is now one of my favorite verses: “For God is working in you, giving you the desire and the power to do what pleases Him.” It’s a beautiful reminder that even in our battle with mental health, God works in us, and He not only gives us the desire to change but also the power to change for His glory.',
    name: 'Lyza Samartino',
    role: 'HopeBegins Participant',
    avatar: LyzaImg,
  },
  {
    id: 2,
    content:
      'I remember that I was so confused why was still waking up with so much sadness, confusion, anxiety, and depression everyday. Every. Single. Day. And I didn’t know how to get out of it but I knew that I wanted to get out of it and I also knew that the only way out was advice and guidance that was founded on the Word of God. So, when HopeBegins was offered and was an opportunity that I could join, I remember going straight at it and really taking a chance because God knew that it was what I needed to move forward with my relationship with Him–to move forward with understanding Him and His love for me better. When HopeBegins came, it was the beginning of so much transformation with so much of the darkness that I was carrying to be out of my life at that time.',
    name: 'Isabelle Prado',
    role: 'HopeBegins Participant',
    avatar: IsabelleImg,
  },
  {
    id: 3,
    content:
      "I was overwhelmed with anxiety and so much lies from the enemy. So my friend introduced me to HopeBegins. But before that, I was having a hard time when it comes to my relationship with other people, even in decision making, to the point na nahirapan ako mag-decide. All of the decisions and actions na I was doing was not completely right and I knew na kailangan ko talaga ng help. And I found help and support through HopeBegins. For those people who are interested or unsure sa pag-join ng Hope Begins.. you really have to take the risk, knowing na our problems or struggles in life, it's really hard ‘pag ikaw lang mag-di-deal lang niyan on your own. You know, sometimes we tend to fix things on our own, but we also forget to seek help from other people.",
    name: 'Jeremy Rebedillo',
    role: 'HopeBegins Participant',
    avatar: JeremyImg,
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
      className="relative w-full max-w-5xl mx-auto py-16 px-4 flex flex-col items-center justify-center overflow-hidden h-[750px] md:h-[700px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute top-1/2 left-0 right-0 flex justify-center items-center h-[600px] -translate-y-1/2"
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
              className={`absolute top-0 w-[300px] md:w-[480px] h-[520px] md:h-[500px] rounded-[2rem] border p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 ${cardBg}`}
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
              <div className="relative w-30 h-30 mb-5 rounded-full border-[3px] border-emerald-100 dark:border-emerald-900/50 overflow-hidden shadow-sm flex-shrink-0">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  sizes="96px"
                  className={`object-cover transition-all duration-500 ${!isCenter && 'grayscale opacity-70'}`}
                />
              </div>

              <p className="text-zinc-600 dark:text-zinc-300 text-xs md:text-sm italic mb-6 overflow-y-auto custom-scrollbar leading-relaxed font-medium">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 w-full">
                <h4 className="font-bold text-zinc-900 dark:text-white font-poppins text-base md:text-lg">
                  {testimonial.name}
                </h4>
                {testimonial.role && (
                  <p className="text-xs md:text-sm text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest mt-1">
                    {testimonial.role}
                  </p>
                )}
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
