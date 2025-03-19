<script setup lang="ts">
import { files } from "~/data";

let dialogCloseEventListener: any = null;

const props = defineProps<{
  filename: string;
  alternativeName?: string;
}>();

function openPdf() {
  const path = findMatchingPdfPath(props.filename.toLowerCase());
  if (!path) return null;

  if (isSmallDisplay()) {
    const a = document.createElement("a");
    a.setAttribute("href", path);
    a.setAttribute(
      "download",
      `${props.filename.toLowerCase()}_ManuelVerweyen.pdf`
    );
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    const dialog = document.querySelector("dialog");
    const pdfFrameWrapper = document.querySelector("dialog")?.firstChild;
    dialog?.showModal();

    const pdfFrame = document.createElement("iframe");
    pdfFrame.id = "pdfFrame";
    pdfFrame.src = path;
    pdfFrame.classList.add("pdf-frame");
    pdfFrameWrapper?.appendChild(pdfFrame);

    document.body.classList.add("no-scroll");
  }
}

function findMatchingPdfPath(name: string): null | string {
  const filePath = Object.entries(files).filter((f) => f[0] === name)[0][1];
  if (!filePath) return null;
  return filePath;
}

function closePdf() {
  const dialog = document.querySelector("dialog");
  const oldPdf = document.getElementById("pdfFrame");
  oldPdf && oldPdf.remove();
  dialog?.close();
  document.body.classList.remove("no-scroll");
}

onMounted(() => {
  const dialog = document.querySelector("dialog");

  dialogCloseEventListener = dialog?.addEventListener("click", (e) => {
    const dialogDims = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDims.left ||
      e.clientX < dialogDims.right ||
      e.clientY < dialogDims.top ||
      e.clientY < dialogDims.bottom
    ) {
      closePdf();
    }
  });
});

onUnmounted(() => {
  const dialog = document.querySelector("dialog");
  dialog?.removeEventListener("click", dialogCloseEventListener);
});
</script>

<template>
  <span class="pdf-link" @click="openPdf()" tabindex="0" role="link">{{
    alternativeName ? alternativeName : filename
  }}</span>
  <dialog>
    <div class="pdf-frame-wrapper"></div>
  </dialog>
</template>

<style lang="css" scoped>
dialog {
  border: none;
  background-color: var(--main-text-color);
  border-radius: 0.3rem;
  margin: auto;
  padding: 0;
  width: 80vw;
  height: 80vh;
}

dialog::backdrop {
  background-color: hsl(204.4, 42.4%, 27.3%, 0.7);
}
</style>
