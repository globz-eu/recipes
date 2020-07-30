import React, { useState } from "react"
import getLatestData from "./getLatestData"
import { submitStatic, submit } from "./submitRecipe"
import Recipe from "./components/recipe"
import RecipeForm from "./components/recipeForm"


export default () => {
  const [data, setData] = useState(null)

  React.useEffect(() => {
    async function updateData() {
      const updatedData = await getLatestData()
      console.log(updatedData)
      setData(updatedData)
    }
    updateData()
  }, ["config.json"])


  return (
    <div>
      {
        !data && <div>Loading ...</div>
      }
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
          onSubmit={ getSubmit(data.config, data.recipes, setData) } />
      }
    </div>
  )
}

function getSubmit(config, recipes, setData) {
  if (config.backend === "static") {
    return formData => submitStatic(formData, config, recipes, setData)
  } else {
    return formData => submit(formData, config.backend, setData)
  }
}
