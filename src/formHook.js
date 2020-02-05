import { useState } from "react"
import { inputChange } from "./handlers"

export default () => {
  const [inputs, setInputs] = useState({})
  const handleInputChange = event => inputChange(event, inputs, setInputs)

  return {
    handleInputChange,
    inputs,
    setInputs
  }
}
