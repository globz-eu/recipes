import React from "react"
import getSubmit from "../getSubmit"
import Authentication from "./authentication"
import Loading from "./loading"
import RecipeForm from "./recipeForm"
import Recipes from "./recipes"

export default ({ config, data, setData, isAuthenticated }) =>
  <div>
    {
      config.requireAuthentication
        ? renderAuthentication({ isAuthenticated, data })
        : <Loading loading={ data == null } />
    }
    <Recipes data={ data } />
    {
      data && data.recipes &&
      <RecipeForm
        onSubmit={ getSubmit({ ...data, setData }) } />
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
