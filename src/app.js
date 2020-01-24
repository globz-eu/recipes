import React, { useState } from "react"
import Recipe from "./components/recipe"
import RecipeForm from "./components/recipeForm"
import updateData from "./updateData"

export default () => {
  const [data, setData] = useState(null)

  React.useEffect(() => {
    updateData(setData)
  }, ["config.json"])

  const submit = inputs => console.log(`${inputs.title} ${inputs.servings} ${inputs.instructions}`)

  return (
    <div>
      {
        data && data.map((datum, i) =>
          <Recipe
            key={ i }
            title={ datum.name }
            servings={ datum.servings }
            instructions={ datum.instructions } />
        )
      }
      <RecipeForm submit={ submit } />
    </div>
  )
}
