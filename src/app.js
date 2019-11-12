import React from "react"
import Instructions from "./components/instructions"
import Servings from "./components/servings"
import Title from "./components/title"

export default props =>
  <div>
    {
      props.data.map((datum, i) =>
        <div key={ i }>
          <Title title={ datum.name } />
          <Servings servings={ datum.servings } />
          <Instructions instructions={ datum.instructions } />
        </div>
      )
    }
  </div>
