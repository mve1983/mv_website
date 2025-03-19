<script setup lang="ts">

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')

</script>

<template>
  <AppHeader />
  <div class="page-wrapper">

    <main>
      <h3>Kontakt</h3>
      <form @submit.prevent >
        <label for="name">Ihr Name:</label>
        <input type="text" name="name" id="name" required v-model="name"/>

        <label for="email">Ihre E-Mail:</label>
        <input type="email" name="email" id="email" required v-model="email"/>

        <label for="subject">Ihr Betreff:</label>
        <input type="text" name="subject" id="subject" required v-model="subject"/>

        <label for="message">Ihre Nachricht:</label>
        <textarea name="message" id="message" rows="10" required v-model="message"></textarea>
      </form>
    </main>
    <AppFooter />
  </div>
</template>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-top: 2rem;
}

input {
  width: 300px;
}

label {
  margin-top: 0.8rem;
}

textarea {
  width: clamp(300px, 60vw, 900px);
  resize: none;
}
</style>
