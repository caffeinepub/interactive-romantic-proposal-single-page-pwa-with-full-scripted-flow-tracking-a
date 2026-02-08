export interface JourneyNode {
  id: string;
  type: 'question' | 'memory-test' | 'trust' | 'proposal' | 'think-flow' | 'confession';
  section?: string;
  progress?: number;
  question?: string;
  questionHindi?: string;
  subtitle?: string;
  options?: Array<{
    id: string;
    label: string;
    emoji?: string;
    hasTextInput?: boolean;
    placeholder?: string;
  }>;
  allowMultiple?: boolean;
  textArea?: {
    placeholder: string;
    maxLength?: number;
  };
  nextNode?: string | ((answer: any) => string);
  memoryTest?: {
    correctAnswer: string;
    type: 'birthday' | 'kiss-date' | 'meeting-date' | 'selfie-date';
  };
}

export const journeyScript: { nodes: Record<string, JourneyNode> } = {
  nodes: {
    'landing': {
      id: 'landing',
      type: 'question',
      progress: 0,
    },
    
    'section1-q1': {
      id: 'section1-q1',
      type: 'question',
      section: 'warmup',
      progress: 10,
      question: "What's your favorite time of day?",
      options: [
        { id: 'sunrise', label: 'Sunrise (New beginnings)', emoji: '☀️' },
        { id: 'afternoon', label: 'Afternoon (Full of energy)', emoji: '🌤️' },
        { id: 'evening', label: 'Evening (Peaceful & beautiful)', emoji: '🌅' },
        { id: 'night', label: 'Night (Mysterious & calm)', emoji: '🌙' },
        { id: 'other', label: 'None of these? Tell me:', emoji: '✍️', hasTextInput: true, placeholder: 'Your favorite time...' },
      ],
      nextNode: 'section1-q2',
    },
    
    'section1-q2': {
      id: 'section1-q2',
      type: 'question',
      section: 'warmup',
      progress: 12,
      question: "If you could travel anywhere right now, where?",
      options: [
        { id: 'mountains', label: 'Mountains (Peace in heights)', emoji: '🏔️' },
        { id: 'beach', label: 'Beach (Waves & freedom)', emoji: '🏖️' },
        { id: 'cafe', label: 'A cozy café (Warm & intimate)', emoji: '☕' },
        { id: 'unexpected', label: 'Somewhere unexpected (Adventure!)', emoji: '🎭' },
        { id: 'other', label: 'Somewhere else:', emoji: '🌍', hasTextInput: true, placeholder: 'Where does your heart want to go?' },
      ],
      nextNode: 'section1-q3',
    },
    
    'section1-q3': {
      id: 'section1-q3',
      type: 'question',
      section: 'warmup',
      progress: 14,
      question: "What makes you smile without fail?",
      options: [
        { id: 'food', label: 'Good food', emoji: '😊' },
        { id: 'songs', label: 'Favorite songs', emoji: '🎵' },
        { id: 'memories', label: 'Sweet memories', emoji: '💭' },
        { id: 'gestures', label: 'Kind gestures', emoji: '🌟' },
        { id: 'other', label: 'Something else entirely:', emoji: '📝', hasTextInput: true, placeholder: 'What lights up your face?' },
      ],
      nextNode: 'section1-q4',
    },
    
    'section1-q4': {
      id: 'section1-q4',
      type: 'question',
      section: 'warmup',
      progress: 16,
      question: "Do you believe in destiny?",
      options: [
        { id: 'yes', label: 'Yes, everything happens for a reason', emoji: '✨' },
        { id: 'sometimes', label: 'Sometimes, but we create our own path too', emoji: '🤔' },
        { id: 'make-own', label: 'I make my own destiny', emoji: '💪' },
        { id: 'random', label: 'Life is random and beautiful', emoji: '🎲' },
        { id: 'other', label: 'My take on destiny:', emoji: '💬', hasTextInput: true, placeholder: 'What do you believe?' },
      ],
      nextNode: 'section1-q5',
    },
    
    'section1-q5': {
      id: 'section1-q5',
      type: 'question',
      section: 'warmup',
      progress: 18,
      question: "What's your love language?",
      options: [
        { id: 'gifts', label: 'Thoughtful gifts', emoji: '💝' },
        { id: 'time', label: 'Quality time together', emoji: '⏰' },
        { id: 'words', label: 'Words of affirmation', emoji: '💬' },
        { id: 'touch', label: 'Physical touch', emoji: '🤗' },
        { id: 'service', label: 'Acts of service', emoji: '🎁' },
        { id: 'other', label: 'It\'s complicated, let me explain:', emoji: '✏️', hasTextInput: true },
      ],
      nextNode: 'section2-q6',
    },
    
    'section2-q6': {
      id: 'section2-q6',
      type: 'question',
      section: 'deeper',
      progress: 25,
      question: "When was the last time someone made you feel truly special?",
      options: [
        { id: 'birthday', label: 'On my birthday', emoji: '🎂' },
        { id: 'recently', label: 'Recently, actually', emoji: '💫' },
        { id: 'while', label: 'It\'s been a while', emoji: '🕰️' },
        { id: 'dont-remember', label: 'I don\'t remember', emoji: '🤷' },
        { id: 'story', label: 'Let me share the story:', emoji: '📖', hasTextInput: true, placeholder: 'Sometimes the smallest gestures mean everything...' },
      ],
      nextNode: 'section2-q7',
    },
    
    'section2-q7': {
      id: 'section2-q7',
      type: 'question',
      section: 'deeper',
      progress: 27,
      questionHindi: 'क्या तुमने कभी महसूस किया कि कोई तुम्हें बिना कहे समझ रहा है?',
      question: 'Have you ever felt someone understands you without words?',
      options: [
        { id: 'yes-magical', label: 'Yes, and it\'s magical', emoji: '💕' },
        { id: 'sometimes', label: 'Sometimes, with certain people', emoji: '🌸' },
        { id: 'not-really', label: 'Not really, I wish though', emoji: '😔' },
        { id: 'not-sure', label: 'I\'m not sure what that feels like', emoji: '🤨' },
        { id: 'other', label: 'Here\'s what I think:', emoji: '✍️', hasTextInput: true, placeholder: 'Understanding beyond words is...' },
      ],
      nextNode: 'section2-q8',
    },
    
    'section2-q8': {
      id: 'section2-q8',
      type: 'question',
      section: 'deeper',
      progress: 29,
      question: "What does love mean to you?",
      subtitle: "Select all that apply",
      allowMultiple: true,
      options: [
        { id: 'safe', label: 'Feeling safe and at home' },
        { id: 'yourself', label: 'Being yourself completely' },
        { id: 'soul', label: 'Someone who sees your soul' },
        { id: 'partnership', label: 'Partnership through everything' },
        { id: 'butterflies', label: 'Butterflies that never fade' },
        { id: 'silence', label: 'Comfortable silence' },
        { id: 'growing', label: 'Growing together' },
        { id: 'none', label: 'None of these capture it...', hasTextInput: true, placeholder: 'Love is when... Love feels like... Love means...' },
      ],
      nextNode: 'section2-q9',
    },
    
    'section2-q9': {
      id: 'section2-q9',
      type: 'question',
      section: 'deeper',
      progress: 31,
      question: "Complete this: A perfect day for me would be...",
      options: [
        { id: 'adventure', label: 'Adventure and new experiences', emoji: '🌅' },
        { id: 'quiet', label: 'Quiet moments with a good book', emoji: '📚' },
        { id: 'loved-ones', label: 'Surrounded by loved ones', emoji: '👥' },
        { id: 'creating', label: 'Creating something beautiful', emoji: '🎨' },
        { id: 'rest', label: 'Absolute rest and relaxation', emoji: '🛋️' },
        { id: 'surprise', label: 'Surprise me with something unexpected', emoji: '✨' },
        { id: 'describe', label: 'Let me describe my perfect day:', emoji: '📝', hasTextInput: true, placeholder: 'Morning would start with... then... and end with...' },
      ],
      nextNode: 'section2-q10',
    },
    
    'section2-q10': {
      id: 'section2-q10',
      type: 'question',
      section: 'deeper',
      progress: 33,
      question: "What scares you most about love?",
      subtitle: "Optional to answer - can skip",
      options: [
        { id: 'hurt', label: 'Getting hurt again', emoji: '💔' },
        { id: 'losing-self', label: 'Losing myself in it', emoji: '🚪' },
        { id: 'not-lasting', label: 'It not lasting forever', emoji: '⏳' },
        { id: 'not-enough', label: 'Not being enough', emoji: '😰' },
        { id: 'vulnerable', label: 'Being vulnerable', emoji: '🎭' },
        { id: 'rather-not', label: 'I\'d rather not say', emoji: '🙅' },
        { id: 'honest', label: 'My honest fear:', emoji: '💭', hasTextInput: true, placeholder: 'You can be honest... I\'m listening' },
      ],
      nextNode: 'section2-q11',
    },
    
    'section2-q11': {
      id: 'section2-q11',
      type: 'question',
      section: 'deeper',
      progress: 35,
      question: "Have you ever loved someone silently?",
      options: [
        { id: 'yes-never-knew', label: 'Yes, and they never knew', emoji: '💕' },
        { id: 'yes-told', label: 'Yes, but I told them eventually', emoji: '😔' },
        { id: 'not-sure', label: 'I\'m not sure if it was love', emoji: '🤔' },
        { id: 'no-expressive', label: 'No, I\'ve always been expressive', emoji: '🙅' },
        { id: 'experience', label: 'My experience with unspoken feelings:', emoji: '✍️', hasTextInput: true, placeholder: 'Silent love feels like...' },
      ],
      nextNode: 'section2-q12',
    },
    
    'section2-q12': {
      id: 'section2-q12',
      type: 'question',
      section: 'deeper',
      progress: 37,
      question: "What makes someone worthy of your heart?",
      subtitle: "Select all that apply",
      allowMultiple: true,
      options: [
        { id: 'care', label: 'Genuine care and attention' },
        { id: 'laugh', label: 'Making me laugh' },
        { id: 'emotional', label: 'Emotional intelligence' },
        { id: 'honesty', label: 'Honesty, even when it\'s hard' },
        { id: 'effort', label: 'Effort and consistency' },
        { id: 'accepting', label: 'Accepting me fully' },
        { id: 'challenge', label: 'Someone who challenges me to grow' },
        { id: 'write', label: 'Let me write what matters most:', hasTextInput: true },
      ],
      nextNode: 'section3-intro',
    },
    
    'section3-intro': {
      id: 'section3-intro',
      type: 'question',
      section: 'memory',
      progress: 40,
      question: "Now... let's see how well you know me 😊",
      subtitle: "(Don't worry, there are no wrong answers... just honest ones)\nThese memories matter to me... let's see if they matter to you too 💕",
      options: [
        { id: 'ready', label: 'I\'m ready', emoji: '💕' },
      ],
      nextNode: 'section3-q13',
    },
    
    'section3-q13': {
      id: 'section3-q13',
      type: 'memory-test',
      section: 'memory',
      progress: 42,
      question: "Quick one - do you remember my birthday?",
      memoryTest: {
        type: 'birthday',
        correctAnswer: '15/08/2000',
      },
      nextNode: 'section3-q14',
    },
    
    'section3-q14': {
      id: 'section3-q14',
      type: 'memory-test',
      section: 'memory',
      progress: 44,
      questionHindi: "This one's really special to me...",
      question: "Do you remember the date when we first kissed?",
      memoryTest: {
        type: 'kiss-date',
        correctAnswer: '14/02/2023',
      },
      nextNode: 'section3-q15',
    },
    
    'section3-q15': {
      id: 'section3-q15',
      type: 'memory-test',
      section: 'memory',
      progress: 46,
      question: "Do you remember when we first met or talked properly?",
      memoryTest: {
        type: 'meeting-date',
        correctAnswer: '01/09/2022',
      },
      nextNode: 'section3-q16',
    },
    
    'section3-q16': {
      id: 'section3-q16',
      type: 'memory-test',
      section: 'memory',
      progress: 48,
      question: "Remember our selfie together? Do you remember when we took it?",
      memoryTest: {
        type: 'selfie-date',
        correctAnswer: '25/12/2022',
      },
      nextNode: 'section3-q17',
    },
    
    'section3-q17': {
      id: 'section3-q17',
      type: 'question',
      section: 'memory',
      progress: 50,
      question: "Do you remember in Class 8th... when you used to take my notebook to complete your work?",
      options: [
        { id: 'yes-remember', label: 'Yes! I remember doing that', emoji: '💕' },
        { id: 'yes-helped', label: 'Oh yes, you used to help me out', emoji: '😊' },
        { id: 'maybe', label: 'Did I? Maybe...', emoji: '🤔' },
        { id: 'dont-remember', label: 'I don\'t remember this', emoji: '😅' },
        { id: 'remember', label: 'I remember:', emoji: '📝', hasTextInput: true, placeholder: 'Which subject, how often, what I remember...' },
      ],
      nextNode: 'section3-q18',
    },
    
    'section3-q18': {
      id: 'section3-q18',
      type: 'question',
      section: 'memory',
      progress: 52,
      question: "You used to write your name in my notebook... and draw hearts ❤️ Do you remember?",
      options: [
        { id: 'yes-did', label: 'Oh god, yes! I did that', emoji: '🙈' },
        { id: 'yes-hearts', label: 'Yes, I remember drawing those hearts', emoji: '💕' },
        { id: 'think-did', label: 'I think I did that', emoji: '😊' },
        { id: 'embarrassing', label: 'Did I really? That\'s embarrassing', emoji: '😅' },
        { id: 'dont-remember', label: 'I don\'t remember doing that', emoji: '🤔' },
        { id: 'remember', label: 'What I remember:', emoji: '✍️', hasTextInput: true },
      ],
      nextNode: 'section4-intro',
    },
    
    'section4-intro': {
      id: 'section4-intro',
      type: 'question',
      section: 'trust',
      progress: 55,
      question: "Now... some real questions.",
      subtitle: "These might feel heavy, but honesty matters to me.\nYou can be completely honest... I want the truth, not what you think I want to hear 💕",
      options: [
        { id: 'ready', label: 'I\'m ready to be honest', emoji: '💕' },
      ],
      nextNode: 'section4-q22',
    },
    
    'section4-q22': {
      id: 'section4-q22',
      type: 'trust',
      section: 'trust',
      progress: 57,
      question: "Have you ever cheated on me? Even emotionally?",
      subtitle: "Please be honest. Whatever your answer, I'm asking because honesty is more important than anything else.",
      options: [
        { id: 'yes-physically', label: 'Yes, I have (physically)', emoji: '💔' },
        { id: 'yes-emotionally', label: 'Yes, emotionally with someone else', emoji: '😔' },
        { id: 'tempted', label: 'I\'ve been tempted but never acted on it', emoji: '💭' },
        { id: 'no-never', label: 'No, never. I wouldn\'t do that', emoji: '🙅' },
        { id: 'not-sure', label: 'I\'m not sure what counts as cheating', emoji: '🤔' },
        { id: 'explain', label: 'I need to explain:', emoji: '✍️', hasTextInput: true, placeholder: 'Please be completely honest. Tell me everything. I\'d rather know the truth than live with doubt...' },
      ],
      nextNode: 'section4-q23',
    },
    
    'section4-q23': {
      id: 'section4-q23',
      type: 'trust',
      section: 'trust',
      progress: 59,
      question: "Do you think I've ever cheated on you or been unfaithful in any way?",
      options: [
        { id: 'yes-think', label: 'Yes, I think you have', emoji: '😔' },
        { id: 'doubts', label: 'I\'ve had doubts sometimes', emoji: '💭' },
        { id: 'not-sure', label: 'I\'m not sure, I\'ve wondered', emoji: '🤔' },
        { id: 'no-trust', label: 'No, I trust you completely', emoji: '💚' },
        { id: 'never-thought', label: 'The thought never crossed my mind', emoji: '😅' },
        { id: 'thoughts', label: 'I need to tell you about my thoughts:', emoji: '✍️', hasTextInput: true, placeholder: 'What made you doubt, what worried you, what you\'ve been thinking...' },
      ],
      nextNode: 'section4-q24',
    },
    
    'section4-q24': {
      id: 'section4-q24',
      type: 'trust',
      section: 'trust',
      progress: 61,
      question: "Is there anything you've been hiding from me? Anything you've wanted to tell me but couldn't?",
      options: [
        { id: 'yes-things', label: 'Yes, there are some things', emoji: '😔' },
        { id: 'one-thing', label: 'There\'s one thing I haven\'t told you', emoji: '💭' },
        { id: 'small-things', label: 'Nothing major, just small things', emoji: '🤔' },
        { id: 'no-open', label: 'No, I\'ve been open with you', emoji: '💚' },
        { id: 'tell-everything', label: 'I tell you everything', emoji: '🙅' },
        { id: 'want-tell', label: 'I want to tell you:', emoji: '✍️', hasTextInput: true, placeholder: 'This is a safe space. Whatever it is, you can tell me...' },
      ],
      nextNode: 'section4-q25',
    },
    
    'section4-q25': {
      id: 'section4-q25',
      type: 'trust',
      section: 'trust',
      progress: 63,
      question: "Have you ever had feelings for someone else while being with me?",
      subtitle: "Complete honesty, please. Feelings are complex, and I'd rather know the truth.",
      options: [
        { id: 'yes-feelings', label: 'Yes, I developed feelings for someone', emoji: '😔' },
        { id: 'confused', label: 'I\'ve been confused about my feelings', emoji: '💭' },
        { id: 'small-crush', label: 'Maybe a small crush but nothing serious', emoji: '🤔' },
        { id: 'only-you', label: 'No, only you', emoji: '💚' },
        { id: 'never', label: 'Never, not even close', emoji: '🙅' },
        { id: 'explain', label: 'I need to explain this:', emoji: '✍️', hasTextInput: true, placeholder: 'Who, when, what kind of feelings, where things stand now...' },
      ],
      nextNode: 'section5-intro',
    },
    
    'section5-intro': {
      id: 'section5-intro',
      type: 'question',
      section: 'memories',
      progress: 65,
      question: "Thank you for being honest with me. These answers matter more than you know.",
      subtitle: "Trust is everything, and I'm grateful for your truthfulness 💕\nNow... let's get back to our story...",
      options: [
        { id: 'continue', label: 'Let\'s continue', emoji: '💕' },
      ],
      nextNode: 'section5-q26',
    },
    
    'section5-q26': {
      id: 'section5-q26',
      type: 'question',
      section: 'memories',
      progress: 67,
      question: "Remember when I used to sit next to you in class?",
      options: [
        { id: 'yes-clearly', label: 'Yes! I remember it so clearly', emoji: '💕' },
        { id: 'yes-good-times', label: 'Of course, those were really good times', emoji: '😊' },
        { id: 'vaguely', label: 'Vaguely... remind me which class?', emoji: '🤔' },
        { id: 'sat-next', label: 'You sat next to me? When?', emoji: '😅' },
        { id: 'remember', label: 'What I remember about those days:', emoji: '✍️', hasTextInput: true, placeholder: 'The class, what we\'d talk about, what I felt...' },
      ],
      nextNode: 'section5-q27',
    },
    
    'section5-q27': {
      id: 'section5-q27',
      type: 'question',
      section: 'memories',
      progress: 69,
      question: "Did you notice...",
      subtitle: "Select ALL that you noticed",
      allowMultiple: true,
      options: [
        { id: 'laugh', label: 'How I\'d try to make you laugh during boring lectures?' },
        { id: 'notes', label: 'How I\'d always share my notes with you?' },
        { id: 'look', label: 'How I\'d look at you when you weren\'t looking?' },
        { id: 'excuses', label: 'How I\'d find excuses to talk to you?' },
        { id: 'mood', label: 'How my mood changed when you weren\'t there?' },
        { id: 'wait', label: 'How I\'d wait for you before class?' },
        { id: 'didnt-notice', label: 'I didn\'t notice any of this' },
        { id: 'noticed-too', label: 'Actually, I noticed this too:', hasTextInput: true, placeholder: 'What did you see that I thought was hidden?' },
      ],
      nextNode: 'section5-q28',
    },
    
    'section5-q28': {
      id: 'section5-q28',
      type: 'question',
      section: 'memories',
      progress: 71,
      question: "When did you first notice me? Like really NOTICE me as someone special?",
      options: [
        { id: 'first-met', label: 'The very first time we met', emoji: '💫' },
        { id: 'in-class', label: 'In class, when you [specific action]', emoji: '📚' },
        { id: 'conversation', label: 'During a particular conversation we had', emoji: '💬' },
        { id: 'gradual', label: 'It was gradual, no single specific moment', emoji: '😊' },
        { id: 'not-sure', label: 'I\'m not sure I can pinpoint exactly when', emoji: '🤔' },
        { id: 'noticed-when', label: 'I noticed you when:', emoji: '✍️', hasTextInput: true, placeholder: 'There was this moment when... or it happened gradually when...' },
      ],
      nextNode: 'section6-intro',
    },
    
    'section6-intro': {
      id: 'section6-intro',
      type: 'question',
      section: 'love',
      progress: 80,
      question: "Now let's talk about love...",
      subtitle: "The real, deep kind 💕",
      options: [
        { id: 'ready', label: 'I\'m ready', emoji: '💕' },
      ],
      nextNode: 'section6-q36',
    },
    
    'section6-q36': {
      id: 'section6-q36',
      type: 'question',
      section: 'love',
      progress: 82,
      question: "Do you believe in soulmates?",
      options: [
        { id: 'yes-absolutely', label: 'Yes, absolutely. There\'s someone meant for everyone', emoji: '💕' },
        { id: 'want-to', label: 'I want to believe in it', emoji: '🤔' },
        { id: 'maybe', label: 'Maybe, in some form. Twin flames perhaps', emoji: '💭' },
        { id: 'no-choice', label: 'No, I think love is a choice we make', emoji: '🙅' },
        { id: 'belief', label: 'My belief about soulmates:', emoji: '✍️', hasTextInput: true, placeholder: 'What I believe about destined love, meant-to-be, soulmates...' },
      ],
      nextNode: 'section6-q37',
    },
    
    'section6-q37': {
      id: 'section6-q37',
      type: 'question',
      section: 'love',
      progress: 84,
      question: "When you think about your future, what do you see?",
      subtitle: "Select ALL that you see",
      allowMultiple: true,
      options: [
        { id: 'career', label: 'Career success and achievements' },
        { id: 'travel', label: 'Travel and adventures' },
        { id: 'relationship', label: 'A deep, loving relationship' },
        { id: 'family', label: 'Family and kids someday' },
        { id: 'growth', label: 'Personal growth and healing' },
        { id: 'difference', label: 'Making a difference in the world' },
        { id: 'peace', label: 'Peace and happiness' },
        { id: 'freedom', label: 'Freedom and independence' },
        { id: 'see-future', label: 'I see this future:', hasTextInput: true, placeholder: 'In 5 years I see... In 10 years I hope... My dream future includes...' },
      ],
      nextNode: 'section6-q38',
    },
    
    'section6-q38': {
      id: 'section6-q38',
      type: 'question',
      section: 'love',
      progress: 86,
      question: "Do you think about me when we're not together?",
      options: [
        { id: 'quite-often', label: 'Yes, quite often actually', emoji: '💕' },
        { id: 'sometimes', label: 'Sometimes, here and there', emoji: '😊' },
        { id: 'occasionally', label: 'Occasionally, when something reminds me', emoji: '💭' },
        { id: 'rarely', label: 'Rarely, to be honest', emoji: '😅' },
        { id: 'not-really', label: 'Not really', emoji: '🙅' },
        { id: 'honestly', label: 'Honestly:', emoji: '✏️', hasTextInput: true, placeholder: 'How often, when, what I think about, what reminds me of you...' },
      ],
      nextNode: 'section7-intro',
    },
    
    'section7-intro': {
      id: 'section7-intro',
      type: 'confession',
      section: 'buildup',
      progress: 90,
      nextNode: 'proposal',
    },
    
    'proposal': {
      id: 'proposal',
      type: 'proposal',
      section: 'proposal',
      progress: 95,
    },
    
    'think-flow': {
      id: 'think-flow',
      type: 'think-flow',
      section: 'think',
      progress: 95,
    },
  },
};
