export default ({ id, formData, config, setData, setRecipe }) => {
  const storedRecipes = JSON.parse(window.sessionStorage.getItem("recipes"))
  const updatedRecipes = [...storedRecipes.filter(recipe => recipe.id !== id), { ...formData, id }]
  window.sessionStorage.setItem("recipes", JSON.stringify(updatedRecipes))
  const updatedRecipeList = updatedRecipes.map(recipe => ({ id: recipe.id, name: recipe.name }))
  setData({ config, recipes: updatedRecipeList })
  setRecipe({ ...formData, id })
}
