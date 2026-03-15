export interface Message {
  role: 'user' | 'bot' | 'escalation';
  content: string;
}

export const SUGGESTED_REPLIES = [
  "I'm feeling anxious",
  'I need encouragement',
  'I feel lost',
  'Relationship struggles',
  'Share a Bible verse',
  'Pray for me',
  "I'm feeling overwhelmed",
  'I want spiritual guidance',
  "Today's Hope",
];

export const SMART_FOLLOW_UPS = [
  'Would you like to share more about that?',
  'How long have you been feeling this way?',
  'Would you like a Bible verse about this?',
  'Would you like me to pray for you?',
  'Would you like to talk to a real person?',
];

export const DAILY_HOPE =
  "**Today's Hope**\n\nThe beauty of grace is that it doesn't wait for us to be perfect. It meets us exactly where we are.\n\n**Scripture**\n\"But He said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'\" — 2 Corinthians 12:9\n\n**Encouragement**\nTake a deep breath today. You are enough, right now, just as you are. God's strength will carry you through your weakest moments.";

export const ESCALATION_RESPONSE =
  "I'm really glad you told me how you're feeling. You don't have to face this alone. It might help to talk to someone you trust or a trained counselor.";

export const QA_DATABASE = [
  {
    keywords: ['anxious', 'anxiety', 'worry', 'worried', 'overwhelmed'],
    response:
      'I’m really glad you reached out. Anxiety can feel overwhelming, but you don’t have to carry it alone.\n\nSometimes anxiety comes from uncertainty, pressure, or fear about the future. Can you share what has been weighing on your mind lately?\n\nIf you\'d like to share more:\nThank you for sharing that with me. It takes courage to open up.\nOne thing that helps many people is slowing down and remembering that God invites us to bring our worries to Him.\n\n**Bible Encouragement**\n“Cast all your anxiety on Him because He cares for you.” — 1 Peter 5:7\n\n**Reflection Question**\nWhat part of your situation feels the hardest right now?\n\n**Practical Suggestion**\n• Take 3 slow breaths\n• Whisper a short prayer: "Lord, I give this worry to You."',
  },
  {
    keywords: ['lost', 'direction', 'stuck', 'confused'],
    response:
      "Thank you for being honest about that. Many people go through seasons where they feel uncertain about their direction or purpose. Feeling lost doesn’t mean your life has no direction — sometimes it means you're in the middle of discovering it.\n\n**Encouragement**\nEven in seasons of uncertainty, God promises to guide us.\n\n**Bible Verse**\n“Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to Him, and He will make your paths straight.” — Proverbs 3:5-6\n\n**Follow-up**\nWould you like to talk about what area of your life feels most unclear right now?\n• Career\n• Relationships\n• Faith\n• Purpose",
  },
  {
    keywords: ['encouragement', 'discouraged', 'sad', 'down'],
    response:
      "I'm really glad you reached out today. Sometimes we just need a reminder that we're not alone and that things can get better.\n\n**Encouragement Message**\nYou might not see it now, but your story is still unfolding. Many people who later found clarity and purpose first walked through seasons that felt discouraging.\n\n**Scripture**\n“Let us not grow weary of doing good, for at the proper time we will reap a harvest if we do not give up.” — Galatians 6:9\n\n**Question**\nWhat has been discouraging you recently?",
  },
  {
    keywords: ['verse', 'bible', 'scripture'],
    response:
      'Of course. Here is a verse that many people find comforting:\n\n“The Lord is close to the brokenhearted and saves those who are crushed in spirit.” — Psalm 34:18\n\nWould you like a verse about:\n• Anxiety\n• Strength\n• Hope\n• Forgiveness\n• Guidance',
  },
  {
    keywords: ['hopeless', 'give up', 'no hope', 'nothing matters'],
    response:
      "I'm really grateful that you reached out and shared this. Feeling hopeless can be very heavy, but your feelings matter and you're not alone in this moment.\n\n**Gentle Encouragement**\nEven when life feels dark, hope can begin with very small steps — sometimes just talking about what you're going through is one of those steps.\n\n**Scripture**\n“For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.” — Jeremiah 29:11\n\n**Support Option**\nIf you’d like, I can also help you send a prayer request so someone from our community can pray with you.",
  },
  {
    keywords: ['guilty', 'guilt', 'sin', 'mistake', 'bad'],
    response:
      'Thank you for sharing that honestly. Many people carry guilt or regret at some point in their lives. The good news is that faith reminds us that failure does not define us.\n\n**Encouragement**\nGod’s grace is bigger than our mistakes.\n\n**Scripture**\n“If we confess our sins, He is faithful and just and will forgive us our sins and purify us from all unrighteousness.” — 1 John 1:9\n\n**Reflection**\nWould you like to talk about what happened?',
  },
  {
    keywords: [
      'relationship',
      'marriage',
      'dating',
      'friendship',
      'family',
      'struggles',
    ],
    response:
      "Relationships can be one of the most meaningful parts of our lives, but they can also be challenging. I'm glad you're willing to talk about it.\n\n**Question**\nIs this about:\n• Marriage\n• Dating\n• Friendship\n• Family\n\n**Encouragement**\nMany relationships go through seasons of misunderstanding, but honest communication and patience can often help restore connection.\n\n**Scripture**\n“Be completely humble and gentle; be patient, bearing with one another in love.” — Ephesians 4:2",
  },
  {
    keywords: ['pray', 'prayer'],
    response:
      "I'd be honored to pray with you.\n\n**Prayer**\n“Lord, thank You for this person who reached out today. You see their struggles, their worries, and their hopes. I pray that You surround them with Your peace and remind them that they are never alone. Give them strength, wisdom, and hope today. Amen.”\n\n**Next Step**\nIf you'd like, you can also submit a prayer request and someone from our team will personally pray for you.",
  },
  {
    keywords: ['stress', 'stressed'],
    response:
      "Stress can build up when we carry too many worries at once. Sometimes the best first step is simply pausing and acknowledging what you're feeling.\n\n**Suggestion**\nTry this short reset:\n• Take a deep breath\n• Slowly exhale\n• Remind yourself: “I don’t have to solve everything right now.”\n\n**Scripture**\n“Come to me, all you who are weary and burdened, and I will give you rest.” — Matthew 11:28",
  },
  {
    keywords: ['spiritual', 'grow', 'god', 'closer', 'faith', 'guidance'],
    response:
      'That’s a beautiful desire. Spiritual growth often begins with small but consistent steps.\n\nHere are three simple practices many people start with:\n• Daily Prayer – even just a few minutes\n• Reading Scripture – one short passage each day\n• Community – talking with other believers\n\n**Verse**\n“Draw near to God and He will draw near to you.” — James 4:8',
  },
  {
    keywords: ["today's hope", 'today'],
    response: DAILY_HOPE,
  },
  {
    keywords: [
      'suicide',
      'die',
      'kill',
      'end my life',
      "don't want to live",
      'hurt myself',
    ],
    response: 'ESCALATION',
  },
];

export const FALLBACK_RESPONSES = [
  'I hear you. Thank you for sharing that with me.',
  "That sounds really heavy, and I'm sorry you're carrying that.",
  "I want you to know you're not alone in this.",
];
