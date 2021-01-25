export default ({ id, formData, config, setData, setRecipe }) => {
  const storedRecipes = JSON.parse(sessionStorage.getItem("recipes"))
  const updatedRecipe = {
    ...formData,
    id,
    ingredients: storedRecipes.find(recipe => recipe.id === id).ingredients
  }
  const updatedRecipes = [
    ...storedRecipes.filter(recipe => recipe.id !== id),
    updatedRecipe
  ]
  sessionStorage.setItem("recipes", JSON.stringify(updatedRecipes))
  const updatedRecipeList = updatedRecipes.map(
    recipe =>
      ({ id: recipe.id, name: recipe.name })
  )
  setData({ config, recipes: updatedRecipeList })
  setRecipe(updatedRecipe)
}
