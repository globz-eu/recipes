import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import processData from "./helpers"

async function render() {
  const configResponse = await axios.get("config.json")
  const config = configResponse.data
  const response = await axios.get(config.backend).catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
  } else {
    console.log(processData(response.data))
    ReactDOM.render(
      <App data={ processData(response.data) } />,
      document.getElementById("app")
    )
  }
}

render()
