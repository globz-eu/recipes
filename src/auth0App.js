import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Page from "./components/page"

export default props => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [data, setData] = useState(null)

  React.useEffect(() => {
    async function updateData() {
      const accessToken = await getAccessTokenSilently({
        audience: props.config.auth0Audience,
        scope: "read:recipes",
      })
      const updatedData = await props.getLatestData(props.config.backend, accessToken)
      setData({ ...updatedData, config: props.config, getAccessTokenSilently })
    }
    if (isAuthenticated) {
      updateData()
    }
  }, [isAuthenticated])

  return (
    <Page
      config={ props.config }
      data={ data }
      submitData={
        formData =>
          props.submit({
            formData,
            config: props.config,
            setData,
            recipes: data.recipes
          })
      }
      isAuthenticated={ isAuthenticated } />
  )
}
