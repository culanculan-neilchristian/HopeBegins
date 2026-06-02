'use client';

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  AlignLeft,
  CheckCircle2,
  ExternalLink,
  Layout,
  Link as LinkIcon,
  ListPlus,
  RefreshCw,
  Save,
  Trash2,
  Type,
  Video,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  JourneyPageContent,
  siteSettingsService,
} from '@/services/siteSettingsService';
import {
  getDefaultJourneyPageContent,
  JOURNEY_ACTION_ICON_OPTIONS,
  JourneyActionIcon,
  JourneyCrisisContact,
  JourneyNextStepAction,
  JourneyPrayerItem,
  normalizeJourneyPageContent,
} from '@/lib/journeyPageContent';
import { DailyHopeNav } from '../components/DailyHopeNav';

type EditorSection =
  | 'header'
  | 'welcome'
  | 'word'
  | 'prayer'
  | 'devotional'
  | 'next'
  | 'crisis';

const editorSections: { id: EditorSection; label: string }[] = [
  { id: 'header', label: 'Header' },
  { id: 'welcome', label: 'Welcome' },
  { id: 'word', label: 'Video Word' },
  { id: 'prayer', label: 'Prayer' },
  { id: 'devotional', label: 'Devotional' },
  { id: 'next', label: 'Next Steps' },
  { id: 'crisis', label: 'Crisis' },
];

function FieldLabel({
  icon: Icon = Type,
  children,
}: {
  icon?: typeof Type;
  children: React.ReactNode;
}) {
  return (
    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
      <Icon className="h-3 w-3" /> {children}
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: typeof Type;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel icon={icon}>{label}</FieldLabel>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-2xl border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 font-bold"
        placeholder={placeholder}
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel icon={AlignLeft}>{label}</FieldLabel>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-2xl border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 font-medium leading-relaxed"
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
}

function ArrayItem({
  title,
  onRemove,
  children,
}: {
  title: string;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/30 p-4 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
          {title}
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" /> Remove
        </Button>
      </div>
      {children}
    </div>
  );
}

export default function ManageJourneyContentPage() {
  const [content, setContent] = useState<JourneyPageContent>(
    getDefaultJourneyPageContent
  );
  const [activeSection, setActiveSection] = useState<EditorSection>('header');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const data = await siteSettingsService.getJourneyPageContent();
      setContent(data);
      setIsError(false);
    } catch (error) {
      console.error('Failed to fetch journey page content:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = (
    updater: (current: JourneyPageContent) => JourneyPageContent
  ) => {
    setContent((current) => normalizeJourneyPageContent(updater(current)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      const saved = await siteSettingsService.updateJourneyPageContent(content);
      setContent(saved);
      toast.success('Journey page content updated successfully');
    } catch (error) {
      console.error('Failed to update full journey page content:', error);

      if (content.id) {
        try {
          await siteSettingsService.updateJourneyContent(content.id, {
            title: content.word_section.title,
            description: content.word_section.description,
            video_embed_url: content.word_section.video_embed_url,
          });
          toast.warning(
            'Only the video step was saved. The full-page backend endpoint is not available yet.'
          );
          return;
        } catch (legacyError) {
          console.error(
            'Failed to update legacy journey content:',
            legacyError
          );
        }
      }

      toast.error('Failed to save journey page changes');
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
          Failed to load journey page content
        </h2>
        <Button onClick={fetchContent} className="mt-2">
          <RefreshCw className="h-4 w-4 mr-2" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 lg:p-12 space-y-8 sm:space-y-12 max-w-7xl mx-auto">
      <header>
        <h1 className="text-3xl font-black italic tracking-tighter">
          Journey Page Editor
        </h1>
        <div className="mt-6">
          <DailyHopeNav />
        </div>
        <p className="mt-4 text-zinc-500 font-medium max-w-3xl">
          Customize the full Hopeful Beginning page: page header, welcome copy,
          video, prayer steps, devotional content, next-step links, and crisis
          contacts.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-8 animate-pulse">
          <div className="h-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800" />
          <div className="h-96 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-8">
          <div className="flex flex-wrap gap-2 bg-zinc-100 dark:bg-zinc-800/50 p-2 rounded-[24px] w-fit border border-zinc-200/50 dark:border-zinc-700/30">
            {editorSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all ${
                  activeSection === section.id
                    ? 'bg-white dark:bg-zinc-900 text-brand shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-8 items-start">
            <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-6 sm:p-8 shadow-xl space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <Layout className="h-5 w-5 text-brand" />
                <h2 className="text-xl font-black tracking-tight italic">
                  {editorSections.find(
                    (section) => section.id === activeSection
                  )?.label || 'Content'}{' '}
                  Settings
                </h2>
              </div>

              {activeSection === 'header' && (
                <HeaderEditor content={content} updateContent={updateContent} />
              )}
              {activeSection === 'welcome' && (
                <WelcomeEditor
                  content={content}
                  updateContent={updateContent}
                />
              )}
              {activeSection === 'word' && (
                <WordEditor content={content} updateContent={updateContent} />
              )}
              {activeSection === 'prayer' && (
                <PrayerEditor content={content} updateContent={updateContent} />
              )}
              {activeSection === 'devotional' && (
                <DevotionalEditor
                  content={content}
                  updateContent={updateContent}
                />
              )}
              {activeSection === 'next' && (
                <NextStepsEditor
                  content={content}
                  updateContent={updateContent}
                />
              )}
              {activeSection === 'crisis' && (
                <CrisisEditor content={content} updateContent={updateContent} />
              )}

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
                {isSaving ? 'Saving Changes...' : 'Save Full Page'}
              </Button>
            </section>

            <JourneyPreview content={content} activeSection={activeSection} />
          </div>
        </form>
      )}
    </div>
  );
}

function HeaderEditor({
  content,
  updateContent,
}: {
  content: JourneyPageContent;
  updateContent: (
    updater: (current: JourneyPageContent) => JourneyPageContent
  ) => void;
}) {
  return (
    <div className="space-y-6">
      <TextField
        label="Page Title"
        value={content.page_title}
        onChange={(value) =>
          updateContent((current) => ({ ...current, page_title: value }))
        }
        placeholder="Hopeful Beginning"
      />
      <TextField
        label="Page Subtitle"
        value={content.page_subtitle}
        onChange={(value) =>
          updateContent((current) => ({ ...current, page_subtitle: value }))
        }
        placeholder="A journey toward hope, one step at a time."
      />
      <div className="space-y-4">
        <FieldLabel icon={ListPlus}>Progress Step Labels</FieldLabel>
        {content.steps.map((step, idx) => (
          <TextField
            key={step.key}
            label={`Step ${idx + 1}`}
            value={step.label}
            onChange={(value) =>
              updateContent((current) => ({
                ...current,
                steps: current.steps.map((item) =>
                  item.key === step.key ? { ...item, label: value } : item
                ),
              }))
            }
          />
        ))}
      </div>
    </div>
  );
}

function WelcomeEditor({
  content,
  updateContent,
}: {
  content: JourneyPageContent;
  updateContent: (
    updater: (current: JourneyPageContent) => JourneyPageContent
  ) => void;
}) {
  const section = content.welcome_section;

  return (
    <div className="space-y-6">
      <TextField
        label="Title"
        value={section.title}
        onChange={(value) =>
          updateContent((current) => ({
            ...current,
            welcome_section: { ...current.welcome_section, title: value },
          }))
        }
      />
      <TextAreaField
        label="Body Copy"
        value={section.body}
        rows={5}
        onChange={(value) =>
          updateContent((current) => ({
            ...current,
            welcome_section: { ...current.welcome_section, body: value },
          }))
        }
      />
      <TextField
        label="Expectations Title"
        value={section.expectations_title}
        onChange={(value) =>
          updateContent((current) => ({
            ...current,
            welcome_section: {
              ...current.welcome_section,
              expectations_title: value,
            },
          }))
        }
      />
      <RepeatableStringList
        label="Expectations"
        items={section.expectations}
        onAdd={() =>
          updateContent((current) => ({
            ...current,
            welcome_section: {
              ...current.welcome_section,
              expectations: [
                ...current.welcome_section.expectations,
                'New expectation',
              ],
            },
          }))
        }
        onUpdate={(idx, value) =>
          updateContent((current) => ({
            ...current,
            welcome_section: {
              ...current.welcome_section,
              expectations: current.welcome_section.expectations.map(
                (item, itemIdx) => (itemIdx === idx ? value : item)
              ),
            },
          }))
        }
        onRemove={(idx) =>
          updateContent((current) => ({
            ...current,
            welcome_section: {
              ...current.welcome_section,
              expectations: current.welcome_section.expectations.filter(
                (_, itemIdx) => itemIdx !== idx
              ),
            },
          }))
        }
      />
      <TextField
        label="Button Text"
        value={section.button_text}
        onChange={(value) =>
          updateContent((current) => ({
            ...current,
            welcome_section: { ...current.welcome_section, button_text: value },
          }))
        }
      />
    </div>
  );
}

function WordEditor({
  content,
  updateContent,
}: {
  content: JourneyPageContent;
  updateContent: (
    updater: (current: JourneyPageContent) => JourneyPageContent
  ) => void;
}) {
  const section = content.word_section;
  const updateWord = (patch: Partial<typeof section>) =>
    updateContent((current) => ({
      ...current,
      word_section: { ...current.word_section, ...patch },
    }));

  return (
    <div className="space-y-6">
      <TextField
        label="Section Title"
        value={section.title}
        onChange={(value) => updateWord({ title: value })}
      />
      <TextAreaField
        label="Description"
        value={section.description}
        onChange={(value) => updateWord({ description: value })}
      />
      <div className="space-y-2">
        <FieldLabel icon={Video}>Video Embed URL</FieldLabel>
        <div className="relative">
          <Input
            value={section.video_embed_url}
            onChange={(e) => updateWord({ video_embed_url: e.target.value })}
            className="h-12 rounded-2xl border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 font-medium pl-4 pr-10"
            placeholder="https://www.youtube.com/embed/..."
          />
          <a
            href={section.video_embed_url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
      <TextField
        label="Verse Text"
        value={section.verse_text}
        onChange={(value) => updateWord({ verse_text: value })}
      />
      <TextField
        label="Verse Reference"
        value={section.verse_reference}
        onChange={(value) => updateWord({ verse_reference: value })}
      />
      <TextField
        label="Previous Button"
        value={section.previous_button_text}
        onChange={(value) => updateWord({ previous_button_text: value })}
      />
      <TextField
        label="Next Button"
        value={section.next_button_text}
        onChange={(value) => updateWord({ next_button_text: value })}
      />
    </div>
  );
}

function PrayerEditor({
  content,
  updateContent,
}: {
  content: JourneyPageContent;
  updateContent: (
    updater: (current: JourneyPageContent) => JourneyPageContent
  ) => void;
}) {
  const section = content.prayer_section;
  const updatePrayer = (patch: Partial<typeof section>) =>
    updateContent((current) => ({
      ...current,
      prayer_section: { ...current.prayer_section, ...patch },
    }));

  const updateStep = (idx: number, patch: Partial<JourneyPrayerItem>) => {
    updateContent((current) => ({
      ...current,
      prayer_section: {
        ...current.prayer_section,
        steps: current.prayer_section.steps.map((item, itemIdx) =>
          itemIdx === idx ? { ...item, ...patch } : item
        ),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <TextField
        label="Title"
        value={section.title}
        onChange={(value) => updatePrayer({ title: value })}
      />
      <TextAreaField
        label="Description"
        value={section.description}
        onChange={(value) => updatePrayer({ description: value })}
      />
      <div className="space-y-4">
        <FieldLabel icon={ListPlus}>Prayer Cards</FieldLabel>
        {section.steps.map((step, idx) => (
          <ArrayItem
            key={idx}
            title={`Prayer Step ${idx + 1}`}
            onRemove={() =>
              updatePrayer({
                steps: section.steps.filter((_, itemIdx) => itemIdx !== idx),
              })
            }
          >
            <TextField
              label="Card Title"
              value={step.title}
              onChange={(value) => updateStep(idx, { title: value })}
            />
            <TextAreaField
              label="Card Text"
              value={step.text}
              rows={4}
              onChange={(value) => updateStep(idx, { text: value })}
            />
          </ArrayItem>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            updatePrayer({
              steps: [...section.steps, { title: 'New Step', text: '' }],
            })
          }
        >
          <ListPlus className="h-4 w-4" /> Add Prayer Step
        </Button>
      </div>
      <TextField
        label="Back Button"
        value={section.back_button_text}
        onChange={(value) => updatePrayer({ back_button_text: value })}
      />
      <TextField
        label="Next Button"
        value={section.next_button_text}
        onChange={(value) => updatePrayer({ next_button_text: value })}
      />
      <TextField
        label="Final Button"
        value={section.final_button_text}
        onChange={(value) => updatePrayer({ final_button_text: value })}
      />
    </div>
  );
}

function DevotionalEditor({
  content,
  updateContent,
}: {
  content: JourneyPageContent;
  updateContent: (
    updater: (current: JourneyPageContent) => JourneyPageContent
  ) => void;
}) {
  const section = content.devotional_section;
  const updateDevotional = (patch: Partial<typeof section>) =>
    updateContent((current) => ({
      ...current,
      devotional_section: { ...current.devotional_section, ...patch },
    }));

  return (
    <div className="space-y-6">
      <TextField
        label="Title"
        value={section.title}
        onChange={(value) => updateDevotional({ title: value })}
      />
      <TextField
        label="Subtitle"
        value={section.subtitle}
        onChange={(value) => updateDevotional({ subtitle: value })}
      />
      <RepeatableStringList
        label="Content Cards"
        textarea
        items={section.content_cards}
        onAdd={() =>
          updateDevotional({
            content_cards: [...section.content_cards, 'New devotional card'],
          })
        }
        onUpdate={(idx, value) =>
          updateDevotional({
            content_cards: section.content_cards.map((item, itemIdx) =>
              itemIdx === idx ? value : item
            ),
          })
        }
        onRemove={(idx) =>
          updateDevotional({
            content_cards: section.content_cards.filter(
              (_, itemIdx) => itemIdx !== idx
            ),
          })
        }
      />
      <TextField
        label="Verse Text"
        value={section.verse_text}
        onChange={(value) => updateDevotional({ verse_text: value })}
      />
      <TextField
        label="Verse Reference"
        value={section.verse_reference}
        onChange={(value) => updateDevotional({ verse_reference: value })}
      />
      <TextField
        label="Good News Title"
        value={section.good_news_title}
        onChange={(value) => updateDevotional({ good_news_title: value })}
      />
      <TextAreaField
        label="Good News Body"
        value={section.good_news_body}
        rows={5}
        onChange={(value) => updateDevotional({ good_news_body: value })}
      />
      <TextField
        label="Reflection Title"
        value={section.reflection_title}
        onChange={(value) => updateDevotional({ reflection_title: value })}
      />
      <TextAreaField
        label="Reflection Prompt"
        value={section.reflection_prompt}
        onChange={(value) => updateDevotional({ reflection_prompt: value })}
      />
      <TextField
        label="Previous Button"
        value={section.previous_button_text}
        onChange={(value) => updateDevotional({ previous_button_text: value })}
      />
      <TextField
        label="Next Button"
        value={section.next_button_text}
        onChange={(value) => updateDevotional({ next_button_text: value })}
      />
    </div>
  );
}

function NextStepsEditor({
  content,
  updateContent,
}: {
  content: JourneyPageContent;
  updateContent: (
    updater: (current: JourneyPageContent) => JourneyPageContent
  ) => void;
}) {
  const section = content.next_steps_section;
  const updateNext = (patch: Partial<typeof section>) =>
    updateContent((current) => ({
      ...current,
      next_steps_section: { ...current.next_steps_section, ...patch },
    }));

  const updateAction = (idx: number, patch: Partial<JourneyNextStepAction>) => {
    updateNext({
      actions: section.actions.map((action, actionIdx) =>
        actionIdx === idx ? { ...action, ...patch } : action
      ),
    });
  };

  return (
    <div className="space-y-6">
      <TextField
        label="Title"
        value={section.title}
        onChange={(value) => updateNext({ title: value })}
      />
      <TextAreaField
        label="Description"
        value={section.description}
        rows={4}
        onChange={(value) => updateNext({ description: value })}
      />
      <div className="space-y-4">
        <FieldLabel icon={LinkIcon}>Action Cards</FieldLabel>
        {section.actions.map((action, idx) => (
          <ArrayItem
            key={idx}
            title={`Action ${idx + 1}`}
            onRemove={() =>
              updateNext({
                actions: section.actions.filter(
                  (_, actionIdx) => actionIdx !== idx
                ),
              })
            }
          >
            <TextField
              label="Card Title"
              value={action.title}
              onChange={(value) => updateAction(idx, { title: value })}
            />
            <TextField
              label="Link"
              value={action.href}
              onChange={(value) => updateAction(idx, { href: value })}
              icon={LinkIcon}
            />
            <div className="space-y-2">
              <FieldLabel>Icon</FieldLabel>
              <select
                value={action.icon}
                onChange={(e) =>
                  updateAction(idx, {
                    icon: e.target.value as JourneyActionIcon,
                  })
                }
                className="h-12 w-full rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-4 text-sm font-bold"
              >
                {JOURNEY_ACTION_ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </ArrayItem>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            updateNext({
              actions: [
                ...section.actions,
                { title: 'New Action', href: '/', icon: 'heart' },
              ],
            })
          }
        >
          <ListPlus className="h-4 w-4" /> Add Action
        </Button>
      </div>
      <TextField
        label="Home Link Text"
        value={section.home_link_text}
        onChange={(value) => updateNext({ home_link_text: value })}
      />
    </div>
  );
}

function CrisisEditor({
  content,
  updateContent,
}: {
  content: JourneyPageContent;
  updateContent: (
    updater: (current: JourneyPageContent) => JourneyPageContent
  ) => void;
}) {
  const section = content.crisis_section;
  const updateCrisis = (patch: Partial<typeof section>) =>
    updateContent((current) => ({
      ...current,
      crisis_section: { ...current.crisis_section, ...patch },
    }));

  const updateContact = (idx: number, patch: Partial<JourneyCrisisContact>) => {
    updateCrisis({
      contacts: section.contacts.map((contact, contactIdx) =>
        contactIdx === idx ? { ...contact, ...patch } : contact
      ),
    });
  };

  return (
    <div className="space-y-6">
      <TextField
        label="Crisis Heading"
        value={section.heading}
        onChange={(value) => updateCrisis({ heading: value })}
      />
      <div className="space-y-4">
        <FieldLabel icon={ListPlus}>Contact Groups</FieldLabel>
        {section.contacts.map((contact, contactIdx) => (
          <ArrayItem
            key={contactIdx}
            title={`Contact ${contactIdx + 1}`}
            onRemove={() =>
              updateCrisis({
                contacts: section.contacts.filter(
                  (_, itemIdx) => itemIdx !== contactIdx
                ),
              })
            }
          >
            <TextField
              label="Contact Title"
              value={contact.title}
              onChange={(value) => updateContact(contactIdx, { title: value })}
            />
            <div className="space-y-3">
              <FieldLabel>Phone / Contact Lines</FieldLabel>
              {contact.lines.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3"
                >
                  <Input
                    value={line.label}
                    onChange={(e) =>
                      updateContact(contactIdx, {
                        lines: contact.lines.map((item, itemIdx) =>
                          itemIdx === lineIdx
                            ? { ...item, label: e.target.value }
                            : item
                        ),
                      })
                    }
                    className="h-11 rounded-xl border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                    placeholder="Label"
                  />
                  <Input
                    value={line.value}
                    onChange={(e) =>
                      updateContact(contactIdx, {
                        lines: contact.lines.map((item, itemIdx) =>
                          itemIdx === lineIdx
                            ? { ...item, value: e.target.value }
                            : item
                        ),
                      })
                    }
                    className="h-11 rounded-xl border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                    placeholder="Value"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500"
                    onClick={() =>
                      updateContact(contactIdx, {
                        lines: contact.lines.filter(
                          (_, itemIdx) => itemIdx !== lineIdx
                        ),
                      })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  updateContact(contactIdx, {
                    lines: [...contact.lines, { label: 'Mobile:', value: '' }],
                  })
                }
              >
                <ListPlus className="h-4 w-4" /> Add Line
              </Button>
            </div>
          </ArrayItem>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            updateCrisis({
              contacts: [
                ...section.contacts,
                {
                  title: 'New Crisis Contact',
                  icon: 'heart',
                  lines: [{ label: 'Call:', value: '' }],
                },
              ],
            })
          }
        >
          <ListPlus className="h-4 w-4" /> Add Contact
        </Button>
      </div>
    </div>
  );
}

function RepeatableStringList({
  label,
  items,
  textarea = false,
  onAdd,
  onUpdate,
  onRemove,
}: {
  label: string;
  items: string[];
  textarea?: boolean;
  onAdd: () => void;
  onUpdate: (idx: number, value: string) => void;
  onRemove: (idx: number) => void;
}) {
  return (
    <div className="space-y-4">
      <FieldLabel icon={ListPlus}>{label}</FieldLabel>
      {items.map((item, idx) => (
        <ArrayItem
          key={idx}
          title={`${label} ${idx + 1}`}
          onRemove={() => onRemove(idx)}
        >
          {textarea ? (
            <Textarea
              value={item}
              onChange={(e) => onUpdate(idx, e.target.value)}
              rows={4}
              className="rounded-2xl border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-medium leading-relaxed"
            />
          ) : (
            <Input
              value={item}
              onChange={(e) => onUpdate(idx, e.target.value)}
              className="h-12 rounded-2xl border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold"
            />
          )}
        </ArrayItem>
      ))}
      <Button type="button" variant="outline" onClick={onAdd}>
        <ListPlus className="h-4 w-4" /> Add {label}
      </Button>
    </div>
  );
}

function JourneyPreview({
  content,
  activeSection,
}: {
  content: JourneyPageContent;
  activeSection: EditorSection;
}) {
  return (
    <aside className="space-y-6 xl:sticky xl:top-8">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        <h2 className="text-xl font-black tracking-tight italic">
          Live Preview
        </h2>
      </div>

      <Card className="overflow-hidden rounded-3xl border-zinc-100 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900">
        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="font-bold text-zinc-400 text-[10px] uppercase tracking-widest">
            {activeSection} section preview
          </h3>
        </div>
        <CardContent className="p-0">
          <div className="bg-[#fcfdfa] dark:bg-zinc-950 p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins">
                {content.page_title}
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                {content.page_subtitle}
              </p>
            </div>

            {activeSection === 'word' ? (
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-zinc-200 dark:bg-zinc-800 relative">
                {content.word_section.video_embed_url ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={content.word_section.video_embed_url}
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
            ) : (
              <div className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 p-5 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-[#a3b18a]">
                  {activeSection === 'welcome' && content.welcome_section.title}
                  {activeSection === 'prayer' && content.prayer_section.title}
                  {activeSection === 'devotional' &&
                    content.devotional_section.title}
                  {activeSection === 'next' && content.next_steps_section.title}
                  {activeSection === 'crisis' && content.crisis_section.heading}
                  {activeSection === 'header' && 'Progress Labels'}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {activeSection === 'welcome' && content.welcome_section.body}
                  {activeSection === 'prayer' &&
                    `${content.prayer_section.steps.length} prayer cards`}
                  {activeSection === 'devotional' &&
                    `${content.devotional_section.content_cards.length} devotional cards`}
                  {activeSection === 'next' &&
                    `${content.next_steps_section.actions.length} next-step actions`}
                  {activeSection === 'crisis' &&
                    `${content.crisis_section.contacts.length} contact groups`}
                  {activeSection === 'header' &&
                    content.steps.map((step) => step.label).join(' / ')}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
        <p className="text-xs font-medium text-amber-700 dark:text-amber-400 leading-relaxed">
          <strong>Note:</strong> Full-page saving requires the expanded backend
          endpoint. Until that endpoint is deployed, the editor can still load
          current Step 2 content and will fall back to saving only the video
          step.
        </p>
      </div>
    </aside>
  );
}
