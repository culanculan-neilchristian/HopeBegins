'use client';

import { Fragment, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Anchor,
  BookOpen,
  ChevronRight,
  Compass,
  Headphones,
  Heart,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Video,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { dailyHopeService } from '@/services/dailyHopeService';
import {
  JourneyPageContent,
  siteSettingsService,
} from '@/services/siteSettingsService';
import {
  getDefaultJourneyPageContent,
  JourneyActionIcon,
  JourneyCrisisSection,
  JourneyDevotionalSection,
  JourneyNextStepsSection,
  JourneyPrayerSection,
  JourneyStepKey,
  JourneyWelcomeSection,
  JourneyWordSection,
} from '@/lib/journeyPageContent';

type Step = JourneyStepKey;

const stepIcons = {
  welcome: Heart,
  word: Video,
  prayer: Zap,
  devotional: BookOpen,
  'next-steps': Compass,
};

const actionIcons = {
  heart: Heart,
  mail: Mail,
  'message-square': MessageSquare,
  headphones: Headphones,
};

const crisisIcons = [Phone, MessageCircle, Heart];

function getActionIcon(icon: JourneyActionIcon) {
  return actionIcons[icon] || Heart;
}

function renderMultilineText(text: string) {
  const lines = text.split('\n');

  return lines.map((line, idx) => (
    <Fragment key={idx}>
      {line}
      {idx < lines.length - 1 && <br />}
    </Fragment>
  ));
}

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [prayerSubStep, setPrayerSubStep] = useState(1);
  const [pageContent, setPageContent] = useState<JourneyPageContent>(
    getDefaultJourneyPageContent
  );

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await siteSettingsService.getJourneyPageContent();
        setPageContent(data);
      } catch (error) {
        console.error('Failed to fetch journey content:', error);
      }
    };

    fetchContent();
  }, []);

  const steps = pageContent.steps.map((step) => ({
    id: step.key,
    label: step.label,
    icon: stepIcons[step.key],
  }));

  const stepOrder = pageContent.steps.map((step) => step.key);
  const prayerStepCount = pageContent.prayer_section.steps.length;

  const getStepStatus = (stepId: Step) => {
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  const handleNext = () => {
    if (currentStep === 'prayer' && prayerSubStep < prayerStepCount) {
      setPrayerSubStep(prayerSubStep + 1);
    } else if (currentStep === 'prayer' && prayerSubStep === prayerStepCount) {
      setCurrentStep('devotional');
    } else if (currentStep === 'devotional') {
      setCurrentStep('next-steps');
      dailyHopeService.completeHopefulBeginning().catch(console.error);
    } else if (currentStep === 'welcome') {
      setCurrentStep('word');
    } else if (currentStep === 'word') {
      setCurrentStep('prayer');
    }
  };

  const handlePrevious = () => {
    if (currentStep === 'prayer' && prayerSubStep > 1) {
      setPrayerSubStep(prayerSubStep - 1);
    } else if (currentStep === 'prayer' && prayerSubStep === 1) {
      setCurrentStep('word');
    } else if (currentStep === 'devotional') {
      setCurrentStep('prayer');
      setPrayerSubStep(prayerStepCount);
    } else if (currentStep === 'next-steps') {
      setCurrentStep('devotional');
    } else if (currentStep === 'word') {
      setCurrentStep('welcome');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6b634d] dark:text-zinc-100 font-poppins tracking-tight mb-2">
            {pageContent.page_title}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            {pageContent.page_subtitle}
          </p>
        </div>

        <div className="flex justify-between items-start mb-16 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800 -z-10" />
          {steps.map((step) => {
            const status = getStepStatus(step.id);

            return (
              <div
                key={step.id}
                className="flex flex-col items-center gap-2 group relative cursor-pointer flex-1"
                onClick={() => {
                  if (
                    stepOrder.indexOf(step.id) <= stepOrder.indexOf(currentStep)
                  ) {
                    setCurrentStep(step.id);
                  }
                }}
              >
                <div
                  className={cn(
                    'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2',
                    status === 'completed'
                      ? 'bg-[#a3b18a] border-[#a3b18a] text-white'
                      : status === 'active'
                        ? 'bg-[#a3b18a] border-[#a3b18a] text-white scale-110 shadow-lg shadow-emerald-900/10'
                        : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-600'
                  )}
                >
                  <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <span
                  className={cn(
                    'text-[7px] min-[400px]:text-[8px] md:text-xs font-bold uppercase tracking-wider font-poppins transition-colors text-center px-0.5 leading-tight',
                    status === 'upcoming'
                      ? 'text-zinc-300 dark:text-zinc-700'
                      : 'text-zinc-500 dark:text-zinc-400'
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={
                currentStep + (currentStep === 'prayer' ? prayerSubStep : '')
              }
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {currentStep === 'welcome' && (
                <WelcomeStep
                  content={pageContent.welcome_section}
                  onNext={handleNext}
                />
              )}
              {currentStep === 'word' && (
                <WordStep
                  content={pageContent.word_section}
                  onBack={handlePrevious}
                  onNext={handleNext}
                />
              )}
              {currentStep === 'prayer' && (
                <PrayerStep
                  content={pageContent.prayer_section}
                  subStep={prayerSubStep}
                  onBack={handlePrevious}
                  onNext={handleNext}
                />
              )}
              {currentStep === 'devotional' && (
                <DevotionalStep
                  content={pageContent.devotional_section}
                  onBack={handlePrevious}
                  onNext={handleNext}
                />
              )}
              {currentStep === 'next-steps' && (
                <NextStepsStep
                  content={pageContent.next_steps_section}
                  crisisContent={pageContent.crisis_section}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function WelcomeStep({
  content,
  onNext,
}: {
  content: JourneyWelcomeSection;
  onNext: () => void;
}) {
  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#a3b18a]/10 flex items-center justify-center text-[#a3b18a]">
          <Anchor className="w-8 h-8 md:w-10 md:h-10" />
        </div>
      </div>

      <div className="text-center space-y-3 md:space-y-4">
        <h2 className="text-2xl min-[400px]:text-3xl md:text-4xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins px-2">
          {content.title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed px-4">
          {renderMultilineText(content.body)}
        </p>
      </div>

      <Card className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-[#f1f5e9]/50 dark:bg-emerald-900/10 max-w-xl mx-auto mx-4 sm:mx-auto">
        <CardContent className="p-6 md:p-8 space-y-6">
          <h3 className="font-bold text-[#6b634d] dark:text-zinc-300 text-sm md:text-base">
            {content.expectations_title}
          </h3>
          <div className="space-y-4">
            {content.expectations.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#a3b18a]/20 text-[#a3b18a] flex items-center justify-center text-xs md:text-sm font-bold">
                  {idx + 1}
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm md:text-base">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-xl mx-auto pt-4 px-4 sm:px-0">
        <Button
          className="w-full py-6 md:py-7 rounded-xl bg-[#a3b18a] hover:bg-[#a3b18a]/90 text-white text-base md:text-lg font-bold shadow-lg shadow-[#a3b18a]/20"
          onClick={onNext}
        >
          {content.button_text}
        </Button>
      </div>
    </div>
  );
}

function WordStep({
  content,
  onNext,
  onBack,
}: {
  content: JourneyWordSection;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-3 md:space-y-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins">
          {content.title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg">
          {content.description}
        </p>
      </div>

      <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white dark:border-zinc-900">
        <div className="aspect-video relative">
          <iframe
            width="100%"
            height="100%"
            src={content.video_embed_url}
            title={content.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>

      <Card className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-zinc-50/50 dark:bg-zinc-900/50 max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-2">
          <p className="text-[#6b634d] dark:text-emerald-400 font-bold text-lg italic font-poppins leading-relaxed">
            &quot;{content.verse_text}&quot;
          </p>
          <p className="text-[#a3b18a] dark:text-emerald-500/70 font-bold text-sm">
            {content.verse_reference}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-4 px-4 sm:px-0">
        <Button
          variant="outline"
          className="flex-1 py-6 md:py-7 rounded-xl border-zinc-200 text-base md:text-lg font-bold"
          onClick={onBack}
        >
          {content.previous_button_text}
        </Button>
        <Button
          className="flex-1 py-6 md:py-7 rounded-xl bg-[#a3b18a] hover:bg-[#a3b18a]/90 text-white text-base md:text-lg font-bold shadow-lg shadow-[#a3b18a]/20"
          onClick={onNext}
        >
          {content.next_button_text}
        </Button>
      </div>
    </div>
  );
}

function PrayerStep({
  content,
  subStep,
  onNext,
  onBack,
}: {
  content: JourneyPrayerSection;
  subStep: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const current = content.steps[subStep - 1] || content.steps[0];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins">
          {content.title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {content.description}
        </p>
      </div>

      <div className="flex gap-2 max-w-md mx-auto">
        {content.steps.map((_, idx) => {
          const stepNumber = idx + 1;

          return (
            <div
              key={stepNumber}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-all duration-500',
                stepNumber <= subStep
                  ? 'bg-[#a3b18a]'
                  : 'bg-zinc-100 dark:bg-zinc-800'
              )}
            />
          );
        })}
      </div>

      <Card className="border-zinc-100 dark:border-zinc-800 shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <CardContent className="p-6 md:p-12 text-center space-y-6 md:space-y-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-[#a3b18a] flex items-center justify-center mx-auto text-base md:text-lg font-bold">
            {subStep}
          </div>
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-[#a3b18a] font-poppins">
              {current.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-base md:text-lg leading-relaxed max-w-lg mx-auto italic">
              &quot;{current.text}&quot;
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 max-w-md mx-auto">
        <Button
          variant="outline"
          className="flex-1 py-6 rounded-xl border-zinc-200"
          onClick={onBack}
        >
          {content.back_button_text}
        </Button>
        <Button
          className="flex-1 py-6 rounded-xl bg-[#a3b18a] hover:bg-[#a3b18a]/90 text-white shadow-lg shadow-[#a3b18a]/20"
          onClick={onNext}
        >
          {subStep === content.steps.length
            ? content.final_button_text
            : content.next_button_text}
        </Button>
      </div>
    </div>
  );
}

function DevotionalStep({
  content,
  onNext,
  onBack,
}: {
  content: JourneyDevotionalSection;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8 px-4 sm:px-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins italic">
          {content.title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm italic">
          {content.subtitle}
        </p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        {content.content_cards.map((card, idx) => (
          <Card
            key={idx}
            className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900"
          >
            <CardContent className="p-6">
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
                {card}
              </p>
            </CardContent>
          </Card>
        ))}

        <Card className="border-emerald-100/50 dark:border-emerald-900/50 shadow-sm bg-emerald-50/30 dark:bg-emerald-900/10">
          <CardContent className="p-8 text-center space-y-2">
            <p className="text-[#6b634d] dark:text-emerald-400 font-bold text-lg italic font-poppins">
              &quot;{content.verse_text}&quot;
            </p>
            <p className="text-[#a3b18a] dark:text-emerald-500/70 font-bold text-sm">
              {content.verse_reference}
            </p>
          </CardContent>
        </Card>

        <div className="pt-4 space-y-4">
          <h4 className="text-[#6b634d] dark:text-zinc-300 font-bold text-lg font-poppins">
            {content.good_news_title}
          </h4>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            {content.good_news_body}
          </p>
        </div>

        <Card className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-zinc-50/50 dark:bg-zinc-900/50 mt-8">
          <CardContent className="p-6 space-y-2">
            <p className="text-[#6b634d] dark:text-zinc-200 font-bold">
              {content.reflection_title}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 italic">
              {content.reflection_prompt}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-8">
        <Button
          variant="outline"
          className="flex-1 py-6 rounded-xl border-zinc-200 font-bold"
          onClick={onBack}
        >
          {content.previous_button_text}
        </Button>
        <Button
          className="flex-1 py-6 rounded-xl bg-[#a3b18a] hover:bg-[#a3b18a]/90 text-white shadow-lg shadow-[#a3b18a]/20 font-bold"
          onClick={onNext}
        >
          {content.next_button_text}
        </Button>
      </div>
    </div>
  );
}

function NextStepsStep({
  content,
  crisisContent,
}: {
  content: JourneyNextStepsSection;
  crisisContent: JourneyCrisisSection;
}) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#a3b18a]/10 flex items-center justify-center text-[#a3b18a]">
          <Compass className="w-8 h-8" />
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins">
          {content.title}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          {content.description}
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto pt-8 px-4 sm:px-0">
        {content.actions.map((action, idx) => {
          const ActionIcon = getActionIcon(action.icon);

          return (
            <Link key={idx} href={action.href}>
              <Card className="group border-zinc-100 dark:border-zinc-800/50 hover:border-[#a3b18a]/50 dark:hover:border-[#a3b18a]/30 transition-all duration-300 hover:shadow-md cursor-pointer mb-3">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#a3b18a]/10 dark:bg-emerald-900/20 flex items-center justify-center text-[#a3b18a] group-hover:scale-110 transition-transform">
                    <ActionIcon className="w-5 h-5" />
                  </div>
                  <span className="flex-1 font-bold text-sm md:text-base text-zinc-700 dark:text-zinc-200 group-hover:text-[#6b634d] dark:group-hover:text-[#a3b18a] transition-colors">
                    {action.title}
                  </span>
                  <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-[#a3b18a] transition-colors" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="max-w-md mx-auto mt-12 px-4 sm:px-0">
        <Card className="bg-[#fff9f2] dark:bg-orange-900/10 border-[#ffe4c4] dark:border-orange-900/20">
          <CardContent className="p-6 text-center space-y-4">
            <p className="font-bold text-[#8b4513] dark:text-orange-300 text-sm md:text-base text-center">
              {crisisContent.heading}
            </p>
            <div className="space-y-5 pt-2">
              {crisisContent.contacts.map((contact, contactIdx) => {
                const ContactIcon =
                  crisisIcons[contactIdx % crisisIcons.length];

                return (
                  <div
                    key={contactIdx}
                    className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1 text-left"
                  >
                    <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold mb-2">
                      <ContactIcon className="w-4 h-4 text-[#a3b18a]" />
                      <span>{contact.title}</span>
                    </div>
                    {contact.lines.map((line, lineIdx) => (
                      <p
                        key={lineIdx}
                        className={cn(
                          'flex gap-3',
                          lineIdx < contact.lines.length - 1
                            ? 'border-b border-orange-900/10 pb-1'
                            : 'pt-1'
                        )}
                      >
                        <span>{line.label}</span>
                        <strong>{line.value}</strong>
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-8">
        <Link
          href="/"
          className="text-sm font-bold text-[#a3b18a] hover:underline"
        >
          {content.home_link_text}
        </Link>
      </div>
    </div>
  );
}
