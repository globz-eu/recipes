import React, { useState, useEffect } from "react"
import Instructions from "./components/instructions"
import Servings from "./components/servings"
import Title from "./components/title"
import { getData } from "./helpers"

export default function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    getData(setData)
  }, ["config.json"])

  return (
    <div>
      {
        data && data.map((datum, i) =>
          <div key={ i }>
            <Title title={ datum.name } />
            <Servings servings={ datum.servings } />
            <Instructions instructions={ datum.instructions } />
          </div>
        )
      }
    </div>
  )
}
