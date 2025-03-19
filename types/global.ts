export type QuizApiKey = {
  response_code: number;
  response_message: string;
  token: string;
};

export type QuizStore = {
  quizApiKey: string | undefined;
  alreadPlayedQuestionIDs: number[];
  currentPoints: number;
  currentCategoryId: number;
  currentCategoryName: string;
  currentDifficulty: string;
  currentQuestion: {
    question: string;
    correctAnswer: string;
    allAnswers: string[];
  } | null;
};

export type QuizCategory = {
  id: number;
  name: string;
};

export type QuizCategories = {
  trivia_categories: QuizCategory[];
};

export type ApiQuestionResponse = {
  response_code: number;
  results: [
    {
      type: string;
      difficulty: string;
      category: string;
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }
  ];
};
