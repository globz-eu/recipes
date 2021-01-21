import React from "react"
import Title from "./title"

export default ({ data, recipeDetail }) =>
  <>
    {
      data && data.recipes && data.recipes.map((datum, i) =>
        <Title
          key={ i }
          title={ datum.name }
          onClick={ () => recipeDetail(datum.id) } />
      )
    }
  </>
