import React, { useState } from "react"
import Loading from "./components/loading"
import RecipeForm from "./components/recipeForm"
import RecipeList from "./components/recipeList"

export default props => {
  const [data, setData] = useState(null)
  const [recipe, setRecipe] = useState(null)
  React.useEffect(() => {
    async function updateData() {
      const updatedData = await props.getLatestData(props.config.backend)
      setData({ ...updatedData, config: props.config })
    }
    updateData()
  }, [props.config])

  return (
    <div>
      <Loading loading={ data == null } />
      {
        recipe != null
          ? <RecipeForm onSubmit={ () => {} } recipe={ recipe } onClose={ () => setRecipe(null) } />
          : ( // eslint-disable-line no-extra-parens
            <RecipeList
              data={ data }
              recipeDetail={
                id =>
                  recipeDetail(id, props.getRecipeById, setRecipe, props.config)
              }
              onClose={ () => setRecipe(null) } />
          )
      }
    </div>
  )
}

async function recipeDetail(id, getRecipeById, setRecipe, config) {
  const recipe = await getRecipeById(config.backend, id)
  setRecipe(recipe)
}
