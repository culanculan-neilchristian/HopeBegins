'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Mail,
  MessageSquare,
  Headphones,
  Compass,
  BookOpen,
  ChevronRight,
  Phone,
  MessageCircle,
  Video,
  Zap,
  Anchor,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Step = 'welcome' | 'word' | 'prayer' | 'devotional' | 'next-steps';

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [prayerSubStep, setPrayerSubStep] = useState(1);

  const steps: { id: Step; label: string; icon: any }[] = [
    { id: 'welcome', label: 'Welcome', icon: Heart },
    { id: 'word', label: 'A Word for You', icon: Video },
    { id: 'prayer', label: 'Guided Prayer', icon: Zap },
    { id: 'devotional', label: 'Devotional', icon: BookOpen },
    { id: 'next-steps', label: 'Next Steps', icon: Compass },
  ];

  const getStepStatus = (stepId: Step) => {
    const stepOrder: Step[] = [
      'welcome',
      'word',
      'prayer',
      'devotional',
      'next-steps',
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  const handleNext = () => {
    if (currentStep === 'prayer' && prayerSubStep < 5) {
      setPrayerSubStep(prayerSubStep + 1);
    } else if (currentStep === 'prayer' && prayerSubStep === 5) {
      setCurrentStep('devotional');
    } else if (currentStep === 'devotional') {
      setCurrentStep('next-steps');
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
      setPrayerSubStep(5);
    } else if (currentStep === 'next-steps') {
      setCurrentStep('devotional');
    } else if (currentStep === 'word') {
      setCurrentStep('welcome');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-zinc-950 pb-20">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        {/* Journey Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6b634d] dark:text-zinc-100 font-poppins tracking-tight mb-2">
            Hopeful Beginning
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            A journey toward hope, one step at a time.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-between items-start mb-16 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-100 dark:bg-zinc-800 -z-10" />
          {steps.map((step) => {
            const status = getStepStatus(step.id);
            return (
              <div
                key={step.id}
                className="flex flex-col items-center gap-2 group relative cursor-pointer flex-1"
                onClick={() => {
                  // Only allow jumping to completed or active steps
                  const stepOrder: Step[] = [
                    'welcome',
                    'word',
                    'prayer',
                    'devotional',
                    'next-steps',
                  ];
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

        {/* Content Area */}
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
              {currentStep === 'prayer' && (
                <PrayerStep
                  subStep={prayerSubStep}
                  onNext={handleNext}
                  onBack={handlePrevious}
                />
              )}
              {currentStep === 'devotional' && (
                <DevotionalStep onNext={handleNext} onBack={handlePrevious} />
              )}
              {currentStep === 'next-steps' && <NextStepsStep />}
              {currentStep === 'welcome' && <WelcomeStep onNext={handleNext} />}
              {currentStep === 'word' && (
                <WordStep onNext={handleNext} onBack={handlePrevious} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PrayerStep({
  subStep,
  onNext,
  onBack,
}: {
  subStep: number;
  onNext: () => void;
  onBack: () => void;
}) {
  const prayerContents = [
    {
      id: 1,
      title: 'Be Still',
      text: "Let's take a moment together. Quiet your thoughts for just a second. You are in a safe place.",
    },
    {
      id: 2,
      title: 'Acknowledge',
      text: "Acknowledge the heavy feelings without judgment. It's okay to not be okay right now. Breath in slowly...",
    },
    {
      id: 3,
      title: 'Release',
      text: "I release my fear, my pain, and my worry into Your hands. I don't have to carry this alone. You said to cast my burdens on You — so here they are.",
    },
    {
      id: 4,
      title: 'Receive',
      text: 'I receive Your peace that passes understanding. I receive Your love that never fails. I receive the hope that You are working all things together for my good.',
    },
    {
      id: 5,
      title: 'Rest',
      text: 'I rest in You, Lord. Not because everything is okay, but because You are okay, and You are with me. Amen.',
    },
  ];

  const current = prayerContents[subStep - 1];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins">
          Guided Prayer
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Let&apos;s take a moment together. Follow each step at your own pace.
        </p>
      </div>

      <div className="flex gap-2 max-w-md mx-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-all duration-500',
              i <= subStep ? 'bg-[#a3b18a]' : 'bg-zinc-100 dark:bg-zinc-800'
            )}
          />
        ))}
      </div>

      <Card className="border-zinc-100 dark:border-zinc-800 shadow-sm bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <CardContent className="p-6 md:p-12 text-center space-y-6 md:space-y-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-[#a3b18a] flex items-center justify-center mx-auto text-base md:text-lg font-bold">
            {current.id}
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
          Back
        </Button>
        <Button
          className="flex-1 py-6 rounded-xl bg-[#a3b18a] hover:bg-[#a3b18a]/90 text-white shadow-lg shadow-[#a3b18a]/20"
          onClick={onNext}
        >
          {subStep === 5 ? 'Continue to Devotional' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

function DevotionalStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8 px-4 sm:px-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins italic">
          What is Hope?
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm italic">
          A short devotional to anchor your heart.
        </p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        <Card className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
          <CardContent className="p-6">
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
              Hope is not the absence of pain &mdash; it&apos;s the belief that
              pain is not the final word. It&apos;s that quiet voice inside
              saying, &quot;There&apos;s more ahead for you.&quot;
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
          <CardContent className="p-6">
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">
              The Bible describes hope as an anchor for the soul &mdash; firm
              and secure. Not because life is easy, but because the One who
              holds tomorrow also holds you today. Even when you can&apos;t see
              it, hope is there.
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-100/50 dark:border-emerald-900/50 shadow-sm bg-emerald-50/30 dark:bg-emerald-900/10">
          <CardContent className="p-8 text-center space-y-2">
            <p className="text-[#6b634d] dark:text-emerald-400 font-bold text-lg italic font-poppins">
              &quot;We have this hope as an anchor for the soul, firm and
              secure.&quot;
            </p>
            <p className="text-[#a3b18a] dark:text-emerald-500/70 font-bold text-sm">
              Hebrews 6:19
            </p>
          </CardContent>
        </Card>

        <div className="pt-4 space-y-4">
          <h4 className="text-[#6b634d] dark:text-zinc-300 font-bold text-lg font-poppins">
            The Good News
          </h4>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            You are loved &mdash; not because of what you&apos;ve done, but
            because of who you are. God sent His Son, Jesus, so that you would
            never have to walk through darkness alone. He meets you right here,
            right now, exactly as you are.
          </p>
        </div>

        <Card className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-zinc-50/50 dark:bg-zinc-900/50 mt-8">
          <CardContent className="p-6 space-y-2">
            <p className="text-[#6b634d] dark:text-zinc-200 font-bold">
              Reflect on this:
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 italic">
              What would it look like to believe &mdash; even just a little
              &mdash; that tomorrow could be different?
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
          Previous
        </Button>
        <Button
          className="flex-1 py-6 rounded-xl bg-[#a3b18a] hover:bg-[#a3b18a]/90 text-white shadow-lg shadow-[#a3b18a]/20 font-bold"
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

function NextStepsStep() {
  const actions = [
    {
      title: 'I Need Someone to Pray for Me',
      href: '/prayers',
      icon: Heart,
    },
    {
      title: 'Start Daily Hope Drops',
      href: '/daily-hope',
      icon: Mail,
    },
    {
      title: 'Talk to Hope AI',
      href: '/hope-ai',
      icon: MessageSquare,
    },
    {
      title: 'Listen to a HopeCast',
      href: '/hopecasts',
      icon: Headphones,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-[#a3b18a]/10 flex items-center justify-center text-[#a3b18a]">
          <Compass className="w-8 h-8" />
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins">
          Your Next Step
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          You&apos;ve made it through this journey, and that matters more than
          you know. Whenever you&apos;re ready, here are some ways to keep
          going.
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto pt-8 px-4 sm:px-0">
        {actions.map((action, idx) => (
          <Link key={idx} href={action.href}>
            <Card className="group border-zinc-100 dark:border-zinc-800/50 hover:border-[#a3b18a]/50 dark:hover:border-[#a3b18a]/30 transition-all duration-300 hover:shadow-md cursor-pointer mb-3">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#a3b18a]/10 dark:bg-emerald-900/20 flex items-center justify-center text-[#a3b18a] group-hover:scale-110 transition-transform">
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="flex-1 font-bold text-sm md:text-base text-zinc-700 dark:text-zinc-200 group-hover:text-[#6b634d] dark:group-hover:text-[#a3b18a] transition-colors">
                  {action.title}
                </span>
                <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-[#a3b18a] transition-colors" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Crisis Footer */}
      <div className="max-w-md mx-auto mt-12 px-4 sm:px-0">
        <Card className="bg-[#fff9f2] dark:bg-orange-900/10 border-[#ffe4c4] dark:border-orange-900/20">
          <CardContent className="p-6 text-center space-y-4">
            <p className="font-bold text-[#8b4513] dark:text-orange-300 text-sm md:text-base text-center">
              If you&apos;re in crisis, please reach out:
            </p>
            <div className="space-y-5 pt-2">
              <div className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1 text-left">
                <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold mb-2">
                  <Phone className="w-4 h-4 text-[#a3b18a]" />
                  <span>
                    National Center for Mental Health 24/7 Crisis Hotline
                  </span>
                </div>
                <p className="flex gap-3 border-b border-orange-900/10 pb-1">
                  <span>Landline (nationwide):</span>
                  <strong>1553</strong>
                </p>
                <p className="flex gap-3 pt-1">
                  <span>Mobile:</span>
                  <strong>0917-899-8727 / 0966-351-4518</strong>
                </p>
              </div>

              <div className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1 text-left">
                <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold mb-2">
                  <MessageCircle className="w-4 h-4 text-[#a3b18a]" />
                  <span>Hopeline Philippines Emotional Crisis Support</span>
                </div>
                <p className="flex gap-3 border-b border-orange-900/10 pb-1">
                  <span>Call:</span>
                  <strong>(02) 8804-4673</strong>
                </p>
                <p className="flex gap-3 pt-1">
                  <span>Mobile:</span>
                  <strong>0917-558-4673 / 0918-873-4673</strong>
                </p>
              </div>

              <div className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1 text-left">
                <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold mb-2">
                  <Heart className="w-4 h-4 text-[#a3b18a]" />
                  <span>In Touch Community Services Crisis Line (24/7)</span>
                </div>
                <p className="flex gap-3 border-b border-orange-900/10 pb-1">
                  <span>Call:</span>
                  <strong>(02) 8893-7603</strong>
                </p>
                <p className="flex gap-3 pt-1">
                  <span>Mobile:</span>
                  <strong>0917-800-1123</strong>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-8">
        <Link
          href="/"
          className="text-sm font-bold text-[#a3b18a] hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  const expectations = [
    'A short video message of encouragement',
    'A guided prayer to help you exhale',
    'A devotional about the true meaning of hope',
    "Gentle next steps when you're ready",
  ];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#a3b18a]/10 flex items-center justify-center text-[#a3b18a]">
          <Anchor className="w-8 h-8 md:w-10 md:h-10" />
        </div>
      </div>

      <div className="text-center space-y-3 md:space-y-4">
        <h2 className="text-2xl min-[400px]:text-3xl md:text-4xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins px-2">
          Your Hopeful Beginning
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed px-4">
          It&apos;s okay to feel this way. You&apos;re not broken &mdash;
          you&apos;re here, and that matters.
          <br />
          We&apos;ve prepared a short journey for you. Take it at your own pace.
        </p>
      </div>

      <Card className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-[#f1f5e9]/50 dark:bg-emerald-900/10 max-w-xl mx-auto mx-4 sm:mx-auto">
        <CardContent className="p-6 md:p-8 space-y-6">
          <h3 className="font-bold text-[#6b634d] dark:text-zinc-300 text-sm md:text-base">
            What to expect:
          </h3>
          <div className="space-y-4">
            {expectations.map((item, idx) => (
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
          Continue
        </Button>
      </div>
    </div>
  );
}

function WordStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-3 md:space-y-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#6b634d] dark:text-zinc-200 font-poppins">
          A Word for You
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg">
          Before anything else, we want you to hear this.
        </p>
      </div>

      {/* Video Placeholder */}
      <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10 border-4 border-white dark:border-zinc-900">
        <div className="aspect-video relative">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/zHPaFDRZMUo?rel=0"
            title="You Are Not Alone"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Verse */}
      <Card className="border-zinc-100/50 dark:border-zinc-800 shadow-sm bg-zinc-50/50 dark:bg-zinc-900/50 max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-2">
          <p className="text-[#6b634d] dark:text-emerald-400 font-bold text-lg italic font-poppins leading-relaxed">
            &quot;He heals the brokenhearted and binds up their wounds.&quot;
          </p>
          <p className="text-[#a3b18a] dark:text-emerald-500/70 font-bold text-sm">
            Psalm 147:3
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-4 px-4 sm:px-0">
        <Button
          variant="outline"
          className="flex-1 py-6 md:py-7 rounded-xl border-zinc-200 text-base md:text-lg font-bold"
          onClick={onBack}
        >
          Previous
        </Button>
        <Button
          className="flex-1 py-6 md:py-7 rounded-xl bg-[#a3b18a] hover:bg-[#a3b18a]/90 text-white text-base md:text-lg font-bold shadow-lg shadow-[#a3b18a]/20"
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
