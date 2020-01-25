export function handleSubmit(event, inputs, callback) {
  if (event) {
    event.preventDefault()
  }
  callback(inputs)
}

export function inputChange(event, inputs, setInputs) {
  event.persist()
  setInputs({ ...inputs, [event.target.name]: event.target.value })
}
