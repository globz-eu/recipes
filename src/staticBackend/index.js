import React from "react"
import loadable from "@loadable/component"
import getLatestData from "./getLatestData"
import submit from "./submit"
import Loading from "../components/loading"

const Auth0App = loadable(() => import("../auth0"), {
  fallback: <Loading loading />
})

const App = loadable(() => import("../app"), {
  fallback: <Loading loading />
})

export default props =>
  <>
    {
      props.config.auth0
        ? <Auth0App config={ props.config } getLatestData={ getLatestData } submit={ submit } />
        : <App config={ props.config } getLatestData={ getLatestData } submit={ submit } />
    }
  </>
