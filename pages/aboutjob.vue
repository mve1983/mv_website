<script setup lang="ts"></script>

<template>
  <AppHeader />
  <div class="page-wrapper">
    <main>
      <h3>Berufliches</h3>
      <section>
        <article>
          <JobIntroduction />
        </article>
        <article class="cv">
          <JobCv />
        </article>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<style lang="css" scoped>
article {
  margin-top: 1rem;
}

.cv {
  width: 90%;
  margin: 3rem auto;
}
</style>
