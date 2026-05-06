"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteSettingsService, PopoutItem } from "@/services/siteSettingsService";
import Link from "next/link";
import { X } from "lucide-react";

const EngagementPopout = () => {
  const [settings, setSettings] = useState<{
    is_enabled: boolean;
    interval_seconds: number;
    items: PopoutItem[];
  } | null>(null);
  const [currentItem, setCurrentItem] = useState<PopoutItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      const data = await siteSettingsService.getPublicPopouts();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch popout settings:", error);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (!settings || !settings.is_enabled || settings.items.length === 0) return;

    const showRandomPopout = () => {
      const randomIndex = Math.floor(Math.random() * settings.items.length);
      setCurrentItem(settings.items[randomIndex]);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Initial delay before first popout
    const initialDelay = setTimeout(showRandomPopout, 5000);

    const interval = setInterval(showRandomPopout, settings.interval_seconds * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialDelay);
    };
  }, [settings]);

  if (!settings || !settings.is_enabled || !currentItem) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-[9999] max-w-[320px] w-full"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 flex items-center gap-4 relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 blur-2xl" />
            
            <div className="flex-1">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-2 leading-tight">
                {currentItem.message}
              </p>
              <Link
                href={currentItem.link}
                className="inline-flex items-center justify-center px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20 active:scale-95"
              >
                {currentItem.button_text}
              </Link>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EngagementPopout;
