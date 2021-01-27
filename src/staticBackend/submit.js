export default async ({ id, db, formData, config, setData, setRecipe }) => {
  const storedRecipes = await db.getRecipes()
  const updatedRecipe = {
    ...formData,
    id,
    ingredients: storedRecipes.find(recipe => recipe.id === id).ingredients
  }
  const updatedRecipes = [
    ...storedRecipes.filter(recipe => recipe.id !== id),
    updatedRecipe
  ]
  db.recipes.put(updatedRecipe)
  const updatedRecipeList = updatedRecipes.map(
    recipe =>
      ({ id: recipe.id, name: recipe.name })
  )
  setData({ config, recipes: updatedRecipeList })
  setRecipe(updatedRecipe)
}
