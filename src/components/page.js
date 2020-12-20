import React from "react"
import RecipeForm from "./recipeForm"
import Recipes from "./recipes"

export default ({ data, submitData }) =>
  <>
    <Recipes data={ data } />
    {
      data && data.recipes &&
      <RecipeForm
        onSubmit={ submitData } />
    }
  </>
