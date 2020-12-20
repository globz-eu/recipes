import React from "react"
import Authentication from "./authentication"
import Loading from "./loading"
import RecipeForm from "./recipeForm"
import Recipes from "./recipes"

export default ({ config, data, submitData, isAuthenticated }) =>
  <div>
    {
      config.auth0
        ? renderAuthentication({ isAuthenticated, data })
        : <Loading loading={ data == null } />
    }
    <Recipes data={ data } />
    {
      data && data.recipes &&
      <RecipeForm
        onSubmit={ submitData } />
    }
  </div>

function renderAuthentication({ isAuthenticated, data }) {
  return (
    <>
      <Authentication
        isAuthenticated={ isAuthenticated } />
      <Loading loading={ isAuthenticated && data === undefined } />
    </>
  )
}
