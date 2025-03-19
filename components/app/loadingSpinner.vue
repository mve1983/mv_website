<script setup lang="ts"></script>

<template>
  <div class="loader"></div>
</template>

<style lang="css" scoped>
.loader {
  margin: 0 auto;
  border: 0.5rem solid white;
  border-top: 0.5rem solid var(--main-text-color);
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
