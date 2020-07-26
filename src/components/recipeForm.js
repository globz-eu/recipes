import React from "react"
import { useForm } from "react-hook-form"

export default ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm()

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div>
        <label id="recipe-name">Title</label>
        <input
          type="text"
          aria-labelledby="recipe-name"
          name="name"
          defaultValue=""
          ref={ register({ required: true }) } />
        { errors.name && "This field is required" }
        <label id="recipe-servings">Servings</label>
        <input
          type="number"
          aria-labelledby="recipe-servings"
          name="servings"
          defaultValue=""
          ref={ register({ required: true }) } />
        { errors.servings && "This field is required" }
        <label id="recipe-instructions">Instructions</label>
        <input
          type="text"
          aria-labelledby="recipe-instructions"
          name="instructions"
          defaultValue=""
          ref={ register({ required: true }) } />
        { errors.instructions && "This field is required" }
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}
