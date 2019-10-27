import React from "react"
import Title from "./components/title"

export default props =>
  <div>
    {
      props.data.map((datum, i) =>
        <Title key={ i } title={ datum.name } />
      )
    }
  </div>
