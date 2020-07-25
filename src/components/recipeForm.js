import React from "react"
import useForm from "../formHook"
import { handleSubmit } from "../handlers"

export default ({ updateData, backend }) => {
  const { inputs, setInputs, handleInputChange } = useForm()

  return (
    <form onSubmit={ event => handleSubmit(event, inputs, setInputs, backend, updateData) }>
      <div>
        <label id="recipe-name">Title</label>
        <input
          type="text"
          aria-labelledby="recipe-name"
          name="name"
          onChange={ handleInputChange }
          value={ inputs.name || "" }
          required />
        <label id="recipe-servings">Servings</label>
        <input
          type="number"
          aria-labelledby="recipe-servings"
          name="servings"
          onChange={ handleInputChange }
          value={ inputs.servings || "" }
          required />
        <label id="recipe-instructions">Instructions</label>
        <input
          type="text"
          aria-labelledby="recipe-instructions"
          name="instructions"
          onChange={ handleInputChange }
          value={ inputs.instructions || "" }
          required />
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
