export interface Message {
  role: 'user' | 'bot';
  content: string;
}

export const SUGGESTED_REPLIES = [
  "I'm feeling anxious",
  'I need encouragement',
  'I feel lost',
  'Share a Bible verse',
];

export const HOPE_RESPONSES: string[] = [
  'I\'m so glad you reached out. Sometimes the bravest thing we can do is say "I need help."\n\n"Weeping may stay for the night, but rejoicing comes in the morning." — Psalm 30:5\n\nWhat would feel most helpful right now — encouragement, a prayer, or just someone to listen?',
  "That sounds really heavy, and I'm sorry you're carrying that.\n\nYou are deeply loved. You are seen. And you matter more than you know.\n\n\"See what great love the Father has lavished on us, that we should be called children of God!\" — 1 John 3:1\n\nI'm here for as long as you need.",
  'I hear you, and I want you to know — you\'re not alone in this. God sees you right where you are.\n\n"The Lord is close to the brokenhearted and saves those who are crushed in spirit." — Psalm 34:18\n\nWould you like to tell me more about what you\'re going through?',
];
