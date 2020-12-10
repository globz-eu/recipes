import React, { useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import getLatestData from "./getLatestData"
import { submitStatic, submit } from "./submitRecipe"
import LoginButton from "./components/loginButton"
import LogoutButton from "./components/logoutButton"
import Profile from "./components/profile"
import Recipe from "./components/recipe"
import RecipeForm from "./components/recipeForm"

export default props => {
  const [data, setData] = useState(null)
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  React.useEffect(() => {
    async function updateData() {
      const accessToken = await getAccessTokenSilently({
        audience: props.config.auth0Audience,
        scope: "read:recipes",
      })
      const updatedData = await getLatestData(props.config, accessToken)
      console.log(updatedData)
      setData(updatedData)
    }
    if (isAuthenticated) {
      updateData()
    }
  }, [isAuthenticated])

  return (
    <div>
      {
        !isAuthenticated && <LoginButton />
      }
      {
        isAuthenticated && <LogoutButton />
      }
      <Profile />
      {
        !data && isAuthenticated && <div>Loading ...</div>
      }
      {
        !isAuthenticated && <div>Please log in ...</div>
      }
      {
        data && data.recipes && data.recipes.map((datum, i) =>
          <Recipe
            key={ i }
            title={ datum.name }
            servings={ datum.servings }
            instructions={ datum.instructions } />
        )
      }
      {
        data && data.recipes &&
        <RecipeForm
          onSubmit={ getSubmit(props.config, data.recipes, setData, getAccessTokenSilently) } />
      }
    </div>
  )
}

function getSubmit(config, recipes, setData, getAccessTokenSilently) {
  if (config.backend === "static") {
    return formData => submitStatic(formData, config, recipes, setData)
  } else {
    return formData => submit(formData, config, setData, getAccessTokenSilently)
  }
}
