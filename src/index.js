import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import { BACKEND } from "./constants"

async function render() {
  const response = await axios.get(`${BACKEND}/recipes`).catch(error => new Error(error))
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
