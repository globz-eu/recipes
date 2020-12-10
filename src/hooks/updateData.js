import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import getLatestData from "../getLatestData"


export default ({ config, setData }) => {
  if (config.requireAuthentication) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()

    return (
      React.useEffect(() => {
        async function updateData() {
          const accessToken = await getAccessTokenSilently({
            audience: config.auth0Audience,
            scope: "read:recipes",
          })
          const updatedData = await getLatestData({ ...config, accessToken })
          setData({ ...updatedData, config, isAuthenticated, getAccessTokenSilently })
        }
        if (isAuthenticated) {
          updateData()
        }
      }, [isAuthenticated])
    )
  } else {
    return (
      React.useEffect(() => {
        async function updateData() {
          const updatedData = await getLatestData({ ...config })
          setData({ ...updatedData, config })
        }
        updateData()
      }, [config])
    )
  }
}
