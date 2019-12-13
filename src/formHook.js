import { useState } from "react"
import { submit, inputChange } from "./handlers"

export default callback => {
  const [inputs, setInputs] = useState({})
  const handleSubmit = event => submit(event, inputs, callback)
  const handleInputChange = event => inputChange(event, inputs, setInputs)

  return {
    handleSubmit,
    handleInputChange,
    inputs
  }
}
