import { getFromUrl } from "../requests"

export default async (backend, accessToken = null) => {
  if (window.sessionStorage.getItem("recipes") == null) {
    console.log("getting fresh data")
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
    window.sessionStorage.setItem("recipes", JSON.stringify(recipesWithId))
    const recipes = index.data.map(recipe => ({ id: recipe.id, name: recipe.name }))
    return { recipes }
  } else {
    const storedRecipes = JSON.parse(window.sessionStorage.getItem("recipes"))
    return { recipes: storedRecipes.map(recipe => ({ id: recipe.id, name: recipe.name })) }
  }
}

export async function getRecipeById(backend, id, accessToken = null) {
  if (window.sessionStorage.getItem("recipes") == null) {
    const index = await getFromUrl(`${backend}/index.json`, accessToken)
    const path = index.data.find(recipe => recipe.id === id).path
    const recipe = await getFromUrl(`${backend}/${path}`)
    return recipe.data
  } else {
    const recipes = JSON.parse(window.sessionStorage.getItem("recipes"))
    const requestedRecipe = recipes.find(recipe => recipe.id === id)
    return requestedRecipe
  }
}
