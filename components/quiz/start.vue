<script setup lang="ts"></script>

<template>
  <div>
    Regeln:
    <ul>
      <li>Es müssen 5 Fragen beantwortet werden.</li>
      <li>
        Die Kategorie kann selbst gewählt werden, allerdings jede nur einmal.
      </li>
      <li>Der Schwierigkeitgrad kann selbst festgelegt werden.</li>
      <li>
        Es gibt Punkte für jede korrekt beantwortete Frage:
        <ul>
          <li>leicht: 3 Punkte</li>
          <li>mittel: 6 Punkte</li>
          <li>schwer: 10 Punkte</li>
        </ul>
      </li>
      <li>Das Endresultat ist die Summe aller korrekt beantworteten Fragen.</li>
      <li>Die Fragen werden nach dem Multiple Choice verfahren gestellt.</li>
      <li>
        Das Quiz findet auf Englisch statt, da ich noch keine Translation Api
        eingebaut habe ;)
      </li>
    </ul>
    <button @click="$emit('start')">Start</button>
  </div>
</template>

<style lang="css" scoped></style>
