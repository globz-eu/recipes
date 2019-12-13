import React, { useState } from "react"
import Recipe from "./components/recipe"
import updateData from "./updateData"
import useForm from "./formHook"

export default function App() {
  const [data, setData] = useState(null)
  const submit = inputs => console.log(`${inputs.title} ${inputs.servings} ${inputs.instructions}`)
  const { inputs, handleInputChange, handleSubmit } = useForm(submit)

  React.useEffect(() => {
    updateData(setData)
  }, ["config.json"])

  return (
    <div>
      {
        data && data.map((datum, i) =>
          <Recipe
            key={ i }
            title={ datum.name }
            servings={ datum.servings }
            instructions={ datum.instructions } />
        )
      }
      <form onSubmit={ handleSubmit }>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={ handleInputChange }
            value={ inputs.title || "" }
            required />
          <label>Servings</label>
          <input
            type="number"
            name="servings"
            onChange={ handleInputChange }
            value={ inputs.servings || "" }
            required />
          <label>Instructions</label>
          <input
            type="text"
            name="instructions"
            onChange={ handleInputChange }
            value={ inputs.instructions || "" }
            required />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}
