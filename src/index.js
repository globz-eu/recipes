import React from "react"
import ReactDOM from "react-dom"
import loadable from "@loadable/component"
import getConfig from "./getConfig"
import Loading from "./components/loading"

const StaticBackend = loadable(() => import("./staticBackend"), {
  fallback: <Loading loading />
})

const RestBackend = loadable(() => import("./restBackend"), {
  fallback: <Loading loading />
})

async function renderApp() {
  const config = await getConfig()

  ReactDOM.render(
    config.backendType === "static"
      ? <StaticBackend config={ config } />
      : <RestBackend config={ config } />,
    document.getElementById("app")
  )
}

renderApp()
