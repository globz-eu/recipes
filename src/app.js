import React, { useState } from "react"
import Loading from "./components/loading"
import RecipeList from "./components/recipeList"

export default props => {
  const [data, setData] = useState(null)
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
      <RecipeList data={ data } />
    </div>
  )
}
