export default defineEventHandler(async (event) => {
  const apiToken = await $fetch(
    "https://opentdb.com/api_token.php?command=request"
  );

  return apiToken;
});
