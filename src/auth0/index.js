import React from "react"
import { Auth0Provider } from "@auth0/auth0-react"
import App from "./app"

export default props =>
  <Auth0Provider
    domain={ props.config.auth0Domain }
    clientId={ props.config.auth0ClientId }
    redirectUri={ window.location.origin }
    audience={ props.config.auth0Audience }
    scope="read:recipes update:recipes create:recipes">
    <App config={ props.config } getLatestData={ props.getLatestData } submit={ props.submit } />
  </Auth0Provider>
