export default defineEventHandler(async (event) => {
  const quizCategories = await $fetch(
    "https://opentdb.com/api_category.php"
  );

 return quizCategories
});
