'use client';

import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  RefreshCw,
  Save,
  Layout,
  Video,
  Type,
  AlignLeft,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  siteSettingsService,
  JourneyContent,
} from '@/services/siteSettingsService';
import { toast } from 'sonner';
import { DailyHopeNav } from '../components/DailyHopeNav';
import { Card, CardContent } from '@/components/ui/card';

export default function ManageJourneyContentPage() {
  const [content, setContent] = useState<JourneyContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const data = await siteSettingsService.getJourneyContent();
      setContent(data);
      setIsError(false);
    } catch (error) {
      console.error('Failed to fetch journey content:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    try {
      setIsSaving(true);
      await siteSettingsService.updateJourneyContent(content.id, {
        title: content.title,
        description: content.description,
        video_embed_url: content.video_embed_url,
      });
      toast.success('Journey content updated successfully');
    } catch (error) {
      console.error('Failed to update journey content:', error);
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isError) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="h-16 w-16 rounded-3xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center border border-red-100 dark:border-red-900/10">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-black tracking-tight italic">
          Failed to load journey content
        </h2>
        <Button onClick={fetchContent} className="mt-2">
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-12 max-w-5xl mx-auto">
      <header>
        <h1 className="text-3xl font-black italic tracking-tighter">
          Journey Page Editor
        </h1>
        <div className="mt-6">
          <DailyHopeNav />
        </div>
        <p className="mt-4 text-zinc-500 font-medium">
          Customize the content of the &quot;Hopeful Beginning Journey&quot;
          (Step 2: A Word for You).
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-8 animate-pulse">
          <div className="h-64 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800" />
          <div className="h-96 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Editor Form */}
          <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8 shadow-xl space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <Layout className="h-5 w-5 text-brand" />
              <h2 className="text-xl font-black tracking-tight italic">
                Content Settings
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Type className="h-3 w-3" /> Section Title
                </label>
                <Input
                  value={content?.title || ''}
                  onChange={(e) =>
                    setContent((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                  className="h-12 rounded-2xl border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 font-bold"
                  placeholder="e.g., A Word for You"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <AlignLeft className="h-3 w-3" /> Description
                </label>
                <Textarea
                  value={content?.description || ''}
                  onChange={(e) =>
                    setContent((prev) =>
                      prev ? { ...prev, description: e.target.value } : null
                    )
                  }
                  className="min-h-[120px] rounded-2xl border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 font-medium leading-relaxed"
                  placeholder="Tell them something encouraging before the video..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <Video className="h-3 w-3" /> Video Embed URL
                </label>
                <div className="relative">
                  <Input
                    value={content?.video_embed_url || ''}
                    onChange={(e) =>
                      setContent((prev) =>
                        prev
                          ? { ...prev, video_embed_url: e.target.value }
                          : null
                      )
                    }
                    className="h-12 rounded-2xl border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 font-medium pl-4 pr-10"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                  <a
                    href={content?.video_embed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-[10px] text-zinc-400 font-medium mt-1">
                  Make sure to use the &quot;embed&quot; version of the link
                  (e.g., youtube.com/embed/ID).
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                className="w-full h-12 rounded-2xl bg-brand hover:bg-brand-hover text-brand-foreground font-black uppercase tracking-widest text-xs shadow-lg shadow-brand/20 transition-all active:scale-[0.98]"
              >
                {isSaving ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSaving ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            </form>
          </section>

          {/* Preview Section */}
          <aside className="space-y-6 lg:sticky lg:top-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              <h2 className="text-xl font-black tracking-tight italic">
                Live Preview
              </h2>
            </div>

            <Card className="overflow-hidden rounded-3xl border-zinc-100 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900">
              <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-400 text-[10px] uppercase tracking-widest">
                  How it looks on mobile
                </h3>
              </div>
              <CardContent className="p-0">
                <div className="bg-[#fcfdfa] dark:bg-zinc-950 p-6 space-y-6">
                  <div className="text-center space-y-2">
                    <h2 className="text-xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins">
                      {content?.title || 'A Word for You'}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                      {content?.description ||
                        'Before anything else, we want you to hear this.'}
                    </p>
                  </div>

                  <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-zinc-200 dark:bg-zinc-800 relative">
                    {content?.video_embed_url ? (
                      <iframe
                        width="100%"
                        height="100%"
                        src={content.video_embed_url}
                        title="Preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-400 italic text-sm">
                        No video URL provided
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 leading-relaxed">
                <strong>Note:</strong> Changes are saved to the database and
                will be immediately visible to all users starting the journey.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
