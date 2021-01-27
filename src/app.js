import React, { useState } from "react"
import Loading from "./components/loading"
import RecipeForm from "./components/recipeForm"
import RecipeList from "./components/recipeList"

export default props => {
  const [data, setData] = useState(null)
  const [recipe, setRecipe] = useState(null)
  React.useEffect(() => {
    async function updateData() {
      const updatedData = await props.getLatestData({ backend: props.config.backend, db: props.db })
      setData({ ...updatedData, config: props.config })
    }
    updateData()
  }, [props.config])

  const submitRecipe = formData =>
    props.submit({
      id: recipe.id,
      formData,
      config: props.config,
      setData,
      setRecipe,
      db: props.db
    })

  return (
    <div>
      <Loading loading={ data == null } />
      {
        recipe != null
          ? ( // eslint-disable-line no-extra-parens
            <RecipeForm
              onSubmit={ submitRecipe }
              recipe={ recipe }
              onClose={ () => setRecipe(null) } />
          )
          : ( // eslint-disable-line no-extra-parens
            <RecipeList
              data={ data }
              recipeDetail={
                id =>
                  recipeDetail(id, props.db, props.getRecipeById, setRecipe, props.config)
              } />
          )
      }
    </div>
  )
}

async function recipeDetail(id, db, getRecipeById, setRecipe, config) {
  const recipe = await getRecipeById({ id, db, config })
  setRecipe(recipe)
}
