import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import App from "./app"

async function render() {
  const configResponse = await axios.get("config.json")
  const config = configResponse.data
  const response = await axios.get(`${config.backend}/recipes`).catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
  } else {
    ReactDOM.render(
      <App data={ response.data } />,
      document.getElementById("app")
    )
  }
}

render()
