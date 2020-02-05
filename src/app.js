import React, { useState } from "react"
import updateData from "./updateData"
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
          updateData={ () => updateData(setData) }
          backend={ data.config.backend } />
      }
    </div>
  )
}
