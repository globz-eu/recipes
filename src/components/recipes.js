import React from "react"
import Recipe from "./recipe"

export default ({ data }) =>
  <>
    {
      data && data.recipes && data.recipes.map((datum, i) =>
        <Recipe
          key={ i }
          title={ datum.name }
          servings={ datum.servings }
          instructions={ datum.instructions } />
      )
    }
  </>
