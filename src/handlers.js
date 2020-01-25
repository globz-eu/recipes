export function handleSubmit(event, inputs, callback, backend) {
  if (event) {
    event.preventDefault()
  }
  callback(inputs, backend)
}

export function inputChange(event, inputs, setInputs) {
  event.persist()
  setInputs({ ...inputs, [event.target.name]: event.target.value })
}

export function submitRecipe(inputs, backend) {
  console.log(`${inputs.title} ${inputs.servings} ${inputs.instructions} ${backend}`)
}
