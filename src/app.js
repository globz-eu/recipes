import React, { useState } from "react"
import updateData from "./updateData"
import submitRecipe from "./submitRecipe"
import Recipe from "./components/recipe"
import RecipeForm from "./components/recipeForm"


export default () => {
  const [data, setData] = useState(null)

  React.useEffect(() => {
    updateData(setData)
  }, ["config.json"])

  return (
    <div>
      {
        data && data.recipes.map((datum, i) =>
          <Recipe
            key={ i }
            title={ datum.name }
            servings={ datum.servings }
            instructions={ datum.instructions } />
        )
      }
      {
        data &&
        <RecipeForm
          onSubmit={ formData =>
            submitRecipe(formData, data.config.backend, () => updateData(setData))
          } />
      }
    </div>
  )
}
