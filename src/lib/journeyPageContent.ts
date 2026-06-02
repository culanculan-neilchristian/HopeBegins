export type JourneyStepKey =
  | 'welcome'
  | 'word'
  | 'prayer'
  | 'devotional'
  | 'next-steps';

export type JourneyActionIcon =
  | 'heart'
  | 'mail'
  | 'message-square'
  | 'headphones';

export interface JourneyProgressStep {
  key: JourneyStepKey;
  label: string;
}

export interface JourneyWelcomeSection {
  title: string;
  body: string;
  expectations_title: string;
  expectations: string[];
  button_text: string;
}

export interface JourneyWordSection {
  title: string;
  description: string;
  video_embed_url: string;
  verse_text: string;
  verse_reference: string;
  previous_button_text: string;
  next_button_text: string;
}

export interface JourneyPrayerItem {
  title: string;
  text: string;
}

export interface JourneyPrayerSection {
  title: string;
  description: string;
  steps: JourneyPrayerItem[];
  back_button_text: string;
  next_button_text: string;
  final_button_text: string;
}

export interface JourneyDevotionalSection {
  title: string;
  subtitle: string;
  content_cards: string[];
  verse_text: string;
  verse_reference: string;
  good_news_title: string;
  good_news_body: string;
  reflection_title: string;
  reflection_prompt: string;
  previous_button_text: string;
  next_button_text: string;
}

export interface JourneyNextStepAction {
  title: string;
  href: string;
  icon: JourneyActionIcon;
}

export interface JourneyNextStepsSection {
  title: string;
  description: string;
  actions: JourneyNextStepAction[];
  home_link_text: string;
}

export interface JourneyCrisisLine {
  label: string;
  value: string;
}

export interface JourneyCrisisContact {
  title: string;
  icon?: JourneyActionIcon;
  lines: JourneyCrisisLine[];
}

export interface JourneyCrisisSection {
  heading: string;
  contacts: JourneyCrisisContact[];
}

export interface JourneyPageContent {
  id?: number;
  page_title: string;
  page_subtitle: string;
  steps: JourneyProgressStep[];
  welcome_section: JourneyWelcomeSection;
  word_section: JourneyWordSection;
  prayer_section: JourneyPrayerSection;
  devotional_section: JourneyDevotionalSection;
  next_steps_section: JourneyNextStepsSection;
  crisis_section: JourneyCrisisSection;
  updated_at?: string;
}

export interface LegacyJourneyContent {
  id: number;
  title: string;
  description: string;
  video_embed_url: string;
  updated_at: string;
}

export const JOURNEY_ACTION_ICON_OPTIONS: {
  value: JourneyActionIcon;
  label: string;
}[] = [
  { value: 'heart', label: 'Heart' },
  { value: 'mail', label: 'Mail' },
  { value: 'message-square', label: 'Message' },
  { value: 'headphones', label: 'Headphones' },
];

export const DEFAULT_JOURNEY_PAGE_CONTENT: JourneyPageContent = {
  page_title: 'Hopeful Beginning',
  page_subtitle: 'A journey toward hope, one step at a time.',
  steps: [
    { key: 'welcome', label: 'Welcome' },
    { key: 'word', label: 'A Word for You' },
    { key: 'prayer', label: 'Guided Prayer' },
    { key: 'devotional', label: 'Devotional' },
    { key: 'next-steps', label: 'Next Steps' },
  ],
  welcome_section: {
    title: 'Your Hopeful Beginning',
    body: "It's okay to feel this way. You're not broken - you're here, and that matters.\nWe've prepared a short journey for you. Take it at your own pace.",
    expectations_title: 'What to expect:',
    expectations: [
      'A short video message of encouragement',
      'A guided prayer to help you exhale',
      'A devotional about the true meaning of hope',
      "Gentle next steps when you're ready",
    ],
    button_text: 'Continue',
  },
  word_section: {
    title: 'A Word for You',
    description: 'Before anything else, we want you to hear this.',
    video_embed_url: 'https://www.youtube.com/embed/zHPaFDRZMUo?rel=0',
    verse_text: 'He heals the brokenhearted and binds up their wounds.',
    verse_reference: 'Psalm 147:3',
    previous_button_text: 'Previous',
    next_button_text: 'Continue',
  },
  prayer_section: {
    title: 'Guided Prayer',
    description:
      "Let's take a moment together. Follow each step at your own pace.",
    steps: [
      {
        title: 'Be Still',
        text: "Let's take a moment together. Quiet your thoughts for just a second. You are in a safe place.",
      },
      {
        title: 'Acknowledge',
        text: "Acknowledge the heavy feelings without judgment. It's okay to not be okay right now. Breath in slowly...",
      },
      {
        title: 'Release',
        text: "I release my fear, my pain, and my worry into Your hands. I don't have to carry this alone. You said to cast my burdens on You - so here they are.",
      },
      {
        title: 'Receive',
        text: 'I receive Your peace that passes understanding. I receive Your love that never fails. I receive the hope that You are working all things together for my good.',
      },
      {
        title: 'Rest',
        text: 'I rest in You, Lord. Not because everything is okay, but because You are okay, and You are with me. Amen.',
      },
    ],
    back_button_text: 'Back',
    next_button_text: 'Next',
    final_button_text: 'Continue to Devotional',
  },
  devotional_section: {
    title: 'What is Hope?',
    subtitle: 'A short devotional to anchor your heart.',
    content_cards: [
      "Hope is not the absence of pain - it's the belief that pain is not the final word. It's that quiet voice inside saying, \"There's more ahead for you.\"",
      "The Bible describes hope as an anchor for the soul - firm and secure. Not because life is easy, but because the One who holds tomorrow also holds you today. Even when you can't see it, hope is there.",
    ],
    verse_text: 'We have this hope as an anchor for the soul, firm and secure.',
    verse_reference: 'Hebrews 6:19',
    good_news_title: 'The Good News',
    good_news_body:
      "You are loved - not because of what you've done, but because of who you are. God sent His Son, Jesus, so that you would never have to walk through darkness alone. He meets you right here, right now, exactly as you are.",
    reflection_title: 'Reflect on this:',
    reflection_prompt:
      'What would it look like to believe - even just a little - that tomorrow could be different?',
    previous_button_text: 'Previous',
    next_button_text: 'Continue',
  },
  next_steps_section: {
    title: 'Your Next Step',
    description:
      "You've made it through this journey, and that matters more than you know. Whenever you're ready, here are some ways to keep going.",
    actions: [
      {
        title: 'I Need Someone to Pray for Me',
        href: '/prayers',
        icon: 'heart',
      },
      {
        title: 'Start Daily Hope Drops',
        href: '/daily-hope',
        icon: 'mail',
      },
      {
        title: 'Talk to Hope AI',
        href: '/hope-ai',
        icon: 'message-square',
      },
      {
        title: 'Listen to a HopeCast',
        href: '/hopecasts',
        icon: 'headphones',
      },
    ],
    home_link_text: 'Back to Home',
  },
  crisis_section: {
    heading: "If you're in crisis, please reach out:",
    contacts: [
      {
        title: 'National Center for Mental Health 24/7 Crisis Hotline',
        icon: 'heart',
        lines: [
          { label: 'Landline (nationwide):', value: '1553' },
          { label: 'Mobile:', value: '0917-899-8727 / 0966-351-4518' },
        ],
      },
      {
        title: 'Hopeline Philippines Emotional Crisis Support',
        icon: 'message-square',
        lines: [
          { label: 'Call:', value: '(02) 8804-4673' },
          { label: 'Mobile:', value: '0917-558-4673 / 0918-873-4673' },
        ],
      },
      {
        title: 'In Touch Community Services Crisis Line (24/7)',
        icon: 'heart',
        lines: [
          { label: 'Call:', value: '(02) 8893-7603' },
          { label: 'Mobile:', value: '0917-800-1123' },
        ],
      },
    ],
  },
};

export function getDefaultJourneyPageContent(): JourneyPageContent {
  return structuredClone(DEFAULT_JOURNEY_PAGE_CONTENT);
}

export function legacyToJourneyPageContent(
  legacy: LegacyJourneyContent
): JourneyPageContent {
  return normalizeJourneyPageContent({
    ...getDefaultJourneyPageContent(),
    id: legacy.id,
    word_section: {
      ...DEFAULT_JOURNEY_PAGE_CONTENT.word_section,
      title: legacy.title,
      description: legacy.description,
      video_embed_url: legacy.video_embed_url,
    },
    updated_at: legacy.updated_at,
  });
}

export function normalizeJourneyPageContent(
  content: Partial<JourneyPageContent> | null | undefined
): JourneyPageContent {
  const defaults = getDefaultJourneyPageContent();

  if (!content) {
    return defaults;
  }

  return {
    ...defaults,
    ...content,
    steps: content.steps?.length ? content.steps : defaults.steps,
    welcome_section: {
      ...defaults.welcome_section,
      ...content.welcome_section,
      expectations: content.welcome_section?.expectations?.length
        ? content.welcome_section.expectations
        : defaults.welcome_section.expectations,
    },
    word_section: {
      ...defaults.word_section,
      ...content.word_section,
    },
    prayer_section: {
      ...defaults.prayer_section,
      ...content.prayer_section,
      steps: content.prayer_section?.steps?.length
        ? content.prayer_section.steps
        : defaults.prayer_section.steps,
    },
    devotional_section: {
      ...defaults.devotional_section,
      ...content.devotional_section,
      content_cards: content.devotional_section?.content_cards?.length
        ? content.devotional_section.content_cards
        : defaults.devotional_section.content_cards,
    },
    next_steps_section: {
      ...defaults.next_steps_section,
      ...content.next_steps_section,
      actions: content.next_steps_section?.actions?.length
        ? content.next_steps_section.actions
        : defaults.next_steps_section.actions,
    },
    crisis_section: {
      ...defaults.crisis_section,
      ...content.crisis_section,
      contacts: content.crisis_section?.contacts?.length
        ? content.crisis_section.contacts
        : defaults.crisis_section.contacts,
    },
  };
}
