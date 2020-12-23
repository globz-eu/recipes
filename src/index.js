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

const backends = {
  static: props => <StaticBackend { ...props } />,
  rest: props => <RestBackend { ...props } />
}

async function renderApp() {
  const config = await getConfig()

  ReactDOM.render(
    backends[config.backendType]({ config }),
    document.getElementById("app")
  )
}

renderApp()
