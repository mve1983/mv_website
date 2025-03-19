<script setup lang="ts">
import { skills, jobs, educations } from "~/data";
</script>

<template>
  <fieldset>
    <legend><h4>CV</h4></legend>
    <div class="cv-wrapper">
      <div class="fieldset-content">
        <h5>Beruflicher Werdegang</h5>
        <div v-for="job in jobs" class="list">
          <div class="list-item first-list-element">
            <div class="underline">Arbeitgeber:</div>
            <div>{{ job.company }}</div>
          </div>
          <div class="list-item">
            <div class="underline">Stadt:</div>
            <div>{{ job.city }}</div>
          </div>
          <div class="list-item">
            <div class="underline">beschäftigt:</div>
            <div>{{ job.time }}</div>
          </div>
          <div class="list-item">
            <div class="underline">Bezeichnung:</div>
            <div>{{ job.jobname }}</div>
          </div>
          <div v-if="job.project" class="list-item">
            <div class="underline">Projekt:</div>
            <div>
              <a :href="job.project" target="_blank" class="link">{{
                job.project
              }}</a>
            </div>
          </div>
          <div v-if="job.task" class="list-item">
            <div class="underline">Aufgabe:</div>
            <div>{{ job.task }}</div>
          </div>
          <div v-if="job.techstack" class="list-item">
            <div class="underline">Techstack:</div>
            <div>{{ job.techstack }}</div>
          </div>
          <div v-if="job.certificateName" class="list-item">
            <div class="underline">Zeugnis:</div>
            <div>
              <strong
                ><AppPdf
                  :filename="job.certificateName"
                  alternativeName="Anzeigen/Download"
              /></strong>
            </div>
          </div>
        </div>
        <div>
          <h5>Bildungsweg</h5>
          <div v-for="education in educations" class="list">
            <div>
              <div class="list-item first-list-element">
                <div class="underline">Schule:</div>
                <div>{{ education.school }}</div>
              </div>
              <div class="list-item">
                <div class="underline">Stadt:</div>
                <div>{{ education.city }}</div>
              </div>
              <div class="list-item">
                <div class="underline">Dauer:</div>
                <div>{{ education.time }}</div>
              </div>
              <div class="list-item">
                <div class="underline">Kurs:</div>
                <div>{{ education.course }}</div>
              </div>
              <div class="list-item">
                <div class="underline">Bezeichnung:</div>
                <div>{{ education.description }}</div>
              </div>
              <div v-if="education.certificateName" class="list-item">
                <div class="underline">Zertifikat:</div>
                <div>
                  <strong
                    ><AppPdf
                      :filename="education.certificateName"
                      alternativeName="Anzeigen/Download"
                  /></strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h5>Fähigkeiten</h5>
          <p
            v-for="(skill, index) in skills"
            :class="index === 0 ? 'first-list-element' : ''">
            {{ skill }}
          </p>
        </div>
      </div>
    </div>
    <div class="download-cv">
      <strong
        ><AppPdf filename="cv" alternativeName="als pdf anzeigen/downloaden"
      /></strong>
    </div>
  </fieldset>
</template>

<style lang="css" scoped>
fieldset {
  border: 1px var(--main-text-color) solid;
  border-radius: 0.3rem;
  box-shadow: 0 0 15px var(--main-text-color);
}

.cv-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link {
  font-weight: 700;
}

.list {
  display: flex;
  flex-direction: column;
}

.list-item {
  display: flex;
  flex-direction: column;
}

.first-list-element {
  margin-top: 1.5rem;
}

.fieldset-content {
  padding-bottom: 1rem;
}

.download-cv {
  margin-top: 2rem;
}

@media only screen and (min-width: 600px) {
  .cv-wrapper {
    flex-direction: row;
  }

  .list-item {
    display: grid;
    grid-template-columns: clamp(8rem, 10vw, 16rem) 1fr;
  }
}
</style>
