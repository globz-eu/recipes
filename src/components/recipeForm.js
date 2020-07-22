import React from "react"
import useForm from "../formHook"
import { handleSubmit } from "../handlers"

export default ({ updateData, backend }) => {
  const { inputs, setInputs, handleInputChange } = useForm()

  return (
    <form onSubmit={ event => handleSubmit(event, inputs, setInputs, backend, updateData) }>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="name"
          onChange={ handleInputChange }
          value={ inputs.name || "" }
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
  )
}
