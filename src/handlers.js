import { postToUrl } from "./requests"

export async function handleSubmit(event, inputs, setInputs, backend, updateData) {
  if (event) {
    event.preventDefault()
  }
  await postToUrl(backend, inputs)
  setInputs({})
  updateData()
}

export function inputChange(event, inputs, setInputs) {
  event.persist()
  setInputs({ ...inputs, [event.target.name]: event.target.value })
}
