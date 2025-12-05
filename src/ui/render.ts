import type { Idiom, QuizQuestion, QuizResult, QuestionFeedback } from '../types/index.js';
import { store } from '../store/index.js';
import { div, span, button, h1, h2, h3, p, ul, li, label, mount, getById, clearElement } from './dom.js';

/**
 * UI Rendering Functions
 * Each function returns an HTMLElement or renders to a container
 */

// ─────────────────────────────────────────────
// Home Screen
// ─────────────────────────────────────────────

export function renderHomeScreen(): void {
  const container = getById<HTMLDivElement>('app');
  if (!container) return;

  const appState = store.getAppState();
  const { todayIdioms, learnedIdiomIds } = appState;

  const content = div({ className: 'home' }, [
    renderHeader(),
    renderTodayIdioms(todayIdioms, learnedIdiomIds),
    renderNextIdiomButton(),
    renderStats(),
  ]);

  mount(container, content);
}

function renderHeader(): HTMLElement {
  const appState = store.getAppState();
  
  return div({ className: 'header' }, [
    h1({ className: 'header__title' }, ['Idiom of the Day']),
    p({ className: 'header__date' }, [formatDisplayDate(appState.currentDate)]),
  ]);
}

function renderTodayIdioms(idioms: Idiom[], learnedIds: string[]): HTMLElement {
  if (idioms.length === 0) {
    return div({ className: 'idioms-list idioms-list--empty' }, [
      p({ textContent: 'No idioms for today yet. Click "Next Idiom" to get started!' }),
    ]);
  }

  const cards = idioms.map((idiom, index) => renderIdiomCard(idiom, index === 0, learnedIds.includes(idiom.id)));

  return div({ className: 'idioms-list' }, cards);
}

function renderIdiomCard(idiom: Idiom, isFirst: boolean, isLearned: boolean): HTMLElement {
  return div({ className: 'idiom-card' }, [
    div({ className: 'idiom-card__header' }, [
      span({ className: 'idiom-card__badge', textContent: 'Idiom of the Day' }),
      isLearned
        ? span({ className: 'idiom-card__status idiom-card__status--learned', textContent: '✓ Learned' })
        : span({ className: 'idiom-card__status idiom-card__status--seen', textContent: 'New' }),
    ]),
    h2({ className: 'idiom-card__idiom', textContent: idiom.idiom }),
    p({ className: 'idiom-card__definition', textContent: idiom.definition }),
    div({ className: 'idiom-card__examples' }, [
      h3({ textContent: 'Examples:' }),
      ul({}, idiom.examples.map((ex) => li({ textContent: ex.sentence }))),
    ]),
  ]);
}

function renderNextIdiomButton(): HTMLElement {
  const hasUnseen = store.hasUnseenIdioms();

  return div({ className: 'actions' }, [
    button(
      {
        className: 'btn btn--primary btn--large',
        textContent: hasUnseen ? 'Next Idiom →' : 'Keep Practicing 🏋️',
        onClick: hasUnseen ? handleNextIdiom : () => {
          store.startPracticeQuiz();
          renderQuizModal();
        },
      }
    ),
  ]);
}

function renderStats(): HTMLElement {
  const appState = store.getAppState();
  
  return div({ className: 'stats' }, [
    div({ className: 'stats__item' }, [
      span({ className: 'stats__value', textContent: String(appState.seenIdiomIds.length) }),
      span({ className: 'stats__label', textContent: 'Seen' }),
    ]),
    div({ className: 'stats__item' }, [
      span({ className: 'stats__value', textContent: String(appState.learnedIdiomIds.length) }),
      span({ className: 'stats__label', textContent: 'Learned' }),
    ]),
  ]);
}

// ─────────────────────────────────────────────
// Quiz Modal
// ─────────────────────────────────────────────

let currentQuizAnswers: (string | null)[] = [];
let currentQuizIndex = 0;
let currentWordOrderSelections: Record<number, number[]> = {}; // Stores word indices, not words

export function renderQuizModal(): void {
  const appState = store.getAppState();
  if (!appState.quizState) return;

  const questions = appState.quizQuestions;
  currentQuizAnswers = [...appState.quizState.answers];
  currentQuizIndex = appState.quizState.currentIndex;
  currentWordOrderSelections = {}; // Reset word order selections

  const isPracticeMode = appState.quizState.isPracticeMode ?? false;
  const headerText = isPracticeMode
    ? 'Practice makes perfect! Review your idioms below.'
    : 'Answer correctly to unlock your next idiom!';

  const overlay = div({ className: 'modal-overlay', id: 'quiz-modal' }, [
    div({ className: 'modal' }, [
      div({ className: 'modal__header' }, [
        h2({ textContent: 'Quick Quiz' }),
        p({ textContent: headerText }),
      ]),
      div({ className: 'modal__content', id: 'quiz-content' }),
      div({ className: 'modal__footer', id: 'quiz-footer' }),
    ]),
  ]);

  document.body.appendChild(overlay);
  renderQuizQuestion(questions, currentQuizIndex);
}

function renderQuizQuestion(questions: QuizQuestion[], index: number): void {
  const content = getById<HTMLDivElement>('quiz-content');
  const footer = getById<HTMLDivElement>('quiz-footer');
  if (!content || !footer) return;

  const question = questions[index];
  const progress = `Question ${index + 1} of ${questions.length}`;

  let questionContent: HTMLElement;

  // Render based on question type
  switch (question.type) {
    case 'standard-mcq':
      questionContent = renderStandardMCQ(question, index, progress);
      break;
    case 'reverse-mcq':
      questionContent = renderReverseMCQ(question, index, progress);
      break;
    case 'cloze':
      questionContent = renderClozeQuestion(question, index, progress);
      break;
    case 'usage-identification':
      questionContent = renderUsageIdentification(question, index, progress);
      break;
    case 'true-false':
      questionContent = renderTrueFalse(question, index, progress);
      break;
    case 'word-order':
      questionContent = renderWordOrder(question, index, progress);
      break;
    default:
      questionContent = div({}, [span({ textContent: 'Unknown question type' })]);
  }

  clearElement(content);
  content.appendChild(questionContent);

  const isLast = index === questions.length - 1;
  const hasAnswer = currentQuizAnswers[index] !== null;

  // Check if this question has been submitted
  const feedback = store.getQuestionFeedback(index);
  const isSubmitted = feedback?.submitted ?? false;

  clearElement(footer);
  footer.appendChild(
    div({ className: 'quiz-footer__buttons' }, [
      isSubmitted
        ? // After submission, show "Next Question" or "View Results" button
          button({
            className: 'btn btn--primary',
            textContent: isLast ? 'View Results' : 'Next Question →',
            onClick: () => {
              if (isLast) {
                submitQuiz(questions);
              } else {
                store.advanceToNextQuestion();
                currentQuizIndex = index + 1;
                renderQuizQuestion(questions, currentQuizIndex);
              }
            },
          })
        : // Before submission, show "Submit Answer" button
          button({
            className: 'btn btn--primary',
            textContent: 'Submit Answer',
            disabled: !hasAnswer,
            onClick: () => {
              if (currentQuizAnswers[index] !== null) {
                store.submitQuizAnswer(index, currentQuizAnswers[index]!);
                renderQuizQuestion(questions, index);
              }
            },
          }),
    ])
  );
}

function renderInlineFeedbackBanner(feedback: QuestionFeedback, question: QuizQuestion): HTMLElement {
  const isCorrect = feedback.isCorrect ?? false;

  return div(
    { className: `feedback-banner ${isCorrect ? 'feedback-banner--correct' : 'feedback-banner--incorrect'}` },
    [
      div({ className: 'feedback-banner__icon' }, [span({ textContent: isCorrect ? '✓' : '✗' })]),
      div({ className: 'feedback-banner__content' }, [
        isCorrect
          ? span({ className: 'feedback-banner__title', textContent: 'Correct! Great job!' })
          : div({}, [
              span({ className: 'feedback-banner__title', textContent: 'Incorrect' }),
              p({
                className: 'feedback-banner__answer',
                textContent: `The correct answer is: ${getCorrectAnswerDisplay(question)}`,
              }),
            ]),
      ]),
    ]
  );
}

function getCorrectAnswerDisplay(question: QuizQuestion): string {
  switch (question.type) {
    case 'standard-mcq':
      return question.correctAnswer;
    case 'reverse-mcq':
      return `"${question.correctAnswer}"`;
    case 'cloze':
      return `"${question.correctAnswer}"`;
    case 'usage-identification':
      return question.correctAnswer;
    case 'true-false':
      return question.correctAnswer.charAt(0).toUpperCase() + question.correctAnswer.slice(1);
    case 'word-order':
      return `"${question.correctAnswer}"`;
  }
}

function renderStandardMCQ(question: QuizQuestion, index: number, progress: string): HTMLElement {
  if (question.type !== 'standard-mcq') return div({});

  const feedback = store.getQuestionFeedback(index);
  const isSubmitted = feedback?.submitted ?? false;
  const appState = store.getAppState();
  const allFeedback = appState.quizState?.feedback;
  const totalQuestions = appState.quizQuestions.length;

  const elements: HTMLElement[] = [
    div({ className: 'quiz-question__progress' }, [
      span({ textContent: progress }),
      renderProgressBar(index + 1, totalQuestions, allFeedback),
    ]),
    h3({ className: 'quiz-question__idiom', textContent: `"${question.idiom}"` }),
    p({ className: 'quiz-question__prompt', textContent: 'What does this idiom mean?' }),
    div(
      { className: 'quiz-question__options' },
      question.options.map((option: string, i: number) =>
        renderQuizOption(option, i, currentQuizAnswers[index] === option, question.correctAnswer, isSubmitted)
      )
    ),
  ];

  // Add feedback banner if submitted
  if (isSubmitted && feedback) {
    elements.push(renderInlineFeedbackBanner(feedback, question));
  }

  return div({ className: 'quiz-question' }, elements);
}

function renderReverseMCQ(question: QuizQuestion, index: number, progress: string): HTMLElement {
  if (question.type !== 'reverse-mcq') return div({});

  const feedback = store.getQuestionFeedback(index);
  const isSubmitted = feedback?.submitted ?? false;
  const appState = store.getAppState();
  const allFeedback = appState.quizState?.feedback;
  const totalQuestions = appState.quizQuestions.length;

  const elements: HTMLElement[] = [
    div({ className: 'quiz-question__progress' }, [
      span({ textContent: progress }),
      renderProgressBar(index + 1, totalQuestions, allFeedback),
    ]),
    p({ className: 'quiz-question__prompt', textContent: 'Which idiom matches this definition?' }),
    p({ className: 'quiz-question__definition', textContent: question.definition }),
    div(
      { className: 'quiz-question__options' },
      question.options.map((option: string, i: number) =>
        renderQuizOption(option, i, currentQuizAnswers[index] === option, question.correctAnswer, isSubmitted)
      )
    ),
  ];

  // Add feedback banner if submitted
  if (isSubmitted && feedback) {
    elements.push(renderInlineFeedbackBanner(feedback, question));
  }

  return div({ className: 'quiz-question' }, elements);
}

function renderClozeQuestion(question: QuizQuestion, index: number, progress: string): HTMLElement {
  if (question.type !== 'cloze') return div({});

  const feedback = store.getQuestionFeedback(index);
  const isSubmitted = feedback?.submitted ?? false;
  const appState = store.getAppState();
  const allFeedback = appState.quizState?.feedback;
  const totalQuestions = appState.quizQuestions.length;

  const elements: HTMLElement[] = [
    div({ className: 'quiz-question__progress' }, [
      span({ textContent: progress }),
      renderProgressBar(index + 1, totalQuestions, allFeedback),
    ]),
    p({ className: 'quiz-question__prompt', textContent: 'Fill in the blank:' }),
    p({ className: 'quiz-question__sentence', textContent: question.sentence }),
    div(
      { className: 'quiz-question__options' },
      question.options!.map((option: string, i: number) =>
        renderQuizOption(option, i, currentQuizAnswers[index] === option, question.correctAnswer, isSubmitted)
      )
    ),
  ];

  // Add feedback banner if submitted
  if (isSubmitted && feedback) {
    elements.push(renderInlineFeedbackBanner(feedback, question));
  }

  return div({ className: 'quiz-question' }, elements);
}

function renderUsageIdentification(question: QuizQuestion, index: number, progress: string): HTMLElement {
  if (question.type !== 'usage-identification') return div({});

  const feedback = store.getQuestionFeedback(index);
  const isSubmitted = feedback?.submitted ?? false;
  const appState = store.getAppState();
  const allFeedback = appState.quizState?.feedback;
  const totalQuestions = appState.quizQuestions.length;

  const elements: HTMLElement[] = [
    div({ className: 'quiz-question__progress' }, [
      span({ textContent: progress }),
      renderProgressBar(index + 1, totalQuestions, allFeedback),
    ]),
    h3({ className: 'quiz-question__idiom', textContent: `"${question.idiom}"` }),
    p({ className: 'quiz-question__prompt', textContent: 'Which sentence uses this idiom correctly?' }),
    div(
      { className: 'quiz-question__options' },
      question.sentences.map((sentence: string, i: number) =>
        renderQuizOption(sentence, i, currentQuizAnswers[index] === sentence, question.correctAnswer, isSubmitted)
      )
    ),
  ];

  // Add feedback banner if submitted
  if (isSubmitted && feedback) {
    elements.push(renderInlineFeedbackBanner(feedback, question));
  }

  return div({ className: 'quiz-question' }, elements);
}

function renderTrueFalse(question: QuizQuestion, index: number, progress: string): HTMLElement {
  if (question.type !== 'true-false') return div({});

  const feedback = store.getQuestionFeedback(index);
  const isSubmitted = feedback?.submitted ?? false;
  const appState = store.getAppState();
  const allFeedback = appState.quizState?.feedback;
  const totalQuestions = appState.quizQuestions.length;

  const elements: HTMLElement[] = [
    div({ className: 'quiz-question__progress' }, [
      span({ textContent: progress }),
      renderProgressBar(index + 1, totalQuestions, allFeedback),
    ]),
    p({ className: 'quiz-question__prompt', textContent: 'True or False?' }),
    p({ className: 'quiz-question__statement', textContent: question.statement }),
    div(
      { className: 'quiz-question__options' },
      [
        renderQuizOption('True', 0, currentQuizAnswers[index] === 'true', question.correctAnswer, isSubmitted),
        renderQuizOption('False', 1, currentQuizAnswers[index] === 'false', question.correctAnswer, isSubmitted),
      ]
    ),
  ];

  // Add feedback banner if submitted
  if (isSubmitted && feedback) {
    elements.push(renderInlineFeedbackBanner(feedback, question));
  }

  return div({ className: 'quiz-question' }, elements);
}

function renderWordOrder(question: QuizQuestion, index: number, progress: string): HTMLElement {
  if (question.type !== 'word-order') return div({});

  const feedback = store.getQuestionFeedback(index);
  const isSubmitted = feedback?.submitted ?? false;
  const appState = store.getAppState();
  const allFeedback = appState.quizState?.feedback;
  const totalQuestions = appState.quizQuestions.length;

  // Initialize selected words array if not exists (stores indices, not words)
  if (!currentWordOrderSelections[index]) {
    currentWordOrderSelections[index] = [];
  }

  const selectedIndices = currentWordOrderSelections[index];
  // Build selected words from indices
  const selectedWords = selectedIndices.map((i: number) => question.shuffledWords[i]);
  // Get available words (not yet selected by index)
  const availableWordsWithIndex = question.shuffledWords
    .map((word: string, i: number) => ({ word, index: i }))
    .filter(({ index: i }) => !selectedIndices.includes(i));

  // Determine if answer is correct for styling
  const isCorrect = feedback?.isCorrect ?? false;

  const elements: HTMLElement[] = [
    div({ className: 'quiz-question__progress' }, [
      span({ textContent: progress }),
      renderProgressBar(index + 1, totalQuestions, allFeedback),
    ]),
    p({ className: 'quiz-question__prompt', textContent: 'Put the words in the correct order:' }),
    div({ className: 'word-order__selected' }, [
      p({ textContent: 'Your answer:' }),
      div(
        { className: 'word-order__chips' },
        selectedWords.length > 0
          ? selectedWords.map((word: string, i: number) => {
              let chipClass = 'word-chip word-chip--selected';
              if (isSubmitted) {
                chipClass += isCorrect ? ' word-chip--correct' : ' word-chip--incorrect';
              }
              return span({
                className: chipClass,
                textContent: word,
                onClick: isSubmitted ? undefined : () => {
                  // Remove by position in selected array
                  currentWordOrderSelections[index].splice(i, 1);
                  // Update current answer - store selected words as comma-separated
                  const words = currentWordOrderSelections[index].map((idx: number) => question.shuffledWords[idx]);
                  currentQuizAnswers[index] = words.join(',');
                  // Re-render current question
                  const appState = store.getAppState();
                  renderQuizQuestion(appState.quizQuestions, index);
                },
              });
            })
          : [span({ className: 'word-order__placeholder', textContent: 'Click words below to build the idiom' })]
      ),
    ]),
  ];

  // Only show available words if not submitted
  if (!isSubmitted) {
    elements.push(
      div({ className: 'word-order__available' }, [
        p({ textContent: 'Available words:' }),
        div(
          { className: 'word-order__chips' },
          availableWordsWithIndex.map(({ word, index: wordIndex }) =>
            span({
              className: 'word-chip word-chip--available',
              textContent: word,
              onClick: () => {
                // Add the word's index to selected indices
                currentWordOrderSelections[index].push(wordIndex);
                // Update current answer - store selected words as comma-separated
                const words = currentWordOrderSelections[index].map((idx: number) => question.shuffledWords[idx]);
                currentQuizAnswers[index] = words.join(',');
                // Re-render current question
                const appState = store.getAppState();
                renderQuizQuestion(appState.quizQuestions, index);
              },
            })
          )
        ),
      ])
    );
  }

  // Add feedback banner if submitted
  if (isSubmitted && feedback) {
    elements.push(renderInlineFeedbackBanner(feedback, question));
  }

  return div({ className: 'quiz-question' }, elements);
}

function renderQuizOption(text: string, index: number, isSelected: boolean, correctAnswer?: string, isSubmitted?: boolean): HTMLElement {
  const optionId = `option-${index}`;

  // For True/False questions, normalize comparison (text is "True"/"False", correctAnswer is "true"/"false")
  const normalizedText = text.toLowerCase();
  const normalizedCorrect = correctAnswer?.toLowerCase();
  const isCorrectOption = correctAnswer && normalizedText === normalizedCorrect;
  const isWrongSelection = isSubmitted && isSelected && !isCorrectOption;

  let className = 'quiz-option';
  if (isSelected) className += ' quiz-option--selected';
  if (isSubmitted && isCorrectOption) className += ' quiz-option--correct';
  if (isWrongSelection) className += ' quiz-option--incorrect';

  return div(
    {
      className,
      onClick: isSubmitted ? undefined : () => selectQuizOption(index, text),
    },
    [
      span({ className: 'quiz-option__marker', textContent: String.fromCharCode(65 + index) }),
      span({ className: 'quiz-option__text', textContent: text }),
    ]
  );
}

function selectQuizOption(optionIndex: number, answer: string): void {
  // For true/false questions, convert to lowercase
  if (answer === 'True') {
    currentQuizAnswers[currentQuizIndex] = 'true';
  } else if (answer === 'False') {
    currentQuizAnswers[currentQuizIndex] = 'false';
  } else {
    currentQuizAnswers[currentQuizIndex] = answer;
  }

  // Re-render options to show selection
  const appState = store.getAppState();
  renderQuizQuestion(appState.quizQuestions, currentQuizIndex);
}

function renderProgressBar(current: number, total: number, feedback?: QuestionFeedback[], isResultsScreen: boolean = false): HTMLElement {
  const segments: HTMLElement[] = [];

  // Create segments for ALL questions (total)
  for (let i = 0; i < total; i++) {
    const questionFeedback = feedback?.[i];
    let segmentClass = 'progress-bar__segment';

    if (questionFeedback?.submitted) {
      segmentClass += questionFeedback.isCorrect
        ? ' progress-bar__segment--correct'
        : ' progress-bar__segment--incorrect';
    }

    segments.push(
      div({
        className: segmentClass,
        style: `width: ${100 / total}%`,
      })
    );
  }

  const barClass = isResultsScreen ? 'progress-bar progress-bar--results' : 'progress-bar';

  return div({ className: barClass }, segments);
}

function submitQuiz(questions: QuizQuestion[]): void {
  // Submit final answer
  if (currentQuizAnswers[currentQuizIndex] !== null) {
    store.submitQuizAnswer(currentQuizIndex, currentQuizAnswers[currentQuizIndex]!);
  }
  
  const appState = store.getAppState();
  const feedback = appState.quizState?.feedback;
  const result = store.completeQuiz();
  renderQuizResult(result, questions, feedback);
}

function renderQuizResult(result: QuizResult & { newIdiom: Idiom | null }, questions: QuizQuestion[], feedback?: QuestionFeedback[]): void {
  const content = getById<HTMLDivElement>('quiz-content');
  const footer = getById<HTMLDivElement>('quiz-footer');
  if (!content || !footer) return;

  const percentage = Math.round((result.score / result.total) * 100);
  const emoji = result.passed ? '🎉' : '😅';
  
  let message: string;
  if (result.passed) {
    message = result.newIdiom
      ? 'Great job! You\'ve unlocked a new idiom!'
      : 'Excellent! You\'ve mastered everything for now. Keep practicing to stay sharp!';
  } else {
    message = 'Almost there! Let\'s try again.';
  }

  const resultEl = div({ className: 'quiz-result' }, [
    // Add progress bar at the top of results
    div({ className: 'quiz-result__progress' }, [
      renderProgressBar(result.total, result.total, feedback, true)
    ]),
    div({ className: 'quiz-result__emoji', textContent: emoji }),
    h2({
      className: `quiz-result__score ${result.passed ? 'quiz-result__score--pass' : 'quiz-result__score--fail'}`,
      textContent: `${result.score} / ${result.total}`,
    }),
    p({ className: 'quiz-result__percentage', textContent: `${percentage}%` }),
    p({ className: 'quiz-result__message', textContent: message }),
    result.passed && result.newIdiom
      ? renderNewIdiomPreview(result.newIdiom)
      : null,
  ].filter(Boolean) as HTMLElement[]);

  clearElement(content);
  content.appendChild(resultEl);

  clearElement(footer);
  footer.appendChild(
    result.passed
      ? button({
          className: 'btn btn--primary',
          textContent: 'Continue',
          onClick: closeQuizModal,
        })
      : button({
          className: 'btn btn--primary',
          textContent: 'Try Again',
          onClick: () => {
            // Remove old modal before creating new one
            const modal = getById<HTMLDivElement>('quiz-modal');
            if (modal) {
              modal.remove();
            }
            currentQuizAnswers = [];
            currentQuizIndex = 0;
            currentWordOrderSelections = {};
            renderQuizModal();
          },
        })
  );
}

function renderNewIdiomPreview(idiom: Idiom): HTMLElement {
  return div({ className: 'new-idiom-preview' }, [
    h3({ textContent: 'New Idiom Unlocked!' }),
    p({ className: 'new-idiom-preview__idiom', textContent: idiom.idiom }),
  ]);
}

function closeQuizModal(): void {
  const modal = getById<HTMLDivElement>('quiz-modal');
  if (modal) {
    modal.remove();
  }
  renderHomeScreen();
}

// ─────────────────────────────────────────────
// Event Handlers
// ─────────────────────────────────────────────

function handleNextIdiom(): void {
  const result = store.requestNextIdiom();
  
  if (result.needsQuiz) {
    renderQuizModal();
  } else {
    renderHomeScreen();
  }
}

// ─────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────

function formatDisplayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ─────────────────────────────────────────────
// Initialize
// ─────────────────────────────────────────────

export function initializeUI(): void {
  store.subscribe(() => {
    // Only re-render home if no quiz modal is open
    if (!getById('quiz-modal')) {
      renderHomeScreen();
    }
  });
  
  renderHomeScreen();
}
