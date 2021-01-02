import { getFromUrl } from "../requests"

export default async (backend, accessToken = null) => {
  const index = await getFromUrl(`${backend}/index.json`, accessToken)
  const recipes = index.data.map(recipe => ({ id: recipe.id, name: recipe.name }))
  return { recipes }
}

export async function getRecipeById(backend, id, accessToken = null) {
  const index = await getFromUrl(`${backend}/index.json`, accessToken)
  const path = index.data.find(recipe => recipe.id === id).path
  const recipe = await getFromUrl(`${backend}/${path}`)
  return recipe.data
}
