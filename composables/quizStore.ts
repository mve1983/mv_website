import type { QuizStore } from "~/types/global";

export const useQuizStore = () => {
  const state = useState<QuizStore>("quizStore", () => ({
    quizApiKey: "",
    alreadPlayedQuestionIDs: [],
    currentPoints: 0,
    currentCategoryId: 0,
    currentCategoryName: "",
    currentDifficulty: "",
    currentQuestion: null,
  }));

  function clearBetweenQuestions() {
    state.value.currentCategoryId = 0;
    state.value.currentCategoryName = "";
    state.value.currentDifficulty = "";
    state.value.currentQuestion = null;
  }

  function resetStore() {
    state.value.quizApiKey = "";
    state.value.alreadPlayedQuestionIDs = [];
    state.value.currentPoints = 0;
    state.value.currentCategoryId = 0;
    state.value.currentCategoryName = "";
    state.value.currentDifficulty = "";
    state.value.currentQuestion = null;
  }

  return {
    state,
    clearBetweenQuestions,
    resetStore,
  };
};
