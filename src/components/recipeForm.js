import React from "react"
import useForm from "../formHook"
import { handleSubmit } from "../handlers"

export default ({ submit, backend }) => {
  const { inputs, handleInputChange } = useForm()

  return (
    <form onSubmit={ event => handleSubmit(event, inputs, submit, backend) }>
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
  )
}
