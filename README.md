# Idiom of the Day

A web app that helps you learn one new idiom per day with spaced-repetition quizzes.

## Features

- **Daily Idiom**: Automatically shows a new idiom each day
- **Quizzes**: Multiple-choice quizzes to reinforce learning (70% to pass)
- **Progress Tracking**: Tracks seen vs learned idioms
- **Offline-First**: All data persisted in localStorage
- **Clean Architecture**: Designed for easy migration to frameworks

## Tech Stack

- TypeScript (compiled to ES modules)
- Vanilla HTML + CSS
- No build tools required beyond TypeScript compiler

## Quick Start

1. Serve the directory with any static file server:
   ```bash
   npx serve .
   # or
   python -m http.server 8000
   ```

2. Open `http://localhost:3000` (or the port shown)

## Architecture

```
src/
├── types/          # TypeScript interfaces
├── store/          # State management (localStorage abstraction)
├── ui/             # DOM rendering functions
├── utils/          # Pure utility functions
└── main.ts         # Entry point

data/
└── idioms.json     # Idiom dataset

dist/               # Compiled JavaScript (ES modules)
```

### Key Design Decisions

- **Store Pattern**: Centralized state with subscription for reactivity
- **Thin UI**: Rendering functions that can easily port to React/Vue/Svelte
- **Storage Abstraction**: Ready for future cloud sync
- **Date Logic**: Handles clock manipulation gracefully

## How It Works

1. **First Visit**: Shows first idiom, user marks it as "learned"
2. **Next Idiom**: 
   - If no learned idioms yet → shows next idiom free
   - If learned idioms exist → requires passing a quiz first
3. **Quiz Rules**:
   - 3-5 questions from learned idioms (older first)
   - 70% required to pass
   - Unlimited retries

## Data Model

All user data stored in `localStorage` under key `idiom_app_data`:

```typescript
{
  idiomMeta: Record<string, IdiomMeta>,  // Per-idiom tracking
  daily: Record<string, DailyLog>,        // Daily seen/learned logs
  quizInProgress: QuizState | null,       // Current quiz state
  nextIdiomIndex: number,                 // Next idiom to show
  version: number                         // For future migrations
}
```

## Future Expandability

The architecture supports:
- Additional quiz types (flashcards, typed answers)
- Cloud sync (replace storage layer)
- User proficiency modeling (quiz history already tracked)
- History browsing (daily logs preserved)
- Search & filters (full idiom data accessible)

## License

MIT
