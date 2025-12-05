// Core idiom structure from bundled JSON
export interface Idiom {
  id: string;
  idiom: string;
  definition: string;
  examples: Array<{ sentence: string; usedIdiom?: string }>;
  wrongExamples: string[]; // Sentences that use the idiom incorrectly
}

// User's metadata about an idiom
export interface IdiomMeta {
  idiomId: string;
  dateSeen: string; // YYYY-MM-DD
  dateLearned?: string;
  quizHistory?: QuizAttempt[];
}

export interface QuizAttempt {
  timestamp: number;
  score: number;
  numQuestions: number;
}

// Daily log entry
export interface DailyLog {
  seen: string[];
  learned: string[];
}

// Per-question feedback for immediate validation
export interface QuestionFeedback {
  answered: boolean;
  submitted: boolean;
  isCorrect: boolean | null;
  selectedAnswer: string | null;
}

// Quiz state for potential restoration
export interface QuizState {
  idiomIds: string[];
  currentIndex: number;
  answers: (string | null)[];
  started: boolean; // true once first answer submitted
  questions?: QuizQuestion[]; // Store generated questions to preserve option order
  feedback?: QuestionFeedback[]; // Track per-question feedback for immediate validation
  isPracticeMode?: boolean; // true if this is a practice quiz (no new idiom to unlock)
}

// Quiz question types
export type QuizQuestionType =
  | 'standard-mcq'           // Idiom → Definition (4 options)
  | 'reverse-mcq'            // Definition → Idiom (4 options)
  | 'cloze'                  // Fill-in-the-blank with example sentence
  | 'usage-identification'   // Pick correct usage from 3-4 sentences
  | 'true-false'            // True/False statement about idiom
  | 'word-order';           // Reorder shuffled words to form idiom

// Base quiz question structure
export interface BaseQuizQuestion {
  type: QuizQuestionType;
  idiomId: string;
  idiom: string;
  correctAnswer: string;
}

// Standard MCQ: Idiom → Definition
export interface StandardMCQQuestion extends BaseQuizQuestion {
  type: 'standard-mcq';
  options: string[]; // 4 definitions
}

// Reverse MCQ: Definition → Idiom
export interface ReverseMCQQuestion extends BaseQuizQuestion {
  type: 'reverse-mcq';
  definition: string;
  options: string[]; // 4 idioms
}

// Cloze: Fill-in-the-blank
export interface ClozeQuestion extends BaseQuizQuestion {
  type: 'cloze';
  sentence: string; // Example sentence with ____ for the idiom
  options?: string[]; // Optional: 4 idiom options for MCQ version
}

// Usage Identification: Pick correct usage
export interface UsageIdentificationQuestion extends BaseQuizQuestion {
  type: 'usage-identification';
  sentences: string[]; // 3-4 sentences, one correct
  correctIndex: number; // Index of correct sentence
}

// True/False
export interface TrueFalseQuestion extends BaseQuizQuestion {
  type: 'true-false';
  statement: string;
  isTrue: boolean;
}

// Word Order: Reorder shuffled words
export interface WordOrderQuestion extends BaseQuizQuestion {
  type: 'word-order';
  shuffledWords: string[];
  correctOrder: string[]; // For validation
}

// Union type for all question types
export type QuizQuestion =
  | StandardMCQQuestion
  | ReverseMCQQuestion
  | ClozeQuestion
  | UsageIdentificationQuestion
  | TrueFalseQuestion
  | WordOrderQuestion;

// Complete persisted state
export interface PersistedState {
  idiomMeta: Record<string, IdiomMeta>;
  daily: Record<string, DailyLog>;
  quizInProgress: QuizState | null;
  nextIdiomIndex: number;
  version: number;
}

// App state for UI
export interface AppState {
  currentDate: string;
  todayIdioms: Idiom[];
  allIdioms: Idiom[];
  learnedIdiomIds: string[];
  seenIdiomIds: string[];
  quizRequired: boolean;
  quizState: QuizState | null;
  quizQuestions: QuizQuestion[];
  quizResult: QuizResult | null;
  newlyUnlockedIdiom: Idiom | null;
}

export interface QuizResult {
  score: number;
  total: number;
  passed: boolean;
}
