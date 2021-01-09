export default ({ id, formData, config, setData, setRecipe }) => {
  const storedRecipes = JSON.parse(sessionStorage.getItem("recipes"))
  const updatedRecipe = {
    recipe: { ...formData, id },
    ingredients: storedRecipes.find(recipe => recipe.recipe.id === id).ingredients
  }
  const updatedRecipes = [
    ...storedRecipes.filter(recipe => recipe.recipe.id !== id),
    updatedRecipe
  ]
  sessionStorage.setItem("recipes", JSON.stringify(updatedRecipes))
  const updatedRecipeList = updatedRecipes.map(
    recipe =>
      ({ id: recipe.recipe.id, name: recipe.recipe.name })
  )
  setData({ config, recipes: updatedRecipeList })
  setRecipe(updatedRecipe)
}
