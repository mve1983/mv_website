<script setup lang="ts">
const name = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");
const showSignError = ref(false);
const showFieldError = ref(false);
const showEmailError = ref(false);
const showSuccess = ref(false);
const showSendingError = ref(false);

function checkAllFieldsFilled() {
  if (!name.value || !email.value || !subject.value || !message.value) {
    showFieldError.value = true;
    return true;
  }
  return false;
}

function validateEmail() {
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regExp.test(email.value)) {
    showEmailError.value = true;
    return true;
  }
  return false;
}

function checkForbiddenSigns() {
  const checkString = name.value + email.value + subject.value + message.value;
  const forbiddenSignsChecker = checkString.split("").filter((i: string) => {
    return (
      i === "{" || i === "}" || i === "[" || i === "]" || i === "<" || i === ">"
    );
  });

  if (forbiddenSignsChecker.length > 0) {
    showSignError.value = true;
    return true;
  }
  return false;
}

function resetErrors() {
  showSignError.value = false;
  showFieldError.value = false;
  showEmailError.value = false;
  showSendingError.value = false;
}

async function postMail() {
  if (checkAllFieldsFilled()) return;
  if (validateEmail()) return;
  if (checkForbiddenSigns()) return;

  const response = await $fetch("/api/sendMail", {
    body: {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    },
    method: "post",
  });

  name.value = "";
  email.value = "";
  subject.value = "";
  message.value = "";

  response ? (showSuccess.value = true) : (showSendingError.value = true);
}
</script>

<template>
  <h4>Kontaktformular</h4>
  <form @submit.prevent>
    <label for="name">Name:</label>
    <input
      type="text"
      name="name"
      id="name"
      required
      v-model="name"
      @focus="resetErrors()" />
    <label for="email">E-Mail:</label>
    <input
      type="email"
      name="email"
      id="email"
      required
      v-model="email"
      @focus="resetErrors()" />
    <label for="subject">Betreff:</label>
    <input
      type="text"
      name="subject"
      id="subject"
      required
      v-model="subject"
      @focus="resetErrors()" />
    <label for="message">Nachricht:</label>
    <textarea
      name="message"
      id="message"
      rows="10"
      required
      v-model="message"
      @focus="resetErrors()" />
  </form>
  <p>
    Deine Daten werden nur im Vearbeitungsprozess des Sendens benutzt und danach
    gelöscht. <br />
    Es findet keine dauerhafte Speicherung der Daten auf meinem Server oder in
    einer meiner Datenbanken statt. <br />
    Bitte beachte aber das Senden von Daten übers Internet stellt trotz aller
    Vorsichtsmaßnahmen immer ein Risiko dar.
  </p>
  <p v-if="showFieldError" class="sign-error">Bitte fülle alle Felder aus.</p>
  <p v-if="showEmailError" class="sign-error">
    Bitte verwende eine gültige E-Mail.
  </p>
  <p v-if="showSignError" class="sign-error">
    Bitte verwende in den Feldern keine Sonderzeichen wie [], {} oder <>.
  </p>
  <p v-if="showSendingError" class="sign-error">
    Ups, da ist was schief gelaufen, Manuel wurde darüber informiert, bitte
    später nochmal versuchen.
  </p>
  <div>
    <p v-if="showSuccess" class="sign-success">
      Nachricht erfolgreich versendet, ich setze mich schnellstens mir dir in
      Verbindung.
    </p>
    <button v-else @click="postMail()">Nachricht senden</button>
  </div>
</template>

<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

button {
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

.sign-error {
  color: brown;
}
.sign-success {
  color: darkgreen;
}
</style>
