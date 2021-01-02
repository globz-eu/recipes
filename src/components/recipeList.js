import React from "react"
import Title from "./title"

export default ({ data, }) =>
  <>
    {
      data && data.recipes && data.recipes.map((datum, i) =>
        <Title
          key={ i }
          title={ datum.name }
          id={ datum.id } />
      )
    }
  </>
