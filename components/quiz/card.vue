<script setup lang="ts">
import type { ApiQuestionResponse, QuizCategories } from "~/types/global";

const category = ref("");
const difficulty = ref("");
const showCorrect = ref(false);
const showFalse = ref(false);
const showFinal = ref(false);
const questionIsInCheck = ref(false);
const questionLoading = ref(false);
const showErrorNoSelects = ref(false);
const quizStore = useQuizStore();

const emit = defineEmits(["reset"]);

//TODO add error handling
const { data, error } = await useFetch<QuizCategories>(
  "/api/getQuizCategories"
);

const categories = computed(() => data.value);

const categoriesAvaiable = computed(() => {
  return categories.value?.trivia_categories.filter(
    (c) => quizStore.state.value.alreadPlayedQuestionIDs.indexOf(c.id) === -1
  );
});

const fiveQuestionsReached = computed(
  () => quizStore.state.value.alreadPlayedQuestionIDs.length === 5
);

const cardHeadlineFront = computed(() => {
  if (
    !showFalse.value &&
    !showCorrect.value &&
    !showFinal.value &&
    !quizStore.state.value.currentQuestion
  )
    return "Choose category & difficulty";
  if (
    !showFalse.value &&
    !showCorrect.value &&
    !showFinal.value &&
    quizStore.state.value.currentQuestion
  )
    return `Question ${quizStore.state.value.alreadPlayedQuestionIDs.length}`;
});

const cardHeadlineBack = computed(() => {
  if (showFalse.value || showCorrect.value)
    return `Question ${quizStore.state.value.alreadPlayedQuestionIDs.length} result`;
  if (showFinal.value) return "Final result";
});

function requestQuestion() {
  if (!category.value || !difficulty.value) {
    showErrorNoSelects.value = true;
    return;
  }
  const requestedCategory = categories.value?.trivia_categories.filter(
    (c) => category.value === c.name
  )[0];
  const requestDifficulty = difficulty.value;

  //TODO add error handling
  if (!requestedCategory) return;

  quizStore.state.value.alreadPlayedQuestionIDs.push(requestedCategory?.id);
  quizStore.state.value.currentCategoryId = requestedCategory.id;
  quizStore.state.value.currentCategoryName = requestedCategory.name;
  quizStore.state.value.currentDifficulty = requestDifficulty;

  getQuestion();
}

function checkIfCorrect(index: number) {
  questionIsInCheck.value = true;
  if (
    quizStore.state.value.currentQuestion?.allAnswers[index] ===
    quizStore.state.value.currentQuestion?.correctAnswer
  ) {
    let points = 0;
    if (quizStore.state.value.currentDifficulty === "easy") points = 3;
    if (quizStore.state.value.currentDifficulty === "medium") points = 6;
    if (quizStore.state.value.currentDifficulty === "hard") points = 10;
    quizStore.state.value.currentPoints =
      quizStore.state.value.currentPoints + points;
    showCorrect.value = true;
    setTimeout(() => {
      animationAndClearBetweenQuestions();
      showCorrect.value = false;
    }, 5000);
  } else {
    showFalse.value = true;
    setTimeout(() => {
      animationAndClearBetweenQuestions();
      showFalse.value = false;
    }, 5000);
  }
}

function animationAndClearBetweenQuestions() {
  category.value = "";
  difficulty.value = "";
  quizStore.clearBetweenQuestions();
  if (fiveQuestionsReached.value) {
    showFinal.value = true;
    setTimeout(() => {
      emit("reset");
      showFinal.value = false;
    }, 8000);
  }
  if (!fiveQuestionsReached.value) {
    questionIsInCheck.value = false;
  }
}

function resetErrorNoSelects() {
  showErrorNoSelects.value = false;
}

async function getQuestion() {
  questionLoading.value = true;
  const response: ApiQuestionResponse = await $fetch("/api/getQuizQuestion", {
    method: "POST",
    body: quizStore.state.value,
  });
  const question = {
    question: response.results[0].question,
    correctAnswer: response.results[0].correct_answer,
    allAnswers: shuffleArray([
      response.results[0].correct_answer,
      ...response.results[0].incorrect_answers,
    ]),
  };
  setTimeout(() => {
    quizStore.state.value.currentQuestion = question;
    questionLoading.value = false;
  }, 2000);
}
</script>

<template>
  <div class="quiz-card-wrapper">
    <div
      class="quiz-card"
      :class="{ transform: questionIsInCheck, loading: questionLoading }">
      <div class="quiz-card-front" :class="{ load: questionLoading }">
        <h4>{{ cardHeadlineFront }}</h4>
        <form
          @submit.prevent
          v-if="
            categoriesAvaiable &&
            !quizStore.state.value.currentQuestion &&
            !showCorrect &&
            !showFalse &&
            !showFinal
          ">
          <select
            name="category"
            id="category"
            v-model="category"
            @focus="resetErrorNoSelects()">
            <option disabled value="">Select category:</option>
            <option v-for="category in categoriesAvaiable">
              {{ category.name }}
            </option>
          </select>
          <br />
          <select
            name="difficulty"
            id="difficulty"
            v-model="difficulty"
            @focus="resetErrorNoSelects()">
            <option disabled value="">Select difficulty:</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <br />
          <p v-if="showErrorNoSelects" class="no-selection">
            Please choose category and difficulty first.
          </p>
          <button class="card-button" @click="requestQuestion()">
            Question
          </button>
        </form>
        <div
          class="question-wrapper"
          v-if="
            quizStore.state.value.currentQuestion &&
            !showCorrect &&
            !showFalse &&
            !showFinal
          ">
          <div v-html="quizStore.state.value.currentQuestion.question"></div>
          <div
            v-for="(answer, index) in quizStore.state.value.currentQuestion
              .allAnswers">
            <button
              class="card-button"
              @click="checkIfCorrect(index)"
              v-html="answer"></button>
          </div>
        </div>
      </div>
      <div class="quiz-card-back" :class="{ load: questionLoading }">
        <h4>{{ cardHeadlineBack }}</h4>
        <div v-if="showCorrect">
          Correct
          <div>
            You have currently
            {{ quizStore.state.value.currentPoints }} points.
          </div>
        </div>
        <div v-if="showFalse">
          Wrong, the correct answer is:
          {{ quizStore.state.value.currentQuestion?.correctAnswer }}
          <div>
            You have currently
            {{ quizStore.state.value.currentPoints }} points.
          </div>
        </div>
        <div v-if="showFinal">
          Five questions answered, your total score is <span  class="final-score">
            {{ quizStore.state.value.currentPoints }} (possible max is
            50).</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
select {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  height: 3rem;
  border-radius: 0.3rem;
  font-size: clamp(1rem, 1.1rem, 1.4rem);
}

.card-button {
  background-color: var(--main-bg-color);
  border: 0.1rem var(--main-bg-color) solid;
  color: var(--main-text-color);
  font-size: clamp(1rem, 0.9vw, 1.5rem);
}

.card-button:hover,
.card-button:active {
  border: 0.1rem var(--main-bg-color) solid;
  background-color: var(--main-text-color);
  color: var(--main-bg-color);
}

.final-score {
  text-decoration: underline;
}

.no-selection {
  background-color: brown;
  padding: 0.1rem;
  border-radius: 0.3rem;
}

.question-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quiz-card-wrapper {
  margin: 2rem auto;
  width: 290px;
  height: 460px;
  perspective: 1600px;
}

.quiz-card {
  border: 2px var(--main-text-color) solid;
  border-radius: 0.3rem;
  box-shadow: 0 0 15px var(--main-text-color);
  background-color: var(--main-text-color);
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1500ms ease-in-out;
  transform-style: preserve-3d;
}

.quiz-card-front,
.quiz-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: var(--main-text-color);
  color: var(--main-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-align: center;
  padding: 1rem;
}

.quiz-card-front > form {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.quiz-card-front > form > button {
  margin-top: 3rem;
}

.quiz-card-back {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  transform: rotateY(180deg);
}

.load {
  display: none;
}

.loading {
  animation: loading 0.5s infinite linear;
}

.transform {
  transform: rotateY(180deg);
}

@keyframes loading {
  from {
    transform: rotateY(180deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

@media only screen and (min-width: 600px) {
  .quiz-card-wrapper {
    width: clamp(320px, 440px, 800px);
    height: clamp(500px, 600px, 1100px);
  }
}
</style>
