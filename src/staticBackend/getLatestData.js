import { getFromUrl } from "../requests"

export default async (backend, accessToken = null) => {
  if (sessionStorage.getItem("recipes") == null) {
    const index = await getFromUrl(`${backend}/index.json`, accessToken)
    const recipesResponses = await Promise.all(
      index.data.map(
        recipe =>
          getFromUrl(`${backend}/${recipe.path}`, accessToken)
      )
    )
    const recipesWithId = recipesResponses.map(
      (recipe, i) =>
        ({ ...recipe.data, id: index.data[i].id })
    )
    sessionStorage.setItem("recipes", JSON.stringify(recipesWithId))
    const recipes = index.data.map(recipe => ({ id: recipe.id, name: recipe.name }))
    return { recipes }
  } else {
    const storedRecipes = JSON.parse(sessionStorage.getItem("recipes"))
    return {
      recipes: storedRecipes.map(recipe => ({ id: recipe.id, name: recipe.name }))
    }
  }
}

export async function getRecipeById({ id, accessToken = null }) { // eslint-disable-line no-unused-vars, max-len
  const recipes = JSON.parse(sessionStorage.getItem("recipes"))
  const requestedRecipe = recipes.find(recipe => recipe.id === id)
  return requestedRecipe
}
