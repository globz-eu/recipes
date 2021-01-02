import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import Authentication from "../components/authentication"
import Loading from "../components/loading"
import RecipeList from "../components/recipeList"

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
    <div>
      <Authentication isAuthenticated={ isAuthenticated } />
      <Loading loading={ isAuthenticated && (data === undefined || data == null) } />
      <RecipeList data={ data } />
    </div>
  )
}
