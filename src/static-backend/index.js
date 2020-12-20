import React from "react"
import ReactDOM from "react-dom"
import { Auth0Provider } from "@auth0/auth0-react"
import App from "../app"
import Auth0App from "../auth0App"
import getLatestData from "./getLatestData"
import submit from "./submit"
import getConfig from "../getConfig"

async function renderApp() {
  const config = await getConfig()

  ReactDOM.render(
    config.auth0
      ? ( // eslint-disable-line no-extra-parens
        <Auth0Provider
          domain={ config.auth0Domain }
          clientId={ config.auth0ClientId }
          redirectUri={ window.location.origin }
          audience={ config.auth0Audience }
          scope="read:recipes update:recipes create:recipes">
          <Auth0App config={ config } getLatestData={ getLatestData } submit={ submit } />
        </Auth0Provider>
      )
      : <App config={ config } getLatestData={ getLatestData } submit={ submit } />,
    document.getElementById("app")
  )
}

renderApp()
