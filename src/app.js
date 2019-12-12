import React, { useState } from "react"
import InstructionsBlock from "./components/instructionsBlock"
import Servings from "./components/servings"
import Title from "./components/title"
import updateData from "./updateData"

export default function App() {
  const [data, setData] = useState(null)

  React.useEffect(() => {
    updateData(setData)
  }, ["config.json"])

  return (
    <div>
      {
        data && data.map((datum, i) =>
          <div key={ i }>
            <Title title={ datum.name } />
            <Servings servings={ datum.servings } />
            <InstructionsBlock instructions={ datum.instructions } />
          </div>
        )
      }
    </div>
  )
}
