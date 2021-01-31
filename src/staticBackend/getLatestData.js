import { getFromUrl } from "../requests"

export default async ({ backend, db, accessToken = null }) => {
  const storedRecipes = await db.getRecipes()
  if (storedRecipes.length === 0) {
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
    await db.addRecipes(recipesWithId)
    const recipes = index.data.map(recipe => ({ id: recipe.id, name: recipe.name }))
    return { recipes }
  } else {
    return {
      recipes: storedRecipes.map(recipe => ({ id: recipe.id, name: recipe.name }))
    }
  }
}

export async function getRecipeById({ id, db, accessToken = null }) { // eslint-disable-line no-unused-vars, max-len
  const requestedRecipe = await db.recipes.get(id)
  return requestedRecipe
}
