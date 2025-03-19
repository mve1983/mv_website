<script setup lang="ts">
import type { QuizApiKey } from "~/types/global";

const inGame = ref(false);
const quizStore = useQuizStore();

// TODO Error handling missing
const { data, error } = await useFetch<QuizApiKey>("/api/getQuizApiToken");

function setupGame() {
  const oldQuizApiKey: string | null = localStorage.getItem("mvQuizKey");
  let oldTime = "";
  const currentTime = Date.now();

  if (oldQuizApiKey) oldTime = oldQuizApiKey.split("_")[1];

  if (!oldQuizApiKey || Number(currentTime) - Number(oldTime) > 18000000) {
    localStorage.setItem("mvQuizKey", `${data.value?.token}_${Date.now()}`);
    quizStore.state.value.quizApiKey = data.value?.token;
  } else {
    quizStore.state.value.quizApiKey = oldQuizApiKey.split("_")[0];
  }

  inGame.value = true;
}

function resetGame() {
  quizStore.resetStore();
  inGame.value = false;
}

onBeforeMount(() => {
  if (quizStore.state.value.currentQuestion) inGame.value = true
})
</script>

<template>
  <AppHeader />
  <div class="page-wrapper">
    <main>
      <h3>Quiz</h3>
      <QuizStart v-if="!inGame" @start="setupGame" />
      <QuizCard v-else @reset="resetGame" />
      <p class="open-trivia-disclaimer">
        Fragen stammen aus der Open Trivia Database.
        <a href="https://opentdb.com/"><strong>https://opentdb.com</strong></a>
      </p>
    </main>
    <AppFooter />
  </div>
</template>

<style lang="css" scoped>
.open-trivia-disclaimer {
  margin-top: 10rem;
}
</style>
