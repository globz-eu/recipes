import React from "react"
import loadable from "@loadable/component"
import getLatestData, { getRecipeById } from "./getLatestData"
import submit from "./submit"
import Loading from "../components/loading"

const Auth0App = loadable(() => import("../auth0"), {
  fallback: <Loading loading />
})

const App = loadable(() => import("../app"), {
  fallback: <Loading loading />
})

export default props => {
  sessionStorage.clear()

  return (
    <>
      {
        props.config.auth0
          ? ( // eslint-disable-line no-extra-parens
            <Auth0App
              config={ props.config }
              getLatestData={ getLatestData }
              getRecipeById={ getRecipeById }
              submit={ submit } />
          )
          : ( // eslint-disable-line no-extra-parens
            <App
              config={ props.config }
              getLatestData={ getLatestData }
              getRecipeById={ getRecipeById }
              submit={ submit } />
          )
      }
    </>
  )
}
