import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import { Auth0Provider } from "@auth0/auth0-react"
import App from "./app"
import AuthApp from "./authApp"

async function getConfig() {
  const response = await axios.get("config.json").catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
    return null
  }
  return response.data
}

function getElement(config) {
  return config.requireAuthentication
    ? ( // eslint-disable-line no-extra-parens
      <Auth0Provider
        domain={ config.auth0Domain }
        clientId={ config.auth0ClientId }
        redirectUri={ window.location.origin }
        audience={ config.auth0Audience }
        scope="read:recipes update:recipes create:recipes">
        <AuthApp config={ config } />
      </Auth0Provider>
    )
    : <App config={ config } />
}

async function renderApp() {
  const config = await getConfig()

  ReactDOM.render(
    getElement(config),
    document.getElementById("app")
  )
}

renderApp()
