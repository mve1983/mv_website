export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const data = await $fetch(
    `https://opentdb.com/api.php?amount=1&category=${body.currentCategoryId}&difficulty=${body.currentDifficulty}&type=multiple`
  );

  return data;
});
