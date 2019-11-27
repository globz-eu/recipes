import axios from "axios"
import React, { useState, useEffect } from "react"
import Instructions from "./components/instructions"
import Servings from "./components/servings"
import Title from "./components/title"

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

async function getData(setData) {
  const config = await getFromUrl("config.json")
  const response = await getFromUrl(config.backend)
  console.log(response)
  setData(response)
}

async function getFromUrl(url) {
  const response =  await axios.get(url).catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
    return
  }
  return response.data
}
